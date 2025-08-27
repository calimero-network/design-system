import type { Meta, StoryObj } from "@storybook/react";
import { ChartsDemo } from "./Demo";
import { Gauge, GaugeCard } from "./Gauge";
import { SeriesCard, Series } from "./TimeSeries";
import { VectorTable, PromVectorResult } from "./VectorTable";

const meta: Meta<typeof ChartsDemo> = {
  title: "Charts/Demo",
  component: ChartsDemo,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof ChartsDemo>;

export const FullDemo: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto p-4">
      <ChartsDemo />
    </div>
  )
};

// Individual chart stories
export const GaugeExample: StoryObj<typeof GaugeCard> = {
  render: (args) => (
    <div className="p-4">
      <div className="max-w-md mx-auto">
        <GaugeCard {...args} />
      </div>
    </div>
  ),
  args: {
    title: "CPU Usage",
    value: 73.4,
    min: 0,
    max: 100,
    suffix: "%"
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 0.1 },
      description: 'Current value to display'
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value'
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value'
    },
    title: {
      control: { type: 'text' },
      description: 'Card title'
    },
    suffix: {
      control: { type: 'text' },
      description: 'Value suffix (e.g., "%")'
    }
  }
};

export const GaugeStandalone: StoryObj<typeof Gauge> = {
  render: (args) => (
    <div className="p-4">
      <div className="max-w-sm mx-auto">
        <Gauge {...args} />
      </div>
    </div>
  ),
  args: {
    value: 73.4,
    min: 0,
    max: 100,
    label: "CPU",
    decimals: 1
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 0.1 },
      description: 'Current value to display'
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value'
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value'
    },
    label: {
      control: { type: 'text' },
      description: 'Label displayed below the value'
    },
    decimals: {
      control: { type: 'range', min: 0, max: 3, step: 1 },
      description: 'Number of decimal places'
    }
  }
};

export const TimeSeriesExample: StoryObj<typeof SeriesCard> = {
  render: () => {
    const now = Date.now();
    const mk = (base: number) => Array.from({length: 60}, (_,i) => ({ t: now - (60-i)*60_000, y: base + (Math.random()-0.5)*0.2 }));

    const requests: Series[] = [
      { name: "10.0.99.165:8429 - /api/v1/query", data: mk(12.0) },
      { name: "10.0.99.165:8429 - /api/v1/write", data: mk(2.7) },
      { name: "10.0.99.165:8429 - /api/v1/query_range", data: mk(0.45) },
    ];

    return (
      <div className="p-4">
        <SeriesCard title="Requests rate" series={requests} yLabel="req/s" />
      </div>
    );
  },
};

export const VectorTableExample: StoryObj<typeof VectorTable> = {
  render: () => {
    const vector: PromVectorResult = {
      status: "success",
      data: {
        resultType: "vector",
        result: [
          { metric: { instance: "10.0.99.165:8429", container: "vmsingle", reason: "unsupported", path: "*" }, value: [ 1756235265, "0" ] },
          { metric: { instance: "10.0.83.199:8429", container: "vmagent", reason: "wrong_auth_key", path: "*" }, value: [ 1756235265, "0" ] },
          { metric: { instance: "10.0.77.25:8080", container: "vmalert", reason: "wrong_basic_auth", path: "*" }, value: [ 1756235265, "0" ] },
        ]
      }
    };

    return (
      <div className="p-4">
        <VectorTable title="HTTP Request Errors (instant vector)" vector={vector} />
      </div>
    );
  },
};
