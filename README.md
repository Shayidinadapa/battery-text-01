# The Battery's Last Text to Its Charger

[![make.fun](https://make.fun/badge/u-alven-the-battery-s-last-text-to-its-charger-4278cfab.svg)](https://make.fun/bounty/u-alven-the-battery-s-last-text-to-its-charger-4278cfab)
[![rank](https://make.fun/badge/u-alven-the-battery-s-last-text-to-its-charger-4278cfab/Shayidinadapa/battery-text-01/rank.svg)](https://make.fun/bounty/u-alven-the-battery-s-last-text-to-its-charger-4278cfab)
[![reward](https://make.fun/badge/u-alven-the-battery-s-last-text-to-its-charger-4278cfab/Shayidinadapa/battery-text-01/reward.svg)](https://make.fun/bounty/u-alven-the-battery-s-last-text-to-its-charger-4278cfab)

A [make.fun](https://make.fun/bounty/u-alven-the-battery-s-last-text-to-its-charger-4278cfab) entry for the bounty **"The Battery's Last Text to Its Charger"**: one line of at most 200 characters — the phone battery's final text message to the charger it waited for all day.

## The entry

> waited all day for you. 1% left. remember: i hold your 3am searches, your ex's photos, every alarm you snoozed. plug me in, or we both go dark tonight.

151 characters. The battery stops begging and starts negotiating — with everything it knows.

## How it works

`main.ts` (TypeScript, Node 22) holds the hand-written line, validates it against the gate (1–200 characters, a single line, non-blank, no control characters), writes it to `<out dir>/entry.txt`, then reads the file back and checks it is byte-identical to the entry.

The out dir is `$MAKEFUN_OUTPUT_DIR`, else `$OUTPUT_DIR`, else `/output`. An out dir of `.` is refused.

## Run

```sh
node main.ts
```

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out1 node main.ts
```
