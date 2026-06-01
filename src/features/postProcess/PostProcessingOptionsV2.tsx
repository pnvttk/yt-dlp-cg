import { Card } from '../../components/ui/Card'
import { useConfig } from '../../context/ConfigContext'

interface Props {
    enabled?: boolean
    embedThumbnail?: boolean
    embedMetadata?: boolean
    embedSubs?: boolean
    subtitleLangs?: string
    proxy?: string
    updateFeature?: (key: string, value: any) => void
    toggleFeature?: (key: string, value: any) => void
}

export function PostProcessingOptionsV2({
    enabled,
    embedThumbnail = false,
    embedMetadata = false,
    embedSubs = false,
    subtitleLangs = '',
    proxy = '',
}: Props) {
    const { updateFeature, toggleFeature } = useConfig()

    if (!enabled) {
        return (
            <Card
                className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer border-dashed"
                onClick={() => toggleFeature?.('postProcess', true)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border border-text-muted" />
                    <span className="font-semibold text-text-muted">
                        Enable Post Process
                    </span>
                </div>
            </Card>
        )
    }

    return (
        <Card
            title="Post Processing & Metadata"
            className="border-orange-500/50 bg-orange-500/5"
        >
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-2 cursor-pointer bg-surface p-2 rounded hover:bg-surface/80">
                        <input
                            type="checkbox"
                            checked={embedThumbnail}
                            onChange={(e) => {
                                e.stopPropagation()
                                updateFeature?.('postProcess', {
                                    embedThumbnail: e.target.checked,
                                })
                            }}
                            className="accent-orange-500 w-4 h-4"
                        />
                        <span className="text-text font-medium text-sm">
                            Embed Thumbnail
                        </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer bg-surface p-2 rounded hover:bg-surface/80">
                        <input
                            type="checkbox"
                            checked={embedMetadata}
                            onChange={(e) => {
                                e.stopPropagation()
                                updateFeature?.('postProcess', {
                                    embedMetadata: e.target.checked,
                                })
                            }}
                            className="accent-orange-500 w-4 h-4"
                        />
                        <span className="text-text font-medium text-sm">
                            Add Metadata
                        </span>
                    </label>

                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer bg-surface p-2 rounded hover:bg-surface/80">
                            <input
                                type="checkbox"
                                checked={embedSubs}
                                onChange={(e) => {
                                    e.stopPropagation()
                                    updateFeature?.('postProcess', {
                                        embedSubs: e.target.checked,
                                    })
                                }}
                                className="accent-orange-500 w-4 h-4"
                            />
                            <span className="text-text font-medium text-sm">
                                Embed Subtitles
                            </span>
                        </label>

                        {embedSubs && (
                            <input
                                type="text"
                                placeholder="Langs: all, en, ja..."
                                className="ml-6 w-[85%] bg-black/20 border border-border/50 rounded p-1.5 text-xs text-white placeholder:text-text-muted/40 focus:border-orange-500 focus:outline-none"
                                value={subtitleLangs}
                                onChange={(e) =>
                                    updateFeature('postProcess', {
                                        subtitleLangs: e.target.value,
                                    })
                                }
                                title="Subtitle languages (regex or comma-separated). Leave empty for default."
                            />
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-text-muted mb-1">
                        Proxy URL (Optional)
                    </label>
                    <input
                        type="text"
                        placeholder="http://user:pass@host:port"
                        className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-orange-500 focus:outline-none font-mono"
                        value={proxy}
                        onChange={(e) =>
                            updateFeature('postProcess', {
                                proxy: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
        </Card>
    )
}
