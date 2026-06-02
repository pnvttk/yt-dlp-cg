import { useEffect, useState } from 'react'

import { useConfig } from '@/context'

export default function useSectionsOptionsV2() {
    const { config, updateFeature } = useConfig()
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

   const addSection = () => {
        updateFeature('sections', {
            sections: [
                ...sections.sections,
                { id: crypto.randomUUID(), start: '' },
            ],
        })
    }

    const removeSection = (id: string) => {
        updateFeature('sections', {
            sections: sections.sections.filter((s) => s.id !== id),
        })
    }

    const updateSection = (id: string, start: string) => {
        updateFeature('sections', {
            sections: sections.sections.map((s) =>
                s.id === id ? { ...s, start } : s
            ),
        })
    }

    return {
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
    }
}
