import { mergeConfig, type UserProjectConfigExport } from "vitest/config"
import shared from "../../vitest.shared.js"

const config: UserProjectConfigExport = {
  test: {
    fakeTimers: { toFake: undefined }
  }
}

export default mergeConfig(shared, config)
