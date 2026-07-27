// Required file convention for @next/mdx with the App Router.
// The allowlist itself lives in components/content/mdx-components.tsx.

import type { MDXComponents } from "mdx/types";
import { mdxComponents } from "@/components/content/mdx-components";

export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
