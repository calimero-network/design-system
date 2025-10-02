import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@calimero-network/mero-ui";
import { cssVariables } from "@calimero-network/mero-tokens";

const withTokens = (Story: any) => (
  <>
    <style>{cssVariables}</style>
    <Story />
  </>
);

const meta: Meta<typeof Button> = {
  title: 'Forms/Button',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button>Primary</Button>
        <Button disabled>Primary Disabled</Button>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button variant="secondary">Secondary</Button>
        <Button variant="secondary" disabled>Secondary Disabled</Button>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="error">Error</Button>
        <Button variant="info">Info</Button>
      </div>
    </div>
  )
};


