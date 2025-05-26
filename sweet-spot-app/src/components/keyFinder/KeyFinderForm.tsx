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
import { connectToDB } from "@/lib/mongodb";
import Song from "@/models/Song";

// const songs = [
//   {
//     label: "Blessed Be Your Name",
//     artist: "Matt Redman",
//     id: "1",
//     songLowNote: "A#3",
//     songHighNote: "C#5",
//     songOriginalKey: "G#",
//   },
//   {
//     label: "Amazing Grace (My Chains Are Gone)",
//     artist: "Chris Tomlin",
//     id: "2",
//     songLowNote: "D4",
//     songHighNote: "G5",
//     songOriginalKey: "G",
//   },
//   {
//     label: "God, You're So Good",
//     artist: "Passion",
//     id: "3",
//     songLowNote: "G4",
//     songHighNote: "C6",
//     songOriginalKey: "G",
//   },
//   {
//     label: "Hymn of Heaven",
//     artist: "Phil Wickham",
//     id: "4",
//     songLowNote: "D4",
//     songHighNote: "G5",
//     songOriginalKey: "D",
//   },
//   {
//     label: "How He Loves",
//     artist: "David Crowder Band",
//     id: "5",
//     songLowNote: "C4",
//     songHighNote: "F5",
//     songOriginalKey: "C",
//   },
//   {
//     label: "Glorious Day",
//     artist: "Passion",
//     id: "6",
//     songLowNote: "D3",
//     songHighNote: "F#4",
//     songOriginalKey: "D",
//   },
//   {
//     label: "Happy Day",
//     artist: "Tim Hughes",
//     id: "7",
//     songLowNote: "C3",
//     songHighNote: "E4",
//     songOriginalKey: "C",
//   },
//   {
//     label: "Praise the King",
//     artist: "Corey Voss",
//     id: "8",
//     songLowNote: "C3",
//     songHighNote: "F4",
//     songOriginalKey: "C",
//   },
//   {
//     label: "Living Hope",
//     artist: "Phil Wickham",
//     id: "9",
//     songLowNote: "D#3",
//     songHighNote: "G4",
//     songOriginalKey: "D#",
//   },
//   {
//     label: "Because He Lives",
//     artist: "Shane and Shane",
//     id: "10",
//     songLowNote: "B2",
//     songHighNote: "F#4",
//     songOriginalKey: "A",
//   },
//   {
//     label: "Forever",
//     artist: "Kari Jobe",
//     id: "11",
//     songLowNote: "G3",
//     songHighNote: "C5",
//     songOriginalKey: "G",
//   },
//   {
//     label: "Great Are You Lord",
//     artist: "All Sons and Daughters",
//     id: "12",
//     songLowNote: "E4",
//     songHighNote: "F#5",
//     songOriginalKey: "A",
//   },
//   {
//     label: "Filled With Your Glory",
//     artist: "Starfield",
//     id: "13",
//     songLowNote: "D#4",
//     songHighNote: "D#5",
//     songOriginalKey: "G#",
//   },
//   {
//     label: "This is Amazing Grace",
//     artist: "Phil Wickham",
//     id: "14",
//     songLowNote: "A#4",
//     songHighNote: "G5",
//     songOriginalKey: "A#",
//   },
//   {
//     label: "Lord I Need You",
//     artist: "Chris Tomlin",
//     id: "15",
//     songLowNote: "B3",
//     songHighNote: "F#5",
//     songOriginalKey: "B",
//   },
//   {
//     label: "Called Me Higher",
//     artist: "All Sons and Daughters",
//     id: "16",
//     songLowNote: "G#3",
//     songHighNote: "C#5",
//     songOriginalKey: "C#",
//   },
//   {
//     label: "Yet Not I But Through Christ in Me",
//     artist: "CityAlight",
//     id: "17",
//     songLowNote: "A3",
//     songHighNote: "C5",
//     songOriginalKey: "C",
//   },
//   {
//     label: "Worthy of it All",
//     artist: "Christ for the Nations Worship",
//     id: "18",
//     songLowNote: "C4",
//     songHighNote: "G5",
//     songOriginalKey: "C",
//   },
//   {
//     label: "Gratitude",
//     artist: "Brandon Lake",
//     id: "19",
//     songLowNote: "B3",
//     songHighNote: "F#5",
//     songOriginalKey: "B",
//   },
//   {
//     label: "Great Things",
//     artist: "Phil Wickham",
//     id: "20",
//     songLowNote: "B4",
//     songHighNote: "F#5",
//     songOriginalKey: "B",
//   },
//   {
//     label: "Cornerstone",
//     artist: "Hillsong",
//     id: "21",
//     songLowNote: "C4",
//     songHighNote: "G5",
//     songOriginalKey: "C",
//   },
//   {
//     label: "Holy Forever",
//     artist: "Chris Tomlin",
//     id: "22",
//     songLowNote: "C4",
//     songHighNote: "G5",
//     songOriginalKey: "C#",
//   },
//   {
//     label: "Abide",
//     artist: "The Worship Initiative",
//     id: "23",
//     songLowNote: "E3",
//     songHighNote: "A4",
//     songOriginalKey: "D",
//   },
//   {
//     label: "Reckless Love",
//     artist: "Cory Asbury",
//     id: "24",
//     songLowNote: "G4",
//     songHighNote: "G5",
//     songOriginalKey: "G",
//   },
//   {
//     label: "Christ Be Magnified",
//     artist: "Cody Carnes",
//     id: "25",
//     songLowNote: "F#4",
//     songHighNote: "F#5",
//     songOriginalKey: "A",
//   },
//   {
//     label: "Good Good Father",
//     artist: "Chris Tomlin",
//     id: "26",
//     songLowNote: "D3",
//     songHighNote: "D4",
//     songOriginalKey: "A",
//   },
//   {
//     label: "How Great is Our God",
//     artist: "Chris Tomlin",
//     id: "27",
//     songLowNote: "F4",
//     songHighNote: "F#5",
//     songOriginalKey: "C#",
//   },
//   {
//     label: "Who You Say I Am",
//     artist: "Hillsong",
//     id: "28",
//     songLowNote: "F#3",
//     songHighNote: "B4",
//     songOriginalKey: "F#",
//   },
//   {
//     label: "Christ Be All Around Me",
//     artist: "All Sons and Daughter",
//     id: "29",
//     songLowNote: "F#3",
//     songHighNote: "G4",
//     songOriginalKey: "D",
//   },
//   {
//     label: "Battle Belongs",
//     artist: "Phil Wickham",
//     id: "30",
//     songLowNote: "C#3",
//     songHighNote: "A#4",
//     songOriginalKey: "C#",
//   },
//   {
//     label: "No Longer Slaves",
//     artist: "Bethel Music",
//     id: "31",
//     songLowNote: "G3",
//     songHighNote: "D5",
//     songOriginalKey: "A#",
//   },
//   {
//     label: "Life Defined",
//     artist: "Shane and Shane",
//     id: "32",
//     songLowNote: "G3",
//     songHighNote: "G4",
//     songOriginalKey: "C",
//   },
//   {
//     label: "King of Kings",
//     artist: "Hillsong",
//     id: "33",
//     songLowNote: "C#4",
//     songHighNote: "D5",
//     songOriginalKey: "D",
//   },
//   {
//     label: "Lion and the Lamb",
//     artist: "Bethel Music",
//     id: "34",
//     songLowNote: "A3",
//     songHighNote: "G4",
//     songOriginalKey: "C",
//   },
//   {
//     label: "How Deep the Father's Love For Us",
//     artist: "Unknown oops?",
//     id: "35",
//     songLowNote: "D4",
//     songHighNote: "D5",
//     songOriginalKey: "G",
//   },
//   {
//     label: "Indescribable",
//     artist: "Chris Tomlin",
//     id: "36",
//     songLowNote: "A#4",
//     songHighNote: "F#5",
//     songOriginalKey: "B",
//   },
//   {
//     label: "Jesus Messiah",
//     artist: "Chris Tomlin",
//     id: "37",
//     songLowNote: "B4",
//     songHighNote: "F#5",
//     songOriginalKey: "B",
//   },
//   {
//     label: "Goodness of God",
//     artist: "Bethel Music",
//     id: "38",
//     songLowNote: "G#3",
//     songHighNote: "C#5",
//     songOriginalKey: "G#",
//   },
//   {
//     label: "Jesus We Love You",
//     artist: "Bethel Music",
//     id: "39",
//     songLowNote: "D#4",
//     songHighNote: "F#5",
//     songOriginalKey: "B",
//   },
//   {
//     label: "10,000 Reasons",
//     artist: "Matt Redman",
//     id: "40",
//     songLowNote: "D4",
//     songHighNote: "F#5",
//     songOriginalKey: "G",
//   },
// ];
// songs.sort((a, b) => a.label.localeCompare(b.label));
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
    label: "Johnny Wang",
    id: "3",
    vocalistLowNote: "F3",
    vocalistHighNote: "E5",
  },
  {
    label: "Jeremy Lim",
    id: "4",
    vocalistLowNote: "G3",
    vocalistHighNote: "E5",
  },
  {
    label: "David Jante",
    id: "5",
    vocalistLowNote: "B3",
    vocalistHighNote: "E5",
  },
  {
    label: "Diana Sun",
    id: "6",
    vocalistLowNote: "F#3",
    vocalistHighNote: "C#5",
  },
  {
    label: "Joy Ngun",
    id: "7",
    vocalistLowNote: "G3",
    vocalistHighNote: "D#5",
  },
  {
    label: "Austin Li",
    id: "8",
    vocalistLowNote: "B3",
    vocalistHighNote: "F5",
  },
];
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await connectToDB();
  //       console.log("connected to MongoDB");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  const [songs, setSongs] = useState<SelectionObject[]>([]);
  useEffect(() => {
    const fetchSongs = async () => {
      const res = await fetch("/api/songs");
      // console.log(res);
      const data: SelectionObject[] = await res.json();
      // console.log(data);
      console.log(data.sort((a, b) => a.label.localeCompare(b.label)));
      setSongs(data);
    };
    // const fetchVocalists = async () => {
    //   const res = await fetch("/api/songs");
    //   // console.log(res);
    //   const data: SelectionObject[] = await res.json();
    //   // console.log(data);
    //   console.log(data.sort((a, b) => a.label.localeCompare(b.label)));
    //   setSongs(data);
    // };
    fetchSongs();
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

    //adding logic for suggesting a better key if possible
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
      {/* <div className="pl-24 pt-10 pb-10 -mr-24 w-[50%] "> */}
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
