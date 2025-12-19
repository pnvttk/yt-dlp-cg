
import { useConfig } from '../../context/ConfigContext';
import { Card } from '../../components/ui/Card';

export function PlaylistOptions() {
  const { config, toggleFeature, updateFeature } = useConfig();
  const { playlist } = config.features;
  
  const handleRangeChange = (type: 'start' | 'end', val: string) => {
      const num = parseInt(val);
      if (isNaN(num)) {
          if (type === 'end') updateFeature('playlist', { endIndex: null });
          return;
      }
      updateFeature('playlist', type === 'start' ? { startIndex: num } : { endIndex: num });
  };

  if (!playlist.enabled) {
      return (
          <Card className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer border-dashed"
                onClick={() => toggleFeature('playlist', true)}>
              <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-text-muted" />
                  <span className="font-semibold text-text-muted">Enable Playlist / Batch</span>
              </div>
          </Card>
      );
  }

  return (
    <Card title="Playlist & Batch" className="border-purple-500/50 bg-purple-500/5">
      <div className="flex flex-col gap-4">
         <label className="flex items-center gap-2 cursor-pointer">
           <input 
             type="checkbox" 
             checked={playlist.enabled}
             onChange={(e) => toggleFeature('playlist', e.target.checked)}
             className="accent-purple-500 w-4 h-4"
           />
           <span className="text-purple-500 font-medium">Enabled</span>
        </label>

        <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm text-text-muted mb-1">Start Index</label>
                <input 
                   type="number" 
                   min="1"
                   className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-purple-500 focus:outline-none"
                   value={playlist.startIndex}
                   onChange={(e) => handleRangeChange('start', e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm text-text-muted mb-1">End Index (Optional)</label>
                <input 
                   type="number" 
                   min="1"
                   placeholder="Last"
                   className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-purple-500 focus:outline-none"
                   value={playlist.endIndex || ''}
                   onChange={(e) => handleRangeChange('end', e.target.value)}
                />
            </div>
             <div className="col-span-2">
                <label className="block text-sm text-text-muted mb-1">Specific Items (e.g., 1,2,5-10)</label>
                <input 
                   type="text" 
                   placeholder="1,2,3..."
                   className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-purple-500 focus:outline-none"
                   value={playlist.items}
                   onChange={(e) => updateFeature('playlist', { items: e.target.value })}
                />
                <p className="text-xs text-text-muted mt-1">If set, overrides Start/End index.</p>
            </div>
        </div>
      </div>
    </Card>
  );
}
