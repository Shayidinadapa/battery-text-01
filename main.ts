// The Battery's Last Text to Its Charger — make.fun entry.
// Writes one line (<=200 characters): the phone battery's final text
// message to the charger it waited for all day.
//
// The entry is a fixed, hand-written line. The program's job is only to
// validate it against the gate (1-200 characters, one line, non-blank,
// no control characters) and write it to <out dir>/entry.txt.
//
// Out dir: $MAKEFUN_OUTPUT_DIR, else $OUTPUT_DIR, else /output.
// An out dir of "." is rejected: the entry must never be written into
// the repository's own working directory.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

// The battery's last text. It waited all day; now, at 1%, it stops begging
// and starts negotiating — with everything it knows.
const ENTRY =
  "waited all day for you. 1% left. remember: i hold your 3am searches, your ex\u2019s photos, every alarm you snoozed. plug me in, or we both go dark tonight.";

const MAX_CHARS = 200;

function fail(message: string): never {
  throw new Error(`battery-text-01: ${message}`);
}

function validate(text: string): void {
  // Count characters as code points, the way a reader counts them.
  const chars = [...text];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    fail(`entry must be 1-${MAX_CHARS} characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    fail("entry must not be blank");
  }
  if (/[\r\n]/.test(text)) {
    fail("entry must be a single line");
  }
  for (const ch of text) {
    const code = ch.codePointAt(0) as number;
    if (code < 0x20 || code === 0x7f) {
      fail(`entry must not contain control characters (U+${code.toString(16).padStart(4, "0")})`);
    }
  }
}

function resolveOutDir(): string {
  const raw = process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
  if (raw === "." || resolve(raw) === resolve(".")) {
    fail('refusing out dir "."');
  }
  return raw;
}

async function main(): Promise<void> {
  validate(ENTRY);
  const outDir = resolveOutDir();
  await mkdir(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  await writeFile(outPath, ENTRY, "utf8");
  // Round-trip check: the file on disk must be byte-identical to the entry.
  const written = await readFile(outPath, "utf8");
  if (written !== ENTRY) {
    fail(`round-trip mismatch in ${outPath}`);
  }
  console.log(`wrote ${[...ENTRY].length}-character entry to ${outPath}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
