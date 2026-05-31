import { Card } from "../../components/ui/Card";

interface Props {
    enabled?: boolean;
    format?: string;
    quality?: string | number;
    updateFeature?: (key: string, value: any) => void;
}

export function AudioOptionsV2({
    enabled,
    format,
    quality,
    updateFeature,
}: Props) {
    if (!enabled) {
        return (
            <Card
                className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer border-dashed"
                onClick={() => {}}
            >
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border border-text-muted" />
                    <span className="font-semibold text-text-muted">
                        Enable Audio
                    </span>
                </div>
            </Card>
        );
    }

    return (
        <Card title="Audio" className="border-primary/50 bg-primary/5">
            <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() =>
                            updateFeature?.("audio", { enabled: true })
                        }
                        className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm text-primary">Enabled</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-text-muted mb-1">
                            Format
                        </label>
                        <select
                            className="w-full bg-surface border border-border rounded-sm p-2 text-xs focus:border-primary focus:outline-none font-mono"
                            value={format}
                            onChange={(e) =>
                                updateFeature?.("audio", {
                                    format: e.target.value,
                                })
                            }
                        >
                            <option value="best">Best</option>
                            <option value="mp3">MP3</option>
                            <option value="m4a">M4A</option>
                            <option value="wav">WAV</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-text-muted mb-1">
                            Quality (0=Best)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            className="w-full bg-surface border border-border rounded-sm p-2 text-xs focus:border-primary focus:outline-none font-mono"
                            value={quality}
                            onChange={(e) =>
                                updateFeature?.("audio", {
                                    quality: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
}
