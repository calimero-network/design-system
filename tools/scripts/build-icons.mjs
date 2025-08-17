import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { optimize } from "svgo";
import { transform } from "@svgr/core";
import { globby } from "globby";
import svgoConfig from "../svgo.config.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW = path.resolve(__dirname, "../../packages/icons/raw");
const OUT = path.resolve(__dirname, "../../packages/icons/src");

await mkdir(OUT, { recursive: true });

const files = await globby("*.svg", { cwd: RAW });
const exportsList = [];

for (const filename of files) {
  const filePath = path.join(RAW, filename);
  let svg = await readFile(filePath, "utf8");

  // Normalize color & viewBox
  svg = svg
    .replace(/stroke="#[0-9A-Fa-f]{3,8}"/g, 'stroke="currentColor"')
    .replace(/fill="#[0-9A-Fa-f]{3,8}"/g, 'fill="none"');

  const { data } = optimize(svg, { path: filePath, ...svgoConfig });
  const componentName = filename
    .replace(/\.svg$/, "")
    .replace(/(^[a-z])|-(\w)/g, (_, a, b) => (a ? a.toUpperCase() : b.toUpperCase()));

  const tsx = await transform(
    data,
    {
      typescript: true,
      icon: false,
      jsxRuntime: "automatic",
      template: ({ imports, interfaces, componentName, props, jsx }, { tpl }) =>
        tpl`
${imports}
import * as React from "react";
import { IconBase, IconProps } from "./IconBase";
${interfaces}
const ${componentName} = React.forwardRef<SVGSVGElement, IconProps>((${props}) => (
  <IconBase ref={ref} {...props}>${jsx.children}</IconBase>
));
${componentName}.displayName = "${componentName}";
export { ${componentName} };
`
    },
    { componentName }
  );

  await writeFile(path.join(OUT, `${componentName}.tsx`), tsx, "utf8");
  exportsList.push(`export { ${componentName} } from "./${componentName}";`);
}

await writeFile(path.join(OUT, "index.ts"), `export * from "./IconBase";\n${exportsList.join("\n")}\n`);
console.log(`Generated ${exportsList.length} icons.`); 