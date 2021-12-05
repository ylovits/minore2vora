import { AllKeys, AllScales } from "interfaces/interfaces";

const scaleToKeyMap: { find: AllScales; replace: AllKeys }[] = [
	{ find: "A", replace: "A" },
	{ find: "Am", replace: "A" },
	{ find: "A#", replace: "A#" },
	{ find: "Ab", replace: "Ab" },
	{ find: "A#m", replace: "A#" },
	{ find: "Abm", replace: "Ab" },
	{ find: "B", replace: "B" },
	{ find: "Bm", replace: "B" },
	{ find: "C", replace: "C" },
	{ find: "Cm", replace: "C" },
	{ find: "C#", replace: "C#" },
	{ find: "Cb", replace: "B" },
	{ find: "C#m", replace: "C#" },
	{ find: "Cbm", replace: "B" },
	{ find: "D", replace: "D" },
	{ find: "Dm", replace: "D" },
	{ find: "D#", replace: "D#" },
	{ find: "Db", replace: "Db" },
	{ find: "D#m", replace: "D#" },
	{ find: "Dbm", replace: "Db" },
	{ find: "E", replace: "E" },
	{ find: "Em", replace: "E" },
	{ find: "F", replace: "F" },
	{ find: "Fm", replace: "F" },
	{ find: "F#", replace: "F#" },
	{ find: "Fb", replace: "E" },
	{ find: "F#m", replace: "F#" },
	{ find: "Fbm", replace: "E" },
	{ find: "G", replace: "G" },
	{ find: "Gm", replace: "G" },
	{ find: "G#", replace: "G#" },
	{ find: "Gb", replace: "Gb" },
	{ find: "G#m", replace: "G#" },
	{ find: "Gbm", replace: "Gb" },
];

const keysArray = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const transposeChord = (
	chord: string,
	oldKey: string,
	newKey: string
): string => {
	const amount = (keysArray.indexOf(newKey) - keysArray.indexOf(oldKey));
	return chord.replace(/[CDEFGAB]#?/g,
		(match) => {
			const i = (keysArray.indexOf(match) + amount) % keysArray.length;
			return keysArray[ i < 0 ? i + keysArray.length : i ];
		});
};

export const scaleToKey = (text: AllScales): AllKeys => {
	let regexString, regex;
	let returnString = "";
	if (typeof text === "string" && text.length > 0) {
		scaleToKeyMap.forEach((replacementItem) => {
			regexString = replacementItem.find;
			regex = new RegExp(regexString, "g");
			returnString = returnString.replace(
				regex,
				replacementItem.replace
			) as AllKeys;
		});
	}
	return returnString as AllKeys;
};
