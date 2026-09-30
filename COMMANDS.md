# COMMANDS

## Syntax

```text
/input n: {name} f: {flower}
/input n: {name} f: {flower} mr[r]: {text}
/input n: {name} f: {flower} mr[m]: {text}
/input n: {name} f: {flower} i[r]: {text}
/input n: {name} f: {flower} i[m]: {text}

/output {output-code}

/edit {input-code} n: {new-name}
/edit {output-code} status: {generated|accepted|rejected}

/correct mr: {text}
/correct i: {text}

/update {input-code} mr[r]: {text}
/update {input-code} mr[m]: {text}
/update {input-code} i[r]: {text}
/update {input-code} i[m]: {text}

/revision mr: {text}
/revision i: {text}

/remove {input-code}
/remove confirm {input-code}
```

## Rules

- `f` is immutable.
- Gardener rename uses only `/edit {input-code} n:`.
- Rename updates all references atomically.
- `/output` is read-only.
- `/correct` requires `rejected`.
- `/update` is only before `valid`.
- `/revision` is only for `valid` stories.
- `/remove` uses two-step confirmation by default.
