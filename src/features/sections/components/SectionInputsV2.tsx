import { Button } from '@/shared/ui'

import type { Section } from '@/entities/config'

type Props = {
    sections: Section[]
    onAdd: () => void
    onRemove: (id: string) => void
    onUpdate: (id: string, value: string) => void
}

export function SectionInputsV2(props: Props) {
    const { sections, onAdd, onRemove, onUpdate } = props

    return (
        <div className="flex flex-col ">
            {sections.map((section, idx) => (
                <div
                    key={section.id}
                    className="flex items-center gap-3 p-3 bg-surface/50 border border-border"
                >
                    <span className="text-xs text-text-muted w-6">
                        #{idx + 1}
                    </span>

                    <input
                        type="text"
                        placeholder="00:00:00-00:01:00"
                        value={section.start}
                        onChange={(e) => onUpdate(section.id, e.target.value)}
                        className="flex-grow bg-surface border border-border p-2 text-sm font-mono focus:border-primary focus:outline-none"
                    />

                    <Button
                        variant="ghost"
                        onClick={() => onRemove(section.id)}
                    >
                        ✕
                    </Button>
                </div>
            ))}

            <Button variant="outline" onClick={() => onAdd()}>
                + Add Section
            </Button>
        </div>
    )
}
