import { createContext, useContext, useState, type ReactNode } from 'react';
import { initialConfig, type GlobalConfig } from '../types';

interface ConfigContextType {
  config: GlobalConfig;
  updateConfig: (updater: (prev: GlobalConfig) => GlobalConfig) => void;
  setUrl: (url: string) => void;
  toggleFeature: (feature: keyof GlobalConfig['features'], enabled: boolean) => void;
  updateFeature: <K extends keyof GlobalConfig['features']>(
    feature: K,
    updates: Partial<GlobalConfig['features'][K]>
  ) => void;
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

  const toggleFeature = (feature: keyof GlobalConfig['features'], enabled: boolean) => {
    setConfig((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: { ...prev.features[feature], enabled },
      },
    }));
  };

  const updateFeature = <K extends keyof GlobalConfig['features']>(
    feature: K,
    updates: Partial<GlobalConfig['features'][K]>
  ) => {
    setConfig((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: { ...prev.features[feature], ...updates },
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
