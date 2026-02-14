import { beforeAll, describe, expect, it } from "vitest";

import { runBuildAndParse } from "../scripts/parse-build-output";

import type { BuildManifest } from "../scripts/parse-build-output";

describe("Next.js Build Output", () => {
  let manifest: BuildManifest;

  beforeAll(() => {
    // Run build once before all tests
    manifest = runBuildAndParse();
  }, 60000); // 60 second timeout for build

  it("should not have any route type changes from previous build", () => {
    // Extract route paths and types, sorted for consistent comparison
    const routeTypes = manifest.routes
      .map((route) => ({
        path: route.path,
        type: route.type,
      }))
      .sort((a, b) => a.path.localeCompare(b.path));

    // This will fail if any route changes from Static to Dynamic or vice versa
    expect(routeTypes).toMatchSnapshot();
  });
});
