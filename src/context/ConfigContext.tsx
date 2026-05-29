import { createContext, useContext, useState, type ReactNode } from 'react';
import { initialConfig, type GlobalConfig } from '../types';

interface ConfigContextType {
  config: GlobalConfig;
  updateConfig: (updater: (prev: GlobalConfig) => GlobalConfig) => void;
  setUrl: (url: string) => void;
  toggleFeature: (feature: string, enabled: boolean) => void;
  updateFeature: (feature: string, updates: Partial<GlobalConfig['features'][keyof GlobalConfig['features']]>) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<GlobalConfig>(initialConfig);

  const updateConfig = (updater: (prev: GlobalConfig) => GlobalConfig) => {
    setConfig(updater);
  };

  const setUrl = (url: string) => {
    setConfig((prev) => ({ ...prev, url }));
  };

  const toggleFeature = (feature: string, enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature as keyof GlobalConfig['features']]: { ...(prev.features[feature as keyof GlobalConfig['features']] as GlobalConfig['features'][keyof GlobalConfig['features']]), enabled },
      },
    }));
  };

  const updateFeature = (feature: string, updates: Partial<GlobalConfig['features'][keyof GlobalConfig['features']]>) => {
    setConfig((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature as keyof GlobalConfig['features']]: { ...(prev.features[feature as keyof GlobalConfig['features']] as GlobalConfig['features'][keyof GlobalConfig['features']]), ...updates },
      },
    }));
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, setUrl, toggleFeature, updateFeature }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
