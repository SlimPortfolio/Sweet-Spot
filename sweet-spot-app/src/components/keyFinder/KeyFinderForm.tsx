"use client";
import { Button } from "../ui/button";
import { KFComboBox } from "./KFComboBox";
import { KFPopover } from "./KFPopover";
const songs = [
  {
    value: "defyGravity",
    label: "Defy Gravity",
  },
  {
    value: "someSong",
    label: "Some Song",
  },
];

const vocalists = [
  {
    value: "stevenlim",
    label: "Steven Lim",
  },
  {
    value: "porkpig",
    label: "Pork Pig",
  },
];

export default function KeyFinderForm() {
  return (
    <div className="justify-center flex">
      <div className="pl-24 pt-10 pb-10 -mr-24 w-[50%] ">
        <h1 className="font-inriaSans text-5xl pb-16">
          <strong>Find Your Key</strong>
          {/* we can use a combo box for selecting song*/}
          {/* we can use a combo box for selecting vocalist*/}
          {/* we can use a submit button, and then an advanced search toggle button*/}
        </h1>
        <div className="mb-4">
          <KFComboBox
            selections={songs}
            iconName="music"
            placeholder="Select a Song"
            filterPlaceholder="Search Songs"
          />
        </div>
        <div className="mb-4">
          <KFComboBox
            selections={vocalists}
            iconName="mic-vocal"
            placeholder="Select a Vocalist"
            filterPlaceholder="Search Vocalists"
          />
        </div>
        <div className="flex">
          <Button>Submit</Button>
          <KFPopover />
        </div>
      </div>
    </div>
  );
}
