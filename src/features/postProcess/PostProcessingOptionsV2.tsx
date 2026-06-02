import { CardV2 } from '@/components/ui'

import { useConfig } from '@/context'

export function PostProcessingOptionsV2() {
    const { config, updateFeature } = useConfig()
    const { embedThumbnail, embedMetadata, embedSubs, subtitleLangs, proxy } =
        config.features.postProcess

    return (
        <CardV2 title="Post Processing & Metadata">
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-2 cursor-pointer bg-surface px-2 rounded hover:bg-surface/80">
                        <input
                            type="checkbox"
                            checked={embedThumbnail}
                            onChange={(e) => {
                                e.stopPropagation()
                                updateFeature?.('postProcess', {
                                    embedThumbnail: e.target.checked,
                                })
                            }}
                            className="accent-primary"
                        />
                        <span className="text-text font-medium text-sm">
                            Embed Thumbnail
                        </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer bg-surface px-2 rounded hover:bg-surface/80">
                        <input
                            type="checkbox"
                            checked={embedMetadata}
                            onChange={(e) => {
                                e.stopPropagation()
                                updateFeature?.('postProcess', {
                                    embedMetadata: e.target.checked,
                                })
                            }}
                            className="accent-primary"
                        />
                        <span className="text-text font-medium text-sm">
                            Add Metadata
                        </span>
                    </label>

                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer bg-surface px-2 rounded hover:bg-surface/80">
                            <input
                                type="checkbox"
                                checked={embedSubs}
                                onChange={(e) => {
                                    e.stopPropagation()
                                    updateFeature?.('postProcess', {
                                        embedSubs: e.target.checked,
                                    })
                                }}
                                className="accent-primary"
                            />
                            <span className="text-text font-medium text-sm">
                                Embed Subtitles
                            </span>
                        </label>

                        {embedSubs && (
                            <input
                                type="text"
                                placeholder="Langs: all, en, ja..."
                                className="ml-6 w-[85%] bg-black/20 border border-border rounded p-1.5 text-xs text-white placeholder:text-text-muted/40 focus:border-primary focus:outline-none"
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
                        className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-primary focus:outline-none font-mono"
                        value={proxy}
                        onChange={(e) =>
                            updateFeature('postProcess', {
                                proxy: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
        </CardV2>
    )
}
