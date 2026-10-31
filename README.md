# Forever Field Guide · V0.8.1 — Interactive Level 1–30 Planner

**What it is:** An offline, self-contained fan-made WoW Forever reference website with a new level 1–30 questing/dungeon guide integrated above the existing catalog. The legacy **536 reference records and 233 sourced relationships are preserved**. This update contributes *one substantial planner*, not hundreds of newly verified quest records.

**Open:** `index.html` in a browser. The page includes all JavaScript and the guide data; no CDN, accounts, tracking, or API calls are needed. The source citation links naturally require internet.

**New in this edition:** 8 race/starting-area paths covering Alliance and Horde, 5 questing bands per path, 12 original and new dungeons, local-level matching, convenient faction-first dungeon recommendations, source badges, clickable quest/dungeon catalog references, local checkboxes, route copying, mobile layout, and clear beta vs official evidence distinctions. City of Dalaran includes Blizzard's announced faction-specific access quests.

The leveling data is in `leveling_1_30.json`; a human-readable table and source policy are in `LEVELING_GUIDE.md`. `guide_widget.js`, `.css` and `guide_markup.html` implement the feature. `source_index.html` is the unchanged prior site input; `build_leveling.py` deterministically produces `index.html` from those files. Modify JSON, then rebuild with:

```bash
python build_leveling.py
python test_leveling.py
```

The browser test uses Playwright and Chromium and injects the HTML into the browser; **direct `file://` loading is blocked by the testing environment**, though that is the intended offline distribution format. Both desktop (1440 px) and mobile (390 px) layouts were exercised, including factions, starting options, level boundaries, checkboxes, dungeon source badges, and quest minimum-level labels. An actual screenshot of the new planner is included for each layout.

**Trust limitations:** No build-specific live-realm observations; eight zone routes are editor-synthesized suggestions rather than measured fastest runs. Only four new dungeon level bands are official; the eight Classic/older dungeon brackets are from beta community guides. Quest names are *partial beta-index records*, not a complete quest order. Do not advertise complete quest chains or guaranteed quest availability. No imported copyrighted guide text or scraping of blocked sites was performed for this feature.

**Not affiliated with Blizzard Entertainment.** Blizzard and Wowhead names and links identify sources, not endorsements.
