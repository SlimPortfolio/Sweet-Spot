"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { KFComboBox } from "./KFComboBox";
import { KFPopover } from "./KFPopover";
import {
  guitarFriendlySuggestion,
  octaveDictionary,
  valueToOctaveDictionary,
} from "@/utils/key-calculation";
const songs = [
  {
    label: "King of Kings",
    artist: "Hillsong Worship",
    id: "1",
    songLowNote: "C#4",
    songHighNote: "D5",
    songOriginalKey: "D",
  },
  {
    label: "Some Song",
    id: "2",
  },
];

const vocalists = [
  {
    label: "Steven Lim",
    id: "1",
    vocalistLowNote: "A3",
    vocalistHighNote: "E5",
  },
  {
    label: "David Shiu",
    id: "2",
    vocalistLowNote: "F3",
    vocalistHighNote: "C#5",
  },
  {
    label: "Pork Pig",
    id: "3",
  },
];

type suggestionDetails = {
  songName: string;
  artist: string | undefined;
  vocalistName: string;
  suggestedKey: string;
  originalKey: string | undefined;
};
type KeyFinderFormProps = {
  setSuggestionDetails: React.Dispatch<React.SetStateAction<suggestionDetails>>;
};
export default function KeyFinderForm(props: KeyFinderFormProps) {
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
  const [isSubmitError, setIsSubmitError] = useState(true);
  function testFunction() {
    console.log("selected from test: ", selectedSong, selectedVocalist);
  }
  function submitForm() {
    if (selectedSong.id === "default" || selectedVocalist.id === "default") {
      return;
    }
    console.log(isSubmitError);
    props.setSuggestionDetails({
      songName: selectedSong.label,
      artist: selectedSong.artist,
      vocalistName: selectedVocalist.label,
      suggestedKey: calculateKey(),
      originalKey: selectedSong.songOriginalKey,
    });
    console.log(selectedSong, selectedVocalist);
  }

  //helper functions
  function intNote(note?: string) {
    if (note === undefined) {
      console.log("note is undefined, error");
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
  function calculateKey() {
    if (selectedSong.id === "default" || selectedVocalist.id === "default") {
      setIsSubmitError(false);
      //set the state of the status message.
    } else {
      setIsSubmitError(true);
    }
    //insert logic here
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
    if (rangeSong > rangeVocalist) {
      suggestedKey = "Song is Unsingable";
    }
    let highNoteGap = calculateNoteGap(
      selectedVocalist.vocalistHighNote,
      selectedSong.songHighNote
    );
    if (rangeSong === rangeVocalist || rangeVocalist - rangeSong === 1) {
      suggestedKeyValue =
        octaveDictionary.get(selectedSong.songOriginalKey) - highNoteGap;
    } else if (rangeVocalist - rangeSong >= 3) {
      suggestedKeyValue =
        octaveDictionary.get(selectedSong.songOriginalKey) - highNoteGap - 2;
    } else {
      suggestedKeyValue =
        octaveDictionary.get(selectedSong.songOriginalKey) - highNoteGap - 1;
    }
    suggestedKeyValue = ((suggestedKeyValue % 12) + 12) % 12;
    suggestedKey = valueToOctaveDictionary.get(suggestedKeyValue);

    //adding logic for suggesting a better key if possible
    if (
      rangeVocalist - rangeSong >= 3 &&
      guitarFriendlySuggestion.get(suggestedKey) != null
      // && advancedSettings.isGuitarFriendly == true
    ) {
      suggestedKey = guitarFriendlySuggestion.get(suggestedKey);
    }
    return suggestedKey;
  }
  return (
    <div className="justify-center flex">
      <div className="pl-24 pt-10 pb-10 -mr-24 w-[50%] ">
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
          <KFPopover />
        </div>
        <button onClick={testFunction}>Click me to check</button>
        <p id="error-status-message" className="text-red-600 font-semibold">
          {isSubmitError ? "" : "Please Select a Song and Vocalist"}
        </p>
      </div>
    </div>
  );
}
