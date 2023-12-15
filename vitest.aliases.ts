import * as path from "path"
import { defineProject } from "vitest/config"

// This is a workaround, see https://github.com/vitest-dev/vitest/issues/4744
export default defineProject({
  test: {
    alias: {
      "effect-test": path.join(__dirname, "packages/effect/test"),
      "effect": path.join(__dirname, "packages/effect/src"),
      "@effect/cli/test": path.join(__dirname, "packages/cli/test"),
      "@effect/cli": path.join(__dirname, "packages/cli/src"),
      "@effect/platform/test": path.join(__dirname, "packages/platform", "test"),
      "@effect/platform": path.join(__dirname, "packages/platform", "src"),
      "@effect/platform-node/test": path.join(__dirname, "packages/platform-node", "test"),
      "@effect/platform-node": path.join(__dirname, "packages/platform-node", "src"),
      "@effect/platform-bun/test": path.join(__dirname, "packages/platform-bun/test"),
      "@effect/platform-bun": path.join(__dirname, "packages/platform-bun/src"),
      "@effect/platform-browser/test": path.join(__dirname, "packages/platform-browser/test"),
      "@effect/platform-browser": path.join(__dirname, "packages/platform-browser/src"),
      "@effect/printer/test": path.join(__dirname, "packages/printer", "test"),
      "@effect/printer": path.join(__dirname, "packages/printer", "src"),
      "@effect/printer-ansi/test": path.join(__dirname, "packages/printer-ansi/test"),
      "@effect/printer-ansi": path.join(__dirname, "packages/printer-ansi/src"),
      "@effect/schema/test": path.join(__dirname, "packages/schema/test"),
      "@effect/schema": path.join(__dirname, "packages/schema/src"),
      "@effect/typeclass/test": path.join(__dirname, "packages/typeclass/test"),
      "@effect/typeclass": path.join(__dirname, "packages/typeclass/src")
    }
  }
})
