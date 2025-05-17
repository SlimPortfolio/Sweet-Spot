import { capoSuggestion } from "@/utils/key-calculation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AltKeysCarousel } from "./altKeysCarousel";
import { Guitar, History } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
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

type resultDetailsProps = {
  resultDetails: suggestionDetails;
};
export default function KeyFinderResult(props: resultDetailsProps) {
  if (false) {
    alert(JSON.stringify(props.resultDetails));
  }

  const [previousSuggestions, setPreviousSuggestions] = useState<
    suggestionDetails[]
  >([]);
  useEffect(() => {
    setPreviousSuggestions([...previousSuggestions, props.resultDetails]);
  }, [props.resultDetails]);
  let lowerKeysWithDelta = props.resultDetails.suggestion.lowerKeys.map(
    (key, index) => {
      return {
        key: key,
        delta: -1 - index,
      };
    }
  );
  let higherKeysWithDelta = props.resultDetails.suggestion.higherKeys.map(
    (key, index) => {
      return {
        key: key,
        delta: 1 + index,
      };
    }
  );
  let allAltKeys = lowerKeysWithDelta
    .concat(higherKeysWithDelta)
    .concat([{ key: props.resultDetails.suggestion.suggestedKey, delta: 0 }])
    .sort((a, b) => a.delta - b.delta);
  return (
    // <div className="w-full h-full flex">
    <div className="flex">
      {/* <h1>here is some initial information</h1> */}
      {/* <Card className="w-3/5 h-5/6 bg-slate-50 shadow-md"> */}
      <Card className="bg-slate-50 shadow-md h-fit">
        <div className="flex flex-col justify-center align-center h-full">
          <CardHeader>
            <CardTitle className="text-center">
              {`${props.resultDetails.songName} `}
              <Dialog>
                <DialogTrigger className="bg-white outline outline-slate-400 p-1 rounded-full outline-[0.5px] hover:bg-slate-100 duration-500">
                  <History size={16} />
                </DialogTrigger>
                <DialogContent className="flex h-3/4 flex-col">
                  <DialogTitle>Previous Suggestions</DialogTitle>
                  <div className="overflow-auto flex-grow">
                    {previousSuggestions.map((object, key) => (
                      <div key={key}>
                        <Separator className="mt-2" />
                        <div className="mt-2">
                          <DialogDescription>
                            {`${object.songName} | ${object.artist} | Suggestion For
                            ${object.vocalistName}:`}
                          </DialogDescription>
                          <div className="mt-1 text-sm">
                            <p>
                              {`Key of `}
                              <span className="text-white bg-orange-400 pb-0.5 px-1 rounded-sm font-bold">
                                {object.suggestion.suggestedKey}
                              </span>
                            </p>
                            <p>
                              <span className="">
                                {`Otherwise known as `}
                                <span className="text-white bg-teal-400 pb-0.5 px-1 rounded-sm font-bold">
                                  {
                                    capoSuggestion.get(
                                      object.suggestion.suggestedKey
                                    ).chordFamily
                                  }
                                </span>
                                <span className="font-semibold">
                                  {` Capo `}
                                  {
                                    capoSuggestion.get(
                                      object.suggestion.suggestedKey
                                    ).capoValue
                                  }
                                </span>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <DialogClose className="font-bold rounded-md hover:bg-slate-50 py-1 px-2">
                      <div>Close</div>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
            <CardDescription className="text-center">
              {props.resultDetails.artist} | CCLI: 1234576TBD
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <Separator />
              <p className="text-xl mt-4">
                Recommended Key for{" "}
                <span className="font-semibold">
                  {props.resultDetails.vocalistName}
                </span>{" "}
                is:
              </p>
              <div className="bg-pink-500 text-4xl font-bold text-white mt-1 pt-1 pb-2 px-3 max-w-fit rounded-sm flex">
                <span>{props.resultDetails.suggestion.suggestedKey}</span>
              </div>
              <div className="flex w-full">
                {props.resultDetails.suggestion.suggestedKey !=
                "Song is Unsingable" ? (
                  <div className="flex flex-col w-full mt-8">
                    <Separator />
                    <div className="flex items-center w-full justify-around mt-4">
                      <div className="flex flex-col items-center flex-grow">
                        <p className="font-semibold text-md text-center">
                          Alternate Voicings
                        </p>
                        <p className="text-md">
                          {props.resultDetails.suggestion.suggestedKey !==
                            "G" &&
                          props.resultDetails.suggestion.suggestedKey !== "C"
                            ? `${
                                capoSuggestion.get(
                                  props.resultDetails.suggestion.suggestedKey
                                ).chordFamily
                              } Chords`
                            : `${props.resultDetails.suggestion.suggestedKey} Chords`}
                        </p>
                        <Guitar size={"40px"} color="#fabf1e" />
                        <p className="text-sm italic">
                          {props.resultDetails.suggestion.suggestedKey !==
                            "G" &&
                          props.resultDetails.suggestion.suggestedKey !== "C"
                            ? `Capo ${
                                capoSuggestion.get(
                                  props.resultDetails.suggestion.suggestedKey
                                ).capoValue
                              }`
                            : "No Capo"}
                        </p>
                      </div>
                      <AltKeysCarousel allAltKeys={allAltKeys} />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </div>
      </Card>
    </div>
  );
}
