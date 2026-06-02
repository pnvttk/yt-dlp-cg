import { CardV2 } from '@/components/ui'

import { useConfig } from '@/context'

import type { AudioConfig } from '@/types'

export function AudioOptionsV2() {
    const { config, updateFeature } = useConfig()
    const { format, quality } = config.features.audio

    return (
        <CardV2 title="Audio Extraction">
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-text-muted mb-1">
                            Format
                        </label>
                        <select
                            className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
                            value={format}
                            onChange={(e) => {
                                e.stopPropagation()
                                updateFeature?.('audio', {
                                    format: e.target
                                        .value as AudioConfig['format'],
                                })
                            }}
                        >
                            <option value="best">Best (Default)</option>
                            <option value="mp3">MP3</option>
                            <option value="m4a">M4A</option>
                            <option value="wav">WAV</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-text-muted mb-1">
                            Quality (0=Best, 10=Worst)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
                            value={quality}
                            onChange={(e) => {
                                e.stopPropagation()
                                updateFeature?.('audio', {
                                    quality: e.target
                                        .value as AudioConfig['quality'],
                                })
                            }}
                        />
                    </div>
                </div>
            </div>
        </CardV2>
    )
}
