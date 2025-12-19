
import { useConfig } from '../../context/ConfigContext';
import { Card } from '../../components/ui/Card';

export function PostProcessingOptions() {
  const { config, updateFeature } = useConfig();
  const { postProcess } = config.features;

  return (
    <Card title="Post Processing & Metadata" className="border-orange-500/50 bg-orange-500/5">
      <div className="flex flex-col gap-4">
        
        <div className="grid grid-cols-2 gap-4">
             <label className="flex items-center gap-2 cursor-pointer bg-surface p-2 rounded hover:bg-surface/80">
               <input 
                 type="checkbox" 
                 checked={postProcess.embedThumbnail}
                 onChange={(e) => updateFeature('postProcess', { embedThumbnail: e.target.checked })}
                 className="accent-orange-500 w-4 h-4"
               />
               <span className="text-text font-medium text-sm">Embed Thumbnail</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer bg-surface p-2 rounded hover:bg-surface/80">
               <input 
                 type="checkbox" 
                 checked={postProcess.embedMetadata}
                 onChange={(e) => updateFeature('postProcess', { embedMetadata: e.target.checked })}
                 className="accent-orange-500 w-4 h-4"
               />
               <span className="text-text font-medium text-sm">Add Metadata</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer bg-surface p-2 rounded hover:bg-surface/80">
               <input 
                 type="checkbox" 
                 checked={postProcess.embedSubs}
                 onChange={(e) => updateFeature('postProcess', { embedSubs: e.target.checked })}
                 className="accent-orange-500 w-4 h-4"
               />
               <span className="text-text font-medium text-sm">Embed Subtitles</span>
            </label>
        </div>

        <div>
            <label className="block text-sm text-text-muted mb-1">Proxy URL (Optional)</label>
            <input 
                type="text" 
                placeholder="http://user:pass@host:port"
                className="w-full bg-surface border border-border rounded p-2 text-sm focus:border-orange-500 focus:outline-none font-mono"
                value={postProcess.proxy}
                onChange={(e) => updateFeature('postProcess', { proxy: e.target.value })}
            />
        </div>

      </div>
    </Card>
  );
}
