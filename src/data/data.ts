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

export { rythmoi, keys, dromoi };
