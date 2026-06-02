import { CardV2 } from '@/shared/ui'

import { useConfig } from '@/entities/config'

import type { OutputNameConfig } from '@/entities/config'

export function OutputNameOptionsV2() {
    const { updateFeature, config } = useConfig()
    const { video, audio, sections, outputName } = config.features

    // Determine the extension to show to the user (same logic as V1)
    let extShow: string = 'mkv'
    if (!sections.enabled) {
        if (video.enabled) {
            extShow = video.ext === 'auto' ? 'mkv' : video.ext
        } else if (audio.enabled && audio.format !== 'best') {
            extShow = audio.format
        } else if (audio.enabled && audio.format === 'best') {
            extShow = 'mp3'
        }
    }

    return (
        <CardV2 title="Output Name">
            <div className="flex flex-col gap-4">
                {sections.enabled && (
                    <div className="text-sm text-yellow-500 bg-yellow-500/10 p-2 rounded">
                        Output name disabled &mdash; Sections mode controls the
                        filename.
                    </div>
                )}

                <div>
                    <label className="block text-sm text-text mb-1">
                        Filename Stem will be saved as{' '}
                        <code>
                            {outputName.name || 'name'}.{extShow}
                        </code>
                    </label>

                    <input
                        type="text"
                        placeholder="e.g. my-video"
                        className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
                        value={outputName.name}
                        onChange={(e) => {
                            e.stopPropagation()
                            updateFeature?.('outputName', {
                                name: e.target.value,
                            })
                        }}
                        disabled={sections.enabled}
                    />
                </div>
            </div>
        </CardV2>
    )
}
