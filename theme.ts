import { globalCss } from "@/theme/global-css"
import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {	
        red: {
          100: { value: "#fff1f0" },
        },
        pGray: {
          '50':  { value: "#F3F2F2" },
          '100': { value: "#DDDCDA" },
          '200': { value: "#C7C5C2" }, 
          '300': { value: "#B1AFAA" },
          '400': { value: "#9B9892" },
          '500': { value: "#85817A" },
          '600': { value: "#6A6762" },
          '700': { value: "#504E49" },
          '800': { value: "#353431" },
          '900': { value: "#1B1A18" },
        },
      },
      fonts: {
        heading: { value: "var(--font-roboto)" },
        body: { value: "var(--font-roboto)" },
      },
    },
  },
  globalCss: globalCss,
})