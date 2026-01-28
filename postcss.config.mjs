const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  colors: {
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",

    card: {
      DEFAULT: "hsl(var(--card))",
      foreground: "hsl(var(--card-foreground))",
    },

    border: "hsl(var(--border))",
    muted: {
      DEFAULT: "hsl(var(--muted))",
      foreground: "hsl(var(--muted-foreground))",
    },

    red: {
      DEFAULT: "hsl(var(--red))",
      foreground: "hsl(var(--red-foreground))",
    },
    blue: {
      DEFAULT: "hsl(var(--blue))",
      foreground: "hsl(var(--blue-foreground))",
    },
    green: {
      DEFAULT: "hsl(var(--green))",
      foreground: "hsl(var(--green-foreground))",
    },
  },
};

export default config;
