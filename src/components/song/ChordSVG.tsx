import React, { ReactElement, useEffect, useRef } from "react";
import { SVGuitarChord } from "svguitar";
const ChordSVG = (): ReactElement => {
	const test = useRef(null);
	useEffect(() => {
		if (test.current) {
			const chart = new SVGuitarChord("#testt");
			chart.chord({
				fingers: [
					[1, 2, "2"],
					[2, 3, "3"],
					[3, 3],
					[6, "x"]
				],
				barres: [
					{ fromString: 5, toString: 1, fret: 1, text: "1" },
				]
			})
				.draw();
		}
	}, [test]);
	
	return (
		<div id="testt" ref={test}></div>
	);
};

export default ChordSVG;
