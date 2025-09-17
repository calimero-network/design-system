import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@calimero-network/mero-ui";
import { cssVariables } from "@calimero-network/mero-tokens";

const withTokens = (Story: any) => (
  <div
    style={{
      background: '#111827',
      minHeight: '100vh',
      padding: '24px',
      color: 'white'
    }}
  >
    <style>{cssVariables}</style>
    <Story />
  </div>
);

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  decorators: [withTokens],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button>Click me</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button>Default (brand-600)</Button>
      <Button style={{ backgroundColor: 'var(--color-brand-100)' }}>Hover (brand-100)</Button>
      <Button style={{ backgroundColor: 'var(--color-brand-800)' }}>Active (brand-800)</Button>
      <Button disabled>Disabled (brand-900)</Button>
    </div>
  )
};


