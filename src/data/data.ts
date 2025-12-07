const dromoi = [
	{ value: "Ματζορε", label: "Ματζορε" },
	{ value: "Ραστ", label: "Ραστ" },
	{ value: "Σεγκιαχ", label: "Σεγκιαχ" },
	{ value: "Χουζαμ", label: "Χουζαμ" },
	{ value: "Χιτζαζ", label: "Χιτζαζ" },
	{ value: "Χιτζαζκιαρ", label: "Χιτζαζκιαρ" },
	{ value: "Πειραιωτικος", label: "Πειραιωτικος" },
	{ value: "Μουσταερ", label: "Μουσταερ" },
	{ value: "Μινορε", label: "Μινορε" },
	{ value: "Αρμονικο Μινόρε", label: "Αρμονικο Μινόρε" },
	{ value: "Φυσικό Μινόρε", label: "Φυσικό Μινόρε" },
	{ value: "Νικριζ(Ποιμενικό)", label: "Νικριζ(Ποιμενικό)" },
	{ value: "Νεβεσαρ(Νιαβεντ)", label: "Νεβεσαρ(Νιαβεντ)" },
	{ value: "Ουσακ", label: "Ουσακ" },
	{ value: "Κιουρντι", label: "Κιουρντι" },
	{ value: "Σαμπαχ", label: "Σαμπαχ" },
];

const scales = [
	{ value: "A", label: "A", key: "A", type: "major" },
	{ value: "Am", label: "Am", key: "A", type: "minor" },
	{ value: "A#", label: "A#", key: "A#", type: "major" },
	{ value: "A#m", label: "A#m", key: "A#", type: "minor" },
	{ value: "B", label: "B", key: "B", type: "major" },
	{ value: "Bm", label: "Bm", key: "B", type: "minor" },
	{ value: "C", label: "C", key: "C", type: "major" },
	{ value: "Cm", label: "Cm", key: "C", type: "minor" },
	{ value: "C#", label: "C#", key: "C#", type: "major" },
	{ value: "C#m", label: "C#m", key: "C#", type: "minor" },
	{ value: "D", label: "D", key: "D", type: "major" },
	{ value: "Dm", label: "Dm", key: "D", type: "minor" },
	{ value: "D#", label: "D#", key: "D#", type: "major" },
	{ value: "D#m", label: "D#m", key: "D#", type: "minor" },
	{ value: "E", label: "E", key: "E", type: "major" },
	{ value: "Em", label: "Em", key: "E", type: "minor" },
	{ value: "F", label: "F", key: "F", type: "major" },
	{ value: "Fm", label: "Fm", key: "F", type: "minor" },
	{ value: "F#", label: "F#", key: "F#", type: "major" },
	{ value: "F#m", label: "F#m", key: "F#", type: "minor" },
	{ value: "G", label: "G", key: "G", type: "major" },
	{ value: "Gm", label: "Gm", key: "G", type: "minor" },
	{ value: "G#", label: "G#", key: "G#", type: "major" },
	{ value: "G#m", label: "G#m", key: "G#", type: "minor" },
];

const keys = [
	{ value: "A", label: "A" },
	{ value: "A#", label: "A#" },
	{ value: "B", label: "B" },
	{ value: "C", label: "C" },
	{ value: "C#", label: "C#" },
	{ value: "D", label: "D" },
	{ value: "D#", label: "D#" },
	{ value: "E", label: "E" },
	{ value: "F", label: "F" },
	{ value: "F#", label: "F#" },
	{ value: "G", label: "G" },
	{ value: "G#", label: "G#" }
];

const rythmoi = [
	{ value: { name: "Χασάπικος", rhythm: "O-I-" }, label: "Χασάπικος" },
	{
		value: { name: "Ζεϊμπέκικος (παλιός)", rhythm: "Ο-ΙΙΟ-Ι-Ο-ΙΙΟ-Ι-Ι-" },
		label: "Ζεϊμπέκικος (παλιός)",
	},
	{
		value: { name: "Απτάλικος", rhythm: "O-I-I-O-IIO-I-O-II" },
		label: "Απτάλικος",
	},
	{
		value: {
			name: "Ζεϊμπέκικος (νέος - πεταχτός)",
			rhythm: "ΟΙ-ΙΟ-Ι-ΟΙ-ΙΟ-Ι-Ι-",
		},
		label: "Ζεϊμπέκικος (νέος - πεταχτός)",
	},
	{
		value: { name: "Αράπικο Τσιφτετέλι - Bolero", rhythm: "O--IO-I-" },
		label: "Αράπικο Τσιφτετέλι - Bolero",
	},
	{
		value: { name: "Αργιλαμάς", rhythm: "Ο Ι Ο Ι Ι Ο Ι Ο Ι" },
		label: "Αργιλαμάς",
	},
	{ value: { name: "Εξάρι", rhythm: "Ο--ΙΟΙ" }, label: "Εξάρι" },
	{
		value: { name: "Εξάρι - Τσάμικος", rhythm: "Ο--ΙΟ-Ι-Ο-Ι-" },
		label: "Εξάρι - Τσάμικος",
	},
	{
		value: { name: "Εφτάρι - Καλαματιανό", rhythm: "Ο Ι Ι Ο Ι Ο Ι" },
		label: "Εφτάρι - Καλαματιανό",
	},
	{
		value: { name: "Εφτάρι - 2+3+2", rhythm: "Ο Ι Ο Ι Ι Ο Ι" },
		label: "Εφτάρι - 2+3+2",
	},
	{
		value: { name: "Εφτάρι - Μαντηλάτος/Λάζικος", rhythm: "Ο Ι Ο Ι Ο Ι Ι" },
		label: "Εφτάρι - Μαντηλάτος/Λάζικος",
	},


	{
		value: { name: "Καμιλιέρικος", rhythm: "Ο-ΙΙ-Ο-ΙΙ-Ο-ΙΙ-Ο-Ι-Ι-" },
		label: "Καμιλιέρικος",
	},
	{
		value: { name: "Καρσιλαμάς", rhythm: "Ο Ι Ο Ι Ο Ι Ο Ι Ι" },
		label: "Καρσιλαμάς",
	},
	{ value: { name: "Μπαγιό(ν)", rhythm: "Ο-ΙΙΟ-Ι-" }, label: "Μπαγιό(ν)" },
	{ value: { name: "Μπάλος", rhythm: "O-IIO-I-" }, label: "Μπάλος" },
	{
		value: { name: "Πεντάρι - 2+3", rhythm: "Ο Ι Ο Ι Ι" },
		label: "Πεντάρι - 2+3",
	},
	{
		value: { name: "Πεντάρι - 3+2", rhythm: "Ο Ι Ι Ο Ι" },
		label: "Πεντάρι - 3+2",
	},
	{
		value: { name: "Συγκαθιστός", rhythm: "Ο-ΙΙΟ-ΙΙΙ" },
		label: "Συγκαθιστός",
	},
	{ value: { name: "Τσιφτετέλι", rhythm: "OI-IO-I-" }, label: "Τσιφτετέλι" },

	{
		value: { name: "Χασαποσέρβικος", rhythm: "O-I-" },
		label: "Χασαποσέρβικος",
	},
];

export { rythmoi, keys, scales, dromoi };
