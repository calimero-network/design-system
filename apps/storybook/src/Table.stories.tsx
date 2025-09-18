import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, Button } from "@calimero-network/mero-ui";
import { Settings as EditIcon, Trash as TrashIcon } from "@calimero-network/mero-icons";
import { cssVariables } from "@calimero-network/mero-tokens";

type Person = { name: string; email: string; role: string; lastActive: string };

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
  { key: 'lastActive', header: 'Last Active', align: 'right' },
] as const satisfies Array<{ key: keyof Person; header: string; align?: 'left' | 'center' | 'right' }>;

const data: Person[] = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', lastActive: '2h ago' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'User', lastActive: '1d ago' },
  { name: 'Carol Lee', email: 'carol@example.com', role: 'Manager', lastActive: '3d ago' },
];

const withTokens = (Story: any) => (
  <>
    <style>{cssVariables}</style>
    <Story />
  </>
);

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  decorators: [withTokens],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs']
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <Table columns={columns} data={data} />
    </div>
  )
};

export const CompactSticky: Story = {
  render: () => (
    <div style={{ width: 720, maxHeight: 240 }}>
      <Table columns={columns} data={data} compact stickyHeader />
    </div>
  )
};


type Controls = {
  showEdit: boolean;
  showDelete: boolean;
  useButtons: boolean;
  compact: boolean;
};

export const WithControls: Story = {
  argTypes: {
    showEdit: { control: 'boolean' },
    showDelete: { control: 'boolean' },
    useButtons: { control: 'boolean' },
    compact: { control: 'boolean' },
  },
  args: {
    showEdit: true,
    showDelete: true,
    useButtons: false,
    compact: false,
  },
  render: (args: any) => {
    const makeActions = (row: Person) => {
      const items: React.ReactNode[] = [];
      if (args.showEdit) {
        items.push(
          args.useButtons ? (
            <Button key="edit" onClick={() => alert(`Edit ${row.name}`)} style={args.compact ? { height: 28, padding: '0 10px', borderRadius: 8, fontSize: 12 } : undefined}>
              <EditIcon size={args.compact ? 14 : 16} />
              {args.compact ? ' Edit' : ' Edit'}
            </Button>
          ) : (
            <span
              key="edit"
              title={`Edit ${row.name}`}
              onClick={() => alert(`Edit ${row.name}`)}
              style={{ display: 'inline-grid', placeItems: 'center', width: args.compact ? 22 : 28, height: args.compact ? 22 : 28, borderRadius: args.compact ? 6 : 8, cursor: 'pointer', color: 'var(--color-brand-400)' }}
            >
              <EditIcon size={args.compact ? 14 : 18} />
            </span>
          )
        );
      }
      if (args.showDelete) {
        items.push(
          args.useButtons ? (
            <Button key="delete" onClick={() => alert(`Delete ${row.name}`)} style={args.compact ? { height: 28, padding: '0 10px', borderRadius: 8, fontSize: 12, backgroundColor: 'var(--color-brand-800)' } : { backgroundColor: 'var(--color-brand-800)' }}>
              <TrashIcon size={args.compact ? 14 : 16} />
              {args.compact ? ' Delete' : ' Delete'}
            </Button>
          ) : (
            <span
              key="delete"
              title={`Delete ${row.name}`}
              onClick={() => alert(`Delete ${row.name}`)}
              style={{ display: 'inline-grid', placeItems: 'center', width: args.compact ? 22 : 28, height: args.compact ? 22 : 28, borderRadius: args.compact ? 6 : 8, cursor: 'pointer', color: 'var(--color-brand-700)' }}
            >
              <TrashIcon size={args.compact ? 14 : 18} />
            </span>
          )
        );
      }
      return (
        <div style={{ display: 'flex', gap: args.compact ? 8 : 12, justifyContent: 'flex-end', alignItems: 'center' }}>
          {items}
        </div>
      );
    };

    const cols: any[] = [...columns];
    if (args.showEdit || args.showDelete) {
      cols.push({
        header: 'Actions',
        align: 'right' as const,
        render: (_: any, row: Person) => makeActions(row),
      });
    }

    return (
      <div style={{ width: args.compact ? 720 : 780 }}>
        <Table columns={cols as any} data={data} compact={args.compact} />
      </div>
    );
  }
} as any;


