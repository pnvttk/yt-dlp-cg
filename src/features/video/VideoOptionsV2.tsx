import { Card } from "../../components/ui/Card";

interface Props {
    enabled?: boolean;
    resolution?: string;
    ext?: string;
    updateFeature?: (key: string, value: any) => void;
}

export function VideoOptionsV2({
    enabled,
    resolution,
    ext,
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
                        Enable Video
                    </span>
                </div>
            </Card>
        );
    }

    return (
        <Card title="Video" className="border-secondary/50 bg-secondary/5">
            <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() =>
                            updateFeature?.("video", { enabled: true })
                        }
                        className="w-4 h-4 accent-secondary"
                    />
                    <span className="text-sm text-secondary">Enabled</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-text-muted mb-1">
                            Resolution
                        </label>
                        <select
                            className="w-full bg-surface border border-border rounded-sm p-2 text-xs focus:border-secondary focus:outline-none font-mono"
                            value={resolution}
                            onChange={(e) =>
                                updateFeature?.("video", {
                                    resolution: e.target.value,
                                })
                            }
                        >
                            <option value="best">Best Available</option>
                            <option value="4k">4K (2160p)</option>
                            <option value="1080p">1080p</option>
                            <option value="720p">720p</option>
                            <option value="480p">480p</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-text-muted mb-1">
                            Container
                        </label>
                        <select
                            className="w-full bg-surface border border-border rounded-sm p-2 text-xs focus:border-secondary focus:outline-none font-mono"
                            value={ext}
                            onChange={(e) =>
                                updateFeature?.("video", {
                                    ext: e.target.value,
                                })
                            }
                        >
                            <option value="auto">Auto</option>
                            <option value="mp4">MP4</option>
                            <option value="mkv">MKV</option>
                            <option value="webm">WebM</option>
                        </select>
                    </div>
                </div>
            </div>
        </Card>
    );
}
