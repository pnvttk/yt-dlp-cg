import { VideoOptionsV2 } from '@/features/video/VideoOptionsV2'
import { AudioOptionsV2 } from '@/features/audio/AudioOptionsV2'
import { PlaylistOptionsV2 } from '@/features/playlist/PlaylistOptionsV2'
import { OutputNameOptionsV2 } from '@/features/outputName/OutputNameOptionsV2'
import { SectionsOptionsV2 } from '@/features/sections/SectionsOptionsV2'
import { PostProcessingOptionsV2 } from '@/features/postProcess/PostProcessingOptionsV2'

import type { GlobalConfig } from '@/types'

type FeatureKey = keyof GlobalConfig['features']

type FeatureRegistryItem = {
    key: FeatureKey
    label: string
    Component: React.ComponentType
}

export const featureRegistry = {
    video: {
        key: 'video',
        label: 'Video',
        Component: VideoOptionsV2,
    },
    audio: {
        key: 'audio',
        label: 'Audio',
        Component: AudioOptionsV2,
    },
    sections: {
        key: 'sections',
        label: 'Sections',
        Component: SectionsOptionsV2,
    },
    playlist: {
        key: 'playlist',
        label: 'Playlist',
        Component: PlaylistOptionsV2,
    },
    outputName: {
        key: 'outputName',
        label: 'Output Name',
        Component: OutputNameOptionsV2,
    },
    postProcess: {
        key: 'postProcess',
        label: 'Post Process',
        Component: PostProcessingOptionsV2,
    },
    range: {
        key: 'range',
        label: 'Range',
        Component: SectionsOptionsV2,
    },
} satisfies Record<FeatureKey, FeatureRegistryItem>
