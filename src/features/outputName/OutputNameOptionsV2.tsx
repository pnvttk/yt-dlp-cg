import { CardV2 } from '@/components/ui'

import { useConfig } from '@/context'

type Props = {
    enabled?: boolean
    name?: string
    sectionsEnabled?: boolean
    updateFeature?: (key: string, value: any) => void
    toggleFeature?: (key: string, value: any) => void
}

export function OutputNameOptionsV2(props: Props) {
    const { name = 'my-video', sectionsEnabled = false } = props

    const { updateFeature, config } = useConfig()
    const { video, audio } = config.features

    // Determine the extension to show to the user (same logic as V1)
    let extShow: string = 'mkv'
    if (!sectionsEnabled) {
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
                {sectionsEnabled && (
                    <div className="text-sm text-yellow-500 bg-yellow-500/10 p-2 rounded">
                        Output name disabled &mdash; Sections mode controls the
                        filename.
                    </div>
                )}

                <div>
                    <label className="block text-sm text-text-muted mb-1">
                        Filename Stem will be saved as{' '}
                        <code>
                            {name || 'name'}.{extShow}
                        </code>
                    </label>

                    <input
                        type="text"
                        placeholder="e.g. my-video"
                        className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
                        value={name}
                        onChange={(e) => {
                            e.stopPropagation()
                            updateFeature?.('outputName', {
                                name: e.target.value,
                            })
                        }}
                        disabled={sectionsEnabled}
                    />
                </div>
            </div>
        </CardV2>
    )
}
