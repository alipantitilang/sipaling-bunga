# COMMANDS

Sipaling Bunga menggunakan command sebagai antarmuka mutation/read terhadap story.

## Field IDs

```text
n  = name
f  = flower
mr = meaning & reason
 i = inspiration
```

`mr` adalah satu field dan tidak boleh dipisah menjadi `m` + `r`.

Maturity tags:

```text
[r] = raw
[m] = mature
```

Status shorthand pada `/edit`:

```text
a = accepted
r = rejected
```

Database tetap menyimpan status lengkap: `accepted` / `rejected`.

---

## `/input`

Membuat story baru.

```text
/input n: {name} f: {flower}
/input n: {name} f: {flower} mr[r]: {text}
/input n: {name} f: {flower} mr[m]: {text}
/input n: {name} f: {flower} i[r]: {text}
/input n: {name} f: {flower} i[m]: {text}
```

Membuat `input_code` dan `output_code` baru.

---

## `/output`

Read-only. Hanya menerima output code.

```text
/output {output-code}
```

Tidak melakukan generation, mutation, atau validation.

---

## `/edit`

### Rename Gardener

```text
/edit {input-code} n: {new-name}
```

Rename bersifat global dan atomic. `story_id` internal tidak berubah; human-facing codes dapat berubah.

### Set output status

**Rejected:**

```text
/edit {output-code} status: r
```

**Accepted:**

```text
/edit {output-code} status: a
```

Status shorthand dinormalisasi ke status internal:

```text
r → rejected
a → accepted
```

`/correct` hanya boleh dijalankan setelah status menjadi `rejected`.

Flower tidak pernah boleh diedit.

---

## `/correct`

`/correct` **tidak menerima code**.

Syarat wajib: story sudah ditandai rejected dengan `/edit`.

```text
/edit {output-code} status: r
/correct i: {correction}
```

atau:

```text
/edit {output-code} status: r
/correct mr: {correction}
```

Alias shorthand `r:` dapat diterima untuk `mr:` pada `/correct`:

```text
/correct r: {correction}
```

Jika keduanya dikoreksi dalam satu command:

```text
/correct i: {inspiration correction} mr: {meaning & reason correction}
```

Koreksi tidak memerlukan output code lagi karena target sudah ditetapkan oleh state story yang baru saja ditolak.

Setelah correction, sistem membuat output baru. Untuk menerima hasil baru:

```text
/edit {output-code} status: a
```

---

## `/update`

Direct input update sebelum story `valid`.

```text
/update {input-code} mr[r]: {text}
/update {input-code} mr[m]: {text}
/update {input-code} i[r]: {text}
/update {input-code} i[m]: {text}
```

Tidak digunakan untuk rename atau mengganti flower.

---

## `/revision`

Revision hanya untuk story yang sudah `valid` dan **wajib memakai input code**.

```text
/revision {input-code} i: {latest i input}
/revision {input-code} mr: {latest mr input}
```

Keduanya sekaligus:

```text
/revision {input-code} i: {latest i input} mr: {latest mr input}
```

Revision membuat versi baru dari story yang sudah valid. Versi lama tetap di history dan versi terbaru menjadi current.

---

## `/remove`

```text
/remove {input-code}
/remove confirm {input-code}
```

Menghapus current data dan history sesuai aturan penghapusan repository.

---

## Command relationship

```text
/input
  ↓
/update ───────────────┐
  ↓                    │
 generated             │
  ↓                    │
/edit {output} status:r│
  ↓                    │
/correct               │
  ↓                    │
 generated ────────────┘
  ↓
/edit {output} status:a
  ↓
next level / valid

valid
  ↓
/revision {input-code} i/mr: ...
  ↓
new valid current version

/output {output-code}
  ↓
read-only export
```

## Hard rules

1. `f` / flower immutable.
2. `/output` read-only.
3. `/correct` wajib didahului `/edit {output-code} status: r`.
4. `/correct` tidak menerima code.
5. `/revision` wajib menerima **input code**.
6. `/revision` hanya untuk story `valid`.
7. `/update` hanya sebelum `valid`.
8. `/edit ... n:` adalah satu-satunya command rename Gardener.
9. `mr` tetap satu field.
10. History append-only.
