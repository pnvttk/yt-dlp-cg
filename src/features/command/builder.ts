import type { GlobalConfig } from '../../types';

export function buildCommand(config: GlobalConfig): string {
	if (!config.url) {
		return 'yt-dlp "<URL>"';
	}

	const parts: string[] = ['yt-dlp'];

	// 1. Audio Module (Only if Video is NOT enabled, to avoid conflict/-x overriding video)
	if (config.features.audio.enabled && !config.features.video.enabled) {
		parts.push('-x');
		if (config.features.audio.format !== 'best') {
			parts.push(`--audio-format ${config.features.audio.format}`);
		}
		if (config.features.audio.quality) {
			parts.push(`--audio-quality ${config.features.audio.quality}`);
		}
	}

	// 2. Video Module
	if (config.features.video.enabled) {
		if (config.features.video.resolution !== 'best') {
			if (config.features.video.resolution === '4k') {
				parts.push('-f "bestvideo[height<=2160]+bestaudio/best[height<=2160]"');
			} else if (config.features.video.resolution === '1080p') {
				parts.push('-f "bestvideo[height<=1080]+bestaudio/best[height<=1080]"');
			} else if (config.features.video.resolution === '720p') {
				parts.push('-f "bestvideo[height<=720]+bestaudio/best[height<=720]"');
			} else if (config.features.video.resolution === '480p') {
				parts.push('-f "bestvideo[height<=480]+bestaudio/best[height<=480]"');
			}
		}

		if (config.features.video.ext !== 'auto') {
			parts.push(`--merge-output-format ${config.features.video.ext}`);
		} else {
			// Explicitly request merge to MKV if auto, to ensure audio/subs are merged
			parts.push('--merge-output-format mkv');
		}
	}

	// 3. Playlist Module
	if (config.features.playlist.enabled) {
		if (config.features.playlist.items) {
			parts.push(`--playlist-items ${config.features.playlist.items}`);
		} else {
			if (config.features.playlist.startIndex > 1) {
				parts.push(`--playlist-start ${config.features.playlist.startIndex}`);
			}
			if (config.features.playlist.endIndex) {
				parts.push(`--playlist-end ${config.features.playlist.endIndex}`);
			}
		}
	} else {
		parts.push('--no-playlist');
	}

	// 4. Time Range / Trim
	if (config.features.range.enabled) {
		if (config.features.range.start || config.features.range.end) {
			// yt-dlp format: "*START-END"
			// If start is empty, it means from beginning: "*-END" (yt-dlp handles "*0-END")
			// If end is empty, it means to end: "*START-inf" (yt-dlp handles "*START-")

			const start = config.features.range.start || '';
			const end = config.features.range.end || '';
			parts.push(`--download-sections "*${start}-${end}"`);

			// Force downloader to use ffmpeg for precision if needed, but modern yt-dlp usually handles it.
			parts.push('--force-keyframes-at-cuts');
		}
	}

	// 5. Post Processing
	if (config.features.postProcess.enabled) {
		if (config.features.postProcess.embedThumbnail) parts.push('--embed-thumbnail');
		if (config.features.postProcess.embedMetadata) parts.push('--add-metadata');
		if (config.features.postProcess.embedSubs) {
			parts.push('--embed-subs');
			if (config.features.postProcess.subtitleLangs) {
				parts.push(`--sub-langs "${config.features.postProcess.subtitleLangs}"`);
			}
		}
		if (config.features.postProcess.proxy) parts.push(`--proxy "${config.features.postProcess.proxy}"`);
	}

	// Final: URL
	parts.push(`"${config.url}"`);

	return parts.join(' ');
}
