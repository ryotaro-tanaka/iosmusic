//
// CONSIDER: migrating to expo-file-system
//

const fs = require("fs");
const path = require("path");

const songsDir = path.join(__dirname, "../assets/songs");
const outFile = path.join(__dirname, "../generated/m4aSongs.ts");

const files = fs.readdirSync(songsDir)
  .filter(f => f.endsWith(".m4a"));

const arr = files.map((file, idx) => ({
  id: (idx + 1).toString(),
  title: file.replace(/\.m4a$/, ""),
  file: `require("../assets/songs/${file}")`
}));

const content =
  "// This file is auto-generated. Do not edit manually.\n" +
  "export const m4aSongs = [\n" +
  arr.map(song =>
    `  { id: "${song.id}", title: "${song.title}", file: ${song.file} },`
  ).join("\n") +
  "\n];\n";

fs.writeFileSync(outFile, content);
console.log("m4aSongs.ts generated.");