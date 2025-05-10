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
    <div className="w-full h-full flex">
      {/* <h1>here is some initial information</h1> */}
      <Card className="w-3/5 h-5/6 bg-slate-100 border-black">
        <CardHeader>
          <CardTitle className="text-center">
            {props.resultDetails.songName}
          </CardTitle>
          <CardDescription className="text-center">
            {props.resultDetails.artist} | CCLI: 1234576
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <p>Recommended Key for {props.resultDetails.vocalistName} is:</p>
            {/* <div>
              <span className="bg-orange-500 text-2xl text-white p-8">B</span>
            </div> */}
            <div className="bg-orange-400 text-2xl font-bold text-white p-0 px-1 max-w-fit rounded-sm">
              {props.resultDetails.suggestion.suggestedKey}
            </div>
            <div>
              {/* Guitar Voicing: Key of
              {capoSuggestion.get(props.resultDetails.suggestedKey).chordFamily}
              Capo
              {capoSuggestion.get(props.resultDetails.suggestedKey).capoValue} */}
              {props.resultDetails.suggestion.suggestedKey !=
              "Song is Unsingable" ? (
                <div>
                  {props.resultDetails.suggestion.suggestedKey !== "G" &&
                  props.resultDetails.suggestion.suggestedKey !== "C"
                    ? `Guitar Voicing: Key of ${
                        capoSuggestion.get(
                          props.resultDetails.suggestion.suggestedKey
                        ).chordFamily
                      } - Capo ${
                        capoSuggestion.get(
                          props.resultDetails.suggestion.suggestedKey
                        ).capoValue
                      }`
                    : null}
                  <p>
                    {`Higher Keys Array: ${props.resultDetails.suggestion.higherKeys}`}
                  </p>
                  <p>
                    {`Lower Keys Array: ${props.resultDetails.suggestion.lowerKeys}`}
                  </p>
                </div>
              ) : null}
              <AltKeysCarousel allAltKeys={allAltKeys} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {/* <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
