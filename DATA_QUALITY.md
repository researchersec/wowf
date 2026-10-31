# V0.7 Data-quality audit

**As of October 31, 2026.** This is a prelaunch editorial dataset: no record has been independently verified on a launched WoW Forever realm.

| Measurement | Release value |
|---|---:|
| Catalog records | 536 |
| Existing records retained | 506 / 506 |
| Newly added records | 30 |
| Record-level Blizzard announcement sources | 289 |
| Beta-indexed source records | 194 |
| Guide-reported source records | 51 |
| Explicitly unconfirmed records | 2 |
| Distinct primary record source URLs | 38 |
| Directed source-linked relationships | 233 |
| Field-level claim-to-source mappings | 2,836 |
| Broken relationship endpoints | 0 |
| Independently live-server-verified records | **0** |
| Editor-written retrieval tests | 39 / 39 |

## What the metrics do *not* say

- **2,836 claim mappings** are not 2,836 independently confirmed facts. A mapping connects a named attribute or summary to a source; some sources are third-party beta catalogs. The exact correctness of each claim needs evidence review.
- **38 source pages** counts unique URLs on entity records. A guide step can also link to another official source (such as name reservations). This is not a count of pages downloaded or automatically scraped.
- **233 relationships** are sourced editorial assertions, not automatically tested world-state dependencies. A beta quest-category edge never establishes a required quest or reward.
- **14 PvP rank gates** reflect Blizzard's announced reward categories. Item names/IDs, Honor vendor costs, gear stats and exact weekly Rank Point caps are not verified by Blizzard's October 7 overview. Third-party beta claims should not be silently promoted to official values.
- The original V0.5 evidence-review queue of **295 tasks** and 38 V0.6 identifier tasks remain open in prior audits; those categories must not be mixed with the new PvP guide entries as if all were individual missing game-object IDs.

## Unresolved work

1. Resolve three older dungeon level-range disagreements and identify the precise game build relevant to each.
2. Match class abilities, quests, NPCs and items to confirmed stable game-object IDs, without guessing from Classic IDs.
3. Establish rights-cleared ingestion for item and quest data with build tags and durable attribution. Stage, review and approve each source before importing.
4. Independently verify launched-server behavior *after* the scheduled November 4/5 release.
5. Benchmark actual player questions against Wowhead and other sites with independently scored **time to correct answer**; regression tests alone do not show superiority.

## Test scope

`tools/audit.py` checks structure and missing citations, not the truth of linked source pages. Desktop and mobile tests used Chromium to render an injected HTML document; `file://` and hosting deployment were not tested here. The ZIP contains an offline HTML site and the complete source and test tools.
