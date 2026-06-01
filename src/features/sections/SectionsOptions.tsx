import { useState, useEffect } from 'react'
import { useConfig } from '../../context/ConfigContext'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export function SectionsOptions() {
    const { config, toggleFeature, updateFeature } = useConfig()
    const { sections } = config.features

    const [isFfmpegModalOpen, setIsFfmpegModalOpen] = useState(false)
    const [ffmpegFileName, setFfmpegFileName] = useState('')

    const handleOpenFfmpeg = (e: React.MouseEvent) => {
        e.preventDefault()

        let ext = 'mkv'
        if (config.features.video.enabled) {
            ext =
                config.features.video.ext === 'auto'
                    ? 'mkv'
                    : config.features.video.ext
        } else if (
            config.features.audio.enabled &&
            config.features.audio.format !== 'best'
        ) {
            ext = config.features.audio.format
        } else if (
            config.features.audio.enabled &&
            config.features.audio.format === 'best'
        ) {
            ext = 'mp3'
        }

        let currentName = localStorage.getItem('yt-dlp-cg:output-name')
        if (!currentName) {
            currentName = `video.${ext}`
        } else {
            // Keep the stem, but swap the extension to match current settings
            const lastDot = currentName.lastIndexOf('.')
            const stem =
                lastDot !== -1 ? currentName.substring(0, lastDot) : currentName
            currentName = `${stem}.${ext}`
        }

        setFfmpegFileName(currentName)
        localStorage.setItem('yt-dlp-cg:output-name', currentName)
        setIsFfmpegModalOpen(true)
    }

    const handleConfirmFfmpeg = () => {
        localStorage.setItem('yt-dlp-cg:output-name', ffmpegFileName)
        setIsFfmpegModalOpen(false)
        window.open('https://pnvttk.github.io/ffmpeg-cg/', '_blank')
    }

    useEffect(() => {
        if (isFfmpegModalOpen) {
            let ext = 'mkv'
            if (config.features.video.enabled) {
                ext =
                    config.features.video.ext === 'auto'
                        ? 'mkv'
                        : config.features.video.ext
            } else if (
                config.features.audio.enabled &&
                config.features.audio.format !== 'best'
            ) {
                ext = config.features.audio.format
            } else if (
                config.features.audio.enabled &&
                config.features.audio.format === 'best'
            ) {
                ext = 'mp3'
            }

            const lastDot = ffmpegFileName.lastIndexOf('.')
            const stem =
                lastDot !== -1
                    ? ffmpegFileName.substring(0, lastDot)
                    : ffmpegFileName || 'video'
            const newName = `${stem}.${ext}`

            if (newName !== ffmpegFileName) {
                setFfmpegFileName(newName)
                localStorage.setItem('yt-dlp-cg:output-name', newName)
            }
        }
    }, [
        config.features.video.enabled,
        config.features.video.ext,
        config.features.audio.enabled,
        config.features.audio.format,
        isFfmpegModalOpen,
    ])

    const handleToggleSection = (id: string) => {
        updateFeature('sections', {
            sections: sections.sections.filter((s) => s.id !== id),
        })
    }

    if (!sections.enabled) {
        return (
            <Card
                className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer border-dashed"
                onClick={() => toggleFeature('sections', true)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border border-text-muted" />
                    <span className="font-semibold text-text-muted">
                        Download Sections
                    </span>
                </div>
            </Card>
        )
    }

    return (
        <Card
            title="Download Sections"
            className="border-cyan-500/50 bg-cyan-500/5"
        >
            <div className="flex flex-col gap-4">
                <p className="text-xs text-text-muted">
                    Download specific sections is slower than downloading the
                    whole video, use{' '}
                    <a
                        href="#"
                        onClick={handleOpenFfmpeg}
                        className="text-cyan-500 hover:underline"
                    >
                        ffmpeg
                    </a>{' '}
                    to split the video after downloading is faster.
                </p>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={sections.enabled}
                        onChange={(e) =>
                            toggleFeature('sections', e.target.checked)
                        }
                        className="accent-cyan-500 w-4 h-4"
                    />
                    <span className="text-cyan-500 font-medium">Enabled</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="sectionMode"
                        checked={sections.mode === 'ui'}
                        onChange={() =>
                            updateFeature('sections', { mode: 'ui' })
                        }
                        className="accent-cyan-500"
                    />
                    <span className="text-cyan-500">
                        UI Controls (Recommended)
                    </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="sectionMode"
                        checked={sections.mode === 'text'}
                        onChange={() =>
                            updateFeature('sections', { mode: 'text' })
                        }
                        className="accent-cyan-500"
                    />
                    <span className="text-cyan-500">
                        Text Input (Power Users)
                    </span>
                </label>

                {sections.mode === 'ui' && (
                    <SectionInputs
                        sections={sections.sections}
                        onUpdate={updateFeature}
                        onToggleSection={handleToggleSection}
                    />
                )}

                {sections.mode === 'text' && (
                    <TextAreaInput
                        value={sections.textInput}
                        onChange={(val) =>
                            updateFeature('sections', { textInput: val })
                        }
                    />
                )}

                <p className="text-xs text-text-muted">
                    Format:{' '}
                    <code className="bg-surface p-0.5 rounded">
                        HH:MM:SS-HH:MM:SS
                    </code>
                    (e.g.,{' '}
                    <code className="bg-surface p-0.5 rounded">
                        01:50:00-01:50:55
                    </code>
                    )
                </p>

                {isFfmpegModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-surface border border-border rounded-lg shadow-xl p-6 w-full max-w-md">
                            <h3 className="text-lg font-bold text-text mb-2">
                                Open in ffmpeg-cg
                            </h3>
                            <p className="text-sm text-text-muted mb-4">
                                Confirm or edit the filename that will be passed
                                to ffmpeg-cg.
                            </p>
                            <input
                                type="text"
                                value={ffmpegFileName}
                                onChange={(e) => {
                                    setFfmpegFileName(e.target.value)
                                    localStorage.setItem(
                                        'yt-dlp-cg:output-name',
                                        e.target.value
                                    )
                                }}
                                className="w-full bg-black/30 border border-border rounded p-2 text-sm text-text focus:border-cyan-500 focus:outline-none mb-6"
                            />
                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="secondary"
                                    onClick={() => setIsFfmpegModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={handleConfirmFfmpeg}
                                >
                                    Open ffmpeg-cg
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}

// ==================== SectionInputs Component ====================
interface SectionInputsProps {
    sections: { id: string; start: string }[]
    onUpdate: (feature: string, value: any) => void
    onToggleSection: (id: string) => void
}

function SectionInputs({
    sections,
    onUpdate,
    onToggleSection,
}: SectionInputsProps) {
    const addSection = () => {
        onUpdate('sections' as string, {
            sections: [...sections, { id: crypto.randomUUID(), start: '' }],
        })
    }

    const removeSection = (id: string) => {
        onToggleSection(id)
    }

    const updateSection = (id: string, start: string) => {
        onUpdate('sections' as string, {
            sections: sections.map((s) => (s.id === id ? { ...s, start } : s)),
        })
    }

    return (
        <div className="flex flex-col gap-3">
            {sections.map((section, idx) => (
                <div
                    key={section.id}
                    className="flex items-center gap-3 p-3 bg-surface/50 rounded border border-border"
                >
                    <span className="text-xs text-text-muted w-6">
                        #{idx + 1}
                    </span>
                    <input
                        type="text"
                        placeholder="00:00:00-00:01:00"
                        value={section.start}
                        onChange={(e) =>
                            updateSection(section.id, e.target.value)
                        }
                        className="flex-grow bg-surface border border-border rounded p-2 text-sm focus:border-cyan-500 focus:outline-none"
                    />
                    <button
                        onClick={() => removeSection(section.id)}
                        className="text-red-400 hover:text-red-500 text-sm font-medium"
                        aria-label={`Remove section ${idx + 1}`}
                    >
                        ✕
                    </button>
                </div>
            ))}
            <Button variant="secondary" onClick={addSection} className="mt-2">
                + Add Section
            </Button>
        </div>
    )
}

// ==================== TextAreaInput Component ====================
interface TextAreaInputProps {
    value: string
    onChange: (val: string) => void
}

function TextAreaInput({ value, onChange }: TextAreaInputProps) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="01:50:00-01:50:55&#10;05:20:15-05:30:00"
            className="w-full h-40 bg-surface border border-border rounded p-2 text-sm font-mono focus:border-cyan-500 focus:outline-none"
            rows={6}
        />
    )
}
