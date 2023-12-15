import * as path from "path"
import { defineWorkspace, mergeConfig, type UserWorkspaceConfig } from "vitest/config"

// Remaining issues:
// - Random failures (browser): https://github.com/vitest-dev/vitest/issues/4497
// - Alias resolution (browser, has workaround): https://github.com/vitest-dev/vitest/issues/4744
// - Workspace optimization: https://github.com/vitest-dev/vitest/issues/4746

const defineProject = (pkg: string, name: string, config?: UserWorkspaceConfig["test"]) =>
  mergeConfig({
    extends: "vitest.shared.ts",
    root: path.join(__dirname, pkg),
    test: { name, ...config }
  }, config)

export default defineWorkspace([
  defineProject("packages/effect", "effect", { fakeTimers: { toFake: undefined } }),
  defineProject("packages/schema", "schema"),
  defineProject("packages/typeclass", "typeclass"),
  defineProject("packages/cli", "cli"),
  defineProject("packages/printer", "printer"),
  defineProject("packages/printer-ansi", "printer-ansi"),
  defineProject("packages/platform", "platform"),
  defineProject("packages/platform-node", "platform-node"),
  defineProject("packages/platform-bun", "platform-bun"),
  defineProject("packages/platform-browser", "platform-browser", { environment: "happy-dom" })
])
