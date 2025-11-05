"use client";

import { useEffect, useState } from "react";
import KeyFinderForm from "@/components/keyFinder/KeyFinderForm";
import KeyFinderResult from "@/components/keyFinder/KeyFinderResult";

export default function KeyFinder() {
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
