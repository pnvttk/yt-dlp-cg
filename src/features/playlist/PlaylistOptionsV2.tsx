import { CardV2 } from '@/shared/ui'

import { useConfig } from '@/entities/config'

import type { PlaylistConfig } from '@/types'

export function PlaylistOptionsV2() {
    const { config, updateFeature } = useConfig()
    const { startIndex, endIndex, items } = config.features.playlist

    const handleRangeChange = (type: 'start' | 'end', val: string) => {
        const num = parseInt(val)
        if (isNaN(num)) {
            if (type === 'end')
                updateFeature?.('playlist', {
                    endIndex: null,
                })

            return
        }

        updateFeature?.(
            'playlist',
            type === 'start' ? { startIndex: num } : { endIndex: num }
        )
    }

    return (
        <CardV2 title="Playlist & Batch">
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-text-muted mb-1">
                            Start Index
                        </label>
                        <input
                            type="number"
                            min="1"
                            className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
                            value={startIndex}
                            onChange={(e) => {
                                e.stopPropagation()
                                handleRangeChange('start', e.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-text-muted mb-1">
                            End Index (Optional)
                        </label>
                        <input
                            type="number"
                            min="1"
                            placeholder="Last"
                            className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
                            value={endIndex ?? ''}
                            onChange={(e) => {
                                e.stopPropagation()
                                handleRangeChange('end', e.target.value)
                            }}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm text-text-muted mb-1">
                            Specific Items (e.g., 1,2,5-10)
                        </label>
                        <input
                            type="text"
                            placeholder="1,2,3..."
                            className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
                            value={items}
                            onChange={(e) => {
                                e.stopPropagation()
                                updateFeature?.('playlist', {
                                    items: e.target.value,
                                })
                            }}
                        />
                        <p className="text-xs text-text-muted mt-1">
                            If set, overrides Start/End index.
                        </p>
                    </div>
                </div>
            </div>
        </CardV2>
    )
}
