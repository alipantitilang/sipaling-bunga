export function normalizeStatus(value) {
  if (value === "a" || value === "accepted") return "accepted";
  if (value === "r" || value === "rejected") return "rejected";
  throw new Error(`Invalid status: ${value}`);
}

export function normalizeCorrectionField(field) {
  if (field === "r") return "mr";
  if (field === "i" || field === "mr") return field;
  throw new Error(`Invalid correction field: ${field}`);
}

export function assertCorrectionGate(story) {
  if (story?.state?.status !== "rejected") {
    throw new Error("/correct requires a preceding /edit {output-code} status: r");
  }
}

export function assertRevisionTarget(story, inputCode) {
  if (!inputCode || story?.input_code !== inputCode) {
    throw new Error("/revision requires the selected input code");
  }
  if (story?.state?.status !== "valid") {
    throw new Error("/revision is only available for valid stories");
  }
}
