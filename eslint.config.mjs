import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const compat     = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    linterOptions: {
      // Don't error when an eslint-disable comment turns out to be unnecessary
      reportUnusedDisableDirectives: "warn",
    },
    rules: {
      // prefer-as-const fires on inline React style casts — not useful here
      "@typescript-eslint/prefer-as-const": "off",
      // Unused vars: allow underscore-prefixed ignores
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      }],
      // hooks deps: warn only (we document intentional omissions with comments)
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;
