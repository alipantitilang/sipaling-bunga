import { assertCorrectionGate, normalizeCorrectionField } from "./protocol.js";

export async function handleCorrect(command, context) {
  // Target is resolved from the correction session opened by /edit ... status: r.
  // /correct must not receive an output code.
  const story = context?.currentCorrectionStory;
  assertCorrectionGate(story);

  const fields = Object.fromEntries(
    Object.entries(command.fields ?? {}).map(([key, value]) => [normalizeCorrectionField(key), value]),
  );

  if (!Object.keys(fields).length) throw new Error("/correct requires i, mr, or both");
  throw new Error("Not implemented: /correct execution");
}
