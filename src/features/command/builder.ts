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

	// 4. Download Sections
	if (config.features.sections.enabled) {
		const sections = config.features.sections.sections;
		const textInput = config.features.sections.textInput;

		if (sections.length > 0) {
			// UI mode: generate multiple --download-sections flags
			sections.forEach((section) => {
				parts.push(`--download-sections "*${section.start}"`);
			});
		} else if (textInput.trim()) {
			// // Text mode: parse lines and generate flags
			// const lines = textInput.trim().split('\n').filter((line) => line.trim());
			// lines.forEach((line) => {
			// 	const trimmed = line.trim();
			// 	// Validate strict format: HH:MM:SS-HH:MM:SS
			// 	if (/^\d{2}:\d{2}:\d{2}-\d{2}:\d{2}:\d{2}$/.test(trimmed)) {
			// 		parts.push(`--download-sections "*${trimmed}"`);
			// 	}
			// });

			// Text mode: parse lines and generate flags
			const lines = textInput
				.trim()
				.split("\n")
				.filter((line) => line.trim());
			// Modify the regex to capture only the time format at the beginning of the line
			lines.forEach((line) => {
				const trimmed = line.trim();
				// Validate format: HH:MM:SS-HH:MM:SS and allow comments or notes afterward
				const match = /^\d{2}:\d{2}:\d{2}-\d{2}:\d{2}:\d{2}/.exec(trimmed);

				if (match) {
					// Push the matched time range (first capturing group)
					parts.push(`--download-sections "*${match[0]}"`);
				}
			});
		}

		// Force keyframes for clean cuts
		parts.push('--force-keyframes-at-cuts');

		// Force output template to include section times
		parts.push('-o "[%(id)s]_%(section_start)s-%(section_end)s.%(ext)s"');
	}

	// 4.5. Output Name
	if (config.features.outputName.enabled && config.features.outputName.name && !config.features.sections.enabled) {
		let ext = 'mkv';
		if (config.features.video.enabled) {
			ext = config.features.video.ext === 'auto' ? 'mkv' : config.features.video.ext;
		} else if (config.features.audio.enabled && config.features.audio.format !== 'best') {
			ext = config.features.audio.format;
		} else if (config.features.audio.enabled && config.features.audio.format === 'best') {
			ext = 'mp3';
		}
		
		parts.push(`-o "${config.features.outputName.name}.${ext}"`);
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

	// Final: URL(s)
	// Split by whitespace to support multiple URLs
	const urls = config.url.trim().split(/\s+/);
	urls.forEach((url) => {
		if (url) {
			parts.push(`"${url}"`);
		}
	});

	return parts.join(' ');
}
