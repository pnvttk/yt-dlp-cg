export interface GlobalConfig {
	url: string;
	features: {
		audio: AudioConfig;
		video: VideoConfig;
		playlist: PlaylistConfig;
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

export interface PostProcessConfig {
	enabled: boolean;
	embedThumbnail: boolean;
	embedMetadata: boolean;
	embedSubs: boolean;
	proxy: string;
}

export const initialConfig: GlobalConfig = {
	url: '',
	features: {
		audio: { enabled: false, format: 'mp3', quality: '0' },
		video: { enabled: true, resolution: 'best', ext: 'auto' },
		playlist: { enabled: false, startIndex: 1, endIndex: null, items: '' },
		postProcess: { enabled: true, embedThumbnail: false, embedMetadata: true, embedSubs: false, proxy: '' },
	},
};
