import { invoke } from "@tauri-apps/api/core";
import { BUTTONS, type ButtonConfig } from "./config";
import "./App.css";

function pickTextColor(bg?: string): string | undefined {
  if (!bg) return undefined;
  const hex = bg.trim().replace(/^#/, "");
  let r: number, g: number, b: number;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    return undefined;
  }
  if ([r, g, b].some(Number.isNaN)) return undefined;
  const yiq = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return yiq > 0.55 ? "#000" : "#fff";
}

function PadButton({ button }: { button: ButtonConfig }) {
  const handlePress = async () => {
    try {
      await invoke("send_key", { key: button.key });
    } catch (e) {
      console.error(`send_key(${button.key}) failed:`, e);
    }
  };

  const textColor = pickTextColor(button.color);
  const style = {
    ...(button.span && button.span > 1
      ? { gridColumn: `span ${button.span}` }
      : {}),
    ...(button.color ? { "--btn-color": button.color } : {}),
    ...(textColor ? { "--btn-text": textColor } : {}),
  } as React.CSSProperties;

  return (
    <button className="pad-btn" style={style} onPointerDown={handlePress}>
      <span className="pad-btn__label">{button.label}</span>
    </button>
  );
}

function App() {
  return (
    <div className="app">
      <div className="drag-bar" data-tauri-drag-region>
        <span className="drag-bar__hint" data-tauri-drag-region>
          ⋮⋮⋮ drag to move ⋮⋮⋮
        </span>
      </div>
      <main className="pad">
        {BUTTONS.map((b) => (
          <PadButton key={b.id} button={b} />
        ))}
      </main>
    </div>
  );
}

export default App;
