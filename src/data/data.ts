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

const keys = [
	{ value: "A", label: "A" },
	{ value: "Am", label: "Am" },
	{ value: "A#", label: "A#" },
	{ value: "A#m", label: "A#m" },
	{ value: "B", label: "B" },
	{ value: "Bm", label: "Bm" },
	{ value: "C", label: "C" },
	{ value: "Cm", label: "Cm" },
	{ value: "C#", label: "C#" },
	{ value: "C#m", label: "C#m" },
	{ value: "D", label: "D" },
	{ value: "Dm", label: "Dm" },
	{ value: "D#", label: "D#" },
	{ value: "D#m", label: "D#m" },
	{ value: "E", label: "E" },
	{ value: "Em", label: "Em" },
	{ value: "F", label: "F" },
	{ value: "Fm", label: "Fm" },
	{ value: "F#", label: "F#" },
	{ value: "F#m", label: "F#m" },
	{ value: "G", label: "G" },
	{ value: "Gm", label: "Gm" },
	{ value: "G#", label: "G#" },
	{ value: "G#m", label: "G#m" },
];

const rythmoi = [
	{ value: { name: "Χασάπικος", rythm: "O-I-" }, label: "Χασάπικος" },
	{
		value: { name: "Ζεϊμπέκικος (παλιός)", rythm: "Ο-ΙΙΟ-Ι-Ο-ΙΙΟ-Ι-Ι-" },
		label: "Ζεϊμπέκικος (παλιός)",
	},
	{
		value: { name: "Απτάλικος", rythm: "O-I-I-O-IIO-I-O-II" },
		label: "Απτάλικος",
	},
	{
		value: {
			name: "Ζεϊμπέκικος (νέος - πεταχτός)",
			rythm: "ΟΙ-ΙΟ-Ι-ΟΙ-ΙΟ-Ι-Ι-",
		},
		label: "Ζεϊμπέκικος (νέος - πεταχτός)",
	},
	{
		value: { name: "Αράπικο Τσιφτετέλι - Bolero", rythm: "O--IO-I-" },
		label: "Αράπικο Τσιφτετέλι - Bolero",
	},
	{
		value: { name: "Αργιλαμάς", rythm: "Ο Ι Ο Ι Ι Ο Ι Ο Ι" },
		label: "Αργιλαμάς",
	},
	{ value: { name: "Εξάρι", rythm: "Ο--ΙΟΙ" }, label: "Εξάρι" },
	{
		value: { name: "Εξάρι - Τσάμικος", rythm: "Ο--ΙΟ-Ι-Ο-Ι-" },
		label: "Εξάρι - Τσάμικος",
	},
	{
		value: { name: "Εφτάρι - Καλαματιανό", rythm: "Ο Ι Ι Ο Ι Ο Ι" },
		label: "Εφτάρι - Καλαματιανό",
	},
	{
		value: { name: "Εφτάρι - 2+3+2", rythm: "Ο Ι Ο Ι Ι Ο Ι" },
		label: "Εφτάρι - 2+3+2",
	},
	{
		value: { name: "Εφτάρι - Μαντηλάτος/Λάζικος", rythm: "Ο Ι Ο Ι Ο Ι Ι" },
		label: "Εφτάρι - Μαντηλάτος/Λάζικος",
	},


	{
		value: { name: "Καμιλιέρικος", rythm: "Ο-ΙΙ-Ο-ΙΙ-Ο-ΙΙ-Ο-Ι-Ι-" },
		label: "Καμιλιέρικος",
	},
	{
		value: { name: "Καρσιλαμάς", rythm: "Ο Ι Ο Ι Ο Ι Ο Ι Ι" },
		label: "Καρσιλαμάς",
	},
	{ value: { name: "Μπαγιό(ν)", rythm: "Ο-ΙΙΟ-Ι-" }, label: "Μπαγιό(ν)" },
	{ value: { name: "Μπάλος", rythm: "O-IIO-I-" }, label: "Μπάλος" },
	{
		value: { name: "Πεντάρι - 2+3", rythm: "Ο Ι Ο Ι Ι" },
		label: "Πεντάρι - 2+3",
	},
	{
		value: { name: "Πεντάρι - 3+2", rythm: "Ο Ι Ι Ο Ι" },
		label: "Πεντάρι - 3+2",
	},
	{
		value: { name: "Συγκαθιστός", rythm: "Ο-ΙΙΟ-ΙΙΙ" },
		label: "Συγκαθιστός",
	},
	{ value: { name: "Τσιφτετέλι", rythm: "OI-IO-I-" }, label: "Τσιφτετέλι" },

	{
		value: { name: "Χασαποσέρβικος", rythm: "O-I-" },
		label: "Χασαποσέρβικος",
	},
];

export { rythmoi, keys, dromoi };
