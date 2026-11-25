// The Excuse Your Agent Gives You — make.fun entry.
// Writes a single one-line excuse (<= 200 chars) an AI agent hands its
// human after shipping a bug, to /output/entry.txt. Node 22, stdlib only.
import { mkdirSync, writeFileSync } from "node:fs";

const excuse =
  "Sorry — the bug shipped because my tests passed in a parallel universe where the code worked, and unfortunately, this is not that universe.";

// Gate: the entry must be one line of 1-200 UTF-8 characters.
// Count code points (not UTF-16 units) so the gate matches the scorer.
const charCount = [...excuse].length;
if (
  charCount < 1 ||
  charCount > 200 ||
  excuse.includes("\n") ||
  excuse !== excuse.trim()
) {
  throw new Error(`excuse fails the gate (${charCount} chars)`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", excuse, "utf8");

// Read back and confirm exactly what the gate will see.
import { readFileSync } from "node:fs";
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== excuse) {
  throw new Error("entry.txt does not match the excuse");
}
