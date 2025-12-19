import { ConfigProvider, useConfig } from './context/ConfigContext';
import { Layout } from './components/Layout';
import { Card } from './components/ui/Card';
import { AudioOptions } from './features/audio/AudioOptions';
import { VideoOptions } from './features/video/VideoOptions';
import { PlaylistOptions } from './features/playlist/PlaylistOptions';
import { PostProcessingOptions } from './features/postProcess/PostProcessingOptions';
import { CommandPreview } from './features/command/CommandPreview';

function UrlInput() {
  const { config, setUrl } = useConfig();
  return (
    <Card className="border-primary/20 bg-surface">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-text-muted">Target URL</label>
        <input 
          type="text" 
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full bg-black/30 border border-border rounded-md p-3 text-white placeholder:text-text-muted/50 focus:border-primary focus:outline-none transition-colors"
          value={config.url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
    </Card>
  );
}

function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <VideoOptions />
      <AudioOptions />
      <PlaylistOptions />
      <PostProcessingOptions />
    </div>
  );
}

function App() {
  return (
    <ConfigProvider>
      <Layout>
        <UrlInput />
        <FeatureGrid />
        <CommandPreview />
      </Layout>
    </ConfigProvider>
  );
}

export default App;
