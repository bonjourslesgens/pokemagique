import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    settings: {
      react: {
        version: "18.3"
      }
    }
  },
  {
    ignores: [".next/**", "node_modules/**", "work/**", "outputs/**"]
  }
];

export default eslintConfig;
