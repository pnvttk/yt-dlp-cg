import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from 'react'

import { initialConfig, type GlobalConfig } from '@/types'
import { featureRegistry } from '@/shared/config/featureRegistry'

const STORAGE_KEY = 'yt-dlp-cg:output-name'

const getInitialState = (): GlobalConfig => {
    const savedFullName = localStorage.getItem(STORAGE_KEY)

    if (savedFullName !== null) {
        let name = savedFullName
        const lastDot = savedFullName.lastIndexOf('.')

        if (lastDot !== -1) {
            name = savedFullName.substring(0, lastDot)
        }

        return {
            ...initialConfig,
            features: {
                ...initialConfig.features,
                outputName: {
                    ...initialConfig.features.outputName,
                    name,
                },
            },
        }
    }

    return initialConfig
}

export type FeatureKey = keyof typeof featureRegistry

// compile-time enforcement
type _Check =
  keyof typeof featureRegistry extends keyof GlobalConfig["features"]
    ? true
    : never

export type ConfigContextType = {
    config: GlobalConfig
    updateConfig: (updater: (prev: GlobalConfig) => GlobalConfig) => void
    setUrl: (url: string) => void
    toggleFeature: (feature: FeatureKey, enabled: boolean) => void
    updateFeature: <K extends FeatureKey>(
        feature: K,
        updates: Partial<GlobalConfig['features'][K]>
    ) => void
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

export function ConfigProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState<GlobalConfig>(getInitialState)

    useEffect(() => {
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

        if (
            config.features.outputName.enabled &&
            config.features.outputName.name
        ) {
            const fullName = `${config.features.outputName.name}.${ext}`
            localStorage.setItem(STORAGE_KEY, fullName)
        } else {
            const currentName = localStorage.getItem(STORAGE_KEY)

            let stem = 'video'

            if (currentName) {
                const lastDot = currentName.lastIndexOf('.')
                stem =
                    lastDot !== -1
                        ? currentName.substring(0, lastDot)
                        : currentName
            }

            localStorage.setItem(STORAGE_KEY, `${stem}.${ext}`)
        }
    }, [
        config.features.outputName.name,
        config.features.video.enabled,
        config.features.video.ext,
        config.features.audio.enabled,
        config.features.audio.format,
    ])

    const updateConfig = (updater: (prev: GlobalConfig) => GlobalConfig) => {
        setConfig(updater)
    }

    const setUrl = (url: string) => {
        setConfig((prev) => ({ ...prev, url }))
    }

    const toggleFeature = (feature: FeatureKey, enabled: boolean) => {
        setConfig((prev) => ({
            ...prev,
            features: {
                ...prev.features,
                [feature]: {
                    ...prev.features[feature],
                    enabled,
                },
            },
        }))
    }

    const updateFeature = <K extends FeatureKey>(
        feature: K,
        updates: Partial<GlobalConfig['features'][K]>
    ) => {
        setConfig((prev) => ({
            ...prev,
            features: {
                ...prev.features,
                [feature]: {
                    ...prev.features[feature],
                    ...updates,
                },
            },
        }))
    }

    return (
        <ConfigContext.Provider
            value={{
                config,
                updateConfig,
                setUrl,
                toggleFeature,
                updateFeature,
            }}
        >
            {children}
        </ConfigContext.Provider>
    )
}

export function useConfig() {
    const context = useContext(ConfigContext)

    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider')
    }

    return context
}
