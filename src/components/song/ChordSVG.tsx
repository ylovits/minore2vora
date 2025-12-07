import Chord from "@tombatossals/react-chords/lib/Chord";
export interface Instrument {
	strings: number;
	fretsOnChord: number;
	name: string;
	keys: string[];
	tunings: {
		standard: string[];
	};
}

interface IChord {
	frets: number[];
	fingers: number[];
	barres: number[];
	capo: boolean;
	baseFret: number;
}
interface IProps {
	chord: IChord;
	instrument: Instrument;
	lite: boolean;
	title: string;
}

const ChordSVG = ({ chord, instrument, lite, title }: IProps) => {

	return (
		<Chord chord={chord} instrument={instrument} lite={lite} title={title} />
	);
};
export default ChordSVG;