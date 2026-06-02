import { CardV2 } from '@/components/ui'

import { useConfig } from '@/context'

type Props = {
    enabled?: boolean
    ext?: string
    updateFeature?: (key: string, value: any) => void
    toggleFeature?: (key: string, value: any) => void
}

export function VideoOptionsV2(props: Props) {
    const { ext = 'auto' } = props

    const { updateFeature } = useConfig()

    return (
        <CardV2 title="Video Options">
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-text-muted mb-1">
                            Resolution Limit
                        </label>
                        <select
                            className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
                            value={ext}
                            onChange={(e) => {
                                e.stopPropagation()
                                updateFeature?.('video', {
                                    ext: e.target.value as any,
                                })
                            }}
                        >
                            <option value="best">
                                Best Available (Default)
                            </option>
                            <option value="4k">Up to 4K (2160p)</option>
                            <option value="1080p">Up to 1080p</option>
                            <option value="720p">Up to 720p</option>
                            <option value="480p">Up to 480p</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-text-muted mb-1">
                            Container / Ext
                        </label>
                        <select
                            className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
                            value={ext}
                            onChange={(e) => {
                                e.stopPropagation()
                                updateFeature?.('video', {
                                    ext: e.target.value as any,
                                })
                            }}
                        >
                            <option value="auto">Auto (Default)</option>
                            <option value="mp4">MP4</option>
                            <option value="mkv">MKV</option>
                            <option value="webm">WebM</option>
                        </select>
                    </div>
                </div>
            </div>
        </CardV2>
    )
}
