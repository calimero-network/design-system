import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@calimero-network/mero-ui';

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: 'Default' } };
export const Success: Story = { args: { children: 'Success', variant: 'success' } };
export const Warning: Story = { args: { children: 'Warning', variant: 'warning' } };
export const Error: Story = { args: { children: 'Error', variant: 'error' } };
export const Info: Story = { args: { children: 'Info', variant: 'info' } };
export const Outline: Story = { args: { children: 'Outline', variant: 'outline' } };
export const WithDot: Story = { args: { children: 'Syncing', variant: 'info', dot: true } };
