import { Button } from '@/shared/ui'

import type { Section } from '@/entities/config'

type Props = {
    sections: Section[]
    onUpdate: (key: string, value: any) => void
    onToggleSection: (id: string) => void
}

export function SectionInputs(props: Props) {
    const { sections, onUpdate, onToggleSection } = props

    const addSection = () => {
        onUpdate('sections', {
            sections: [...sections, { id: crypto.randomUUID(), start: '' }],
        })
    }

    const removeSection = (id: string) => {
        onToggleSection(id)
    }

    const updateSection = (id: string, start: string) => {
        onUpdate('sections', {
            sections: [...sections].map((s) =>
                s.id === id ? { ...s, start } : s
            ),
        })
    }

    return (
        <div className="flex flex-col ">
            {sections.map((section, idx) => (
                <div
                    key={section.id}
                    className="flex items-center gap-3 p-3 bg-surface/50 border border-border"
                >
                    <span className="text-xs text-text w-6">
                        #{idx + 1}
                    </span>

                    <input
                        type="text"
                        placeholder="00:00:00-00:01:00"
                        value={section.start}
                        onChange={(e) =>
                            updateSection(section.id, e.target.value)
                        }
                        className="flex-grow bg-surface border border-border p-2 text-sm font-mono"
                    />

                    <Button
                        variant="ghost"
                        onClick={(e) => {
                            e.stopPropagation()
                            removeSection(section.id)
                        }}
                    >
                        ✕
                    </Button>
                </div>
            ))}

            <Button variant="outline" onClick={() => addSection()}>
                + Add Section
            </Button>
        </div>
    )
}
