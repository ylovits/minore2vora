import React, { useEffect, useState } from "react";
import ChordSheetJS, { Line, Song } from "chordsheetjs";
import ChordSVG from "components/song/ChordSVG";
import GuitarDB from "assets/chords-db/guitar.json";
import UkuleleDB from "assets/chords-db/ukulele.json";
import { AllKeys, ISong } from "interfaces/interfaces";
import { transposeChord, scaleToKey } from "utils/transpose";
import { crossLangSafeguard } from "utils/characterMap";
import useStore from "store/globalStore";

export enum Instruments { _ukulele = "ukulele",  _guitar = "guitar"}
export interface Instrument {
	strings: number;
	fretsOnChord: number;
	name: string;
	keys: any[];
	tunings: {
		standard: string[];
	};
}


export const checkForDoubles = (string: string) => {
	return string.includes("]x");
};

const parser = new ChordSheetJS.ChordSheetParser();
const serializer = new ChordSheetJS.ChordSheetSerializer();

export const songToParsed = (body: string) => { return parser.parse(body); };
export const parsedToSerialized = (song: Song) => { return serializer.serialize(song); };

interface IProps {
	song: ISong;
	selectedInstrument: Instruments;
	currentKey: AllKeys | undefined;
}

const SVGIntroducer = ({ song, selectedInstrument, currentKey}: IProps) => {

	/* Import global state parts needed */
	const [showChords] = useStore((state) => { return [	state.showChords ]; }) ;

	const [chordSheet, setChordSheet] = useState<Song>();
	const [serializedSong, setSerializedSong] = useState<{
		type: string;
		lines: Line[];
	}>();
	const [db, setDb] = useState<any>(GuitarDB);

	const [instrument, setInstrument] = useState<Instrument>({
		strings: 6,
		fretsOnChord: 4,
		name: "Guitar",
		keys: [],
		tunings: {
			standard: ["E", "A", "D", "G", "B", "E"],
		},
	});
	const lite = true;

	useEffect(() => {
		if (!!song && typeof song.body === "string") {
			const chordSheet = songToParsed(song.body);
			if (chordSheet) {
				setChordSheet(chordSheet);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [song]);

	useEffect(() => {
		if (!!chordSheet) {
			const serializedSong = parsedToSerialized(chordSheet);
			if (!!serializedSong) {
				setSerializedSong(serializedSong);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chordSheet]);

	useEffect(() => {
		if (selectedInstrument === "guitar") {
			setInstrument({
				strings: 6,
				fretsOnChord: 4,
				name: "Guitar",
				keys: [],
				tunings: {
					standard: ["E", "A", "D", "G", "B", "E"],
				},
			});
			setDb(GuitarDB);
		} else if (selectedInstrument === "ukulele") {
			setInstrument({
				strings: 4,
				fretsOnChord: 4,
				name: "Ukulele",
				keys: [],
				tunings: {
					standard: ["G", "C", "E", "A"],
				},
			});
			setDb(UkuleleDB);
		}
	}, [selectedInstrument]);

	const _specialParser = (string:string) =>  {
		return currentKey ?
			(string).replace(
				/\[\[(.*?)\]\]/g,
				(_match, text, _offset, _string) => {
					return `<strong>${transposeChord(
						crossLangSafeguard(text), scaleToKey(song.key), currentKey
					)}</strong>`;
				}
			).replace(
				/\{\{(.*?)\}\}/g,
				(_match, text, _offset, _string) => {
					return `<em>${transposeChord(
						crossLangSafeguard(text), scaleToKey(song.key), currentKey
					)}</em>`;
				}
			).replace(
				/\%\%(.*?)\%\%/g,
				(_match, text, _offset, _string) => {
					return `<span class=\"perasma\">${transposeChord(
						crossLangSafeguard(text), scaleToKey(song.key), currentKey
					)}</span>`;
				}
			) :
			(string).replace(
				/\[\[(.*?)\]\]/g,
				"<strong>$1</strong>"
			).replace(
				/\{\{(.*?)\}\}/g,
				"<em>$1</em>"
			).replace(
				/\%\%(.*?)\%\%/g,
				"<span class=\"perasma\">$1</span>"
			);
	};

	return (
		<div>
			{serializedSong && serializedSong.lines.map((line, i) => {
				if (!!line.items.length) {
					return (
						<div key={`line-${i}`} className="flex flex-wrap songLine">
							{line.items.map((lineItem, y) => {
								const item = JSON.parse(JSON.stringify(lineItem));

								if (!item.chords) {
									if (checkForDoubles(item.lyrics)) {
										const strArr = item.lyrics.split(']x');
										return (
											<div key={`line-${i}-group-${y}`} >
												{strArr[0]}<span className="accent">]x{strArr[1]}</span>
											</div>
										);
									}
									return (
										<span key={`line-${i}-group-${y}`} className="mt-8 text-sky-600"
											dangerouslySetInnerHTML={{__html: _specialParser(item.lyrics)}}
										/>
									);
								}
								const dirtyName = item.chords.trim();
								let name = item.chords.trim();
								if (!name) return null;

								const secondaryFingeringTest = /(?=.*\)\)$)(?=.*-\(\().*$/;
								let fingering = 0;
								if (secondaryFingeringTest.test(dirtyName) && dirtyName.length > 6) {
									name = dirtyName.substring(0, dirtyName.length - 6);
									fingering = dirtyName[dirtyName.length - 3];
								}
								let key = name.charAt(0);
								const checkForModifiers = name.charAt(1);
								let suf = name.substring(1);
								if (checkForModifiers === "#") {
									key += "sharp";
									suf = name.substring(2);
								} else if (checkForModifiers === "b") {
									key += "b";
									suf = name.substring(2);
								}

								suf = suf.replace(/ *\([^)]*\) */g, "");

								if (!!suf) {
									if (suf === "m") {
										suf = "minor";
									}
								} else {
									suf = "major";
								}


								const chord = db.chords[key as keyof typeof db.chords].find((suffix:any) => {
									return suffix.suffix === suf;
								});
								// console.log(chord, suf, key);

								let positions =  null;
								if (chord && chord.positions) {
									positions = chord.positions;
								}

								let chordSchema = null;
								if (!!positions && !!positions.length) {
									chordSchema = positions[fingering];
								}

								return (
									<span key={`line-${i}-group-${y}`} className="mt-2">
										<div className={`text-xs text-red-600 chord ${showChords ? "showChords" : ""}`}>
											{(!!chordSchema && showChords) && <ChordSVG
												chord={chordSchema}
												instrument={instrument}
												lite={lite}
												title={name}
											/>}
											{currentKey ? <strong>{transposeChord(
												crossLangSafeguard(name), scaleToKey(song.key), currentKey
											)}</strong> :
												<strong>{name}</strong>
											}
										</div>
										<div>{item.lyrics}</div>
									</span>
								);
							})}
						</div>
					);
				}
				return <React.Fragment key={`line-${i}`}><br></br></React.Fragment>;
			})}
		</div>
	);
};

export default SVGIntroducer;
