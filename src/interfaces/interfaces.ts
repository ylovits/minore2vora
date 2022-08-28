export type AllKeys =
  | "C"
  | "G"
  | "D"
  | "A"
  | "E"
  | "B"
  | "F#"
  | "C#"
  | "G#"
  | "D#"
  | "A#"
  | "F"
  | "Bb"
  | "Eb"
  | "Ab"
  | "Db"
  | "Gb";

export type AllScales =
  | "A"
  | "Am"
  | "A#"
  | "Ab"
  | "A#m"
  | "Abm"
  | "B"
  | "Bm"
  | "C"
  | "Cm"
  | "C#"
  | "Cb"
  | "C#m"
  | "Cbm"
  | "D"
  | "Dm"
  | "D#"
  | "Db"
  | "D#m"
  | "Dbm"
  | "E"
  | "Em"
  | "F"
  | "Fm"
  | "F#"
  | "Fb"
  | "F#m"
  | "Fbm"
  | "G"
  | "Gm"
  | "G#"
  | "Gb"
  | "G#m"
  | "Gbm";

export type AllDromoi =
  | "Ματζορε"
  | "Ραστ"
  | "Σεγκιαχ"
  | "Χουζαμ"
  | "Χιτζαζ"
  | "Χιτζαζκιαρ"
  | "Πειραιωτικος"
  | "Μουσταερ"
  | "Μινορε"
  | "Αρμονικο Μινόρε"
  | "Φυσικό Μινόρε"
  | "Νικριζ(Ποιμενικό)"
  | "Νεβεσαρ(Νιαβεντ)"
  | "Ουσακ"
  | "Κιουρντι"
  | "Σαμπαχ";

export type AllRythms =
  | "Χασάπικος"
  | "Ζεϊμπέκικος (παλιός)"
  | "Απτάλικος"
  | "Ζεϊμπέκικος (νέος - πεταχτός)"
  | "Αράπικο Τσιφτετέλι - Bolero"
  | "Αργιλαμάς"
  | "Εξάρι"
  | "Εξάρι - Τσάμικος"
  | "Εφτάρι - Καλαματιανό"
  | "Εφτάρι - 2+3+2"
  | "Εφτάρι - Μαντηλάτος/Λάζικος"
  | "Καμιλιέρικος"
  | "Καρσιλαμάς"
  | "Μπαγιό(ν)"
  | "Μπάλος"
  | "Πεντάρι - 2+3"
  | "Πεντάρι - 3+2"
  | "Συγκαθιστός"
  | "Τσιφτετέλι"
  | "Χασαποσέρβικος";
export interface ISong {
  id: string;
  title: string;
  youtube: string;
  tempo: number;
  rhythm: AllRythms[];
  key: AllScales;
  dromos: AllDromoi[];
  body: string;
  presentable: boolean;
  notes: string;
}

export interface IKeyFilter {
  type: "key",
  value: AllKeys
}

export interface IRhythmFilter{
  type: "rhythm",
  value: AllRythms
}

export type IFilter = IRhythmFilter | IKeyFilter;