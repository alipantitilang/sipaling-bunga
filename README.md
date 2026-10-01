# Sipaling Bunga

**Command Protocol: v1.1.0**

Internal data-maturation tool for **Sunday Garden**.

> Tempat cerita ditemukan dan dimatangkan.  
> Sunday Garden adalah tempat cerita yang telah matang diceritakan.

Sipaling Bunga membantu Developer mendampingi calon Gardener dari input awal yang belum lengkap sampai cerita bunga siap dipublikasikan ke Sunday Garden.

```text
Calon Gardener
      ↓
Developer consultation
      ↓
Sipaling Bunga
Input → Discovery → Maturation → Validation
      ↓
/output
      ↓
Sunday Garden
```

## Prinsip

- Gardener owns personal meaning.
- AI membantu discovery, refinement, dan expression; bukan penentu kebenaran personal.
- Flower pada sebuah story bersifat **immutable**.
- `current` adalah keadaan terbaru; `history` adalah audit trail yang tidak ditimpa.
- Repository adalah source of truth, bukan percakapan AI.
- `/output` adalah batas ekspor menuju Sunday Garden.
- Data yang belum dikonfirmasi Gardener tidak boleh diperlakukan sebagai fakta personal.
- Level menunjukkan **kematangan data**, bukan kualitas manusia atau kualitas cerita.

## Field IDs

| ID | Field | Keterangan |
|---|---|---|
| `n` | name | Nama Gardener |
| `f` | flower | Bunga yang dipilih; immutable setelah story dibuat |
| `mr` | meaning & reason | Makna dan alasan personal, satu field yang tidak dipisah |
| `i` | inspiration | Narasi/inspirasi yang membantu menemukan cerita |

Maturity:

- `[r]` = raw, masih berupa bahan awal dan perlu dimatangkan/ditinjau
- `[m]` = mature, dianggap sudah matang oleh Gardener
- `absent` = belum diberikan

Contoh:

```text
/input n: Alip f: Blue Lotus
/input n: Sarah f: Stargazer Lily i[r]: Aku awalnya memilihnya karena bunganya cantik.
/input n: Alip f: Blue Lotus mr[m]: Aku bangga karena masih mampu melewati hidup yang tidak selalu indah.
```

Maturity dapat diberikan langsung oleh Developer berdasarkan hasil konsultasi dengan Gardener. AI tidak boleh menurunkan field yang diberi label `[m]` menjadi `[r]` hanya karena AI merasa kalimatnya masih dapat dipoles.

---

# Cara Penggunaan Command

Bagian ini adalah panduan penggunaan sehari-hari. `COMMANDS.md` tetap menjadi referensi syntax yang lebih teknis.

## 1. `/input` — Membuat story baru

Gunakan `/input` ketika menerima calon Gardener/story baru.

```text
/input n: Beeya f: Common Sunflower
```

Boleh langsung menyertakan data yang sudah diketahui:

```text
/input n: Sarah f: Stargazer Lily i[r]: Aku memilihnya karena bunganya cantik.
```

atau:

```text
/input n: Alip f: Blue Lotus mr[m]: Aku bangga karena masih mampu melewati hidup yang tidak selalu indah.
```

### Yang dilakukan `/input`

1. Membuat story baru.
2. Menyimpan input ke database.
3. Menentukan maturity setiap field.
4. Menentukan level berdasarkan keadaan data.
5. Menghasilkan output yang diperlukan untuk tahap tersebut.
6. Menyimpan output dan history.
7. Membuat dan mengembalikan `input_code` serta `output_code`.

Contoh kode:

```text
SGI-BEEYA-COMMONSUNFLOWER-01
SGO-BEEYA-COMMONSUNFLOWER-01
```

**Penting:** `/input` membuat story baru. Jangan gunakan `/input` untuk mengganti bunga dari story yang sudah ada.

---

## 2. `/output` — Mengambil output terbaru

Gunakan `/output` hanya ketika ingin **membaca output current** dari sebuah story.

```text
/output SGO-BEEYA-COMMONSUNFLOWER-01
```

`/output` bersifat **read-only**.

Artinya command ini:

- tidak membuat output baru;
- tidak menaikkan level;
- tidak mengubah status;
- tidak mengubah input;
- tidak mengubah history.

Output yang dikembalikan mengikuti data yang tersedia. Jika baru ada `inspiration`, hanya `inspiration` yang dikembalikan. Jika `meaning & reason` dan `inspiration` sudah tersedia, keduanya dikembalikan.

Gunakan command ini sebagai **export boundary** ketika Developer membutuhkan data matang untuk dipindahkan ke repository Sunday Garden.

---

## 3. `/edit` — Mengubah identitas atau status tertentu

`/edit` memiliki dua penggunaan utama.

### A. Rename Gardener melalui input code

```text
/edit SGI-ALIP-BLUELOTUS-01 n: Regi
```

Ini adalah **global rename**.

Satu gerakan mengubah seluruh identitas human-facing story:

- nama Gardener;
- nama folder;
- nama file;
- `input_code`;
- `output_code`;
- referensi nama di current data;
- referensi nama di history;
- metadata terkait story.

`story_id` internal **tidak berubah**.

Contoh:

```text
SGI-ALIP-BLUELOTUS-01
SGO-ALIP-BLUELOTUS-01
```

menjadi:

```text
SGI-REGI-BLUELOTUS-01
SGO-REGI-BLUELOTUS-01
```

Code lama tetap tercatat sebagai historical identifier dan tidak boleh digunakan ulang.

Rename harus bersifat **atomic/transactional**: jika salah satu bagian gagal, seluruh perubahan harus di-rollback.

### B. Menentukan status output

`/edit` **harus dilakukan terlebih dahulu** sebelum `/correct`.

Gunakan kode singkat status:

```text
/edit SGO-ALIP-BLUELOTUS-01 status: r
```

`r` = `rejected`.

Jika output diterima:

```text
/edit SGO-ALIP-BLUELOTUS-01 status: a
```

`a` = `accepted`.

Di dalam database, status tetap disimpan dengan nama lengkap `rejected` / `accepted`. Kode `r/a` hanya merupakan shorthand command.

Aturan:

- `a` = output diterima Gardener;
- `r` = output ditolak dan **membuka hak untuk `/correct`**;
- pada Level 3, `a` akan mempromosikan story menjadi `valid`;
- `/correct` tanpa status `rejected` harus ditolak.

### Flower tidak boleh diedit

Perintah seperti ini **selalu ditolak**:

```text
/edit SGI-ALIP-BLUELOTUS-01 f: Red Rose
```

Flower bersifat immutable.

Jika Gardener ingin memilih bunga lain, buat story baru:

```text
/input n: Alip f: Red Rose
```

Jika story lama tidak diperlukan lagi, gunakan `/remove`.

---

## 4. `/correct` — Memperbaiki output yang ditolak

`/correct` **tidak menerima code output lagi**.

Sebelum menjalankan `/correct`, Developer **wajib** menentukan bahwa output tertentu ditolak melalui `/edit`:

```text
/edit SGO-ALIP-BLUELOTUS-01 status: r
```

Setelah itu, gunakan `/correct` untuk memberikan koreksi. Sistem sudah mengetahui output mana yang sedang dikoreksi dari state story tersebut.

### Koreksi `inspiration`

```text
/correct i: Aku ingin inspirasinya lebih sederhana dan tidak terlalu puitis.
```

### Koreksi `meaning & reason`

```text
/correct mr: Aku memilih bunga ini karena pengalaman pribadiku membuatku tetap ingin bertahan.
```

`mr` tetap merupakan **satu field utuh**. Untuk shorthand yang sangat singkat, `r:` juga diterima sebagai alias untuk `mr:` pada `/correct`, tetapi data internal tetap menggunakan `mr`.

```text
/correct r: Aku ingin alasan ini lebih dekat dengan pengalaman pribadiku.
```

### Jika keduanya perlu dikoreksi

```text
/correct i: Aku ingin inspirasinya lebih sederhana. mr: Aku memilih bunga ini karena pengalaman tersebut sangat personal bagiku.
```

> Penulisan yang benar untuk dua field dalam satu command adalah satu `/correct` dengan dua field:

```text
/correct i: Aku ingin inspirasinya lebih sederhana. mr: Aku memilih bunga ini karena pengalaman tersebut sangat personal bagiku.
```

### Aturan `/correct`

- Harus didahului `/edit {output-code} status: r`.
- Tidak perlu dan tidak boleh memasukkan `output-code` lagi.
- Hanya story yang sedang berada pada state `rejected` yang dapat dikoreksi.
- `/correct` dapat memperbaiki `i`, `mr`, atau keduanya sekaligus.
- Koreksi `mr` dapat mengganti wording, dasar, tujuan makna, gaya ekspresi, maupun isi personal secara bebas karena Gardener adalah pemilik maknanya.
- Koreksi `i` dapat mengubah basis, arah, atau makna yang ingin disampaikan; AI tetap menjaga gaya editorial Sunday Garden saat menyusun narasi.

`/correct` secara otomatis:

1. menyimpan output yang ditolak ke history;
2. menerapkan koreksi pada field yang ditentukan;
3. menghasilkan output baru;
4. menyimpan output baru ke current data dan history;
5. melanjutkan proses ke tahap berikutnya jika data sudah memungkinkan.

Flow-nya:

```text
/edit {output-code} status: r
            ↓
        /correct
            ↓
     generated output baru
            ↓
      /edit ... status: a
            ↓
       next level / valid
```

---

## 5. `/update` — Memperbarui input secara langsung

Gunakan `/update` ketika Developer memperoleh informasi baru dari Gardener dan ingin memperbarui data **tanpa melalui proses rejection/acceptance output terlebih dahulu**.

Contoh:

```text
/update SGI-BEEYA-COMMONSUNFLOWER-01 mr[m]: Aku memilih bunga ini karena...
```

atau:

```text
/update SGI-BEEYA-COMMONSUNFLOWER-01 i[r]: Aku pertama kali menyukai bunga ini karena...
```

`/update` akan:

1. menyimpan input baru;
2. memperbarui maturity field terkait;
3. menghitung ulang level berdasarkan keadaan data;
4. melanjutkan proses maturation yang diperlukan;
5. mencatat perubahan ke history.

### Batasan `/update`

`/update` hanya digunakan sebelum story berstatus `valid`.

Jangan gunakan `/update` untuk mengganti nama Gardener. Gunakan:

```text
/edit SGI-... n: Nama Baru
```

Jangan gunakan `/update` untuk mengganti flower. Flower tetap immutable.

---

## 6. `/revision` — Merevisi story yang sudah valid

`/revision` digunakan hanya untuk story yang **sudah `valid`**.

Berbeda dari `/correct`, `/revision` **wajib menggunakan input code** agar Developer dapat memilih story mana yang ingin direvisi.

Syntax:

```text
/revision {input-code} i: {input i terbaru}
/revision {input-code} mr: {input mr terbaru}
```

Contoh:

```text
/revision SGI-BEEYA-COMMONSUNFLOWER-01 i: Sekarang aku melihat bunga ini sebagai pengingat untuk tetap ceria dan terbuka terhadap orang lain.
```

atau:

```text
/revision SGI-BEEYA-COMMONSUNFLOWER-01 mr: Aku memilih bunga ini karena pengalaman baru ini membuat maknanya terasa lebih personal.
```

Jika `i` dan `mr` sama-sama ingin direvisi, keduanya boleh diberikan dalam satu command:

```text
/revision SGI-BEEYA-COMMONSUNFLOWER-01 i: Inspirasi terbaru... mr: Makna dan alasan terbaru...
```

### Aturan `/revision`

- Target **harus berupa input code**, bukan output code.
- Story yang ditargetkan harus sudah `valid`.
- Flower tetap immutable dan tidak dapat direvisi.
- Nama Gardener tetap diubah melalui `/edit {input-code} n:`.
- Input terbaru menjadi dasar versi baru.
- Versi valid sebelumnya tidak dihapus; ia dipindahkan menjadi historical version.
- Setelah revisi berhasil, sistem menghasilkan versi current terbaru dan status kembali `valid` sesuai aturan revision.
- Revision tetap dicatat sebagai event baru di history.

Flow:

```text
valid story
    ↓
/revision {input-code} i/mr: {input terbaru}
    ↓
versi lama → history
    ↓
versi baru → current
    ↓
valid
```

`/revision` bukan jalan pintas untuk melewati validasi. Data baru tetap diproses oleh aturan maturity dan generation yang berlaku.

---

## 7. `/remove` — Menghapus story

Gunakan `/remove` ketika sebuah story memang tidak ingin dipertahankan.

```text
/remove SGI-ALIP-BLUELOTUS-01
```

Penghapusan story harus mencakup seluruh data yang terkait:

- current/core data;
- input;
- output;
- history;
- file story;
- folder story bila menjadi kosong/tidak diperlukan.

`story_id` dan code yang pernah digunakan tidak boleh diam-diam dipakai ulang untuk story lain.

Untuk implementasi production, disarankan menggunakan konfirmasi dua tahap agar penghapusan tidak terjadi karena salah ketik.

---

# Urutan State dan Validation

Output status:

```text
generated → accepted → valid
generated → rejected → /correct → generated
```

`level` dan `status` berbeda.

- `level` = seberapa matang data story.
- `status` = keadaan validasi output.

Contoh state yang valid:

```text
level: 1
mr: mature
i:  raw
status: generated
```

Maturity field bersifat asynchronous. Tidak semua calon Gardener datang dengan data lengkap.

Contoh:

```text
mr = mature
i  = raw
```

adalah state yang valid. AI dapat mematangkan `i` tanpa mengubah `mr` yang sudah dinyatakan mature oleh Gardener.

Pada Level 3, ketika output diterima:

```text
generated → accepted → valid
```

`valid` berarti story sudah lengkap dan siap digunakan sebagai sumber data untuk Sunday Garden.

---

# Identity dan Code

Setiap story memiliki immutable internal `story_id`.

Human-facing codes mengikuti pola:

```text
SGI-<GARDENER>-<FLOWER>-<NUMBER>
SGO-<GARDENER>-<FLOWER>-<NUMBER>
```

Contoh:

```text
SGI-ALIP-BLUELOTUS-01
SGO-ALIP-BLUELOTUS-01
```

Karena nama Gardener dapat diubah, human-facing code juga dapat berubah melalui `/edit ... n:`. `story_id` tetap menjadi identitas internal yang sama.

Code lama menjadi historical identifier dan tidak boleh dipakai ulang.

---

# Portability

AI baru cukup membaca:

1. `BOOTSTRAP.md`
2. `PROJECT_STATE.md`
3. `AI_HANDOFF.md`
4. `schema/command.schema.json`
5. `prompts/CORE_PROMPT.md`
6. `README.md`
7. `COMMANDS.md`

**No important knowledge exists only inside a conversation.**

Percakapan dapat berakhir, diganti, atau dipindahkan. Repository tetap menjadi sumber kebenaran Sipaling Bunga.
