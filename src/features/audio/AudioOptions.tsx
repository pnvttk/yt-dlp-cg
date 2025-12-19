
import { useConfig } from '../../context/ConfigContext';
import { Card } from '../../components/ui/Card';

export function AudioOptions() {
  const { config, toggleFeature, updateFeature } = useConfig();
  const { audio } = config.features;

  if (!audio.enabled) {
      return (
          <Card className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer border-dashed"
                onClick={() => toggleFeature('audio', true)}>
              <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-text-muted" />
                  <span className="font-semibold text-text-muted">Enable Audio Extraction</span>
              </div>
          </Card>
      );
  }

  return (
    <Card title="Audio Extraction" className="border-primary/50 bg-primary/5">
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
           <input 
             type="checkbox" 
             checked={audio.enabled}
             onChange={(e) => toggleFeature('audio', e.target.checked)}
             className="accent-primary w-4 h-4"
           />
           <span className="text-primary font-medium">Enabled</span>
        </label>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm text-text-muted mb-1">Format</label>
                <select 
                   className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
                   value={audio.format}
                   onChange={(e) => updateFeature('audio', { format: e.target.value as any })}
                >
                    <option value="best">Best (Default)</option>
                    <option value="mp3">MP3</option>
                    <option value="m4a">M4A</option>
                    <option value="wav">WAV</option>
                </select>
            </div>
            <div>
                <label className="block text-sm text-text-muted mb-1">Quality (0=Best, 10=Worst)</label>
                <input 
                   type="number" 
                   min="0" max="10"
                   className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-primary focus:outline-none"
                   value={audio.quality}
                   onChange={(e) => updateFeature('audio', { quality: e.target.value })}
                />
            </div>
        </div>
      </div>
    </Card>
  );
}
