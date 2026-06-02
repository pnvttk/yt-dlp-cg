import { useEffect } from 'react'

type Options = {
    command: string
    enabled?: boolean
    onCopied?: () => void
}

export function useCopyCommandShortcut(props: Options) {
    const { command, enabled = true, onCopied } = props

    useEffect(() => {
        if (!enabled) return

        const handleKeyDown = (e: KeyboardEvent) => {
            const isMac = navigator.platform.toLowerCase().includes('mac')

            const isShortcut =
                (isMac ? e.metaKey : e.ctrlKey) &&
                e.shiftKey &&
                e.key.toLowerCase() === 'c'

            if (!isShortcut) return
            if (!command) return

            const active = document.activeElement as HTMLElement
            const isTyping =
                active?.tagName === 'INPUT' || active?.tagName === 'TEXTAREA'

            if (isTyping) return

            e.preventDefault()

            navigator.clipboard.writeText(command)
            onCopied?.()
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [command, enabled, onCopied])
}
