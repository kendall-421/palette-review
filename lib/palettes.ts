export interface ColorSwatch {
  name: string;
  hex: string;
  role: string;
}

export interface LogoCombo {
  bg: string;
  fg: string;
  label: string;
}

export interface Palette {
  id: string;
  title: string;
  badge: string;
  desc: string;
  colors: ColorSwatch[];
  combos?: LogoCombo[];
  combosImages?: string[]; // paths relative to /public — takes precedence over combos[]
}

// Placeholder palettes — replace hex values, names, and combos with real palette data
export const PALETTES: Palette[] = [
  {
    id: "palette-a",
    title: "Option A",
    badge: "Palette A",
    desc: "Periwinkle, lime, cream, and black — a bold, energetic combo with strong contrast and a playful edge.",
    colors: [
      { name: "Periwinkle", hex: "#8C95E8", role: "Secondary" },
      { name: "Cream", hex: "#FDFFF2", role: "Background" },
      { name: "Lime", hex: "#EDFE53", role: "Primary" },
      { name: "Black", hex: "#000000", role: "Text" },
    ],
    combos: [
      { bg: "#EDFE53", fg: "#000000", label: "Lime / Black" },
      { bg: "#000000", fg: "#EDFE53", label: "Black / Lime" },
      { bg: "#8C95E8", fg: "#FDFFF2", label: "Periwinkle / Cream" },
    ],
    combosImages: ["/palette-a-logos.png", "/palette-a-logos-2.png"],
  },
  {
    id: "palette-b",
    title: "Option B",
    badge: "Palette B",
    desc: "Olive green, sky blue, cream, and charcoal — earthy and grounded with a fresh pop of color.",
    colors: [
      { name: "Olive", hex: "#ABCA41", role: "Primary" },
      { name: "Sky", hex: "#1EB8E1", role: "Accent" },
      { name: "Cream", hex: "#FCF3E4", role: "Background" },
      { name: "Charcoal", hex: "#262626", role: "Text" },
    ],
    combosImages: ["/palette-b-logos-2.png", "/palette-b-logos.png"],
  },
  {
    id: "palette-c",
    title: "Option C",
    badge: "Palette C",
    desc: "Sky blue, burnt orange, peach, and dark brown — warm and earthy with a natural, outdoorsy feel.",
    colors: [
      { name: "Sky", hex: "#D5E6F6", role: "Background" },
      { name: "Burnt Orange", hex: "#D76439", role: "Primary" },
      { name: "Peach", hex: "#FAEEE5", role: "Light" },
      { name: "Dark Brown", hex: "#402A22", role: "Text" },
    ],
    combosImages: ["/palette-c-logos.png", "/palette-c-logos-2.png"],
  },
  {
    id: "palette-d",
    title: "Option D",
    badge: "Palette D",
    desc: "Lavender, deep purple, cream, and near-black — rich and moody with a bold, electric energy.",
    colors: [
      { name: "Lavender", hex: "#C3A4F2", role: "Light" },
      { name: "Purple", hex: "#5B3FA6", role: "Primary" },
      { name: "Cream", hex: "#F6ECD9", role: "Background" },
      { name: "Midnight", hex: "#241531", role: "Text" },
    ],
    combosImages: ["/palette-d-logos.png", "/palette-d-logos-2.png"],
  },
];
