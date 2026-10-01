# VALIDATION RULES

`generated` = output exists, awaiting Gardener decision.

`accepted` = Gardener accepted current output.

`rejected` = Gardener rejected output; `/correct` becomes available only after `/edit {output-code} status: r`.

`valid` = final mature story, ready for export.

## Status command codes

Human-facing `/edit` status shorthand:

```text
a → accepted
r → rejected
```

The database stores the normalized full status names.

## Correct flow

```text
/edit {output-code} status: r
        ↓
/correct i/mr: ...
        ↓
new generated output
        ↓
/edit {output-code} status: a
```

`/correct` without a prior rejected state must be rejected.

## Final transition

```text
generated → accepted → valid
```

Mature does not automatically mean valid.

A rejected output must never be exported as final.

## Revision

`/revision {input-code} i/mr: ...` is only available for a story whose current status is `valid`.

Revision creates a new current version while preserving the previous valid version in history.
