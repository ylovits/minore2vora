export interface ISong {
	id: string;
	title: string;
	youtube: string;
	tempo: number;
	rythm: string[]; // "" | "" | ""  sygkekrimena strings
	key: string[]; // "" | "" | ""  sygkekrimena strings
	dromos: string[]; // "" | "" | ""  sygkekrimena strings
	body: string;
	presentable: boolean;
	notes:string;
}