import { Button, CardV2 } from '@/shared/ui'

import { SectionInputsV2, TextAreaInput } from './components'

import useSectionsOptionsV2 from './hooks/useSectionsOptionsV2'

import type { SectionsConfig } from '@/entities/config'

export function SectionsOptionsV2() {
    const {
        sections,
        ffmpegFileName,
        isFfmpegModalOpen,
        addSection,
        removeSection,
        updateSection,
        updateFeature,
        handleOpenFfmpeg,
        setFfmpegFileName,
        handleConfirmFfmpeg,
        setIsFfmpegModalOpen,
    } = useSectionsOptionsV2()

    return (
        <CardV2 title="Download Sections">
            <div className="flex flex-col gap-2">
                <p className="text-xs text-text-muted">
                    Download specific sections is slower than downloading the
                    whole video, use{' '}
                    <a
                        href="#"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleOpenFfmpeg(e)
                        }}
                        className="text-secondary hover:underline"
                    >
                        ffmpeg
                    </a>{' '}
                    to split full video.
                </p>

                <div className="flex-row flex">
                    <label className="flex items-center gap-2 cursor-pointer bg-surface px-2 rounded hover:bg-surface/80">
                        <input
                            type="radio"
                            name="sectionMode"
                            checked={sections.mode === 'text'}
                            onChange={(e) => {
                                e.stopPropagation()
                                updateFeature?.('sections', { mode: 'text' })
                            }}
                            className="accent-primary"
                        />
                        <span className="text-base">Text Input</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer bg-surface px-2 rounded hover:bg-surface/80">
                        <input
                            type="radio"
                            name="sectionMode"
                            checked={sections.mode === 'ui'}
                            onChange={() => {
                                updateFeature?.('sections', { mode: 'ui' })
                            }}
                            className="accent-primary"
                        />
                        <span className="text-base">UI Controls</span>
                    </label>
                </div>

                {sections.mode === 'ui' && (
                    <SectionInputsV2
                        sections={sections.sections}
                        onAdd={addSection}
                        onRemove={removeSection}
                        onUpdate={updateSection}
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
                    Format:
                    <code className="bg-surface p-0.5 rounded">
                        HH:MM:SS-HH:MM:SS
                    </code>
                    (e.g.,
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
                                }}
                                className="w-full bg-black/30 border border-border rounded p-2 text-sm text-text mb-6 focus:border-primary focus:outline-none"
                            />

                            <div className="flex justify-end gap-3">
                                <Button
                                    variant="outline"
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
        </CardV2>
    )
}
