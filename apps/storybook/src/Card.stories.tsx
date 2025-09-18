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
    variant: { control: 'select', options: ['rounded', 'rectangle'] },
    title: { control: 'text' },
    content: { control: 'text' },
    longTitle: { control: 'boolean' },
  },
  args: {
    showTooltip: true,
    customIcon: false,
    color: '#A5FF11',
    noBorder: false,
    variant: 'rounded',
    title: 'Configurable Card',
    content: 'Use controls to toggle tooltip, icon, border, variant and color.',
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
        <Card tooltip={tooltip} tooltipIcon={icon as any} color={args.color} noBorder={args.noBorder} variant={args.variant}>
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

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', maxWidth: '800px' }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ color: 'white', marginBottom: '12px' }}>Rounded (Default)</h3>
        <Card variant="rounded" color="#3B82F6">
          <CardHeader>
            <CardTitle>Rounded Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ color: 'white', margin: 0 }}>
              This card uses the default rounded variant with 16px border radius.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div style={{ flex: 1 }}>
        <h3 style={{ color: 'white', marginBottom: '12px' }}>Rectangle</h3>
        <Card variant="rectangle" color="#10B981">
          <CardHeader>
            <CardTitle>Rectangle Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ color: 'white', margin: 0 }}>
              This card uses the rectangle variant with 4px border radius.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const VariantComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', maxWidth: '600px' }}>
      <Card variant="rounded" color="#F59E0B">
        <CardContent>
          <div style={{ color: 'white', textAlign: 'center', padding: '8px' }}>
            <strong>Rounded</strong>
            <br />
            <small>16px radius</small>
          </div>
        </CardContent>
      </Card>
      
      <Card variant="rectangle" color="#EF4444">
        <CardContent>
          <div style={{ color: 'white', textAlign: 'center', padding: '8px' }}>
            <strong>Rectangle</strong>
            <br />
            <small>4px radius</small>
          </div>
        </CardContent>
      </Card>
      
      <Card variant="rounded" color="#8B5CF6" noBorder>
        <CardContent>
          <div style={{ color: 'white', textAlign: 'center', padding: '8px' }}>
            <strong>Rounded</strong>
            <br />
            <small>No border</small>
          </div>
        </CardContent>
      </Card>
      
      <Card variant="rectangle" color="#06B6D4" noBorder>
        <CardContent>
          <div style={{ color: 'white', textAlign: 'center', padding: '8px' }}>
            <strong>Rectangle</strong>
            <br />
            <small>No border</small>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};
