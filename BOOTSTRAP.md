# BOOTSTRAP

Sipal­ing Bunga adalah internal upstream system untuk Sunday Garden.

## Baca dalam urutan

1. `README.md`
2. `PROJECT_STATE.md`
3. `AI_HANDOFF.md`
4. `schema/command.schema.json`
5. `schema/story.schema.json`
6. `prompts/CORE_PROMPT.md`
7. `prompts/GENERATION_RULES.md`
8. `prompts/VALIDATION_RULES.md`

## Source of truth

```text
data/       → current data
history/    → evolution/audit trail
schema/     → data contract
prompts/    → AI behavior
references/ → Sunday Garden style
```

Jangan menganggap percakapan sebelumnya sebagai database.

## Immutability

Flower sebuah story tidak dapat diganti.

Jika ingin flower lain, buat story baru dengan `/input`.

## Command discipline

Jangan melakukan mutation tanpa command yang sesuai.
