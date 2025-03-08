"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { KFComboBox } from "./KFComboBox";
import { KFPopover } from "./KFPopover";
const songs = [
  {
    label: "King of Kings",
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

export default function KeyFinderForm() {
  const [selectedSong, setSelectedSong] = useState({});
  const [selectedVocalist, setSelectedVocalist] = useState({});
  console.log("selected song name is: ", selectedSong);
  console.log("selected vocalist name is: ", selectedVocalist);
  function testFunction() {
    console.log("selected from test: ", selectedSong, selectedVocalist);
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
            selectedState={setSelectedSong}
          />
        </div>
        <div className="mb-4">
          <KFComboBox
            selections={vocalists}
            iconName="mic-vocal"
            placeholder="Select a Vocalist"
            filterPlaceholder="Search Vocalists"
            selectedState={setSelectedVocalist}
          />
        </div>
        <div className="flex">
          <Button>Submit</Button>
          <KFPopover />
        </div>
        <button onClick={testFunction}>Click me to check</button>
      </div>
    </div>
  );
}
