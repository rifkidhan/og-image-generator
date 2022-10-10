export type FileType = 'png' | 'jpeg';
export type Background = 'white' | 'red' | 'blue' | 'green' | 'yellow';

export interface ParsedRequest {
	fileType: FileType;
	logoType: boolean | string;
	title: string;
	description: string;
	bg: Background | string;
	logoColor: string;
	titleColor: string;
	descriptionColor: string;
}

export interface DropdownOption {
	text: string;
	value: string;
}
