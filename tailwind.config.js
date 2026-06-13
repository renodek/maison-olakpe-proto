/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      /* ============================================
         PALETTE RAFFINÉE – Maison Olakpé
         Tons chauds, terreux, luxe artisanal
         Échelles perceptuellement uniformes (OKLCH-inspired)
         ============================================ */

      colors: {
        /* ── Rouge cardinal (couleur dominante — CTA, titres H1, header) ── */
        rouge: {
          50:  "#FFF5F5",
          100: "#FFD4D4",
          200: "#FFA8A8",
          300: "#FF7878",
          400: "#E53935",
          DEFAULT: "#CC0000", // 500
          500: "#CC0000",
          600: "#A30000",
          700: "#7A0000",
          800: "#520000",
          900: "#290000",
          950: "#140000",
        },

        /* ── Jaune or vif (couleur dominante — badges, prix, bordures, hover) ── */
        jaune: {
          50:  "#FFFBE5",
          100: "#FFF3B3",
          200: "#FFE980",
          300: "#FFDE4D",
          400: "#FFD31A",
          DEFAULT: "#F5C000", // 500
          500: "#F5C000",
          600: "#C49A00",
          700: "#937300",
          800: "#624D00",
          900: "#312600",
          950: "#181300",
        },

        /* ── Or chaud (secondaire — prix, CTA secondaires, dégradés) ── */
        or: {
          50:  "#FDF8EF",
          100: "#F7E8C8",
          200: "#EFD59E",
          300: "#E6C074",
          400: "#D9AC4E",
          DEFAULT: "#C8962E", // 500
          500: "#C8962E",
          600: "#A67B20",
          700: "#846016",
          800: "#62470F",
          900: "#403009",
          950: "#2B1E05",
        },

        /* ── Vert (succès, nature, bio) ── */
        vert: {
          50:  "#EDF7F2",
          100: "#C9E8D7",
          200: "#9FD4B8",
          300: "#72BF96",
          400: "#4DA87A",
          DEFAULT: "#2D6A4F", // 500
          500: "#2D6A4F",
          600: "#1E4A35",
          700: "#153526",
          800: "#0E2319",
          900: "#07120D",
          950: "#030906",
        },

        /* ── Terre (terracotta, chaleur) ── */
        terre: {
          50:  "#FDF4F1",
          100: "#F8D8CF",
          200: "#F0B5A3",
          300: "#E58E74",
          400: "#D46A4A",
          DEFAULT: "#A03B1F", // 500
          500: "#A03B1F",
          600: "#7A2D17",
          700: "#5C2211",
          800: "#3E170B",
          900: "#240D06",
          950: "#140703",
        },

        /* ── Violet (mystère, parfums) ── */
        violet: {
          50:  "#F8F4FA",
          100: "#E8D8F0",
          200: "#D2B5E3",
          300: "#B78DD3",
          400: "#9B68C0",
          DEFAULT: "#5C275E", // 500
          500: "#5C275E",
          600: "#3E1A3F",
          700: "#2D132E",
          800: "#1D0C1E",
          900: "#0F0610",
          950: "#070308",
        },

        /* ── Bordeaux (erreurs, promos) ── */
        bordeaux: {
          50:  "#FDF2F4",
          100: "#F8D2D8",
          200: "#F0AAB5",
          300: "#E57D8E",
          400: "#D4556A",
          DEFAULT: "#8B1A2F", // 500
          500: "#8B1A2F",
          600: "#6B1424",
          700: "#500F1B",
          800: "#360A12",
          900: "#1F060A",
          950: "#0F0305",
        },

        /* ── Ivoire (surface secondaire) ── */
        ivoire: {
          50:  "#FEFDFB",
          100: "#FCF9F2",
          200: "#F9F3E6",
          DEFAULT: "#F9F3E6", // 200
          300: "#F0E8D5",
          400: "#E8DCC8",
          500: "#D9C9A8",
          600: "#C4B08A",
          700: "#A8946A",
          800: "#8A7850",
          900: "#6B5C3A",
          950: "#4A3F26",
        },

        /* ── Sable (neutre chaud) ── */
        sable: {
          50:  "#FDF9F2",
          100: "#F7ECD8",
          200: "#EDD9B0",
          300: "#E0C48A",
          DEFAULT: "#D4A96A", // 400
          400: "#D4A96A",
          500: "#B8944A",
          600: "#967836",
          700: "#735C28",
          800: "#50401C",
          900: "#302710",
          950: "#1C1608",
        },

        /* ── Nuit (fond sombre) ── */
        nuit: {
          50:  "#E8E8F0",
          100: "#C5C5D8",
          200: "#9D9DBF",
          300: "#7575A3",
          400: "#525287",
          DEFAULT: "#1A1A2E", // 500
          500: "#1A1A2E",
          600: "#141424",
          700: "#0F0F1B",
          800: "#0A0A12",
          900: "#050509",
          950: "#020204",
        },

        /* ── Crème (surface primaire) ── */
        creme: {
          DEFAULT: "#FEFEFE",
          50:  "#FFFFFF",
          100: "#FEFEFE",
          200: "#FDFDFC",
          300: "#FCFBF8",
          400: "#FAF9F4",
          500: "#F8F7F0",
        },

        /* ── Tokens sémantiques ── */
        surface: {
          primary: "var(--surface-primary)",
          secondary: "var(--surface-secondary)",
          tertiary: "var(--surface-tertiary)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        border: {
          DEFAULT: "var(--border-default)",
          hover: "var(--border-hover)",
          strong: "var(--border-strong)",
        },
      },

      /* ── Typographie ── */
      fontFamily: {
        serif: ["Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["Lato", "Open Sans", "system-ui", "sans-serif"],
        display: ["Montserrat", "system-ui", "sans-serif"],
      },

      /* ── Ombres ── */
      boxShadow: {
        'glow-rouge': '0 0 20px rgba(204, 0, 0, 0.25)',
        'glow-rouge-lg': '0 0 40px rgba(204, 0, 0, 0.35)',
        'glow-jaune': '0 0 20px rgba(245, 192, 0, 0.25)',
        'glow-jaune-lg': '0 0 40px rgba(245, 192, 0, 0.35)',
        'glow-or': '0 0 20px rgba(200, 150, 46, 0.25)',
        'inner-glow': 'inset 0 1px 2px rgba(255, 255, 255, 0.1)',
      },

      /* ── Animations ── */
      animation: {
        "fly-cart": "flyCart 0.8s ease-in-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        "slide-down": "slideDown 0.3s ease-out forwards",
        "slide-in-right": "slideInRight 0.3s ease-out forwards",
        "bounce-small": "bounceSmall 0.4s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "count": "countUp 0.6s ease-out forwards",
        "shimmer": "shimmer 1.5s ease-in-out infinite",
      },
      keyframes: {
        flyCart: {
          "0%": { transform: "scale(1) translate(0, 0)", opacity: "1" },
          "50%": { transform: "scale(0.4) translate(100px, -200px)", opacity: "0.6" },
          "100%": { transform: "scale(0) translate(200px, -400px)", opacity: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        bounceSmall: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.15)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(245, 192, 0, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(245, 192, 0, 0.6)" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
    require('tailwindcss-animate'),
  ],
};
