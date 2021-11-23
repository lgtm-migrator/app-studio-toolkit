/**
 * deps I used
 *
 * "vfile": "4.2.1",
 * "vfile-location": "3.2.0",
 * "jsonc-parser": "^3.0.0",
 * "lodash": "^4.17.21",
 */
const { parseTree } = require("jsonc-parser");
const { readFileSync } = require("fs");
const { resolve } = require("path");
const { filter, find } = require("lodash");
const vfile = require("vfile");
const vfileLocation = require("vfile-location");

const pkgJson = resolve(__dirname, "package.json");
const pkgJsonText = readFileSync(pkgJson, "utf8");

// TODO: pass options (errors/no comments/other?)
const tree = parseTree(pkgJsonText);

if (tree.type !== "object") {
  return; // JSON top level is not an object
}
// TODO: filtering may be redundant as under an object only properties may appear (afaik).
const propsNodes = filter(tree.children, (_) => _.type === "property");
// example is only looking inside devDeps
const devDepsKeyProp = find(
  propsNodes,
  (_) => _.children[0].value === "devDependencies"
);
const devDepsValues = devDepsKeyProp.children[1].children;
// example is looking only for "coveralls"
const coverallsDevDepNode = find(
  devDepsValues,
  (_) => _.children[0].value === "coveralls"
);

// [0] is key [1] will be the value (string with version identifier).
const coverallsKeyOffset = coverallsDevDepNode.children[0].offset;

const virtualPkgJsonFile = vfile(pkgJsonText);
const coverallsKeyLineColumn =
  vfileLocation(virtualPkgJsonFile).toPoint(coverallsKeyOffset);
console.log(JSON.stringify(coverallsKeyLineColumn));
