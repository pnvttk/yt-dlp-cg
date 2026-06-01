import { useConfig } from '../../context/ConfigContext'
import { Card } from '../../components/ui/Card'

export function OutputNameOptions() {
    const { config, toggleFeature, updateFeature } = useConfig()
    const { outputName, sections, video, audio } = config.features

    // Determine the extension to show to the user
    let ext = 'mkv'
    if (video.enabled) {
        ext = video.ext === 'auto' ? 'mkv' : video.ext
    } else if (audio.enabled && audio.format !== 'best') {
        ext = audio.format
    } else if (audio.enabled && audio.format === 'best') {
        ext = 'mp3' // Fallback guess for best audio
    }

    if (!outputName.enabled) {
        return (
            <Card
                className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer border-dashed"
                onClick={() => toggleFeature('outputName', true)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border border-text-muted" />
                    <span className="font-semibold text-text-muted">
                        Enable Output Name
                    </span>
                </div>
            </Card>
        )
    }

    return (
        <Card title="Output Name" className="border-primary/50 bg-primary/5">
            <div className="flex flex-col gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={outputName.enabled}
                        onChange={(e) =>
                            toggleFeature('outputName', e.target.checked)
                        }
                        className="accent-primary w-4 h-4"
                    />
                    <span className="text-primary font-medium">Enabled</span>
                </label>

                {sections.enabled && (
                    <div className="text-sm text-yellow-500 bg-yellow-500/10 p-2 rounded">
                        Output name disabled &mdash; Sections mode controls the
                        filename.
                    </div>
                )}

                <div>
                    <label className="block text-sm text-text-muted mb-1">
                        Filename Stem
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. my-video"
                        className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
                        value={outputName.name}
                        onChange={(e) =>
                            updateFeature('outputName', {
                                name: e.target.value,
                            })
                        }
                        disabled={sections.enabled}
                    />
                    <p className="text-xs text-text-muted/70 mt-1">
                        Will be saved as{' '}
                        <code>
                            {outputName.name || 'name'}.{ext}
                        </code>
                    </p>
                </div>
            </div>
        </Card>
    )
}
