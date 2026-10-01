export function parseCommand(raw) {
  // Parser contract:
  // - /revision requires an input code target.
  // - /correct never accepts a code; target is resolved from the active rejection gate.
  // - /edit status accepts a/r and normalizes later to accepted/rejected.
  // - /correct accepts i, mr, or shorthand r (alias of mr).
  // - /revision accepts i, mr, or both.
  throw new Error("Not implemented: parser");
}
