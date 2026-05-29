import { useConfig } from '../../context/ConfigContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function SectionsOptions() {
  const { config, toggleFeature, updateFeature } = useConfig();
  const { sections } = config.features;

  const handleToggleSection = (id: string) => {
    updateFeature('sections', {
      sections: sections.sections.filter(s => s.id !== id)
    });
  };

  if (!sections.enabled) {
      return (
          <Card className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer border-dashed"
                onClick={() => toggleFeature('sections', true)}>
              <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-text-muted" />
                  <span className="font-semibold text-text-muted">Download Sections</span>
              </div>
          </Card>
      );
  }

  return (
    <Card title="Download Sections" className="border-cyan-500/50 bg-cyan-500/5">
      <div className="flex flex-col gap-4">
         <label className="flex items-center gap-2 cursor-pointer">
           <input 
             type="checkbox" 
             checked={sections.enabled}
             onChange={(e) => toggleFeature('sections', e.target.checked)}
             className="accent-cyan-500 w-4 h-4"
           />
           <span className="text-cyan-500 font-medium">Enabled</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            name="sectionMode"
            checked={sections.mode === 'ui'}
            onChange={() => updateFeature('sections', { mode: 'ui' })}
            className="accent-cyan-500"
          />
          <span className="text-cyan-500">UI Controls (Recommended)</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            name="sectionMode"
            checked={sections.mode === 'text'}
            onChange={() => updateFeature('sections', { mode: 'text' })}
            className="accent-cyan-500"
          />
          <span className="text-cyan-500">Text Input (Power Users)</span>
        </label>

        {sections.mode === 'ui' && (
          <SectionInputs sections={sections.sections} 
                         onUpdate={updateFeature} 
                         onToggleSection={handleToggleSection}
          />
        )}

        {sections.mode === 'text' && (
          <TextAreaInput 
            value={sections.textInput}
            onChange={(val) => updateFeature('sections', { textInput: val })}
          />
        )}

        <p className="text-xs text-text-muted">
          Format: <code className="bg-surface p-0.5 rounded">HH:MM:SS-HH:MM:SS</code>
          (e.g., <code className="bg-surface p-0.5 rounded">01:50:00-01:50:55</code>)
        </p>
      </div>
    </Card>
  );
}

// ==================== SectionInputs Component ====================
interface SectionInputsProps {
  sections: { id: string; start: string }[];
  onUpdate: (feature: string, value: any) => void;
  onToggleSection: (id: string) => void;
}

function SectionInputs({ sections, onUpdate, onToggleSection }: SectionInputsProps) {
  const addSection = () => {
    onUpdate('sections' as string, { 
      sections: [...sections, { id: crypto.randomUUID(), start: '' }] 
    });
  };

  const removeSection = (id: string) => {
    onToggleSection(id);
  };

  const updateSection = (id: string, start: string) => {
    onUpdate('sections' as string, {
      sections: sections.map(s => 
        s.id === id ? { ...s, start } : s
      )
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {sections.map((section, idx) => (
        <div key={section.id} className="flex items-center gap-3 p-3 bg-surface/50 rounded border border-border">
          <span className="text-xs text-text-muted w-6">#{idx + 1}</span>
          <input 
            type="text" 
            placeholder="00:00:00-00:01:00"
            value={section.start}
            onChange={(e) => updateSection(section.id, e.target.value)}
            className="flex-grow bg-surface border border-border rounded p-2 text-sm focus:border-cyan-500 focus:outline-none"
          />
          <button 
            onClick={() => removeSection(section.id)} 
            className="text-red-400 hover:text-red-500 text-sm font-medium"
            aria-label={`Remove section ${idx + 1}`}
          >
            ✕
          </button>
        </div>
      ))}
      <Button variant="secondary" onClick={addSection} className="mt-2">
        + Add Section
      </Button>
    </div>
  );
}

// ==================== TextAreaInput Component ====================
interface TextAreaInputProps {
  value: string;
  onChange: (val: string) => void;
}

function TextAreaInput({ value, onChange }: TextAreaInputProps) {
  return (
    <textarea 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="01:50:00-01:50:55&#10;05:20:15-05:30:00"
      className="w-full h-40 bg-surface border border-border rounded p-2 text-sm font-mono focus:border-cyan-500 focus:outline-none"
      rows={6}
    />
  );
}
