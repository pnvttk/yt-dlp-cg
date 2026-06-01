import { Card } from "../../components/ui/Card";
import { useConfig } from "../../context/ConfigContext";

interface Props {
    enabled?: boolean;
    name?: string;
    sectionsEnabled?: boolean;
    updateFeature?: (key: string, value: any) => void;
    toggleFeature?: (key: string, value: any) => void;
}

export function OutputNameOptionsV2({ enabled, name = "my-video", sectionsEnabled = false }: Props) {
    const { updateFeature, toggleFeature, config } = useConfig();
    const { video, audio } = config.features;

    // Determine the extension to show to the user (same logic as V1)
    let extShow: string = "mkv";
    if (!sectionsEnabled) {
        if (video.enabled) {
            extShow = video.ext === "auto" ? "mkv" : video.ext;
        } else if (audio.enabled && audio.format !== "best") {
            extShow = audio.format;
        } else if (audio.enabled && audio.format === "best") {
            extShow = "mp3";
        }
    }

    if (!enabled) {
        return (
            <Card
                className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer border-dashed"
                onClick={() => toggleFeature?.("outputName", true)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border border-text-muted" />
                    <span className="font-semibold text-text-muted">
                        Enable Output Name
                    </span>
                </div>
            </Card>
        );
    }

    return (
        <Card title="Output Name" className="border-primary/50 bg-primary/5">
            <div className="flex flex-col gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => {
                            e.stopPropagation();
                            updateFeature?.("outputName", { enabled: e.target.checked });
                        }}
                        className="accent-primary w-4 h-4"
                    />
                    <span className="text-primary font-medium">Enabled</span>
                </label>

                {sectionsEnabled && (
                    <div className="text-sm text-yellow-500 bg-yellow-500/10 p-2 rounded">
                        Output name disabled &mdash; Sections mode controls the filename.
                    </div>
                )}

                <div>
                    <label className="block text-sm text-text-muted mb-1">Filename Stem</label>
                    <input
                        type="text"
                        placeholder="e.g. my-video"
                        className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
                        value={name}
                        onChange={(e) => {
                            e.stopPropagation();
                            updateFeature?.("outputName", { name: e.target.value });
                        }}
                        disabled={sectionsEnabled}
                    />
                    <p className="text-xs text-text-muted/70 mt-1">
                        Will be saved as <code>{name || "name"}.{extShow}</code>
                    </p>
                </div>
            </div>
        </Card>
    );
}
