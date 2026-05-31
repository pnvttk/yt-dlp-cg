import { useConfig } from "../context/ConfigContext";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { VideoOptionsV2 } from "../features/video/VideoOptionsV2";
import { AudioOptionsV2 } from "../features/audio/AudioOptionsV2";
import { PlaylistOptionsV2 } from "../features/playlist/PlaylistOptionsV2";
import { OutputNameOptionsV2 } from "../features/outputName/OutputNameOptionsV2";
import { SectionsOptionsV2 } from "../features/sections/SectionsOptionsV2";
import { PostProcessingOptionsV2 } from "../features/postProcess/PostProcessingOptionsV2";

export function LayoutV2() {
    const { config, toggleFeature } = useConfig();
    const { video, audio, playlist, outputName, sections, postProcess } =
        config.features;

    return (
        <div className="h-screen flex flex-col font-mono">
            {/* Header */}
            <header className="h-8 bg-surface border-b border-border flex items-center px-4 text-xs">
                <span>yt-dlp Command Generator V2</span>
            </header>

            {/* Main 3-section layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left sidebar - operations list */}
                <aside className="w-48 flex flex-col border-r border-border bg-surface">
                    <div className="p-3 text-xs font-semibold text-text-muted uppercase">
                        Operations
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {[
                            {
                                key: "video",
                                label: "Video",
                                enabled: video.enabled,
                            },
                            {
                                key: "audio",
                                label: "Audio",
                                enabled: audio.enabled,
                            },
                            {
                                key: "playlist",
                                label: "Playlist",
                                enabled: playlist.enabled,
                            },
                            {
                                key: "outputName",
                                label: "Output Name",
                                enabled: outputName.enabled,
                            },
                            {
                                key: "sections",
                                label: "Sections",
                                enabled: sections.enabled,
                            },
                            {
                                key: "postProcess",
                                label: "Post Process",
                                enabled: postProcess.enabled,
                            },
                        ].map(({ key, label, enabled }) => (
                            <Card
                                key={key}
                                className={`cursor-pointer border ${enabled ? "border-secondary/50" : "border-dashed opacity-60 hover:opacity-100"}`}
                                onClick={() => toggleFeature(key, !enabled)}
                            >
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={enabled}
                                        onChange={() => {}}
                                        className="w-3 h-3 accent-secondary"
                                    />
                                    <span
                                        className={`text-sm ${enabled ? "text-text" : "text-text-muted"}`}
                                    >
                                        {label}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </aside>

                {/* Center - enabled operation inputs */}
                <main className="flex-1 flex flex-col bg-surface overflow-hidden">
                    <div className="h-8 border-b border-border flex items-center px-3 text-xs text-text-muted">
                        <span>Configuration</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {[
                            {
                                key: "video",
                                props: {
                                    enabled: video.enabled,
                                    resolution: video.resolution,
                                    ext: video.ext,
                                },
                            },
                            {
                                key: "audio",
                                props: {
                                    enabled: audio.enabled,
                                    format: audio.format,
                                    quality: audio.quality,
                                },
                            },
                            {
                                key: "playlist",
                                props: {
                                    enabled: playlist.enabled,
                                    mode: playlist.items,
                                },
                            },
                            {
                                key: "outputName",
                                props: {
                                    enabled: outputName.enabled,
                                    pattern: outputName.name,
                                },
                            },
                            {
                                key: "sections",
                                props: {
                                    enabled: sections.enabled,
                                    sections: sections.textInput,
                                },
                            },
                            {
                                key: "postProcess",
                                props: {
                                    enabled: postProcess.enabled,
                                    ffmpeg: "",
                                },
                            },
                        ].map(({ key, props }) => {
                            const {
                                enabled,
                                resolution,
                                ext,
                                format,
                                quality,
                                mode,
                                pattern,
                                sections,
                                ffmpeg,
                            } = props;
                            switch (key) {
                                case "video":
                                    return (
                                        <VideoOptionsV2
                                            key={key}
                                            enabled={enabled}
                                            resolution={resolution}
                                            ext={ext}
                                        />
                                    );
                                case "audio":
                                    return (
                                        <AudioOptionsV2
                                            key={key}
                                            enabled={enabled}
                                            format={format}
                                            quality={quality}
                                        />
                                    );
                                case "playlist":
                                    return (
                                        <PlaylistOptionsV2
                                            key={key}
                                            enabled={enabled}
                                            mode={mode}
                                        />
                                    );
                                case "outputName":
                                    return (
                                        <OutputNameOptionsV2
                                            key={key}
                                            enabled={enabled}
                                            pattern={pattern}
                                        />
                                    );
                                case "sections":
                                    return (
                                        <SectionsOptionsV2
                                            key={key}
                                            enabled={enabled}
                                            sections={sections}
                                        />
                                    );
                                case "postProcess":
                                    return (
                                        <PostProcessingOptionsV2
                                            key={key}
                                            enabled={enabled}
                                            ffmpeg={ffmpeg}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </div>
                </main>

                {/* Right side - URL input and output */}
                <aside className="w-96 flex flex-col border-l border-border bg-surface">
                    <div className="h-8 border-b border-border flex items-center px-3 text-xs text-text-muted">
                        <span>Input & Output</span>
                    </div>
                    <div className="flex-1 flex flex-col p-4 gap-4">
                        {/* URL Input */}
                        <div>
                            <label className="block text-xs text-text-muted mb-1">
                                URL
                            </label>
                            <input
                                type="text"
                                placeholder="https://example.com/video"
                                className="w-full bg-surface border border-border rounded-sm p-2 text-xs focus:border-secondary focus:outline-none font-mono"
                            />
                        </div>
                        {/* Output */}
                        <div className="flex-1 flex flex-col">
                            <label className="block text-xs text-text-muted mb-1">
                                Output Command
                            </label>
                            <div className="flex-1 bg-surface border border-border rounded-sm p-3 text-xs font-mono overflow-auto">
                                <span className="text-text-muted">
                                    # Enable options above and click Generate
                                </span>
                            </div>
                            <div className="mt-2">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="w-full"
                                >
                                    Generate Command
                                </Button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
