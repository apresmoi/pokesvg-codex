# Security and Privacy

## Data handling (explicit)

- User data is stored locally in the browser via `localStorage` (genomes + settings).
- No backend, accounts, or network sync are in the initial scope.

## Import/export risks (inferred)

Importing a genome via paste means the app must treat the pasted JSON as untrusted input.

Controls (recommended):

- Parse JSON safely and validate schema + bounded ranges.
- Reject payloads that are too large or contain unexpected types.
- Avoid unsafe rendering patterns (no `dangerouslySetInnerHTML`).

## Privacy (explicit)

- No server-side persistence in the initial scope; collection is local to the device/browser profile.
<!-- unpack:1.0.0 -->
