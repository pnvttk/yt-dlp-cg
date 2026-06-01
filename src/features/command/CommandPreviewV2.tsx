import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export function CommandPreviewV2() {
    return (
        <Card className="border-secondary/50">
            <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={true}
                        onChange={() => {}}
                        className="w-4 h-4 accent-secondary"
                    />
                    <span className="text-sm text-secondary">Show Preview</span>
                </label>
                <div>
                    <label className="block text-xs text-text-muted mb-1">
                        Command Preview
                    </label>
                    <div className="bg-surface border border-border rounded-sm p-3 text-xs font-mono overflow-auto">
                        <pre className="whitespace-pre-wrap">
                            yt-dlp -f [v:best] --embed-thumbnail
                            --write-info-json -x -q:0 --playlist-items all -o
                            pattern_placeholder --write-info-json
                            url_placeholder
                        </pre>
                    </div>
                </div>
                <div>
                    <Button variant="primary" size="sm" className="w-full">
                        Copy Command
                    </Button>
                </div>
            </div>
        </Card>
    )
}
