# Product Requirements Document
# Sipaling Bunga

**Product:** Sipaling Bunga  
**Version:** 1.1.0  
**Product Type:** Internal data-maturation & story-development tool  
**Parent Project:** Sunday Garden  
**Status:** Product specification / implementation reference

---

## 1. Product Overview

**Sipaling Bunga** adalah tools internal yang digunakan untuk membantu Developer mendampingi calon Gardener dalam menemukan, mematangkan, memperbaiki, dan memvalidasi cerita personal di balik bunga yang mereka pilih sebelum cerita tersebut dipublikasikan ke **Sunday Garden**.

Sipaling Bunga bukan ensiklopedia bunga.

Sipaling Bunga juga bukan sistem yang menentukan arti seseorang berdasarkan simbolisme bunga.

Fungsi utamanya adalah menjadi **ruang antara pilihan bunga dan cerita personal**.

```text
Calon Gardener
       ↓
Developer Consultation
       ↓
Sipaling Bunga
       ↓
Input
       ↓
Discovery
       ↓
Maturation
       ↓
Validation
       ↓
/output
       ↓
Sunday Garden
```

### Core principle

> **The flower is the question; the person is the answer.**

Bunga membantu membuka pertanyaan.

Manusialah yang menentukan jawabannya.

---

# 2. Problem Statement

Tidak semua calon Gardener datang dengan cerita yang sudah lengkap.

Seseorang mungkin hanya berkata:

> "Aku suka sunflower."

Orang lain mungkin sudah mengetahui alasannya:

> "Aku memilih sunflower karena mengingatkanku pada seseorang."

Ada pula yang sudah memiliki makna personal tetapi belum mampu menuliskannya dengan baik.

Jika seluruh proses dilakukan secara manual di dalam percakapan, beberapa masalah muncul:

- input mudah tercecer;
- alasan personal dapat berubah tanpa jejak;
- AI dapat mencampur interpretasi dengan fakta personal;
- sulit mengetahui mana data terbaru;
- sulit melacak proses perkembangan sebuah cerita;
- sulit melanjutkan pekerjaan ketika percakapan atau AI berganti;
- tidak ada batas jelas antara data mentah, data matang, dan data valid;
- Developer harus mengingat terlalu banyak aturan secara manual.

Sipaling Bunga dibuat untuk mengatasi masalah tersebut.

---

# 3. Product Goal

### Primary Goal

Menyediakan sistem terstruktur yang mampu membawa sebuah story dari:

```text
belum memiliki cerita
        ↓
memiliki petunjuk
        ↓
memiliki bahan personal
        ↓
memiliki narasi
        ↓
divalidasi Gardener
        ↓
siap dipublikasikan
```

### Secondary Goals

- Menjaga kepemilikan makna personal tetap berada pada Gardener.
- Membantu Developer melakukan konsultasi secara konsisten.
- Memisahkan current data dari historical data.
- Menyediakan audit trail lengkap.
- Memungkinkan workflow dilanjutkan oleh AI atau Developer lain.
- Menjadikan repository sebagai source of truth.
- Menyediakan export boundary yang jelas melalui `/output`.
- Membuat sistem AI-agnostic sehingga dapat digunakan bersama ChatGPT, Gemini, Claude, local LLM, atau implementasi AI lain.

---

# 4. Non-Goals

Sipaling Bunga **tidak bertujuan untuk**:

- menentukan kepribadian seseorang berdasarkan bunga;
- mengatakan bahwa simbolisme bunga adalah fakta personal;
- memaksa Gardener menerima interpretasi AI;
- menjadi flower encyclopedia;
- menggantikan konsultasi manusia;
- menjadi repository utama website Sunday Garden;
- menyimpan hanya hasil akhir tanpa histori;
- mengubah bunga dari story yang sudah dibuat;
- melakukan ranking terhadap cerita atau manusia;
- menganggap output AI sebagai kebenaran personal.

---

# 5. Target Users

## 5.1 Gardener

Orang yang memiliki atau memilih sebuah bunga.

Gardener memiliki otoritas terhadap:

- makna personal;
- alasan memilih bunga;
- pengalaman yang menjadi dasar cerita;
- apakah suatu interpretasi terasa benar;
- apakah suatu narasi merepresentasikan dirinya.

Gardener tidak harus berinteraksi langsung dengan command system.

---

## 5.2 Developer

Developer adalah fasilitator utama.

Developer:

- berkonsultasi dengan calon Gardener;
- mengumpulkan informasi;
- memasukkan data ke Sipaling Bunga;
- menentukan maturity berdasarkan hasil konsultasi;
- meminta AI menghasilkan atau memperbaiki narasi;
- meminta validasi kepada Gardener;
- mengambil hasil melalui `/output`;
- memasukkan hasil matang ke repository Sunday Garden.

---

## 5.3 AI

AI berfungsi sebagai:

- discovery assistant;
- writing/refinement assistant;
- narrative assistant;
- consistency assistant.

AI **bukan pemilik makna personal**.

---

# 6. Core Concepts

## 6.1 Story

Story adalah satu hubungan antara:

```text
Gardener + Flower + Personal Story
```

Satu Gardener dapat memiliki lebih dari satu story.

Satu flower juga dapat digunakan oleh banyak Gardener.

---

## 6.2 Flower Immutability

Setelah sebuah story dibuat:

```text
f = immutable
```

Contoh:

```text
/input n: Alip f: Blue Lotus
```

Flower tersebut tidak dapat diubah menjadi:

```text
Red Rose
```

Jika Alip ingin membuat story Red Rose:

```text
/input n: Alip f: Red Rose
```

Story baru dibuat.

---

## 6.3 Field IDs

| ID | Field | Fungsi |
|---|---|---|
| `n` | name | Nama Gardener |
| `f` | flower | Flower story |
| `mr` | meaning & reason | Makna + alasan personal |
| `i` | inspiration | Narasi/inspirasi |

`mr` adalah **satu field** dan tidak boleh dipisahkan menjadi `m` dan `r`.

---

# 7. Field Maturity

Setiap field dapat memiliki tingkat kematangan:

```text
absent
raw
mature
```

### `absent`

Field belum diberikan.

### `[r]` — raw

Data sudah tersedia tetapi masih berupa bahan awal.

### `[m]` — mature

Gardener/Developer menyatakan bahwa isi field tersebut sudah matang sebagai data personal.

AI tidak boleh menurunkan `[m]` menjadi `[r]` hanya karena AI merasa wording masih dapat diperbaiki.

AI boleh memperbaiki **expression**, tetapi tidak boleh mengubah status kepemilikan makna.

---

# 8. Level

Level menunjukkan **kematangan data**, bukan kualitas manusia atau kualitas cerita.

Level bersifat derived state.

Contoh:

```text
n + f
→ Level 0
```

Jika Gardener sudah memberikan:

```text
mr[m]
i[r]
```

maka story dapat berada pada tahap berikutnya.

Jika:

```text
mr[m]
i[m]
```

maka story telah memiliki data matang yang diperlukan untuk tahap final.

Field tidak harus matang secara bersamaan.

Contoh yang valid:

```text
mr = mature
i  = raw
```

---

# 9. Validation Model

Status story/output:

```text
generated
accepted
rejected
valid
```

Flow utama:

```text
generated
    ↓
accepted
    ↓
valid
```

Jika ditolak:

```text
generated
    ↓
rejected
    ↓
/correct
    ↓
generated
```

Pada tahap final:

```text
generated
    ↓
accepted
    ↓
valid
```

`level` dan `status` adalah dua konsep berbeda.

---

# 10. Command System

Command adalah interface utama untuk mutation dan retrieval.

---

## 10.1 `/input`

Membuat story baru.

```text
/input n: Beeya f: Common Sunflower
```

Dengan data tambahan:

```text
/input n: Gina f: Pink Tulip mr[m]: ...
```

atau:

```text
/input n: Sarah f: Stargazer Lily i[r]: ...
```

### System behavior

`/input` harus:

1. membuat story baru;
2. membuat immutable `story_id`;
3. melakukan normalization;
4. melakukan duplicate check;
5. menentukan maturity;
6. menentukan level;
7. menghasilkan output yang diperlukan;
8. menyimpan current data;
9. menyimpan history;
10. membuat `input_code`;
11. membuat `output_code`.

---

# 11. `/output`

`/output` adalah read-only command.

```text
/output SGO-BEEYA-COMMONSUNFLOWER-01
```

Tidak boleh:

- generate;
- mutate;
- validate;
- menaikkan level;
- mengubah history.

Jika hanya `i` tersedia, kembalikan `i`.

Jika hanya `mr` tersedia, kembalikan `mr`.

Jika keduanya tersedia, kembalikan keduanya.

`/output` merupakan **export boundary** menuju Sunday Garden.

---

# 12. `/edit`

`/edit` memiliki dua fungsi utama.

## 12.1 Rename Gardener

```text
/edit SGI-ALIP-BLUELOTUS-01 n: Regi
```

Rename harus mengubah seluruh human-facing reference:

- Gardener name;
- folder;
- file;
- input code;
- output code;
- current references;
- history references;
- metadata.

`story_id` tidak berubah.

Rename harus atomic:

```text
prepare
↓
validate
↓
rename
↓
update references
↓
verify
↓
commit
```

Jika gagal:

```text
rollback
```

---

## 12.2 Output Status

Rejected:

```text
/edit SGO-ALIP-BLUELOTUS-01 status: r
```

Accepted:

```text
/edit SGO-ALIP-BLUELOTUS-01 status: a
```

Mapping:

```text
r → rejected
a → accepted
```

Database tetap menggunakan status lengkap.

---

# 13. `/correct`

`/correct` hanya boleh digunakan setelah output ditandai rejected.

Urutan:

```text
/edit {output-code} status: r
```

kemudian:

```text
/correct i: ...
```

atau:

```text
/correct mr: ...
```

atau:

```text
/correct r: ...
```

`r:` pada `/correct` adalah alias untuk `mr:`.

Jika dua field dikoreksi:

```text
/correct i: ... mr: ...
```

`/correct` tidak menerima output code.

Target koreksi ditentukan oleh rejected state story.

### Correction rules

Untuk `mr`:

- Gardener bebas mengubah isi;
- Gardener bebas mengubah dasar makna;
- Gardener bebas mengubah tujuan;
- AI hanya membantu expression dan struktur.

Untuk `i`:

- basis dapat dikoreksi;
- arah narasi dapat dikoreksi;
- makna dapat dikoreksi;
- AI mempertahankan editorial style Sunday Garden.

Output lama tidak boleh ditimpa.

---

# 14. `/update`

Digunakan ketika Developer memperoleh data baru secara langsung.

```text
/update SGI-BEEYA-COMMONSUNFLOWER-01 i[r]: ...
```

atau:

```text
/update SGI-BEEYA-COMMONSUNFLOWER-01 mr[m]: ...
```

`/update`:

- memperbarui input;
- memperbarui maturity;
- menghitung ulang level;
- menjalankan maturation yang diperlukan;
- mencatat history.

`/update` hanya berlaku sebelum `valid`.

Tidak boleh digunakan untuk:

- rename;
- mengganti flower;
- menggantikan fungsi `/revision`.

---

# 15. `/revision`

`/revision` digunakan untuk story yang sudah `valid`.

**Target wajib menggunakan input code.**

```text
/revision SGI-BEEYA-COMMONSUNFLOWER-01 i: ...
```

atau:

```text
/revision SGI-BEEYA-COMMONSUNFLOWER-01 mr: ...
```

Keduanya:

```text
/revision SGI-BEEYA-COMMONSUNFLOWER-01 i: ... mr: ...
```

Revision:

1. mengambil current valid story;
2. mempertahankan versi lama sebagai historical version;
3. menerima input terbaru;
4. menjalankan generation/refinement;
5. menghasilkan versi baru;
6. memperbarui current;
7. mencatat revision event.

Flower tetap immutable.

---

# 16. `/remove`

Menghapus story.

```text
/remove SGI-ALIP-BLUELOTUS-01
```

Production implementation sebaiknya menyediakan confirmation:

```text
/remove confirm SGI-ALIP-BLUELOTUS-01
```

Penghapusan harus mencakup:

- current data;
- output;
- input;
- history;
- story files;
- references/index.

Code yang pernah digunakan tidak boleh digunakan kembali secara diam-diam.

---

# 17. Identity Model

Setiap story memiliki:

```text
story_id
```

yang immutable.

Human-facing codes:

```text
SGI-<GARDENER>-<FLOWER>-<NUMBER>
SGO-<GARDENER>-<FLOWER>-<NUMBER>
```

Human-facing code dapat berubah karena rename.

`story_id` tidak berubah.

Contoh:

```text
story_id = UUID-A

SGI-ALIP-BLUELOTUS-01
        ↓ rename
SGI-REGI-BLUELOTUS-01
```

Tetap:

```text
story_id = UUID-A
```

Code lama menjadi historical identifier.

---

# 18. Duplicate Detection

System harus membedakan:

### Exact duplicate

Input yang sama setelah technical normalization harus ditolak.

Normalization dapat mencakup:

- case;
- whitespace;
- line breaks;
- punctuation tertentu.

### Semantic similarity

Kemiripan makna tidak otomatis ditolak.

System hanya boleh memberikan warning.

Tujuannya agar:

> cerita yang mirip tidak otomatis dianggap cerita yang sama.

---

# 19. History & Audit Trail

History bersifat **append-only**.

Tidak boleh overwrite.

History harus mampu menjawab:

- siapa;
- story apa;
- command apa;
- kapan;
- input apa;
- output apa;
- maturity apa;
- status apa;
- revision ke berapa;
- perubahan apa yang terjadi.

Contoh lifecycle:

```text
Input
↓
Generation
↓
Update
↓
Correction
↓
Acceptance
↓
Valid
↓
Revision
↓
New Valid Version
```

Semua tahap tetap dapat ditelusuri.

---

# 20. Current Data vs History

### Current

Menunjukkan keadaan terbaru.

Digunakan oleh:

- command;
- generation;
- `/output`;
- export.

### History

Menunjukkan perjalanan story.

Digunakan untuk:

- audit;
- debugging;
- rollback;
- melihat perkembangan;
- historical reference.

Current dapat berubah.

History tidak boleh diubah.

---

# 21. AI Responsibilities

AI bertanggung jawab untuk:

- membantu menemukan kemungkinan hubungan antara flower dan input;
- menghasilkan inspiration;
- menyusun narasi;
- memperbaiki expression;
- mempertahankan gaya Sunday Garden;
- membantu menjaga konsistensi;
- mengikuti maturity dan validation state.

AI tidak boleh:

- mengklaim mengetahui perasaan Gardener;
- mengubah mature personal meaning tanpa izin;
- menganggap simbolisme bunga sebagai fakta personal;
- menjadikan output generatif sebagai confirmed truth;
- mengganti flower;
- menghapus history.

---

# 22. Gardener Authority

Gardener adalah authority tertinggi atas makna personal.

Urutan authority:

```text
Gardener
   ↓
Developer
   ↓
AI
```

AI dapat membantu menemukan kata.

AI tidak dapat menentukan kebenaran pengalaman.

Prinsip:

> **The flower does not define the person. The person gives the flower its story.**

---

# 23. Sunday Garden Integration

Sipaling Bunga dan Sunday Garden merupakan dua repository berbeda.

```text
SIPALING BUNGA
Internal
↓
raw data
↓
maturation
↓
validation
↓
/output
↓
SUNDAY GARDEN
Public presentation
```

Sunday Garden tidak perlu membawa seluruh history internal.

Yang diekspor adalah data yang memang diperlukan untuk publikasi.

Contoh:

```text
/output SGO-GINA-PINKTULIP-01
```

kemudian Developer memindahkan hasil final ke repository Sunday Garden.

---

# 24. Data Requirements

Minimal sebuah story memiliki:

```json
{
  "story_id": "...",
  "input_code": "...",
  "output_code": "...",
  "gardener": {
    "name": "..."
  },
  "flower": {
    "id": "...",
    "name": "...",
    "immutable": true
  },
  "state": {
    "level": 0,
    "status": "generated"
  }
}
```

Output dapat berisi:

```json
{
  "meaning_reason": "...",
  "inspiration": "..."
}
```

Maturity:

```json
{
  "mr": "absent",
  "i": "raw"
}
```

---

# 25. Repository Architecture

Recommended structure:

```text
sipaling-bunga/
├── README.md
├── PRD.md
├── COMMANDS.md
├── BOOTSTRAP.md
├── AI_HANDOFF.md
├── PROJECT_STATE.md
├── CHANGELOG.md
│
├── data/
│   ├── index.json
│   ├── gardeners/
│   ├── flowers/
│   └── history/
│
├── schema/
│   ├── gardener.schema.json
│   ├── flower.schema.json
│   ├── story.schema.json
│   ├── history.schema.json
│   ├── generation.schema.json
│   └── command.schema.json
│
├── prompts/
│   ├── CORE_PROMPT.md
│   ├── LANGUAGE_STYLE.md
│   ├── WRITING_STYLE.md
│   ├── FLOWER_INTERPRETATION.md
│   ├── GENERATION_RULES.md
│   └── VALIDATION_RULES.md
│
├── src/
│   ├── command/
│   ├── generator.js
│   ├── database.js
│   ├── history.js
│   ├── validator.js
│   ├── duplicate.js
│   ├── normalizer.js
│   ├── level.js
│   ├── state.js
│   ├── ids.js
│   └── formatter.js
│
└── tests/
```

---

# 26. Technical Requirements

## TR-01 — Persistence

Semua mutation harus persistent ke repository.

## TR-02 — Atomic Operations

Rename harus transactional.

## TR-03 — Immutable Flower

Flower tidak dapat diedit setelah story dibuat.

## TR-04 — Append-only History

History tidak boleh di-overwrite.

## TR-05 — Read-only Output

`/output` tidak boleh melakukan mutation.

## TR-06 — State Validation

Command harus memeriksa apakah state story mengizinkan operasi tersebut.

## TR-07 — Code Integrity

`input_code`, `output_code`, `story_id`, file path, dan index harus konsisten.

## TR-08 — Duplicate Protection

Exact duplicate harus ditolak.

## TR-09 — Portability

Repository dapat dipindahkan ke AI/environment lain tanpa bergantung pada percakapan lama.

## TR-10 — Recovery

Atomic mutation harus dapat rollback ketika terjadi kegagalan.

---

# 27. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Create story melalui `/input` | P0 |
| FR-02 | Generate input/output code | P0 |
| FR-03 | Persist current data | P0 |
| FR-04 | Persist history | P0 |
| FR-05 | Read output melalui `/output` | P0 |
| FR-06 | Rename Gardener secara atomic | P0 |
| FR-07 | Reject/accept output melalui `/edit` | P0 |
| FR-08 | Correction gate sebelum `/correct` | P0 |
| FR-09 | Correction `i` | P0 |
| FR-10 | Correction `mr` | P0 |
| FR-11 | Direct update melalui `/update` | P0 |
| FR-12 | Revision melalui input code | P0 |
| FR-13 | Flower immutability | P0 |
| FR-14 | Duplicate detection | P1 |
| FR-15 | Remove story | P1 |
| FR-16 | Repository integrity validation | P1 |
| FR-17 | AI handoff/bootstrapping | P1 |
| FR-18 | Export to Sunday Garden | P0 |

---

# 28. Non-Functional Requirements

### Portability

Repository dapat dipakai lintas:

- ChatGPT;
- Gemini;
- Claude;
- local LLM;
- API-based AI;
- future custom UI.

### Traceability

Setiap perubahan harus dapat ditelusuri.

### Consistency

Current data dan index tidak boleh memiliki referensi yang bertentangan.

### Human Control

Tidak ada perubahan terhadap personal meaning yang boleh dianggap final tanpa authority Gardener.

### Maintainability

Command protocol harus terdokumentasi dan memiliki test case.

### Recoverability

Atomic mutation harus dapat rollback.

---

# 29. Success Criteria

Sipaling Bunga dianggap berhasil apabila Developer dapat:

1. Membuat story baru.
2. Menyimpan input secara persistent.
3. Membantu Gardener menemukan alasan personal.
4. Mematangkan field secara bertahap.
5. Menolak output yang tidak sesuai.
6. Mengoreksi output tanpa kehilangan versi lama.
7. Mengubah nama Gardener tanpa merusak referensi.
8. Menjaga flower tetap immutable.
9. Merevisi story yang sudah valid.
10. Mengambil output final melalui `/output`.
11. Memindahkan hasil ke Sunday Garden.
12. Melanjutkan workflow dari repository menggunakan AI lain tanpa kehilangan konteks penting.

---

# 30. Example End-to-End

### Step 1 — Initial input

```text
/input n: Beeya f: Common Sunflower
```

System:

```text
Level: 0
mr: absent
i: raw/generated
status: generated
```

---

### Step 2 — Gardener provides inspiration

```text
/update SGI-BEEYA-COMMONSUNFLOWER-01 i[r]: Kuning memberikan kesan kebahagiaan...
```

AI memperdalam inspiration.

---

### Step 3 — Gardener provides personal meaning

```text
/update SGI-BEEYA-COMMONSUNFLOWER-01 mr[m]: Aku memilih bunga ini karena...
```

System memperbarui maturity dan level.

---

### Step 4 — Output generated

```text
generated
```

Developer meminta Gardener membaca hasil.

---

### Step 5 — Gardener rejects

```text
/edit SGO-BEEYA-COMMONSUNFLOWER-01 status: r
```

---

### Step 6 — Correction

```text
/correct i: Buat lebih sederhana dan jangan terlalu puitis.
```

AI membuat output baru.

---

### Step 7 — Accepted

```text
/edit SGO-BEEYA-COMMONSUNFLOWER-01 status: a
```

Jika sudah Level 3:

```text
status → valid
```

---

### Step 8 — Export

```text
/output SGO-BEEYA-COMMONSUNFLOWER-01
```

Developer memasukkan hasil final ke Sunday Garden.

---

### Step 9 — Future revision

Jika beberapa waktu kemudian Beeya memiliki pemaknaan baru:

```text
/revision SGI-BEEYA-COMMONSUNFLOWER-01 mr: Makna terbaru yang sekarang lebih dekat denganku...
```

Versi lama tetap berada di history.

---

# 31. Product Philosophy

Sipaling Bunga bukan mesin yang mencari:

> **“Apa arti bunga ini?”**

Pertanyaan yang lebih tepat adalah:

> **“Mengapa orang ini memilih bunga ini?”**

Dan bahkan itu belum selalu memiliki jawaban ketika story pertama kali dibuat.

Karena itu, sistem harus mampu menerima:

```text
"Aku belum tahu."
```

Tanpa menganggap story tersebut gagal.

Sebuah pilihan bunga dapat datang lebih dahulu.

Makna dapat ditemukan kemudian.

---

# 32. Final Product Principle

> **The flower is the question; the person is the answer.**

> **The flower does not define the person. The person gives the flower its story.**

> **Sipaling Bunga membantu menemukan cerita. Gardener menentukan maknanya.**

> **A conversation may end. The garden continues to grow.**
