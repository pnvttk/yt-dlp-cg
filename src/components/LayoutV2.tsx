import { useState, useMemo } from 'react'

import { useConfig } from '@/context'
import { buildCommand } from '@/features/command/builder'
import { VideoOptionsV2 } from '@/features/video/VideoOptionsV2'
import { AudioOptionsV2 } from '@/features/audio/AudioOptionsV2'
import { PlaylistOptionsV2 } from '@/features/playlist/PlaylistOptionsV2'
import { OutputNameOptionsV2 } from '@/features/outputName/OutputNameOptionsV2'
import { SectionsOptionsV2 } from '@/features/sections/SectionsOptionsV2'
import { PostProcessingOptionsV2 } from '@/features/postProcess/PostProcessingOptionsV2'

import { Button, Operation } from './ui'

export function LayoutV2() {
    const { config, toggleFeature, updateFeature, setUrl } = useConfig()
    const { video, audio, playlist, outputName, sections, postProcess } =
        config.features

    const command = useMemo(() => buildCommand(config), [config])

    const [copied, setCopied] = useState(false)

    return (
        <div className="h-screen flex flex-col font-mono">
            {/* Header */}
            <header className="h-8 bg-surface border-b border-border flex items-center px-4 text-xs">
                <span>yt-dlp Command Generator V2</span>
            </header>

            {/* Main 3-section layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left sidebar - operations list */}
                <aside className="w-48 flex flex-col border-r border-border bg-surface">
                    <div className="p-3 text-xs font-semibold text-text-muted uppercase">
                        Operations
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {[
                            {
                                key: 'video',
                                label: 'Video',
                                enabled: video.enabled,
                            },
                            {
                                key: 'audio',
                                label: 'Audio',
                                enabled: audio.enabled,
                            },
                            {
                                key: 'sections',
                                label: 'Sections',
                                enabled: sections.enabled,
                            },
                            {
                                key: 'playlist',
                                label: 'Playlist',
                                enabled: playlist.enabled,
                            },
                            {
                                key: 'outputName',
                                label: 'Output Name',
                                enabled: outputName.enabled,
                            },
                            {
                                key: 'postProcess',
                                label: 'Post Process',
                                enabled: postProcess.enabled,
                            },
                        ].map(({ key, label, enabled }) => (
                            <Operation
                                key={key}
                                className={`cursor-pointer border ${enabled ? 'border-secondary/50' : 'border-dashed opacity-60 hover:opacity-100'}`}
                                onClick={() => toggleFeature(key, !enabled)}
                            >
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={enabled}
                                        onChange={(e) => {
                                            e.stopPropagation()
                                            updateFeature?.(key, {
                                                enabled: e.target.checked,
                                            })
                                        }}
                                        className="w-3 h-3 accent-primary"
                                    />
                                    <span
                                        className={`text-sm ${enabled ? 'text-text' : 'text-text-muted'}`}
                                    >
                                        {label}
                                    </span>
                                </div>
                            </Operation>
                        ))}
                    </div>
                </aside>

                {/* Center - enabled operation inputs */}
                <main className="flex-1 flex flex-col bg-surface overflow-hidden">
                    <div className="p-3 text-xs font-semibold text-text-muted uppercase">
                        <span>configuration</span>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {[
                            {
                                key: 'video',
                                props: {
                                    enabled: video.enabled,
                                    ext: video.ext,
                                },
                            },
                            {
                                key: 'audio',
                                props: {
                                    enabled: audio.enabled,
                                    format: audio.format,
                                    quality: Number(audio.quality) || 0,
                                },
                            },
                            {
                                key: 'playlist',
                                props: {
                                    enabled: playlist.enabled,
                                    startIndex: playlist.startIndex,
                                    endIndex: playlist.endIndex,
                                    items: playlist.items,
                                },
                            },
                            {
                                key: 'outputName',
                                props: {
                                    enabled: outputName.enabled,
                                    name: outputName.name,
                                    sectionsEnabled: sections.enabled,
                                },
                            },
                            {
                                key: 'sections',
                                props: {
                                    enabled: sections.enabled,
                                    sections: sections.sections,
                                    textInput: sections.textInput,
                                },
                            },
                            {
                                key: 'postProcess',
                                props: {
                                    enabled: postProcess.enabled,
                                    embedThumbnail: postProcess.embedThumbnail,
                                    embedMetadata: postProcess.embedMetadata,
                                    embedSubs: postProcess.embedSubs,
                                    subtitleLangs: postProcess.subtitleLangs,
                                    proxy: postProcess.proxy,
                                },
                            },
                        ].map(({ key, props }) => {
                            if (!props.enabled) return null

                            switch (key) {
                                case 'video':
                                    return (
                                        <VideoOptionsV2
                                            key={key}
                                            {...props}
                                            updateFeature={updateFeature}
                                        />
                                    )
                                case 'audio':
                                    return (
                                        <AudioOptionsV2
                                            key={key}
                                            {...props}
                                            updateFeature={updateFeature}
                                        />
                                    )
                                case 'playlist':
                                    return (
                                        <PlaylistOptionsV2
                                            key={key}
                                            {...props}
                                            updateFeature={updateFeature}
                                        />
                                    )
                                case 'outputName':
                                    return (
                                        <OutputNameOptionsV2
                                            key={key}
                                            {...props}
                                            updateFeature={updateFeature}
                                        />
                                    )
                                case 'sections':
                                    return (
                                        <SectionsOptionsV2
                                            key={key}
                                            {...props}
                                            updateFeature={updateFeature}
                                        />
                                    )
                                case 'postProcess':
                                    return (
                                        <PostProcessingOptionsV2
                                            key={key}
                                            {...props}
                                            updateFeature={updateFeature}
                                        />
                                    )
                                default:
                                    return null
                            }
                        })}
                    </div>
                </main>

                {/* Right side - URL input and output */}
                <aside className="w-96 flex flex-col border-l border-border bg-surface">
                    <div className="p-3 text-xs font-semibold text-text-muted uppercase border-b  border-border">
                        <span>Input & Output</span>
                    </div>

                    <div className="flex-1 flex flex-col p-4 gap-4">
                        {/* URL Input */}
                        <div>
                            <label className="block text-xs text-text-muted mb-1">
                                URL
                            </label>

                            <input
                                type="text"
                                placeholder="https://example.com/video"
                                className="w-full bg-surface border border-border rounded-sm p-2 text-xs focus:border-primary focus:outline-none font-mono"
                                value={config.url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>

                        {/* Output */}
                        <div className="flex-1 flex flex-col">
                            <label className="block text-xs text-text-muted mb-1">
                                Output Command
                            </label>

                            <div className="flex-1 bg-surface border border-border rounded-sm p-3 text-xs font-mono overflow-auto">
                                <span className="text-text">$ {command}</span>
                            </div>

                            <div className="mt-2">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => {
                                        navigator.clipboard.writeText(command)
                                        setCopied(true)
                                        setTimeout(() => setCopied(false), 2000)
                                    }}
                                >
                                    {copied ? 'Copied!' : 'Copy Command'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}
