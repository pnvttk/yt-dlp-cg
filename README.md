# yt-dlp Command Generator V2

A React-based GUI for generating `yt-dlp` download commands.

## Project Structure (FSD)

This project follows [Feature-Sliced Design](https://feature-sliced.design/docs/get-started/overview).

```
src/
├── app/                    # App layer — global providers, entry point
│   ├── index.ts
│   ├── Layout.tsx
│   └── LayoutV2.tsx
│
├── entities/               # Business domain layer
│   └── config/             # Config slice — configuration data and builders
│       ├── ConfigContext.tsx     # React context for config state
│       ├── featureRegistry.ts    # Feature metadata
│       ├── types.ts              # All config type definitions
│       ├── buildOperations.ts    # Operation builder
│       ├── commandBuilder.ts     # Command generator
│       └── index.ts              # Public exports
│
├── features/               # Feature slices — business features
│   ├── audio/              # Audio feature
│   │   ├── AudioOptions.tsx
│   │   └── AudioOptionsV2.tsx
│   ├── command/            # Command preview feature
│   │   └── CommandPreview.tsx
│   ├── outputName/         # Output naming feature
│   │   └── OutputNameOptionsV2.tsx
│   ├── playlist/           # Playlist feature
│   │   ├── PlaylistOptions.tsx
│   │   └── PlaylistOptionsV2.tsx
│   ├── postProcess/        # Post-processing feature
│   │   └── PostProcessingOptionsV2.tsx
│   └── sections/           # Sections feature
│       ├── SectionsOptions.tsx
│       ├── SectionsOptionsV2.tsx
│       └── components/
│           ├── SectionInputs.tsx
│           └── SectionInputsV2.tsx
│
├── shared/                 # Shared layer — reusable, domain-independent code
│   └── ui/                 # UI segment — generic components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── CardV2.tsx
│
├── widgets/                # Widget layer — large UI chunks
│   ├── index.ts
│   └── Operation.tsx       # Toggleable operation item
│
├── types.ts                # Deprecated — moved to entities/config/types.ts
├── App.tsx                 # React root component
├── main.tsx                # Entry point
└── index.css               # Global styles
```

## Layers

### App Layer

Everything that makes the app run:

- `src/app/` — global providers, entry points, main layout
- Contains the `ConfigProvider` consumer (LayoutV2)
- Imports from layers below (Entities, Widgets, Shared)

### Widgets Layer

Large self-contained chunks of UI:

- `src/widgets/` — reusable UI blocks
- `Operation.tsx` — toggleable operation item in the sidebar
- Can import from Shared layer only

### Features Layer

Business features implemented as slices:

- `src/features/` — organized by feature domain
- Each feature has its own slice (e.g., `audio/`, `sections/`)
- Can import from Entities, Widgets, Shared
- **Cannot** import from other Features or App layer

### Entities Layer

Business domain types and data:

- `src/entities/` — config, data, domain logic
- `config/` — configuration types, initial state, builders
- Contains all type definitions (`GlobalConfig`, `AudioConfig`, etc.)
- Can import from Shared layer only
- **Cannot** import from App, Features, or Widgets layers

### Shared Layer

Reusable, domain-independent code:

- `src/shared/ui/` — generic UI components
- `Button`, `Card`, `CardV2` — truly generic components
- Can be imported by any layer
- **Cannot** import from other layers

## FSD Rules Enforced

1. **Layer dependency**: Each layer can only import from layers below it
    - App → Widgets → Features → Entities → Shared
2. **No same-layer imports**: Features cannot import from other features
3. **No upward imports**: Lower layers cannot import from higher layers
4. **Entities cannot depend on App**: Entities are pure data/domain

## Type Definitions

All business-related types are now in `src/entities/config/types.ts`:

```typescript
export type GlobalConfig = {
    url: string
    features: {
        audio: AudioConfig
        video: VideoConfig
        playlist: PlaylistConfig
        range: RangeConfig
        sections: SectionsConfig
        postProcess: PostProcessConfig
        outputName: OutputNameConfig
    }
}

export type AudioConfig = {
    enabled: boolean
    format: 'mp3' | 'm4a' | 'wav' | 'best'
    quality: string
}

// ... and more types
```
