# CHANGELOG

## [1.0.0] - 2026-09-29

- Initial repository baseline.
- Command protocol.
- Field IDs `n`, `f`, `mr`, `i`.
- Raw/mature maturity model.
- State/status model.
- Immutable flower rule.
- Immutable internal story ID.
- Rename architecture.
- History architecture.
- Prompt system.
- JSON schemas.
- Examples.
- Test specifications.
- Source skeleton.

## Database import — 2026-10-01T15:28:31.098592Z

- Imported 17 current `/input` stories from the conversation.
- Added current gardener story records, flower records, story history, and `data/index.json`.
- All imported stories remain `generated`; none were promoted to `valid`.

## Database import — 2026-10-01T15:35:28.837189Z

- Added `/input` story for **Beeya — Common Sunflower**.
- Created current story data, flower record, history, and index entry.
- Story remains **Level 0 / generated** with `i: raw`; no personal meaning/reason was inferred as confirmed fact.


## Beeya update — 2026-10-01T18:19:49.480453Z

- Updated `SGI-BEEYA-COMMONSUNFLOWER-01` with Gardener-provided `i[r]`.
- Preserved the raw inspiration input in current data and history.
- Regenerated the current AI inspiration from the new raw input.
- Story remains `level: 0`, `status: generated`; `mr` remains absent and `i` remains raw.
## Command protocol revision — 2026-10-02

- `/revision` now requires an explicit input code: `/revision {input-code} i/mr: ...`.
- `/correct` no longer accepts an output code. It requires a preceding `/edit {output-code} status: r`.
- `/edit` status shorthand is now `r` = rejected and `a` = accepted. Database status remains normalized as `rejected` / `accepted`.
- `/correct` supports `i`, `mr`, or both in one command. `r:` is documented as a shorthand alias for canonical `mr:`.
- Updated README, COMMANDS, command schema, prompts, project state, handoff, and command tests.

## Integrity fix — 2026-10-02

- Synchronized Beeya's `data/index.json` entry with the current `SGI/SGO-BEEYA-COMMONSUNFLOWER-01` codes.
- Verified every `data/index.json` story entry matches its current story file for `story_id`, `input_code`, and `output_code`.
## Database import — Gina — 2026-10-03

- Added Gina / Pink Tulip as a new Level 1 story.
- Stored mature `mr` input and raw `i` input.
- Generated inspiration from the raw inspiration while preserving Gardener-owned meaning & reason.
- Added current story, gardener record, flower reference, history, and index entry.
- Removed redundant `data/flowers/bluelotus.json`; `data/flowers/blue-lotus.json` remains the canonical Blue Lotus reference.
- Updated `src/index.js` version string to v1.1.0.
- Removed unused command protocol alias constants; normalization functions remain the active contract.

