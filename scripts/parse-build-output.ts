import { execSync } from "node:child_process";

export type RouteType = "Static" | "SSG" | "Dynamic" | "ISR" | "Edge SSR";

export interface BuildRoute {
  path: string;
  type: RouteType;
  size?: string;
  firstLoad?: string;
}

export interface BuildManifest {
  routes: BuildRoute[];
  generatedAt: string;
}

/**
 * Parse Next.js build output to extract route information
 */
export function parseBuildOutput(output: string): BuildRoute[] {
  const routes: BuildRoute[] = [];
  const lines = output.split("\n");

  // Next.js build output format:
  // Route (app)
  // ┌ ○ /
  // ├ ○ /_not-found
  // ├ ● /blog/[slug]
  // ├ ƒ /api/search
  //
  // Legend:
  // ○ (Static)  - prerendered as static content
  // ● (SSG)     - prerendered as static HTML (uses generateStaticParams)
  // λ (Server)  - server-side renders at runtime
  // ƒ (Dynamic) - server-rendered on demand
  // ℇ (Edge)    - edge server-rendered

  // Matches both formats:
  // With sizes: [├└┌│] [○●λƒℇ] /path size firstLoad
  // Without sizes: [├└┌│] [○●λƒℇ] /path
  const routeLineRegex = /[├└┌│]\s+([○●λƒℇ])\s+(\/[^\s]*)/;

  for (const line of lines) {
    const match = line.match(routeLineRegex);
    if (match) {
      const [, symbol, path] = match;

      let type: RouteType;
      switch (symbol) {
        case "○":
          type = "Static";
          break;
        case "●":
          type = "SSG";
          break;
        case "λ":
          type = "Dynamic";
          break;
        case "ƒ":
          type = "Dynamic";
          break;
        case "ℇ":
          type = "Edge SSR";
          break;
        default:
          type = "Static";
      }

      routes.push({
        path,
        type,
      });
    }
  }

  return routes;
}

/**
 * Run Next.js build and capture the output
 */
export function runBuildAndParse(): BuildManifest {
  console.log("Running Next.js build...");
  const output = execSync("pnpm build", {
    encoding: "utf-8",
    stdio: ["pipe", "pipe", "pipe"],
  });

  const routes = parseBuildOutput(output);

  return {
    routes,
    generatedAt: new Date().toISOString(),
  };
}
