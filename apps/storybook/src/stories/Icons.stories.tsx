import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { 
  Clock, 
  ClockAlert, 
  ClockX, 
  Target, 
  Box,
  Refresh,
  ExternalLink,
  ArrowUpRight,
  ArrowUpLeft,
  ArrowDownRight,
  ArrowDownLeft,
  ArrowsUpDown,
  ArrowsDownUp,
  ArrowUp,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Download,
  Upload,
  Star,
  Sun,
  Moon,
  FileText,
  FileClock,
  FileBarChart,
  FileCheck,
  Cloud,
  CloudDownload,
  CloudUpload,
  CloudX,
  CloudRain,
  ChevronsLeft,
  ChevronsLeftX,
  ChevronsRightX,
  ChevronsUpX,
  ChevronsDown,
  ChevronsDownX,
  Globe,
  GlobeCheck,
  GlobeX,
  Lock,
  LockCheck,
  LockRight,
  LockStar,
  LockSearch,
  LockUnlock,
  LockX,
  LockBox,
  LockBoxX,
  LockBoxUnlock,
  LockBoxSearch,
  LockBoxStar,
  LockBoxCheck,
  LockBoxRight,
  LockBoxLeft,
  LockBoxUp,
  LockBoxDown,
  LockBoxCenter,
  LockBoxCorner,
  LockBoxEdge,
  Folder,
  Package,
  Database,
  Cube,
  Egg,
  Table,
  MessageCircle,
  Zap,
  Grid,
  BarChart,
  LineChart,
  Minus,
  CheckSquare,
  Circle,
  ClockCircle,
  Cylinder,
  CylinderX,
  Monitor,
  MonitorX,
  MonitorCheck,
  Cube3D,
  ArrowUpRightSmall,
  Cube3DComplex,
  ArrowUpRightTiny,
  Eye,
  EyeOff,
  Settings,
  Cube3DLayers,
  Cube3DInverted,
  Cube3DStacked,
  MessageBubble,
  Home,
  Trash,
  Wifi,
  WifiOff,
  WifiSimple,
  Heart,
  HeartCheck,
  Shield,
  ShieldCheck,
  IconBase 
} from '../../../../packages/icons/src';

const meta: Meta = {
  title: 'Design System/Icons',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Calimero icon library with Lucide-style API'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// All available icons
const allIcons = [
  { name: 'Clock', component: Clock },
  { name: 'ClockAlert', component: ClockAlert },
  { name: 'ClockX', component: ClockX },
  { name: 'Target', component: Target },
  { name: 'Box', component: Box },
  { name: 'Refresh', component: Refresh },
  { name: 'ExternalLink', component: ExternalLink },
  { name: 'ArrowUpRight', component: ArrowUpRight },
  { name: 'ArrowUpLeft', component: ArrowUpLeft },
  { name: 'ArrowDownRight', component: ArrowDownRight },
  { name: 'ArrowDownLeft', component: ArrowDownLeft },
  { name: 'ArrowsUpDown', component: ArrowsUpDown },
  { name: 'ArrowsDownUp', component: ArrowsDownUp },
  { name: 'ArrowUp', component: ArrowUp },
  { name: 'ArrowRight', component: ArrowRight },
  { name: 'ArrowLeft', component: ArrowLeft },
  { name: 'ArrowDown', component: ArrowDown },
  { name: 'Download', component: Download },
  { name: 'Upload', component: Upload },
  { name: 'Star', component: Star },
  { name: 'Sun', component: Sun },
  { name: 'Moon', component: Moon },
  { name: 'FileText', component: FileText },
  { name: 'FileClock', component: FileClock },
  { name: 'FileBarChart', component: FileBarChart },
  { name: 'FileCheck', component: FileCheck },
  { name: 'Cloud', component: Cloud },
  { name: 'CloudDownload', component: CloudDownload },
  { name: 'CloudUpload', component: CloudUpload },
  { name: 'CloudX', component: CloudX },
  { name: 'CloudRain', component: CloudRain },
  { name: 'ChevronsLeft', component: ChevronsLeft },
  { name: 'ChevronsLeftX', component: ChevronsLeftX },
  { name: 'ChevronsRightX', component: ChevronsRightX },
  { name: 'ChevronsUpX', component: ChevronsUpX },
  { name: 'ChevronsDown', component: ChevronsDown },
  { name: 'ChevronsDownX', component: ChevronsDownX },
  { name: 'Globe', component: Globe },
  { name: 'GlobeCheck', component: GlobeCheck },
  { name: 'GlobeX', component: GlobeX },
  { name: 'Lock', component: Lock },
  { name: 'LockCheck', component: LockCheck },
  { name: 'LockRight', component: LockRight },
  { name: 'LockStar', component: LockStar },
  { name: 'LockSearch', component: LockSearch },
  { name: 'LockUnlock', component: LockUnlock },
  { name: 'LockX', component: LockX },
  { name: 'LockBox', component: LockBox },
  { name: 'LockBoxX', component: LockBoxX },
  { name: 'LockBoxUnlock', component: LockBoxUnlock },
  { name: 'LockBoxSearch', component: LockBoxSearch },
  { name: 'LockBoxStar', component: LockBoxStar },
  { name: 'LockBoxCheck', component: LockBoxCheck },
  { name: 'LockBoxRight', component: LockBoxRight },
  { name: 'LockBoxLeft', component: LockBoxLeft },
  { name: 'LockBoxUp', component: LockBoxUp },
  { name: 'LockBoxDown', component: LockBoxDown },
  { name: 'LockBoxCenter', component: LockBoxCenter },
  { name: 'LockBoxCorner', component: LockBoxCorner },
  { name: 'LockBoxEdge', component: LockBoxEdge },
  { name: 'Folder', component: Folder },
  { name: 'Package', component: Package },
  { name: 'Database', component: Database },
  { name: 'Cube', component: Cube },
  { name: 'Egg', component: Egg },
  { name: 'Table', component: Table },
  { name: 'MessageCircle', component: MessageCircle },
  { name: 'Zap', component: Zap },
  { name: 'Grid', component: Grid },
  { name: 'BarChart', component: BarChart },
  { name: 'LineChart', component: LineChart },
  { name: 'Minus', component: Minus },
  { name: 'CheckSquare', component: CheckSquare },
  { name: 'Circle', component: Circle },
  { name: 'ClockCircle', component: ClockCircle },
  { name: 'Cylinder', component: Cylinder },
  { name: 'CylinderX', component: CylinderX },
  { name: 'Monitor', component: Monitor },
  { name: 'MonitorX', component: MonitorX },
  { name: 'MonitorCheck', component: MonitorCheck },
  { name: 'Cube3D', component: Cube3D },
  { name: 'ArrowUpRightSmall', component: ArrowUpRightSmall },
  { name: 'Cube3DComplex', component: Cube3DComplex },
  { name: 'ArrowUpRightTiny', component: ArrowUpRightTiny },
  { name: 'Eye', component: Eye },
  { name: 'EyeOff', component: EyeOff },
  { name: 'Settings', component: Settings },
  { name: 'Cube3DLayers', component: Cube3DLayers },
  { name: 'Cube3DInverted', component: Cube3DInverted },
  { name: 'Cube3DStacked', component: Cube3DStacked },
  { name: 'MessageBubble', component: MessageBubble },
  { name: 'Home', component: Home },
  { name: 'Trash', component: Trash },
  { name: 'Wifi', component: Wifi },
  { name: 'WifiOff', component: WifiOff },
  { name: 'WifiSimple', component: WifiSimple },
  { name: 'Heart', component: Heart },
  { name: 'HeartCheck', component: HeartCheck },
  { name: 'Shield', component: Shield },
  { name: 'ShieldCheck', component: ShieldCheck }
];

// Lucide-style icon showcase with shared controls
export const IconShowcase: Story = {
  render: (args: any) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [copiedIcon, setCopiedIcon] = React.useState<string | null>(null);

    const filteredIcons = allIcons.filter(icon =>
      icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const copyToClipboard = async (iconName: string) => {
      const importText = `import { ${iconName} } from '@calimero-network/mero-icons'`;
      try {
        await navigator.clipboard.writeText(importText);
        setCopiedIcon(iconName);
        setTimeout(() => setCopiedIcon(null), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    return (
      <div style={{ 
        padding: '24px', 
        minHeight: '100vh',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        {/* Header */}
        <div style={{ 
          marginBottom: '32px',
          borderBottom: '1px solid #e5e5e5',
          paddingBottom: '24px'
        }}>
          <h1 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '32px', 
            fontWeight: '600',
            color: 'var(--color-neutral-400)'
          }}>
            Calimero Icons
          </h1>
          <p style={{ 
            margin: '0 0 24px 0', 
            fontSize: '16px', 
            lineHeight: '1.5',
            color: 'var(--color-neutral-400)'
          }}>
            A collection of beautiful, customizable icons for your design system
          </p>
          
          {/* Search */}
          <input
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '12px 16px',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
          />
        </div>

        {/* Icons Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {filteredIcons.map(({ name, component: IconComponent }) => (
            <button
              key={name}
              onClick={() => copyToClipboard(name)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '16px',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                backgroundColor: copiedIcon === name ? 'var(--color-accent)' : 'var(--color-bg)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                outline: 'none',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent)';
                e.currentTarget.style.backgroundColor = 'var(--color-bg-muted)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.backgroundColor = copiedIcon === name ? 'var(--color-accent)' : 'var(--color-bg)';
              }}
              title={`${name} - Click to copy import`}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '48px',
                height: '48px'
              }}>
                <IconComponent 
                  {...args} 
                  style={{ color: args.color }}
                />
              </div>
              <span style={{ 
                fontSize: '12px', 
                fontWeight: '500',
                color: args.color,
                textAlign: 'center',
                lineHeight: '1.2'
              }}>
                {name}
              </span>
              {copiedIcon === name && (
                <span style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  fontSize: '10px',
                  color: 'var(--color-accent)',
                  fontWeight: '600'
                }}>
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>

        {/* No results */}
        {filteredIcons.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '48px 24px'
          }}>
            <p style={{ fontSize: '16px', margin: '0', color: 'var(--color-neutral-400)' }}>
              No icons found matching "{searchTerm}"
            </p>
          </div>
        )}

        {/* Results count */}
        {filteredIcons.length > 0 && (
          <div style={{
            textAlign: 'center',
            padding: '16px',
            fontSize: '14px',
            color: 'var(--color-neutral-400)'
          }}>
            {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''} found
          </div>
        )}
      </div>
    );
  },
  args: {
    size: 24,
    strokeWidth: 3,
    absoluteStrokeWidth: false,
    color: 'var(--color-brand-600)'
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 16, max: 64, step: 8 },
      description: 'Size of the icons in pixels'
    },
    strokeWidth: {
      control: { type: 'range', min: 0.5, max: 4, step: 0.5 },
      description: 'Stroke width of the icons'
    },
    absoluteStrokeWidth: {
      control: { type: 'boolean' },
      description: 'Whether stroke width should be absolute (not scale with size)'
    },
    color: {
      control: { type: 'color' },
      description: 'Color of the icons',
      defaultValue: 'var(--color-brand-600)'
    }
  }
};

// Absolute stroke width demonstration
export const AbsoluteStrokeWidthDemo: Story = {
  render: () => (
    <div style={{ 
      padding: '24px',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '24px', fontWeight: '600', color: 'var(--color-neutral-400)' }}>
        Absolute Stroke Width Demo
      </h2>
      <p style={{ margin: '0 0 32px 0', fontSize: '16px', color: 'var(--color-neutral-400)' }}>
        Compare how stroke width behaves with different sizes and absoluteStrokeWidth settings
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* Relative stroke width (default) */}
        <div style={{ 
          padding: '24px',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          backgroundColor: 'var(--color-bg-muted)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', color: 'var(--color-neutral-400)' }}>
            Relative Stroke Width (absoluteStrokeWidth: false)
          </h3>
          <p style={{ fontSize: '14px', margin: '0 0 16px 0', color: 'var(--color-neutral-400)' }}>
            Stroke width scales with icon size
          </p>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                         {[16, 24, 32, 48].map(size => (
               <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                 <Clock size={size} strokeWidth={1.5} absoluteStrokeWidth={false} style={{ color: 'var(--color-brand-600)' }} />
                 <span style={{ fontSize: '12px', color: 'var(--color-neutral-400)' }}>{size}px</span>
               </div>
             ))}
          </div>
        </div>

        {/* Absolute stroke width */}
        <div style={{ 
          padding: '24px',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          backgroundColor: 'var(--color-bg-muted)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', color: 'var(--color-neutral-400)' }}>
            Absolute Stroke Width (absoluteStrokeWidth: true)
          </h3>
          <p style={{ fontSize: '14px', margin: '0 0 16px 0', color: 'var(--color-neutral-400)' }}>
            Stroke width remains constant regardless of size
          </p>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {[16, 24, 32, 48].map(size => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <Clock size={size} strokeWidth={1.5} absoluteStrokeWidth={true} style={{ color: 'var(--color-brand-600)' }} />
                <span style={{ fontSize: '12px', color: 'var(--color-neutral-400)' }}>{size}px</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}; 