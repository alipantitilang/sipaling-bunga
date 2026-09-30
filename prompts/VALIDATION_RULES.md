# VALIDATION RULES

`generated` = output exists, awaiting Gardener decision.

`accepted` = Gardener accepted current output.

`rejected` = Gardener rejected output; `/correct` is required.

`valid` = final mature story, ready for export.

Final transition:

```text
generated → accepted → valid
```

Mature does not automatically mean valid.

A rejected output must never be exported as final.
