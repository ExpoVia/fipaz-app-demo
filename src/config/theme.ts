export const EXPOVIA_THEME = {
  colors: {
    blue: "#1677b8",
    navy: "#2f2d4c",
    lilac: "#b984b6",
    pink: "#f4a2c0",
    yellow: "#ffc21a",
    green: "#62be5a",
    mint: "#9ed8c9",
    sky: "#82b5e3",
    purple: "#8357a5",
    coral: "#f28a72",
    background: "#f4fafc",
    card: "#ffffff",
    line: "#d8e5ec",
  },
  shell: {
    width: 390,
    height: 844,
    desktopBreakpoint: 640,
    borderRadius: 36,
  },
  motion: {
    quick: 120,
    standard: 220,
    celebration: 800,
  },
} as const;

export type ExpoViaTheme = typeof EXPOVIA_THEME;
