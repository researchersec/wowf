# Data acquisition and controlled import — V0.7

## Why the import queue exists

The existing site is a curated dataset, not a complete game client dump. We **do not bypass Wowhead's bot protection** or assume a publicly accessible API grants republication rights. The staging tool accepts an already obtained, normalized JSON feed from a source whose access and reuse are permitted.

## Feed shape

```json
{
  "records": [
    {
      "external_id": "12345",
      "type": "NPC",
      "name": "Example only",
      "summary": "Short independently written summary",
      "source_url": "https://example.org/game-record/12345",
      "publisher": "Example source",
      "evidence_type": "player_observation",
      "license": "CC BY 4.0",
      "attribution": "Example source, CC BY 4.0",
      "game_build": "1.60.x-confirmed",
      "data_as_of": "2026-10-31",
      "gameplay_verified": false
    }
  ]
}
```

The sample above is **an illustration, not an actual WoW NPC**.

`evidence_type` must be one of `player_observation`, `client_file_unconfirmed`, `third_party_report`. Accepted license *strings* for review are `CC BY-SA 4.0`, `CC BY 4.0`, `CC0 1.0`, and `permission_granted`. A supported license string is **not proof** the supplier actually owns the material. For a permission grant, attach a reviewable `permission_reference`. Any supplied drop rate without observation-count provenance is rejected by the current gate.

## Operator workflow

1. Obtain data only through a documented, permitted source and record source URL, rights, build, observation method and capture date.
2. Normalize the permitted data into the JSON structure. Preserve its own IDs, source and license attribution.
3. Run `python tools/stage_import.py YOUR_FEED.json REVIEW.json`.
4. Review every candidate. `REJECT` entries are blocked; `REVIEW` entries are **not approved** and cannot be published until license and evidence review passes. CC BY-SA needs a specific ShareAlike compliance plan.
5. Only after human review, add an editorial, reproducible import mapping plus tests and a review receipt. There is deliberately **no auto-publish command** in this release.

The included `fixtures/NON_GAME_SAMPLE.json` demonstrates one review and one rejection without adding either sample record to the catalog.

## Long-term versioned record model

Keep two different concepts: the underlying *entity* and independently sourced *claims about the entity*. The claim should include source ID, game build/era, first-seen and last-checked dates, observation method, confidence and rights. Entity-to-entity relationships are also claims; source URLs alone do not prove actual prerequisites or drops.

Do **not** infer observed probabilities from items merely appearing in client files. Require item ID, boss/NPC ID, build, observed successes and number of eligible attempts before estimating a drop rate. Prefer showing 'Unknown' to presenting an unsourced percentage.
