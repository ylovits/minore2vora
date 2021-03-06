export const characterMap = [
	{ find: "ΓΧ", replace: "GX" },
	{ find: "γχ", replace: "gx" },
	{ find: "ΤΘ", replace: "T8" },
	{ find: "τθ", replace: "t8" },
	{ find: "(θη|Θη)", replace: "8h" },
	{ find: "ΘΗ", replace: "8H" },
	{ find: "αυ", replace: "au" },
	{ find: "Αυ", replace: "Au" },
	{ find: "ΑΥ", replace: "AY" },
	{ find: "ευ", replace: "eu" },
	{ find: "εύ", replace: "eu" },
	{ find: "εϋ", replace: "ey" },
	{ find: "εΰ", replace: "ey" },
	{ find: "Ευ", replace: "Eu" },
	{ find: "Εύ", replace: "Eu" },
	{ find: "Εϋ", replace: "Ey" },
	{ find: "Εΰ", replace: "Ey" },
	{ find: "ΕΥ", replace: "EY" },
	{ find: "ου", replace: "ou" },
	{ find: "ού", replace: "ou" },
	{ find: "οϋ", replace: "oy" },
	{ find: "οΰ", replace: "oy" },
	{ find: "Ου", replace: "Ou" },
	{ find: "Ού", replace: "Ou" },
	{ find: "Οϋ", replace: "Oy" },
	{ find: "Οΰ", replace: "Oy" },
	{ find: "ΟΥ", replace: "OY" },
	{ find: "Α", replace: "A" },
	{ find: "α", replace: "a" },
	{ find: "ά", replace: "a" },
	{ find: "Ά", replace: "A" },
	{ find: "Β", replace: "B" },
	{ find: "β", replace: "b" },
	{ find: "Γ", replace: "G" },
	{ find: "γ", replace: "g" },
	{ find: "Δ", replace: "D" },
	{ find: "δ", replace: "d" },
	{ find: "Ε", replace: "E" },
	{ find: "ε", replace: "e" },
	{ find: "έ", replace: "e" },
	{ find: "Έ", replace: "E" },
	{ find: "Ζ", replace: "Z" },
	{ find: "ζ", replace: "z" },
	{ find: "Η", replace: "H" },
	{ find: "η", replace: "h" },
	{ find: "ή", replace: "h" },
	{ find: "Ή", replace: "H" },
	{ find: "Θ", replace: "TH" },
	{ find: "θ", replace: "th" },
	{ find: "Ι", replace: "I" },
	{ find: "Ϊ", replace: "I" },
	{ find: "ι", replace: "i" },
	{ find: "ί", replace: "i" },
	{ find: "ΐ", replace: "i" },
	{ find: "ϊ", replace: "i" },
	{ find: "Ί", replace: "I" },
	{ find: "Κ", replace: "K" },
	{ find: "κ", replace: "k" },
	{ find: "Λ", replace: "L" },
	{ find: "λ", replace: "l" },
	{ find: "Μ", replace: "M" },
	{ find: "μ", replace: "m" },
	{ find: "Ν", replace: "N" },
	{ find: "ν", replace: "n" },
	{ find: "Ξ", replace: "KS" },
	{ find: "ξ", replace: "ks" },
	{ find: "Ο", replace: "O" },
	{ find: "ο", replace: "o" },
	{ find: "Ό", replace: "O" },
	{ find: "ό", replace: "o" },
	{ find: "Π", replace: "P" },
	{ find: "π", replace: "p" },
	{ find: "Ρ", replace: "R" },
	{ find: "ρ", replace: "r" },
	{ find: "Σ", replace: "S" },
	{ find: "σ", replace: "s" },
	{ find: "Τ", replace: "T" },
	{ find: "τ", replace: "t" },
	{ find: "Υ", replace: "Y" },
	{ find: "Ύ", replace: "Y" },
	{ find: "Ϋ", replace: "Y" },
	{ find: "ΰ", replace: "y" },
	{ find: "ύ", replace: "y" },
	{ find: "ϋ", replace: "y" },
	{ find: "υ", replace: "y" },
	{ find: "Φ", replace: "F" },
	{ find: "φ", replace: "f" },
	{ find: "Χ", replace: "X" },
	{ find: "χ", replace: "x" },
	{ find: "Ψ", replace: "Ps" },
	{ find: "ψ", replace: "ps" },
	{ find: "Ω", replace: "w" },
	{ find: "ω", replace: "w" },
	{ find: "Ώ", replace: "w" },
	{ find: "ώ", replace: "w" },
	{ find: "ς", replace: "s" },
	{ find: ";", replace: "?" }
];

const accentMap = [
	{ find: "ώ", replace: "ω" },
	{ find: "έ", replace: "ε" },
	{ find: "ά", replace: "α" },
	{ find: "ί", replace: "ι" },
	{ find: "ό", replace: "ο" },
	{ find: "ή", replace: "η" }
];

const sameCharactersMap = [
	{ find: "Α", replace: "A" },
	{ find: "Β", replace: "B" },
	{ find: "Ε", replace: "E" },
	{ find: "α", replace: "a" },
	{ find: "β", replace: "b" },
	{ find: "ε", replace: "e" },
];

export const reduceToGreeklish = (text: string):string => {
	let regexString, regex;
	let returnString = text;
	if (typeof text === "string" && text.length > 0) {
		characterMap.forEach((replacementItem) => {
			regexString = replacementItem.find;
			regex = new RegExp(regexString, "g");
			returnString = returnString.replace(regex, replacementItem.replace);
		});
	}
	return returnString;
};


export const removeAccents = (text: string):string => {
	let regexString, regex;
	let returnString = text;
	if (typeof text === "string" && text.length > 0) {
		accentMap.forEach((replacementItem) => {
			regexString = replacementItem.find;
			regex = new RegExp(regexString, "g");
			returnString = returnString.replace(regex, replacementItem.replace);
		});
	}
	return returnString;
};

export const crossLangSafeguard = (text:string):string => {
	let regexString, regex;
	let returnString = text;
	if (typeof text === "string" && text.length > 0) {
		sameCharactersMap.forEach((replacementItem) => {
			regexString = replacementItem.find;
			regex = new RegExp(regexString, "g");
			returnString = returnString.replace(regex, replacementItem.replace);
		});
	}
	return returnString;
};


export const stringToSlug = (text:string):string => {
	let returnString = text;
	returnString = returnString.replace(/^\s+|\s+$/g, "").toLowerCase();
	returnString = removeAccents(returnString);
	returnString = crossLangSafeguard(returnString);
	returnString = reduceToGreeklish(returnString);
	returnString = returnString.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
	return returnString;
};
