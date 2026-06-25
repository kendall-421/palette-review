export interface ColorSwatch {
  name: string;
  hex: string;
  role: string;
}

export interface Palette {
  id: string;
  title: string;
  badge: string;
  desc: string;
  colors: ColorSwatch[];
}

// Placeholder palettes — replace hex values and names with real palette data
export const PALETTES: Palette[] = [
  {
    id: "palette-a",
    title: "Option A",
    badge: "Palette A",
    desc: "Placeholder — add your description for this palette option here.",
    colors: [
      { name: "Placeholder 1", hex: "#CCCCCC", role: "Primary" },
      { name: "Placeholder 2", hex: "#AAAAAA", role: "Secondary" },
      { name: "Placeholder 3", hex: "#888888", role: "Accent" },
      { name: "Placeholder 4", hex: "#666666", role: "Background" },
      { name: "Placeholder 5", hex: "#444444", role: "Text" },
    ],
  },
  {
    id: "palette-b",
    title: "Option B",
    badge: "Palette B",
    desc: "Placeholder — add your description for this palette option here.",
    colors: [
      { name: "Placeholder 1", hex: "#CCCCCC", role: "Primary" },
      { name: "Placeholder 2", hex: "#AAAAAA", role: "Secondary" },
      { name: "Placeholder 3", hex: "#888888", role: "Accent" },
      { name: "Placeholder 4", hex: "#666666", role: "Background" },
      { name: "Placeholder 5", hex: "#444444", role: "Text" },
    ],
  },
  {
    id: "palette-c",
    title: "Option C",
    badge: "Palette C",
    desc: "Placeholder — add your description for this palette option here.",
    colors: [
      { name: "Placeholder 1", hex: "#CCCCCC", role: "Primary" },
      { name: "Placeholder 2", hex: "#AAAAAA", role: "Secondary" },
      { name: "Placeholder 3", hex: "#888888", role: "Accent" },
      { name: "Placeholder 4", hex: "#666666", role: "Background" },
      { name: "Placeholder 5", hex: "#444444", role: "Text" },
    ],
  },
  {
    id: "palette-d",
    title: "Option D",
    badge: "Palette D",
    desc: "Placeholder — add your description for this palette option here.",
    colors: [
      { name: "Placeholder 1", hex: "#CCCCCC", role: "Primary" },
      { name: "Placeholder 2", hex: "#AAAAAA", role: "Secondary" },
      { name: "Placeholder 3", hex: "#888888", role: "Accent" },
      { name: "Placeholder 4", hex: "#666666", role: "Background" },
      { name: "Placeholder 5", hex: "#444444", role: "Text" },
    ],
  },
];
