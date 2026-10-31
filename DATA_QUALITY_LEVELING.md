# V0.8.1 Leveling guide — evidence review

Snapshot: **October 31, 2026 (prelaunch)**.

| Measure | Count / status |
|---|---|
| Existing catalog records preserved | 536 / 536 |
| Existing typed relationships preserved | 233 / 233 |
| Starting paths | 8 |
| Ordered questing bands per path | 5 |
| Dungeon references | 12 (4 announced by Blizzard, 8 third-party beta ranges) |
| Quest title suggestions | Dynamic subset of existing 70 beta-indexed records |
| Independently live-verified route instructions | 0 |
| Known exact per-quest objectives, reward graphs, or optimized turn-in order in the new guide | **Not established** |
| Desktop and mobile scripted user interactions | Passed via injected HTML |
| Direct file navigation through QA browser | Blocked by policy (`ERR_BLOCKED_BY_ADMINISTRATOR`) |

## Evidence ladder

1. **Officially announced**: Blizzard explicitly announces a level range, zone, or access route. This does not imply a live realm test.
2. **Third-party beta-indexed**: Earlier dungeons and quest names/levels are described by index or beta guide. Source can be stale or inaccurate.
3. **Editorial recommendation**: Routes and nearby dungeon ordering are practical heuristics inferred from zones, geography, and comparable guides; **not verified fastest**.

## High-priority next validation

- Confirm quest IDs, objectives, givers, eligibility, maps and rewards for all quest suggestions, preserving game build and evidence provenance.
- Validate dungeon level gates and Dalaran entry chain on the actual live release.
- Collect multiple tested faction/class-specific routes with recorded level/time and compare to optimized alternative paths.
- Prove the recommendation engine doesn't suggest unreachable dungeons or ineligible quests, especially for classes with special quest chains and Skyborne travel.
