import type { Meta, StoryObj } from "@storybook/react";
import { RichTextEditor } from "@calimero-network/mero-ui";
import { useState } from "react";

const meta: Meta<typeof RichTextEditor> = {
  title: "Forms/RichTextEditor",
  component: RichTextEditor,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A rich text editor component that allows users to create and edit HTML content with a toolbar for formatting options.",
      },
    },
  },
  argTypes: {
    value: {
      control: "text",
      description: "The HTML content value of the editor",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when editor is empty",
    },
    disabled: {
      control: "boolean",
      description: "Whether the editor is disabled",
    },
    readOnly: {
      control: "boolean",
      description: "Whether the editor is read-only",
    },
    error: {
      control: "boolean",
      description: "Whether the editor has an error state",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the editor",
    },
    variant: {
      control: "select",
      options: ["default", "filled", "outlined"],
      description: "Visual variant of the editor",
    },
    toolbar: {
      control: "boolean",
      description: "Whether to show the toolbar",
    },
    minHeight: {
      control: "number",
      description: "Minimum height of the editor in pixels",
    },
    maxHeight: {
      control: "number",
      description: "Maximum height of the editor in pixels",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

// Basic usage
export const Default: Story = {
  args: {
    placeholder: "Start typing your content here...",
    label: "Rich Text Editor",
    helperText: "Use the toolbar to format your text",
  },
};

// With initial content
export const WithContent: Story = {
  args: {
    value:
      "<h2>Welcome to Rich Text Editor</h2><p>This is a <strong>bold</strong> text and this is <em>italic</em> text.</p><ul><li>First item</li><li>Second item</li></ul>",
    placeholder: "Start typing your content here...",
    label: "Rich Text Editor with Content",
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h3>Small</h3>
        <RichTextEditor
          size="sm"
          placeholder="Small editor..."
          label="Small Size"
        />
      </div>
      <div>
        <h3>Medium</h3>
        <RichTextEditor
          size="md"
          placeholder="Medium editor..."
          label="Medium Size"
        />
      </div>
      <div>
        <h3>Large</h3>
        <RichTextEditor
          size="lg"
          placeholder="Large editor..."
          label="Large Size"
        />
      </div>
    </div>
  ),
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h3>Default</h3>
        <RichTextEditor
          variant="default"
          placeholder="Default variant..."
          label="Default Variant"
        />
      </div>
      <div>
        <h3>Filled</h3>
        <RichTextEditor
          variant="filled"
          placeholder="Filled variant..."
          label="Filled Variant"
        />
      </div>
      <div>
        <h3>Outlined</h3>
        <RichTextEditor
          variant="outlined"
          placeholder="Outlined variant..."
          label="Outlined Variant"
        />
      </div>
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h3>Normal</h3>
        <RichTextEditor placeholder="Normal state..." label="Normal State" />
      </div>
      <div>
        <h3>Error</h3>
        <RichTextEditor
          error
          placeholder="Error state..."
          label="Error State"
          helperText="This field has an error"
        />
      </div>
      <div>
        <h3>Disabled</h3>
        <RichTextEditor
          disabled
          placeholder="Disabled state..."
          label="Disabled State"
        />
      </div>
      <div>
        <h3>Read Only</h3>
        <RichTextEditor
          readOnly
          value="<p>This content is read-only and cannot be edited.</p>"
          label="Read Only State"
        />
      </div>
    </div>
  ),
};

// Without toolbar
export const WithoutToolbar: Story = {
  args: {
    toolbar: false,
    placeholder: "Editor without toolbar...",
    label: "No Toolbar",
    helperText: "This editor has no toolbar - only basic text editing",
  },
};

// Custom toolbar
export const CustomToolbar: Story = {
  args: {
    customToolbar: (
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button
          onClick={() => document.execCommand("bold")}
          style={{
            padding: "6px 12px",
            backgroundColor: "#404040",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Bold
        </button>
        <button
          onClick={() => document.execCommand("italic")}
          style={{
            padding: "6px 12px",
            backgroundColor: "#404040",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Italic
        </button>
        <div
          style={{ width: "1px", height: "20px", backgroundColor: "#404040" }}
        />
        <span style={{ color: "#A0A0A0", fontSize: "14px" }}>
          Custom Toolbar
        </span>
      </div>
    ),
    placeholder: "Editor with custom toolbar...",
    label: "Custom Toolbar",
  },
};

// Controlled component
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(
      "<p>This is a controlled editor. Try editing the content!</p>",
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <RichTextEditor
          value={value}
          onChange={setValue}
          placeholder="Controlled editor..."
          label="Controlled Editor"
          helperText="The value is controlled by React state"
        />
        <div>
          <h4>Current HTML Value:</h4>
          <pre
            style={{
              backgroundColor: "#1A1A1A",
              padding: "12px",
              borderRadius: "8px",
              color: "#FFFFFF",
              fontSize: "12px",
              overflow: "auto",
              maxHeight: "200px",
            }}
          >
            {value}
          </pre>
        </div>
        <div>
          <h4>Rendered Content:</h4>
          <div
            style={{
              backgroundColor: "#1A1A1A",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #404040",
            }}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      </div>
    );
  },
};

// With height constraints
export const WithHeightConstraints: Story = {
  args: {
    minHeight: 200,
    maxHeight: 300,
    placeholder: "This editor has height constraints...",
    label: "Height Constrained Editor",
    helperText: "Min height: 200px, Max height: 300px",
  },
};

// Form integration example
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      title: "",
      content: "<p>Start writing your article...</p>",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(
        `Form submitted!\nTitle: ${formData.title}\nContent: ${formData.content}`,
      );
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div>
          <label
            style={{ display: "block", marginBottom: "8px", color: "#FFFFFF" }}
          >
            Article Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Enter article title..."
            style={{
              width: "100%",
              padding: "8px 12px",
              backgroundColor: "transparent",
              border: "1px solid #404040",
              borderRadius: "12px",
              color: "#FFFFFF",
              fontSize: "16px",
            }}
          />
        </div>

        <RichTextEditor
          value={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
          placeholder="Write your article content here..."
          label="Article Content"
          helperText="Use the toolbar to format your article"
        />

        <button
          type="submit"
          style={{
            padding: "12px 24px",
            backgroundColor: "#A5FF11",
            color: "#000000",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            alignSelf: "flex-start",
          }}
        >
          Submit Article
        </button>
      </form>
    );
  },
};

// Send on Enter demo
export const SendOnEnter: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [messages, setMessages] = useState<
      { id: number; html: string; direction: "in" | "out"; at: string }[]
    >([]);
    const now = () =>
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const addIncoming = () => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          html: "<p>This is an incoming message.</p>",
          direction: "in",
          at: now(),
        },
      ]);
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: 800,
        }}
      >
        <div style={{ padding: "8px 4px", color: "#C8C8C8", fontSize: 12 }}>
          Channel: #general
        </div>
        <div
          style={{
            height: 420,
            overflow: "auto",
            padding: "8px 12px",
            border: "1px solid #2A2A2A",
            borderRadius: 12,
            backgroundColor: "#0E0E0E",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {messages.length === 0 && (
            <div
              style={{ color: "#A0A0A0", textAlign: "center", marginTop: 24 }}
            >
              No messages yet
            </div>
          )}
          <style>{`
            .msg-group { display: flex; gap: 10px; align-items: flex-start; padding: 8px 6px; }
            .msg-avatar {
              width: 28px; height: 28px; border-radius: 6px;
              background: #2C2C2C; color: #EEE; display: flex; align-items: center; justify-content: center;
              font-size: 12px; font-weight: 700; flex: 0 0 auto;
            }
            .msg-header { color: #DDD; font-size: 13px; display: flex; gap: 8px; align-items: baseline; }
            .msg-name { font-weight: 700; }
            .msg-time { font-size: 11px; color: #9A9A9A; }
            .msg-line { max-width: 72%; color: #F2F2F2; }
            .msg-content p { margin: 0 0 6px 0; }
            .msg-content ul, .msg-content ol { margin: 4px 0 6px 16px; }
            .msg-content li { margin: 2px 0; }
            .msg-content code { background: #1E1E1E; padding: 1px 4px; border-radius: 4px; }
            .msg-content pre { background: #111; padding: 8px; border-radius: 6px; overflow: auto; }
            .msg-content blockquote { margin: 6px 0; padding: 6px 10px; border-left: 3px solid #A5FF11; background: #111; }
          `}</style>
          {messages.map((m, idx) => {
            const isOut = m.direction === "out";
            const initials = isOut ? "YOU" : "AI";
            const name = isOut ? "You" : "Assistant";
            const prev = idx > 0 ? messages[idx - 1] : null;
            const sameAuthorAsPrev = prev && prev.direction === m.direction;
            const showHeader = !sameAuthorAsPrev;
            return (
              <div key={m.id} className="msg-group">
                <div className="msg-avatar" style={{ visibility: showHeader ? "visible" : "hidden" }}>{initials.slice(0,2)}</div>
                <div className="msg-line">
                  {showHeader && (
                    <div className="msg-header">
                      <span className="msg-name">{name}</span>
                      <span className="msg-time">{m.at}</span>
                    </div>
                  )}
                  <div className="msg-content" dangerouslySetInnerHTML={{ __html: m.html }} />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={addIncoming}
            style={{
              padding: "8px 12px",
              backgroundColor: "#1A1A1A",
              color: "#FFFFFF",
              border: "1px solid #404040",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Simulate incoming
          </button>
          <div style={{ color: "#A0A0A0", alignSelf: "center" }}>
            Enter sends, Shift+Enter newline. Toggle list/quote to test
            behaviors.
          </div>
        </div>
        <RichTextEditor
          value={value}
          onChange={setValue}
          placeholder="Type a message. Press Enter to send, Shift+Enter for newline."
          label="Chat Input"
          sendOnEnter
          clearOnSend
          onSend={(html) => {
            setMessages((prev) => [
              ...prev,
              {
                id: prev.length + 1,
                html,
                direction: "out",
                at: now(),
              },
            ]);
          }}
        />
      </div>
    );
  },
};
