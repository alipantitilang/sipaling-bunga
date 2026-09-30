# Sipaling Bunga

Internal data-maturation tool for **Sunday Garden**.

> Tempat cerita ditemukan dan dimatangkan.  
> Sunday Garden adalah tempat cerita yang telah matang diceritakan.

## Prinsip

- Gardener owns personal meaning.
- AI membantu discovery, refinement, dan expression; bukan penentu kebenaran personal.
- Flower pada sebuah story bersifat **immutable**.
- `current` adalah keadaan terbaru; `history` adalah audit trail yang tidak ditimpa.
- Repository adalah source of truth, bukan percakapan AI.
- `/output` adalah batas ekspor menuju Sunday Garden.

## Field IDs

| ID | Field |
|---|---|
| `n` | name |
| `f` | flower |
| `mr` | meaning & reason |
| `i` | inspiration |

Maturity: `[r]` raw, `[m]` mature.

Contoh:

```text
/input n: Alip f: Blue Lotus
/input n: Sarah f: Stargazer Lily i[r]: Aku awalnya memilihnya karena bunganya cantik.
/input n: Alip f: Blue Lotus mr[m]: Aku bangga karena masih mampu melewati hidup yang tidak selalu indah.
```

## Commands

```text
/input
/output
/edit
/correct
/update
/revision
/remove
```

Detail syntax ada di `COMMANDS.md`.

## State

Output status:

```text
generated → accepted → valid
generated → rejected → /correct → generated
```

`level` dan `status` berbeda. Level adalah kematangan data; status adalah keadaan validasi.

Maturity field bersifat asynchronous:

```text
mr = mature
i  = raw
```

adalah state yang valid.

## Identity

Setiap story memiliki immutable internal `story_id`.

Human-facing codes dapat berubah ketika Gardener di-rename:

```text
SGI-ALIP-BLUELOTUS-01
SGO-ALIP-BLUELOTUS-01
```

menjadi:

```text
SGI-REGI-BLUELOTUS-01
SGO-REGI-BLUELOTUS-01
```

Code lama menjadi historical identifier dan tidak boleh dipakai ulang.

## Portability

AI baru cukup membaca:

1. `BOOTSTRAP.md`
2. `PROJECT_STATE.md`
3. `AI_HANDOFF.md`
4. `schema/command.schema.json`
5. `prompts/CORE_PROMPT.md`

**No important knowledge exists only inside a conversation.**
