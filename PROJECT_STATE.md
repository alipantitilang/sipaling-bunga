# PROJECT STATE

## Version

v1.1.0 command protocol

The repository baseline was v1.0.0; command routing was revised in v1.1.0 and the current protocol is v1.1.0.

## Purpose

Internal data-maturation tool untuk Sunday Garden.

## Pipeline

```text
Input
 ↓
Normalize
 ↓
Duplicate Check
 ↓
Field Maturity
 ↓
Level Derivation
 ↓
Generation / Refinement
 ↓
Validation
 ↓
Current Data
 ↓ /output
Sunday Garden
```

## Fields

`n`, `f`, `mr`, `i`

## Field maturity

`absent`, `raw`, `mature`

## Status

`generated`, `accepted`, `rejected`, `valid`

## Level

Level adalah derived state dari kematangan dan workflow, bukan ranking kualitas.

`mr` dan `i` boleh matang pada waktu berbeda.

## Identity

`story_id` immutable.

Human-facing codes renameable.

## Rename

Gardener rename harus global + atomic + rollback on failure.

Flower immutable.

## History

Append-only. Jangan overwrite.
