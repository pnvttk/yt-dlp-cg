type Props = {
    value: string
    onChange: (val: string) => void
}

export function TextAreaInput(props: Props) {
    const { value, onChange } = props

    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="01:50:00-01:50:55&#10;05:20:15-05:30:00"
            className="w-full bg-surface border border-border p-2 text-sm font-mono focus:border-primary focus:outline-none"
            rows={5}
        />
    )
}
