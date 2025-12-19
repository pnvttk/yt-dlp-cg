import { useMemo, useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { buildCommand } from '../command/builder';
import { Button } from '../../components/ui/Button';

export function CommandPreview() {
  const { config } = useConfig();
  const command = useMemo(() => buildCommand(config), [config]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 p-4 bg-surface/90 backdrop-blur border-t border-border z-40 transform transition-transform">
      <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-grow w-full font-mono bg-black/50 p-4 rounded border border-border overflow-x-auto whitespace-pre">
           <span className="text-primary">$</span> <span className="text-text">{command}</span>
        </div>
        <Button 
            variant="primary" 
            size="lg" 
            onClick={handleCopy}
            className="w-full md:w-auto min-w-[140px]"
        >
            {copied ? 'Copied!' : 'Copy Command'}
        </Button>
      </div>
    </div>
  );
}
