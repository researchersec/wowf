# WoW Forever: Level 1–30 questing + dungeon guide (V0.8.1)

**Editorial snapshot:** October 31, 2026. The official global game launch is scheduled for November 4, 2026. This is **not** a live-realm-verified speedrun route, a complete quest-by-quest guide, or a guaranteed list of available dungeon quests.

## How to use

Open `index.html`, scroll to **Your next 30 levels**, and choose faction, starting race, and character level (1–30). The guide highlights an appropriate questing band and shows four to six dungeon options ranked by local convenience, followed by existing beta quest references. Tap a dungeon or quest record to open details in the main database. Tick off completed **route bands**, not individual quest objectives. Completion persists locally when browser storage permits; no account sync.

## Route overview (editorial recommendations)

| Starting path | 1–12 | 13–18 | 19–23 | 24–27 | 28–30 |
|---|---|---|---|---|---|
| Human | Elwynn | Westfall | Redridge | Duskwood / Wetlands | Wetlands / Duskwood |
| Dwarf / Gnome | Dun Morogh | Loch Modan | Loch Modan / Redridge | Wetlands | Wetlands / Duskwood |
| Night Elf | Teldrassil | Darkshore | Darkshore / Ashenvale | Ashenvale | Ashenvale / Stonetalon |
| Alliance Skyborne | Zephras Isle | Westfall / Loch Modan | Redridge | Duskwood / Wetlands | Wetlands / Duskwood |
| Orc / Troll | Durotar | Barrens | Barrens / Stonetalon | Stonetalon / Ashenvale | Ashenvale / Thousand Needles |
| Tauren | Mulgore | Barrens | Barrens / Stonetalon | Stonetalon / Ashenvale | Thousand Needles / Ashenvale |
| Undead | Tirisfal | Silverpine / Tirisfal | Silverpine / Hillsbrad | Hillsbrad | Hillsbrad / Alterac |
| Horde Skyborne | Zephras Isle | Barrens | Barrens / Stonetalon | Stonetalon / Ashenvale | Thousand Needles / Ashenvale |

These are deliberately *bands*, not claims that all characters must finish a particular quest in a particular order. Move to a neighboring appropriate hub if quests turn orange/red, become too easy, or require long travel. The Skyborne starting area covers approximately levels 1–12 according to Blizzard.

## Dungeon opportunities within level 1–30

| Dungeon | Range | Source tier | Location |
|---|---|---|---|
| Hall of Thanes | 13–18 | Blizzard announcement | Beneath Ironforge |
| Ragefire Chasm | 13–18 | Community beta listing | Orgrimmar |
| Ruins of Lordaeron | 15–20 | Blizzard announcement | Tirisfal, above Undercity |
| Wailing Caverns | 15–24 | Community beta listing | The Barrens |
| Deadmines | 17–26 | Community beta listing | Westfall |
| Shadowfang Keep | 20–30 | Community beta listing | Silverpine |
| Blackfathom Deeps | 24–32 | Community beta listing | Ashenvale |
| Stormwind Stockade | 24–32 | Community beta listing | Stormwind City |
| Excavation Site | 24–29 | Blizzard announcement | Wetlands |
| City of Dalaran | 28–33 | Blizzard announcement | Alterac Mountains |
| Gnomeregan | 29–38 | Community beta listing | Dun Morogh |
| Razorfen Kraul | 29–38 | Community beta listing | The Barrens |

Older dungeon ranges come from a third-party beta guide and must be checked against the release build. A bracket is **not** a promise that a character can enter, has an eligible quest, or will successfully clear the instance. The planner ranks practical nearby options first; different faction groups can choose long-distance instances if travel permits. Blizzard has announced an access questline for the City of Dalaran; the exact entry quest names and givers are recorded in the guide.

## Quest list limitations

The existing database has **70 beta-indexed quest records**, not a complete ordered leveling quest graph. The planner dynamically shows some associated with the active zone and nearby dungeons. It displays *quest level* and *minimum acceptance level* separately. Quest names, category membership, and minimum levels from a third-party beta index do not establish an actual quest objective, giver, rewards, guaranteed availability, or correct route order. Avoid describing these as a "complete step-by-step quest walkthrough" until the underlying objective/prerequisite graph is sourced and verified.

## Sources (read before publishing)

- [Blizzard: Explore the New Dungeons of WoW Forever](https://worldofwarcraft.blizzard.com/en-us/news/24301455) — new dungeon levels, locations, Dalaran attunement entry points.
- [Blizzard: Return to Azeroth in WoW Forever](https://worldofwarcraft.blizzard.com/en-us/news/24315643) — new zones, Skyborne starting area, broad leveling scope.
- [Blizzard: Forever Legacy System](https://worldofwarcraft.blizzard.com/en-us/news/24307383) — first Legacy point at 25 for most players, not compulsory for XP route.
- [Bind on Forever leveling guide](https://bindonforever.com/leveling) — third-party Alliance route comparison, which can change by beta build.
- [Olympus News Network Horde route](https://olympusnewsnetwork.com/guides/horde-leveling-1-30) — third-party Horde route comparison; acknowledges Classic-era inheritance.
- [ForeverDB beta leveling guide](https://foreverdb.net/guide/leveling) — third-party ranges for original dungeons.
- [Wowhead Forever quest index](https://www.wowhead.com/forever/quests) — existing beta quest catalog references; not a grant of reuse rights for bulk content.

## Next iteration toward a full quest-by-quest guide

Implement a versioned objective graph with independently confirmed `quest_id`, `giver_npc_id`, coordinates, prerequisites, turn-in, rewards, faction/class/race restrictions, map pin, optional kill/drop objectives, and actual player testing. Use rights-cleared game/client sources. Generate race/class-specific ordered steps only when route evidence permits; otherwise keep the safe zone/hub-level planner. Benchmark **time to complete valid tasks** and **wrong/obsolete instructions**, not word count or traffic.
