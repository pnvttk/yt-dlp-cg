
import { useConfig } from '../../context/ConfigContext';
import { Card } from '../../components/ui/Card';

export function VideoOptions() {
  const { config, toggleFeature, updateFeature } = useConfig();
  const { video } = config.features;

  if (!video.enabled) {
      return (
        <Card className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer border-dashed"
                onClick={() => toggleFeature('video', true)}>
             <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-text-muted" />
                  <span className="font-semibold text-text-muted">Enable Video</span>
              </div>
        </Card>
      );
  }

  return (
    <Card title="Video Options" className="border-secondary/50 bg-secondary/5">
      <div className="flex flex-col gap-4">
         <label className="flex items-center gap-2 cursor-pointer">
           <input 
             type="checkbox" 
             checked={video.enabled}
             onChange={(e) => toggleFeature('video', e.target.checked)}
             className="accent-secondary w-4 h-4"
           />
           <span className="text-secondary font-medium">Enabled</span>
        </label>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm text-text-muted mb-1">Resolution Limit</label>
                <select 
                   className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-secondary focus:outline-none"
                   value={video.resolution}
                   onChange={(e) => updateFeature('video', { resolution: e.target.value as any })}
                >
                    <option value="best">Best Available (Default)</option>
                    <option value="4k">Up to 4K (2160p)</option>
                    <option value="1080p">Up to 1080p</option>
                    <option value="720p">Up to 720p</option>
                    <option value="480p">Up to 480p</option>
                </select>
            </div>
            <div>
                <label className="block text-sm text-text-muted mb-1">Container / Ext</label>
                <select 
                   className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-secondary focus:outline-none"
                   value={video.ext}
                   onChange={(e) => updateFeature('video', { ext: e.target.value as any })}
                >
                    <option value="auto">Auto (Default)</option>
                    <option value="mp4">MP4</option>
                    <option value="mkv">MKV</option>
                    <option value="webm">WebM</option>
                </select>
            </div>
        </div>
      </div>
    </Card>
  );
}
