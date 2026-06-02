import { useState, useMemo } from 'react'

import { useConfig } from '@/entities/config'

import { buildOperations, buildCommand } from '@/entities/config'

import { Button } from '@/shared/ui'
import { Operation } from '@/widgets'
import { ThemeSelector } from '@/shared/ui/ThemeSelector'

export function LayoutV2() {
    const { config, toggleFeature, setUrl } = useConfig()
    const command = useMemo(() => buildCommand(config), [config])

    const [copied, setCopied] = useState(false)

    const operations = useMemo(
        () => buildOperations(config.features),
        [config.features]
    )

    return (
        <div className="h-screen flex flex-col font-mono">
            {/* Header */}
            <header className="h-8 bg-surface border-b border-border flex items-center pl-4 text-primary text-sm">
                <span>yt-dlp Command Generator V2</span>

                <ThemeSelector />
            </header>

            {/* Main 3-section layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left sidebar - operations list */}
                <aside className="w-48 flex flex-col border-r border-border bg-surface">
                    <div className="p-3 text-sm font-semibold text-primary uppercase">
                        Operations
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {operations.map(({ key, label, enabled }) => (
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
                                            toggleFeature(key, e.target.checked)
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
                    <div className="p-3 text-sm font-semibold text-primary uppercase">
                        <span>configuration</span>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {operations.map(({ key, enabled, Component }) =>
                            enabled ? (
                                <div key={key}>
                                    <Component />
                                </div>
                            ) : null
                        )}
                    </div>
                </main>

                {/* Right side - URL input and output */}
                <aside className="w-96 flex flex-col border-l border-border bg-surface">
                    <div className="p-3 text-sm font-semibold text-primary uppercase border-b  border-border">
                        <span>Input & Output</span>
                    </div>

                    <div className="flex-1 flex flex-col p-4 gap-4">
                        {/* URL Input */}
                        <div>
                            <label className="block text-sm text-primary mb-1">
                                URL
                            </label>

                            <input
                                type="text"
                                placeholder="https://example.com/video"
                                className="w-full bg-surface border border-border rounded-sm p-2 text-sm focus:border-primary focus:outline-none font-mono"
                                value={config.url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>

                        {/* Output */}
                        <div className="flex-1 flex flex-col">
                            <label className="block text-sm text-primary mb-1">
                                Output Command
                            </label>

                            <div className="flex-1 bg-surface border border-border rounded-sm p-3 text-sm font-mono overflow-auto">
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
