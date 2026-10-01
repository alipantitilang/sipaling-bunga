import { normalizeStatus } from "./protocol.js";

export async function handleEdit(command, context) {
  if (command.fields?.status) {
    const status = normalizeStatus(command.fields.status);
    if (!command.target_code?.startsWith("SGO-")) {
      throw new Error("Status edit requires an output code");
    }
    if (status === "rejected") {
      // Opens the correction session; actual persistence remains to be implemented.
      context.currentCorrectionOutputCode = command.target_code;
    }
    throw new Error("Not implemented: /edit execution");
  }

  throw new Error("Not implemented: /edit execution");
}
