// =========================================
// ARKAVENA — JSON-LD Serialization
// =========================================
// JSON-LD is injected as a raw script body, so it must be escaped against
// closing-tag breakouts. Authors never hand-write JSON-LD in MDX.
//
// U+2028 and U+2029 are legal inside JSON strings but are line terminators in
// JavaScript source, so they are escaped as well. They are written here as
// escape sequences only: a literal U+2028 cannot appear in a regex literal.

const LINE_SEPARATOR = " ";
const PARAGRAPH_SEPARATOR = " ";

const ESCAPE_MAP: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
  [LINE_SEPARATOR]: "\\u2028",
  [PARAGRAPH_SEPARATOR]: "\\u2029",
};

const UNSAFE_CHARACTERS = new RegExp("[<>&\\u2028\\u2029]", "g");

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(
    UNSAFE_CHARACTERS,
    (character) => ESCAPE_MAP[character]
  );
}
