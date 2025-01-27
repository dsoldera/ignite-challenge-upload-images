import { defineGlobalStyles } from "@chakra-ui/react";

export const globalCss = defineGlobalStyles({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  h1: {
    fontSize: "2rem",
    color: "red.100",
  },
  body: {
    bg: 'pGray.900',
    color: 'pGray.50',
  },
})