import { useConfig } from '../../context/ConfigContext';
import { Card } from '../../components/ui/Card';

export function RangeOptions() {
  const { config, toggleFeature, updateFeature } = useConfig();
  const { range } = config.features;

  if (!range.enabled) {
      return (
          <Card className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer border-dashed"
                onClick={() => toggleFeature('range', true)}>
              <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-text-muted" />
                  <span className="font-semibold text-text-muted">Trim / Time Range</span>
              </div>
          </Card>
      );
  }

  return (
    <Card title="Time Range (Trim)" className="border-cyan-500/50 bg-cyan-500/5">
      <div className="flex flex-col gap-4">
         <label className="flex items-center gap-2 cursor-pointer">
           <input 
             type="checkbox" 
             checked={range.enabled}
             onChange={(e) => toggleFeature('range', e.target.checked)}
             className="accent-cyan-500 w-4 h-4"
           />
           <span className="text-cyan-500 font-medium">Enabled</span>
        </label>

        <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm text-text-muted mb-1">Start Time</label>
                <input 
                   type="text" 
                   placeholder="00:00:00"
                   className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-cyan-500 focus:outline-none placeholder:text-text-muted/30"
                   value={range.start}
                   onChange={(e) => updateFeature('range', { start: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-sm text-text-muted mb-1">End Time</label>
                <input 
                   type="text" 
                   placeholder="00:01:30"
                   className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-cyan-500 focus:outline-none placeholder:text-text-muted/30"
                   value={range.end}
                   onChange={(e) => updateFeature('range', { end: e.target.value })}
                />
            </div>
            <p className="col-span-2 text-xs text-text-muted">
                Format: <code className="bg-surface p-0.5 rounded">MM:SS</code> or <code className="bg-surface p-0.5 rounded">HH:MM:SS</code>. Leave empty to select from start/to end.
            </p>
        </div>
      </div>
    </Card>
  );
}
