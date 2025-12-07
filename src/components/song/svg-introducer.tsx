import { Fragment, useEffect, useState } from "react";
import ChordSheetJS, { Song } from "chordsheetjs";
// import ChordSVG from "components/song/ChordSVG";
import { AllKeys, ISong } from "interfaces/interfaces";
import { transposeChord, scaleToKey } from "utils/transpose";
import { crossLangSafeguard } from "utils/characterMap";
import useStore from "store/globalStore";

export enum Instruments { _ukulele = "ukulele",  _guitar = "guitar"}
export interface Instrument {
	strings: number;
	fretsOnChord: number;
	name: string;
	keys: string[];
	tunings: {
		standard: string[];
	};
}


export const checkForDoubles = (string?: string) => {
	return string?.includes("]x") ?? false;
};

const parser = new ChordSheetJS.ChordsOverWordsParser();
const serializer = new ChordSheetJS.ChordSheetSerializer();

export const songToParsed = (body: string) => { return parser.parse(body); };
export const parsedToSerialized = (song: Song) => { return serializer.serialize(song); };

interface IProps {
	song: ISong;
	selectedInstrument: Instruments;
	currentKey: AllKeys | undefined;
}

const SVGIntroducer = ({ song, selectedInstrument: _selectedInstrument, currentKey}: IProps) => {

	/* Import global state parts needed */
	const showChords = useStore((state) => { return state.showChords; });

	const [chordSheet, setChordSheet] = useState<Song>();
	const [serializedSong, setSerializedSong] = useState<any>();

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
			{serializedSong && serializedSong.lines.map((line: any, i: number) => {
				if (!!line.items.length) {
					return (
						<div key={`line-${i}`} className="flex flex-wrap songLine">
							{line.items.map((lineItem: any, y: number) => {
								const item = JSON.parse(JSON.stringify(lineItem));

								if (!item.chords) {
									if (!item.lyrics) {
										return null;
									}
									if (checkForDoubles(item.lyrics)) {
										const strArr = item.lyrics.split("]x");
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

								// Chord parsing logic removed - fingering notation handling
								if (dirtyName.length > 6 && /(?=.*\)\)$)(?=.*-\(\().*$/.test(dirtyName)) {
									name = dirtyName.substring(0, dirtyName.length - 6);
								}

								return (
									<span key={`line-${i}-group-${y}`} className="mt-2">
										<div className={`text-xs text-red-600 chord ${showChords ? "showChords" : ""}`}>
											{/* {(!!chordSchema && showChords) && <ChordSVG
												chord={chordSchema}
												instrument={instrument}
												lite={lite}
												title={name}
											/>} */}
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
				return <Fragment key={`line-${i}`}><br></br></Fragment>;
			})}
		</div>
	);
};

export default SVGIntroducer;
