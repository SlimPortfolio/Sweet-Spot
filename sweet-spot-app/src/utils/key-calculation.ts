export const allNotes = [
  "A0",
  "A#0",
  "B0",
  "C1",
  "C#1",
  "D1",
  "D#1",
  "E1",
  "F1",
  "F#1",
  "G1",
  "G#1",
  "A1",
  "A#1",
  "B1",
  "C2",
  "C#2",
  "D2",
  "D#2",
  "E2",
  "F2",
  "F#2",
  "G2",
  "G#2",
  "A2",
  "A#2",
  "B2",
  "C3",
  "C#3",
  "D3",
  "D#3",
  "E3",
  "F3",
  "F#3",
  "G3",
  "G#3",
  "A3",
  "A#3",
  "B3",
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
  "C5",
  "C#5",
  "D5",
  "D#5",
  "E5",
  "F5",
  "F#5",
  "G5",
  "G#5",
  "A5",
  "A#5",
  "B5",
  "C6",
  "C#6",
  "D6",
  "D#6",
  "E6",
  "F6",
  "F#6",
  "G6",
  "G#6",
  "A6",
  "A#6",
  "B6",
  "C7",
  "C#7",
  "D7",
  "D#7",
  "E7",
  "F7",
  "F#7",
  "G7",
  "G#7",
  "A7",
  "A#7",
  "B7",
  "C8",
  "C#8",
  "D8",
  "D#8",
  "E8",
  "F8",
  "F#8",
  "G8",
];

//Dictionary of Keys and Their Values
export let octaveDictionary = new Map();
octaveDictionary.set("C", 0);
octaveDictionary.set("C#", 1);
octaveDictionary.set("D", 2);
octaveDictionary.set("D#", 3);
octaveDictionary.set("E", 4);
octaveDictionary.set("F", 5);
octaveDictionary.set("F#", 6);
octaveDictionary.set("G", 7);
octaveDictionary.set("G#", 8);
octaveDictionary.set("A", 9);
octaveDictionary.set("A#", 10);
octaveDictionary.set("B", 11);

//Dictionary of values and their keys
export let valueToOctaveDictionary = new Map();
valueToOctaveDictionary.set(0, "C");
valueToOctaveDictionary.set(1, "C#");
valueToOctaveDictionary.set(2, "D");
valueToOctaveDictionary.set(3, "D#");
valueToOctaveDictionary.set(4, "E");
valueToOctaveDictionary.set(5, "F");
valueToOctaveDictionary.set(6, "F#");
valueToOctaveDictionary.set(7, "G");
valueToOctaveDictionary.set(8, "G#");
valueToOctaveDictionary.set(9, "A");
valueToOctaveDictionary.set(10, "A#");
valueToOctaveDictionary.set(11, "B");

//Dictionary for easy-chord options
export let guitarFriendlySuggestionUp = new Map();
guitarFriendlySuggestionUp.set("C#", "D");
guitarFriendlySuggestionUp.set("D#", "E");
guitarFriendlySuggestionUp.set("F", "E");
guitarFriendlySuggestionUp.set("F#", "G");
guitarFriendlySuggestionUp.set("G#", "A");
guitarFriendlySuggestionUp.set("A#", "B");

export let guitarFriendlySuggestionDown = new Map();
guitarFriendlySuggestionDown.set("C#", "C");
guitarFriendlySuggestionDown.set("D#", "D");
guitarFriendlySuggestionDown.set("F", "E");
//removing F# since this will be used when the key can only be shifted 1 down
// guitarFriendlySuggestionDown.set("F#", "G");
guitarFriendlySuggestionDown.set("G#", "G");
guitarFriendlySuggestionDown.set("A#", "A");
