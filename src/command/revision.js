import { assertRevisionTarget } from "./protocol.js";

export async function handleRevision(command, context) {
  const inputCode = command.target_code;
  const story = await context?.database?.getStory?.(inputCode);
  assertRevisionTarget(story, inputCode);

  if (!command.fields || (!command.fields.i && !command.fields.mr)) {
    throw new Error("/revision requires i, mr, or both");
  }

  throw new Error("Not implemented: /revision execution");
}
