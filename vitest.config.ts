import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTest/setupTest.ts",
    coverage: {
      reporter: ["text", "html"],
      exclude: [
        "**/*.stories.ts",
        "**/*.stories.tsx",
        "**/*.config.ts",
        "**/*.config.js",
        "**/.storybook/**",
        "**/vite-env.d.ts",
        "**/*.test.tsx",
        "**/*.test.ts",
      ],
    },
  },
});
