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
  title: "Forms/Button",
  component: Button,
  decorators: [withTokens],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Button>Click me</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 16 }}>
        <Button>Primary</Button>
        <Button disabled>Primary Disabled</Button>
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <Button variant="secondary">Secondary</Button>
        <Button variant="secondary" disabled>
          Secondary Disabled
        </Button>
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="error">Error</Button>
        <Button variant="info">Info</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XLarge</Button>
    </div>
  ),
};

const Icon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3 7h7l-5.5 4 2 7-6.5-4.5L5.5 20l2-7L2 9h7l3-7z" />
  </svg>
);

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 16 }}>
        <Button leftIcon={<Icon />}>Left icon</Button>
        <Button rightIcon={<Icon />}>Right icon</Button>
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <Button size="lg" leftIcon={<Icon />}>Large with icon</Button>
        <Button variant="secondary" rightIcon={<Icon />}>Secondary with icon</Button>
      </div>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Button fullWidth>Full width button</Button>
    </div>
  ),
};
