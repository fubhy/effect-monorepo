import { mergeConfig, type UserProjectConfigExport } from "vitest/config"
import shared from "../../vitest.shared.js"

const config: UserProjectConfigExport = {
  test: {
    environment: "happy-dom"
  }
}

export default mergeConfig(shared, config)
