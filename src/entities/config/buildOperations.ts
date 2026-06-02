import type { GlobalConfig } from './types'

import { featureRegistry } from './featureRegistry'

// helper: type-safe Object.entries
function typedEntries<T extends Record<string, any>>(
    obj: T
): [keyof T, T[keyof T]][] {
    return Object.entries(obj) as any
}

export function buildOperations(config: GlobalConfig['features']) {
    return typedEntries(featureRegistry).map(([key, registryItem]) => {
        const state = config[key]

        return {
            key,
            label: registryItem.label,
            enabled: state.enabled,
            Component: registryItem.Component,
        }
    })
}
