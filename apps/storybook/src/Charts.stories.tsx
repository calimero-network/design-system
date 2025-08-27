import type { Meta, StoryObj } from "@storybook/react";
import { Gauge, GaugeCard } from "../../../packages/charts/src/Gauge";

const meta: Meta<typeof Gauge> = {
  title: "CHARTS/Gauge",
  component: Gauge,
  parameters: {
    layout: "centered",
  },
  tags: ['autodocs'],
};

export default meta;

export const GaugeExample: StoryObj<typeof GaugeCard> = {
  render: (args) => {
    // Update value if it's outside the min/max range
    const adjustedValue = Math.max(args.min || 0, Math.min(args.max || 100, args.value));
    
    return (
      <div style={{ padding: '16px' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <GaugeCard {...args} value={adjustedValue} />
        </div>
        {/* Show current range info */}
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#9ca3af', textAlign: 'center' }}>
          <p>Current range: {args.min} to {args.max}</p>
          <p>Value: {adjustedValue} (clamped to range)</p>
        </div>
      </div>
    );
  },
  args: {
    title: "CPU Usage",
    value: 66.8,
    min: 0,
    max: 100,
    thresholds: { warning: 60, danger: 80 },
    suffix: "%",
    decimals: 1
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Current value to display'
    },
    min: {
      control: 'text',
      description: 'Minimum value'
    },
    max: {
      control: 'text',
      description: 'Maximum value'
    },
    title: {
      control: 'text',
      description: 'Card title'
    },
    suffix: {
      control: 'text',
      description: 'Value suffix (e.g., "%")'
    },
    decimals: {
      control: 'text',
      description: 'Number of decimal places'
    }
  }
};

// Comprehensive story showing all prop combinations
export const GaugeAllProps: StoryObj<typeof Gauge> = {
  render: () => {
    return (
      <div style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '24px' }}>Gauge Component - All Prop Combinations</h2>
        
        {/* Different sizes */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>Different Sizes</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Small</p>
              <GaugeCard value={75} title="CPU Usage" suffix="%" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Medium (default)</p>
              <GaugeCard value={75} title="CPU Usage" suffix="%" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Large</p>
              <GaugeCard value={75} title="CPU Usage" suffix="%" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Extra Large</p>
              <GaugeCard value={75} title="CPU Usage" suffix="%" />
            </div>
          </div>
        </div>

        {/* Different value states */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>Different Value States</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Good (&le;60%)</p>
              <GaugeCard value={45} title="Memory Usage" suffix="%" thresholds={{ warning: 60, danger: 80 }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Warning (&le;80%)</p>
              <GaugeCard value={70} title="Memory Usage" suffix="%" thresholds={{ warning: 60, danger: 80 }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Danger (&gt;80%)</p>
              <GaugeCard value={95} title="Memory Usage" suffix="%" thresholds={{ warning: 60, danger: 80 }} />
            </div>
          </div>
        </div>

        {/* Different ranges */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>Different Ranges</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>0-100 (default)</p>
              <GaugeCard value={75} title="CPU Usage" suffix="%" min={0} max={100} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>-10 to 10</p>
              <GaugeCard value={3} title="Temperature" suffix="°C" min={-10} max={10} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>0 to 1000</p>
              <GaugeCard value={750} title="Requests/sec" suffix="req/s" min={0} max={1000} />
            </div>
          </div>
        </div>

        {/* Different decimal places */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>Different Decimal Places</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>0 decimals</p>
              <GaugeCard value={75.6} title="CPU Usage" suffix="%" decimals={0} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>1 decimal (default)</p>
              <GaugeCard value={75.6} title="CPU Usage" suffix="%" decimals={1} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>2 decimals</p>
              <GaugeCard value={75.6} title="CPU Usage" suffix="%" decimals={2} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>3 decimals</p>
              <GaugeCard value={75.6} title="CPU Usage" suffix="%" decimals={3} />
            </div>
          </div>
        </div>

        {/* Different thresholds */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>Different Thresholds</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Conservative (30/70)</p>
              <GaugeCard value={50} title="Disk Usage" suffix="%" thresholds={{ warning: 30, danger: 70 }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Standard (60/80)</p>
              <GaugeCard value={50} title="Disk Usage" suffix="%" thresholds={{ warning: 60, danger: 80 }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Aggressive (80/95)</p>
              <GaugeCard value={50} title="Disk Usage" suffix="%" thresholds={{ warning: 80, danger: 95 }} />
            </div>
          </div>
        </div>

        {/* Long titles */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>Long Titles (with ellipsis)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Very Long Title</p>
              <GaugeCard value={75} title="This is a very long title that should be truncated with ellipsis when it exceeds the available space" suffix="%" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Short Title</p>
              <GaugeCard value={75} title="Short" suffix="%" />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
