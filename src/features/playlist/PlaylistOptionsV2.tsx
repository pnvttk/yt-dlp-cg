import { Card } from "../../components/ui/Card";

interface Props {
    enabled?: boolean;
    mode?: string;
}

export function PlaylistOptionsV2({ enabled, mode }: Props) {
    if (!enabled) {
        return (
            <Card
                className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer border-dashed"
                onClick={() => {}}
            >
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border border-text-muted" />
                    <span className="font-semibold text-text-muted">
                        Enable Playlist
                    </span>
                </div>
            </Card>
        );
    }

    return (
        <Card title="Playlist" className="border-secondary/50 bg-secondary/5">
            <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => {}}
                        className="w-4 h-4 accent-secondary"
                    />
                    <span className="text-sm text-secondary">Enabled</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-text-muted mb-1">
                            Mode
                        </label>
                        <select
                            className="w-full bg-surface border border-border rounded-sm p-2 text-xs focus:border-secondary focus:outline-none font-mono"
                            value={mode}
                            onChange={() => {}}
                        >
                            <option value="all">All</option>
                            <option value="first10">First 10</option>
                        </select>
                    </div>
                </div>
            </div>
        </Card>
    );
}
