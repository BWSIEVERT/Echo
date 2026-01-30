/*
state.js
--------
Purpose:
- Single source of truth for game state
- Holds mutable data (player, location, enemy, flags)

Contains:
- player object
- current location
- current enemy
- global game flags

Rules:
- No DOM access
- No printing
- No logic (just data + setters if needed)

Future ideas:
- Player level / XP
- Inventory system
- Status effects (poison, burn)
*/