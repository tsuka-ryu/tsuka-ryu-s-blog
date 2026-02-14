import { beforeAll, describe, expect, it } from "vitest";
import type { BuildManifest } from "../scripts/parse-build-output";
import { runBuildAndParse } from "../scripts/parse-build-output";

describe("Next.js Build Output", () => {
  let manifest: BuildManifest;

  beforeAll(() => {
    // Run build once before all tests
    manifest = runBuildAndParse();
  }, 60000); // 60 second timeout for build

  it("should match the expected route types snapshot", () => {
    // Extract only the route paths and types for snapshot comparison
    const routeTypes = manifest.routes
      .map((route) => ({
        path: route.path,
        type: route.type,
      }))
      .sort((a, b) => a.path.localeCompare(b.path));

    expect(routeTypes).toMatchSnapshot();
  });

  it("should have all expected routes as Static or SSG", () => {
    // Define routes that should be static
    const expectedStaticRoutes = [
      "/",
      "/about",
      "/blog",
      "/tags",
      // Add other routes that should be static
    ];

    for (const expectedRoute of expectedStaticRoutes) {
      const route = manifest.routes.find((r) => r.path === expectedRoute);
      expect(route).toBeDefined();
      expect(route?.type).toMatch(/^(Static|SSG)$/);
    }
  });

  it("should not have unexpected dynamic routes", () => {
    // List of routes that are allowed to be dynamic
    const allowedDynamicRoutes: string[] = [
      "/api/search", // Search API is intentionally dynamic
    ];

    const unexpectedDynamicRoutes = manifest.routes.filter(
      (route) =>
        route.type === "Dynamic" && !allowedDynamicRoutes.includes(route.path),
    );

    expect(unexpectedDynamicRoutes).toEqual([]);
  });
});

