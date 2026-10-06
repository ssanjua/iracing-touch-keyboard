export type ButtonConfig = {
  id: string;
  label: string;
  key: string;
  /** Columns to span in its panel's grid. Default 1. */
  span?: number;
  /** Optional CSS background color. If omitted, uses the default dark style. */
  color?: string;
  /** Which side of the pad to render in. Default "left". */
  panel?: "left" | "right";
};

export const BUTTONS: ButtonConfig[] = [
  { id: "sorry",      label: "SORRY",      key: "5", span: 2, color: "#8b0000" },
  { id: "thanks",     label: "THANK YOU",  key: "6", span: 2, color: "#008000" },
  { id: "pitting",    label: "PITTING IN", key: "1", color: "#000080" },
  { id: "pitting out",label: "PITTING OUT",key: "2", color: "#ff00ff" },
  { id: "pass-left",  label: "PASS LEFT",  key: "3", color: "#808000" },
  { id: "pass-right", label: "PASS RIGHT", key: "4", color: "#800080" },
  { id: "wtf",        label: "WTF",        key: "7", color: "#ff0000" },
  { id: "hello",      label: "HELLO?",      key: "8", color: "#ffff42" },
  { id: "good-luck",  label: "GOOD LUCK",  key: "9", color: "#00ff00" },
  { id: "wipers",     label: "WIPERS",     key: "0", color: "#00ffff" },

  { id: "vol-down", label: "VOL -", key: "VOLUME_DOWN",     color: "#355", panel: "right" },
  { id: "vol-up",   label: "VOL +", key: "VOLUME_UP",       color: "#555", panel: "right" },
  { id: "mute",     label: "🔇",  key: "VOLUME_MUTE",     color: "#444", panel: "right" },
  { id: "pause",    label: "⏯",     key: "MEDIA_PLAY_PAUSE", color: "#ff8585", panel: "right" },
  { id: "prev",     label: "⏮",     key: "MEDIA_PREV",       color: "#555", panel: "right" },
  { id: "next",     label: "⏭",     key: "MEDIA_NEXT",       color: "#696969", panel: "right" },
];
