import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardTitle, CardContent } from '@calimero-network/mero-ui';
import { Settings, Clock } from '@calimero-network/mero-icons';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <Card>
        <CardHeader>
          <CardTitle>Basic Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'white', margin: 0 }}>
            This is a basic card with a title and content.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const WithControls: Story = {
  argTypes: {
    showTooltip: { control: 'boolean' },
    customIcon: { control: 'boolean' },
    color: { control: 'text' },
    noBorder: { control: 'boolean' },
    title: { control: 'text' },
    content: { control: 'text' },
    longTitle: { control: 'boolean' },
  },
  args: {
    showTooltip: true,
    customIcon: false,
    color: '#A5FF11',
    noBorder: false,
    title: 'Configurable Card',
    content: 'Use controls to toggle tooltip, icon, border and color.',
    longTitle: false,
  },
  render: (args: any) => {
    const tooltip = args.showTooltip ? 'This card shows important information' : undefined;
    const icon = args.customIcon ? Settings : undefined;
    const titleText = args.longTitle 
      ? 'This is a very long title that should be truncated with ellipsis when it exceeds the available space'
      : args.title;
    return (
      <div style={{ maxWidth: '420px' }}>
        <Card tooltip={tooltip} tooltipIcon={icon as any} color={args.color} noBorder={args.noBorder}>
          <CardHeader>
            <CardTitle>{titleText}</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ color: 'white', margin: 0 }}>{args.content}</p>
          </CardContent>
        </Card>
      </div>
    );
  }
} as any;
