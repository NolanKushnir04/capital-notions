// Lets TypeScript accept stylesheet imports like `import "./globals.css"`.
// Newer TypeScript versions (such as the one built into VS Code) flag these
// by default; Next.js handles the CSS itself.
declare module "*.css";
