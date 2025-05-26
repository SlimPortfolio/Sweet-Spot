"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { KFComboBox } from "./KFComboBox";
import { KFPopover } from "./KFPopover";
import {
  guitarFriendlySuggestionUp,
  guitarFriendlySuggestionDown,
  octaveDictionary,
  valueToOctaveDictionary,
  octaveArray,
} from "@/utils/key-calculation";

type suggestionObject = {
  suggestedKey: string;
  higherKeys: string[];
  lowerKeys: string[];
};
type suggestionDetails = {
  songName: string;
  artist: string | undefined;
  vocalistName: string;
  originalKey: string | undefined;
  suggestion: suggestionObject;
};
type KeyFinderFormProps = {
  setSuggestionDetails: React.Dispatch<React.SetStateAction<suggestionDetails>>;
};
export default function KeyFinderForm(props: KeyFinderFormProps) {
  const [songs, setSongs] = useState<SelectionObject[]>([]);
  const [vocalists, setVocalists] = useState<SelectionObject[]>([]);
  useEffect(() => {
    const fetchSongs = async () => {
      const res = await fetch("/api/songs");
      const data: SelectionObject[] = await res.json();
      data.sort((a, b) => a.label.localeCompare(b.label));
      setSongs(data);
    };
    const fetchVocalists = async () => {
      const res = await fetch("/api/vocalists");
      const data: SelectionObject[] = await res.json();
      data.sort((a, b) => a.label.localeCompare(b.label));
      setVocalists(data);
    };
    fetchSongs();
    fetchVocalists();
  }, []);

  interface SelectionObject {
    label: string;
    id: string;
    artist?: string;
    songLowNote?: string;
    songHighNote?: string;
    songOriginalKey?: string;
    vocalistLowNote?: string;
    vocalistHighNote?: string;
  }
  const [selectedSong, setSelectedSong] = useState<SelectionObject>({
    label: "",
    id: "default",
    artist: "",
    songLowNote: "",
    songHighNote: "",
    songOriginalKey: "",
  });
  const [selectedVocalist, setSelectedVocalist] = useState<SelectionObject>({
    label: "",
    id: "default",
    vocalistLowNote: "",
    vocalistHighNote: "",
  });
  const [isSubmitError, setIsSubmitError] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState({
    isGuitarFriendly: true,
    optimalKey: false,
    //maybe include keys to avoid here
  });
  function submitForm() {
    if (selectedSong.id === "default" || selectedVocalist.id === "default") {
      setIsSubmitError(true);
      return;
    }
    props.setSuggestionDetails({
      songName: selectedSong.label,
      artist: selectedSong.artist,
      vocalistName: selectedVocalist.label,
      originalKey: selectedSong.songOriginalKey,
      suggestion: calculateKey(),
    });
  }

  //helper functions
  function intNote(note?: string) {
    if (note === undefined) {
      return;
    }
    const octave = note.slice(-1);
    const intValue =
      Number(octave) * 12 +
      octaveDictionary.get(note.substring(0, note.length - 1));
    return intValue;
  }
  function calculateNoteGap(note1?: string, note2?: string) {
    return intNote(note2) - intNote(note1);
  }
  function calculateKey(): suggestionObject {
    //handle incomplete submission errors
    if (selectedSong.id === "default" || selectedVocalist.id === "default") {
      setIsSubmitError(true);
      //set the state of the status message.
    } else {
      setIsSubmitError(false);
    }

    //logic for calculating key
    let rangeSong = calculateNoteGap(
      selectedSong.songLowNote,
      selectedSong.songHighNote
    );
    let rangeVocalist = calculateNoteGap(
      selectedVocalist.vocalistLowNote,
      selectedVocalist.vocalistHighNote
    );
    let suggestedKey = "";
    let suggestedKeyValue;
    let higherKeysCount = 0;
    let lowerKeysCount = 0;

    if (rangeSong > rangeVocalist) {
      return {
        suggestedKey: "Song is Unsingable",
        higherKeys: [],
        lowerKeys: [],
      };
    }
    let highNoteGap = calculateNoteGap(
      selectedVocalist.vocalistHighNote,
      selectedSong.songHighNote
    );
    if (rangeSong === rangeVocalist || rangeVocalist - rangeSong === 1) {
      if (rangeVocalist - rangeSong === 1) {
        lowerKeysCount = 1;
      }
      suggestedKeyValue =
        octaveDictionary.get(selectedSong.songOriginalKey) - highNoteGap;
    } else if (rangeVocalist - rangeSong >= 3) {
      suggestedKeyValue =
        octaveDictionary.get(selectedSong.songOriginalKey) - highNoteGap - 2;
      higherKeysCount = 2;
      lowerKeysCount = rangeVocalist - rangeSong - 2;
    } else {
      suggestedKeyValue =
        octaveDictionary.get(selectedSong.songOriginalKey) - highNoteGap - 1;
      higherKeysCount = 1;
      lowerKeysCount = 1;
    }
    suggestedKeyValue = ((suggestedKeyValue % 12) + 12) % 12;
    suggestedKey = valueToOctaveDictionary.get(suggestedKeyValue);

    if (
      rangeVocalist - rangeSong === 1 &&
      guitarFriendlySuggestionDown.get(suggestedKey) != null &&
      !advancedSettings.optimalKey
    ) {
      higherKeysCount += 1;
      lowerKeysCount -= 1;
      suggestedKey = guitarFriendlySuggestionDown.get(suggestedKey);
    } else if (
      (rangeVocalist - rangeSong >= 3 || rangeVocalist - rangeSong === 2) &&
      guitarFriendlySuggestionUp.get(suggestedKey) != null &&
      !advancedSettings.optimalKey
    ) {
      higherKeysCount -= 1;
      lowerKeysCount += 1;
      suggestedKey = guitarFriendlySuggestionUp.get(suggestedKey);
    }
    let higherKeys = [];
    let lowerKeys = [];
    for (let i = 0; i < higherKeysCount; i++) {
      higherKeys.push(
        octaveArray[(octaveDictionary.get(suggestedKey) + 1 + i) % 12]
      );
    }
    for (let i = 0; i < lowerKeysCount; i++) {
      lowerKeys.push(
        octaveArray[(octaveDictionary.get(suggestedKey) - 1 - i + 12) % 12]
      );
    }

    return {
      suggestedKey: suggestedKey,
      higherKeys: higherKeys,
      lowerKeys: lowerKeys,
    };
  }
  return (
    <div className="flex">
      <div className="pt-10 pb-10">
        <h1 className="font-inriaSans text-5xl pb-16">
          <strong>Find Your Key</strong>
        </h1>
        <div className="mb-4">
          <KFComboBox
            selections={songs}
            iconName="music"
            placeholder="Select a Song"
            filterPlaceholder="Search Songs"
            setSelectedState={setSelectedSong}
            selectedState={selectedSong}
          />
        </div>
        <div className="mb-4">
          <KFComboBox
            selections={vocalists}
            iconName="mic-vocal"
            placeholder="Select a Vocalist"
            filterPlaceholder="Search Vocalists"
            setSelectedState={setSelectedVocalist}
            selectedState={selectedVocalist}
          />
        </div>
        <div className="flex">
          <Button onClick={() => submitForm()}>Submit</Button>
          <KFPopover
            advancedSettings={advancedSettings}
            advancedSettingsSetter={setAdvancedSettings}
          />
        </div>
        <p id="error-status-message" className="text-red-600 font-semibold">
          {isSubmitError ? "Please Select a Song and Vocalist" : ""}
        </p>
      </div>
    </div>
  );
}
