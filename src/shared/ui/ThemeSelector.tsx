export function ThemeSelector() {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const theme = e.target.value

        if (theme === 'default') {
            document.documentElement.removeAttribute('data-theme')
        } else {
            document.documentElement.setAttribute('data-theme', theme)
        }

        localStorage.setItem('theme', theme)
    }

    return (
        <select
            onChange={handleChange}
            className="bg-surface border border-border rounded px-2 py-1 ml-auto"
            defaultValue={localStorage.getItem('theme') || 'tokyo'}
        >
            <option value="tokyo">Tokyo Night</option>
            <option value="slate">Slate Blue</option>
            <option value="sage">Sage</option>
            <option value="mono">Monochrome</option>
        </select>
    )
}
