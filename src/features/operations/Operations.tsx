import type { JSX } from 'react'

import { VideoOptionsV2 } from '@/features/video/VideoOptionsV2'
import { AudioOptionsV2 } from '@/features/audio/AudioOptionsV2'
import { PlaylistOptionsV2 } from '@/features/playlist/PlaylistOptionsV2'
import { OutputNameOptionsV2 } from '@/features/outputName/OutputNameOptionsV2'
import { SectionsOptionsV2 } from '@/features/sections/SectionsOptionsV2'
import { PostProcessingOptionsV2 } from '@/features/postProcess/PostProcessingOptionsV2'

import type { GlobalConfig } from '@/types'

export type OperationDefinition = {
    key: keyof GlobalConfig['features']
    label: string
    enabled: boolean
    render: () => JSX.Element
}

export const buildOperations = (
    features: GlobalConfig['features']
): OperationDefinition[] => {
    const { video, audio, playlist, sections, outputName, postProcess } =
        features

    return [
        {
            key: 'video',
            label: 'Video',
            enabled: video.enabled,
            render: () => <VideoOptionsV2 />,
        },
        {
            key: 'audio',
            label: 'Audio',
            enabled: audio.enabled,
            render: () => <AudioOptionsV2 />,
        },
        {
            key: 'playlist',
            label: 'Playlist',
            enabled: playlist.enabled,
            render: () => <PlaylistOptionsV2 />,
        },
        {
            key: 'outputName',
            label: 'Output Name',
            enabled: outputName.enabled,
            render: () => <OutputNameOptionsV2 />,
        },
        {
            key: 'sections',
            label: 'Sections',
            enabled: sections.enabled,
            render: () => <SectionsOptionsV2 />,
        },
        {
            key: 'postProcess',
            label: 'Post Process',
            enabled: postProcess.enabled,
            render: () => <PostProcessingOptionsV2 />,
        },
    ]
}
