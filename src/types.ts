export interface GlobalConfig {
	url: string;
	features: {
		audio: AudioConfig;
		video: VideoConfig;
		playlist: PlaylistConfig;
		range: RangeConfig;
		sections: SectionsConfig;
		postProcess: PostProcessConfig;
	};
}

export interface AudioConfig {
	enabled: boolean;
	format: 'mp3' | 'm4a' | 'wav' | 'best';
	quality: string; // 0 (best) to 10 (worst) or specific bitrate
}

export interface VideoConfig {
	enabled: boolean;
	resolution: 'best' | '4k' | '1080p' | '720p' | '480p';
	ext: 'mp4' | 'mkv' | 'webm' | 'auto';
}

export interface PlaylistConfig {
	enabled: boolean;
	startIndex: number;
	endIndex: number | null;
	items: string; // "1,2,5,10"
}

export interface RangeConfig {
	enabled: boolean;
	start: string; // "00:00:00"
	end: string;   // "00:01:00"
}

export interface Section {
	id: string;
	start: string;        // "HH:MM:SS-HH:MM:SS"
}

export interface SectionsConfig {
	enabled: boolean;
	mode: 'ui' | 'text';  // 'ui' = dynamic form inputs, 'text' = text area
	sections: Section[];   // For UI mode
	textInput: string;     // For text mode (multi-line)
}

export interface PostProcessConfig {
	enabled: boolean;
	embedThumbnail: boolean;
	embedMetadata: boolean;
	embedSubs: boolean;
	subtitleLangs: string;
	proxy: string;
}

export const initialConfig: GlobalConfig = {
	url: '',
	features: {
		audio: { enabled: false, format: 'mp3', quality: '0' },
		video: { enabled: true, resolution: 'best', ext: 'auto' },
		playlist: { enabled: false, startIndex: 1, endIndex: null, items: '' },
		range: { enabled: false, start: '', end: '' },
		sections: { enabled: false, mode: 'text', sections: [], textInput: '' },
		postProcess: { enabled: true, embedThumbnail: false, embedMetadata: true, embedSubs: false, subtitleLangs: '', proxy: '' },
	},
};
