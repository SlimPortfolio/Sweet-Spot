"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import KeyFinderForm from "@/components/keyFinder/KeyFinderForm";
import {
  allNotes,
  octaveDictionary,
  valueToOctaveDictionary,
  guitarFriendlySuggestionUp,
} from "@/utils/key-calculation";
import KeyFinderResult from "@/components/keyFinder/KeyFinderResult";

export default function KeyFinder() {
  let listOfSongs = [
    {
      id: 1,
      songName: "Blessed Be Your Name",
      lowNote: "A#3",
      highNote: "C#5",
      originalKey: "G#",
    },
    {
      id: 2,
      songName: "Amazing Grace (My Chains Are Gone)",
      lowNote: "D4",
      highNote: "G5",
      originalKey: "G",
    },
    {
      id: 3,
      songName: "God, You're So Good",
      lowNote: "G4",
      highNote: "C6",
      originalKey: "G",
    },
    {
      id: 4,
      songName: "Hymn of Heaven",
      lowNote: "D4",
      highNote: "G5",
      originalKey: "D",
    },
    {
      id: 5,
      songName: "How He Loves",
      lowNote: "C4",
      highNote: "F5",
      originalKey: "C",
    },
    {
      id: 6,
      songName: "Glorious Day",
      lowNote: "D3",
      highNote: "F#4",
      originalKey: "D",
    },
    {
      id: 7,
      songName: "Happy Day",
      lowNote: "C3",
      highNote: "E4",
      originalKey: "C",
    },
    {
      id: 8,
      songName: "Praise the King",
      lowNote: "C3",
      highNote: "F4",
      originalKey: "C",
    },
    {
      id: 9,
      songName: "Living Hope",
      lowNote: "D#3",
      highNote: "G4",
      originalKey: "D#",
    },
    {
      id: 10,
      songName: "Because He Lives",
      lowNote: "B2",
      highNote: "F#4",
      originalKey: "A",
    },
    {
      id: 11,
      songName: "Forever",
      lowNote: "G3",
      highNote: "C5",
      originalKey: "G",
    },
    {
      id: 12,
      songName: "Great Are You Lord",
      lowNote: "E4",
      highNote: "F#5",
      originalKey: "A",
    },
    {
      id: 13,
      songName: "Filled With Your Glory",
      lowNote: "D#4",
      highNote: "D#5",
      originalKey: "G#",
    },
    {
      id: 14,
      songName: "This is Amazing Grace?",
      lowNote: "A#4",
      highNote: "G5",
      originalKey: "A#",
    },
    {
      id: 15,
      songName: "Lord I Need You",
      lowNote: "B3",
      highNote: "F#5",
      originalKey: "B",
    },
    {
      id: 16,
      songName: "Called Me Higher",
      lowNote: "G#3",
      highNote: "C#5",
      originalKey: "C#",
    },
    {
      id: 17,
      songName: "Yet Not I But Through Christ in Me",
      lowNote: "A3",
      highNote: "C5",
      originalKey: "C",
    },
    {
      id: 18,
      songName: "Worthy of it All",
      lowNote: "C4",
      highNote: "G5",
      originalKey: "C",
    },
    {
      id: 19,
      songName: "Gratitude",
      lowNote: "B3",
      highNote: "F#5",
      originalKey: "B",
    },
    {
      id: 20,
      songName: "Great Things?",
      lowNote: "B4",
      highNote: "F#5",
      originalKey: "B",
    },
    {
      id: 21,
      songName: "Cornerstone",
      lowNote: "C4",
      highNote: "G5",
      originalKey: "C",
    },
    {
      id: 22,
      songName: "Holy Forever",
      lowNote: "C4",
      highNote: "G5",
      originalKey: "C#",
    },
    {
      id: 23,
      songName: "Abide",
      lowNote: "E3",
      highNote: "A4",
      originalKey: "D",
    },
    {
      id: 24,
      songName: "Reckless Love",
      lowNote: "G4",
      highNote: "G5",
      originalKey: "G",
    },
    {
      id: 25,
      songName: "Christ Be Magnified",
      lowNote: "F#4",
      highNote: "F#5",
      originalKey: "A",
    },
    {
      id: 26,
      songName: "Good Good Father",
      lowNote: "D3",
      highNote: "D4",
      originalKey: "A",
    },
    {
      id: 27,
      songName: "How Great is Our God",
      lowNote: "F4",
      highNote: "F#5",
      originalKey: "C#",
    },
    {
      id: 28,
      songName: "Who You Say I Am",
      lowNote: "F#3",
      highNote: "B4",
      originalKey: "F#",
    },
    {
      id: 29,
      songName: "Christ Be All Around Me",
      lowNote: "F#3",
      highNote: "G4",
      originalKey: "D",
    },
    {
      id: 30,
      songName: "Battle Belongs",
      lowNote: "C#3",
      highNote: "A#4",
      originalKey: "C#",
    },
    {
      id: 31,
      songName: "No Longer Slaves",
      lowNote: "G3",
      highNote: "D5",
      originalKey: "A#",
    },
    {
      id: 32,
      songName: "Life Defined",
      lowNote: "G3",
      highNote: "G4",
      originalKey: "C",
    },
    {
      id: 33,
      songName: "King of Kings",
      lowNote: "C#4",
      highNote: "D5",
      originalKey: "D",
    },
    {
      id: 34,
      songName: "Lion and the Lamb",
      lowNote: "A3",
      highNote: "G4",
      originalKey: "C",
    },
  ];
  // let dummyData = [
  //   {
  //     name: "Steven Lim",
  //     lowNote: "A3",
  //     highNote: "E5",
  //   },
  //   {
  //     name: "Jeremy Lim",
  //     lowNote: "G3",
  //     highNote: "E5",
  //   },
  // ];
  //pull information from API / external resource
  const [vocalistList, setVocalistList] = useState([]);
  const [songList, setSongList] = useState([]);

  //initialize useState variables for the inputs
  const [selectedVocalist, setSelectedVocalist] = useState({
    id: 1,
    lowNote: "A3",
    highNote: "E5",
    name: "Steven Lim",
  });
  const [selectedSong, setSelectedSong] = useState({
    // id: 1,
    // lowNote: "B3",
    // highNote: "F#5",
    // originalKey: "B",
    // songName: "Gratitude",
    id: 1,
    lowNote: "A#4",
    highNote: "G5",
    originalKey: "A#",
    songName: "This is Amazing Grace",
  });
  //moving advancedSettings in with the KeyFinderForm.tsx file
  // const [advancedSettings, setAdvancedSettings] = useState({
  //   isGuitarFriendly: true,
  //   optimalKey: false,
  //   //maybe include keys to avoid here
  // });
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
  const [suggestedSongDetails, setSuggestedSongDetails] =
    useState<suggestionDetails>({
      songName: "",
      artist: "",
      vocalistName: "",
      originalKey: "",
      suggestion: {
        suggestedKey: "",
        higherKeys: [],
        lowerKeys: [],
      },
      //eventually go for a space on the left and right
      //eventually can leave space for alternative keys
    });
  return (
    <div className="flex w-full h-full md:justify-center md:flex-row md:items-start flex-col items-center">
      <div className="flex justify-center mx-14">
        <KeyFinderForm setSuggestionDetails={setSuggestedSongDetails} />
      </div>
      <div className="flex justify-center h-full mx-4 md:mx-14 md:my-0 my-8">
        {suggestedSongDetails.suggestion.suggestedKey !== "" ? (
          <KeyFinderResult resultDetails={suggestedSongDetails} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
