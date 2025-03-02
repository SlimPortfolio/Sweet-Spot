"use client";
import { KFComboBox } from "./KFComboBox";

export default function KeyFinderForm() {
  return (
    <div>
      <div className="pl-24 pt-10 pb-10 -mr-24">
        <h1 className="font-inriaSans text-5xl">
          <strong>Find Your Key</strong>
          {/* we can use a combo box for selecting song*/}
          {/* we can use a combo box for selecting vocalist*/}
          {/* we can use a submit button, and then an advanced search toggle button*/}
        </h1>
        <KFComboBox
          selections={[
            {
              value: "defyGravity",
              label: "Defy Gravity",
            },
            {
              value: "someSong",
              label: "Some Song",
            },
          ]}
          iconName="music"
          placeholder="Select a Song"
          filterPlaceholder="Search Songs"
        />
      </div>
    </div>
  );
}
