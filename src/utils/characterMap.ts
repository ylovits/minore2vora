export const characterMap = [
	{ find: "tha", replace: "θα" },
	{ find: "the", replace: "θε" },
	{ find: "thi", replace: "θι" },
	{ find: "thh", replace: "θη" },
	{ find: "tho", replace: "θο" },
	{ find: "(thy|thu)", replace: "θυ" },
	{ find: "(thw|thv)", replace: "θω" },
	{ find: "tH", replace: "τΗ" },
	{ find: "TH", replace: "ΤΗ" },
	{ find: "Th", replace: "Τη" },
	{ find: "th", replace: "τη" },
	{ find: "(cH|ch)", replace: "χ" },
	{ find: "(CH|Ch)", replace: "Χ" },
	{ find: "(PS|Ps)", replace: "Ψ" },
	{ find: "(ps|pS)", replace: "ψ" },
	{ find: "(Ks|KS)", replace: "Ξ" },
	{ find: "(ks|kS)", replace: "ξ" },
	{ find: "(VR)", replace: "ΒΡ" },
	{ find: "(vr|vR)", replace: "βρ" },
	{ find: "(Vr)", replace: "Βρ" },
	{ find: "8a", replace: "θα" },
	{ find: "8e", replace: "θε" },
	{ find: "8h", replace: "θη" },
	{ find: "8i", replace: "θι" },
	{ find: "8o", replace: "θο" },
	{ find: "8y", replace: "θυ" },
	{ find: "8u", replace: "θυ" },
	{ find: "(8v|8w)", replace: "θω" },
	{ find: "8A", replace: "ΘΑ" },
	{ find: "8E", replace: "ΘΕ" },
	{ find: "8H", replace: "ΘΗ" },
	{ find: "8I", replace: "ΘΙ" },
	{ find: "8O", replace: "ΘΟ" },
	{ find: "(8Y|8U)", replace: "ΘΥ" },
	{ find: "8V", replace: "ΘΩ" },
	{ find: "8W", replace: "ΘΩ" },
	{ find: "9a", replace: "θα" },
	{ find: "9e", replace: "θε" },
	{ find: "9h", replace: "θη" },
	{ find: "9i", replace: "θι" },
	{ find: "9o", replace: "θο" },
	{ find: "9y", replace: "θυ" },
	{ find: "9u", replace: "θυ" },
	{ find: "(9v|9w)", replace: "θω" },
	{ find: "9A", replace: "ΘΑ" },
	{ find: "9E", replace: "ΘΕ" },
	{ find: "9H", replace: "ΘΗ" },
	{ find: "9I", replace: "ΘΙ" },
	{ find: "9O", replace: "ΘΟ" },
	{ find: "(9Y|9U)", replace: "ΘΥ" },
	{ find: "9V", replace: "ΘΩ" },
	{ find: "9W", replace: "ΘΩ" },
	{ find: "s[\\n]", replace: "ς\n" },
	{ find: "s[\\!]", replace: "ς!" },
	{ find: "s[\\.]", replace: "ς." },
	{ find: "s[\\ ]", replace: "ς " },
	{ find: "s[\\,]", replace: "ς," },
	{ find: "s[\\+]", replace: "ς+" },
	{ find: "s[\\-]", replace: "ς-" },
	{ find: "s[\\(]", replace: "ς(" },
	{ find: "s[\\)]", replace: "ς)" },
	{ find: "s[\\[]", replace: "ς[" },
	{ find: "s[\\]]", replace: "ς]" },
	{ find: "s[\\{]", replace: "ς{" },
	{ find: "s[\\}]", replace: "ς}" },
	{ find: "s[\\<]", replace: "ς<" },
	{ find: "s[\\>]", replace: "ς>" },
	{ find: "s[\\?]", replace: "ς;" },
	{ find: "s[\\/]", replace: "ς/" },
	{ find: "s[\\:]", replace: "ς:" },
	{ find: "s[\\;]", replace: "ς;" },
	{ find: "s[\\\"]", replace: "ς\"" },
	{ find: "s[\\']", replace: "ς'" },
	{ find: "s[\\f]", replace: "ς\f" },
	{ find: "s[\\r]", replace: "ς\r" },
	{ find: "s[\\t]", replace: "ς\t" },
	{ find: "s[\\v]", replace: "ς\v" },
	{ find: "rx", replace: "ρχ" },
	{ find: "sx", replace: "σχ" },
	{ find: "Sx", replace: "Σχ" },
	{ find: "SX", replace: "ΣΧ" },
	{ find: "ux", replace: "υχ" },
	{ find: "Ux", replace: "Υχ" },
	{ find: "UX", replace: "ΥΧ" },
	{ find: "yx", replace: "υχ" },
	{ find: "Yx", replace: "Υχ" },
	{ find: "YX", replace: "ΥΧ" },
	{ find: "3a", replace: "ξα" },
	{ find: "3e", replace: "ξε" },
	{ find: "3h", replace: "ξη" },
	{ find: "3i", replace: "ξι" },
	{ find: "3ο", replace: "ξο" },
	{ find: "3u", replace: "ξυ" },
	{ find: "3y", replace: "ξυ" },
	{ find: "3v", replace: "ξω" },
	{ find: "3w", replace: "ξω" },
	{ find: "a3", replace: "αξ" },
	{ find: "e3", replace: "εξ" },
	{ find: "h3", replace: "ηξ" },
	{ find: "i3", replace: "ιξ" },
	{ find: "ο3", replace: "οξ" },
	{ find: "u3", replace: "υξ" },
	{ find: "y3", replace: "υξ" },
	{ find: "v3", replace: "ωξ" },
	{ find: "w3", replace: "ωξ" },
	{ find: "3A", replace: "ξΑ" },
	{ find: "3E", replace: "ξΕ" },
	{ find: "3H", replace: "ξΗ" },
	{ find: "3I", replace: "ξΙ" },
	{ find: "3O", replace: "ξΟ" },
	{ find: "3U", replace: "ξΥ" },
	{ find: "3Y", replace: "ξΥ" },
	{ find: "3V", replace: "ξΩ" },
	{ find: "3W", replace: "ξΩ" },
	{ find: "A3", replace: "Αξ" },
	{ find: "E3", replace: "Εξ" },
	{ find: "H3", replace: "Ηξ" },
	{ find: "I3", replace: "Ιξ" },
	{ find: "O3", replace: "Οξ" },
	{ find: "U3", replace: "Υξ" },
	{ find: "Y3", replace: "Υξ" },
	{ find: "V3", replace: "Ωξ" },
	{ find: "W3", replace: "Ωξ" },
	{ find: "A", replace: "Α" },
	{ find: "a", replace: "α" },
	{ find: "B", replace: "Β" },
	{ find: "b", replace: "β" },
	{ find: "V", replace: "Β" },
	{ find: "v", replace: "β" },
	{ find: "c", replace: "ψ" },
	{ find: "C", replace: "Ψ" },
	{ find: "G", replace: "Γ" },
	{ find: "g", replace: "γ" },
	{ find: "D", replace: "Δ" },
	{ find: "d", replace: "δ" },
	{ find: "E", replace: "Ε" },
	{ find: "e", replace: "ε" },
	{ find: "Z", replace: "Ζ" },
	{ find: "z", replace: "ζ" },
	{ find: "H", replace: "Η" },
	{ find: "h", replace: "η" },
	{ find: "U", replace: "Θ" },
	{ find: "u", replace: "υ" },
	{ find: "I", replace: "Ι" },
	{ find: "i", replace: "ι" },
	{ find: "j", replace: "ξ" },
	{ find: "J", replace: "Ξ" },
	{ find: "K", replace: "Κ" },
	{ find: "k", replace: "κ" },
	{ find: "L", replace: "Λ" },
	{ find: "l", replace: "λ" },
	{ find: "M", replace: "Μ" },
	{ find: "m", replace: "μ" },
	{ find: "N", replace: "Ν" },
	{ find: "n", replace: "ν" },
	{ find: "X", replace: "Χ" },
	{ find: "x", replace: "χ" },
	{ find: "O", replace: "Ο" },
	{ find: "o", replace: "ο" },
	{ find: "P", replace: "Π" },
	{ find: "p", replace: "π" },
	{ find: "R", replace: "Ρ" },
	{ find: "r", replace: "ρ" },
	{ find: "S", replace: "Σ" },
	{ find: "s", replace: "σ" },
	{ find: "T", replace: "Τ" },
	{ find: "t", replace: "τ" },
	{ find: "Y", replace: "Υ" },
	{ find: "y", replace: "υ" },
	{ find: "F", replace: "Φ" },
	{ find: "f", replace: "φ" },
	{ find: "W", replace: "Ω" },
	{ find: "w", replace: "ω" },
	{ find: "\\?", replace: ";" },
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

export const greeklishToGreek = (text: string):string => {
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