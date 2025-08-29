import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../packages/ui/src';
import { Settings, Clock } from '../../../packages/icons/src';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Basic: StoryObj<typeof Card> = {
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

export const WithTooltip: StoryObj<typeof Card> = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <Card tooltip="This card shows important information">
        <CardHeader>
          <CardTitle>Card with Tooltip</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'white', margin: 0 }}>
            Hover over the clock icon to see the tooltip.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const WithCustomColor: StoryObj<typeof Card> = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <Card 
        tooltip="This card uses custom colors" 
        color="#A5FF11"
      >
        <CardHeader>
          <CardTitle>Custom Color Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'white', margin: 0 }}>
            Notice the green border, title, and tooltip icon.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const NoBorder: StoryObj<typeof Card> = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <Card 
        tooltip="This card has no border" 
        noBorder
        color="#f59e0b"
      >
        <CardHeader>
          <CardTitle>No Border Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'white', margin: 0 }}>
            This card has no border but still has the tooltip.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const CustomTooltipIcon: StoryObj<typeof Card> = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <Card 
        tooltip="This card uses a custom settings icon" 
        tooltipIcon={Settings}
        color="#3b82f6"
      >
        <CardHeader>
          <CardTitle>Custom Icon Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'white', margin: 0 }}>
            This card uses a Settings icon instead of the default ClockAlert.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const WarningCard: StoryObj<typeof Card> = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <Card 
        tooltip="This card shows a warning" 
        tooltipIcon={Clock}
        color="#f59e0b"
      >
        <CardHeader>
          <CardTitle>Warning Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'white', margin: 0 }}>
            This card uses a ClockX icon with warning colors.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const WithLongTitle: StoryObj<typeof Card> = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <Card>
        <CardHeader>
          <CardTitle>This is a very long title that should be truncated with ellipsis when it exceeds the available space</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'white', margin: 0 }}>
            The title above should be truncated with ellipsis.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const MultipleCards: StoryObj<typeof Card> = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap',
      gap: '16px',
      maxWidth: '900px'
    }}>
      <Card style={{ flex: '1 1 250px' }}>
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'white', margin: 0 }}>
            First card content.
          </p>
        </CardContent>
      </Card>
      
      <Card style={{ flex: '1 1 250px' }}>
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'white', margin: 0 }}>
            Second card content.
          </p>
        </CardContent>
      </Card>
      
      <Card style={{ flex: '1 1 250px' }}>
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ color: 'white', margin: 0 }}>
            Third card content.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};
