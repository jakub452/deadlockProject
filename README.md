
# LockStats

Player statistics for **Deadlock**, inspired by [op.gg](https://op.gg).
Search for any player and see their rank, win rate and recent matches with full item builds.

**Live demo:** [deadlock-project-roan.vercel.app](https://deadlock-project-roan.vercel.app/)
## Features

- **Player search**: find players by Steam name (live suggestions) or by SteamID64
- **Profile header**: avatar, name, Steam profile link and win rate (ranked / unranked, last 30 days)
- **Rank card**: current rank badge with subrank, colored by rank tier
- **Match history**: result, game mode, hero, K/D/A, KDA ratio, souls, duration, time since the match and the final item build

## Tech stack

- [React 19](https://react.dev) + [Vite](https://vite.dev)
- [React Router](https://reactrouter.com)
- CSS Modules
- [Lucide](https://lucide.dev) icons
- Fonts: Cinzel, Barlow (self-hosted)
- Data: [Deadlock API](https://api.deadlock-api.com/docs)
- Hosting: [Vercel](https://vercel.com)

## Getting started

Requirements: Node.js 20+

```bash
git clone https://github.com/jakub452/deadlockProject.git
cd deadlockProject
npm install
npm run dev
```

The app runs at `http://localhost:5173`. No API key or `.env` file is needed: the Deadlock API is public.

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## API endpoints used

| Endpoint | Used for |
| --- | --- |
| `/v1/players/steam-search` | Search suggestions |
| `/v1/players/steam` | Name, avatar, Steam link |
| `/v1/players/{id}/rank` | Current rank |
| `/v1/players/{id}/match-history` | Win rate, match list |
| `/v1/matches/metadata` | Match details and items |
| `/v1/assets/heroes`, `/items`, `/ranks` | Hero icons, item images, rank badges |

## Project structure

```
src/
├── api/deadlockApi.js        # all API calls
├── components/Navbar/        # navbar + search bar
├── pages/
│   ├── LandingPage/
│   └── PlayerPage/
│       └── components/       # ProfileHead, RankCard, MatchHistory
└── assets/                   # fonts, logo
```

## Roadmap

- [ ] Match details page
- [ ] Item tooltips
- [ ] "Load more" in match history
- [ ] More sections including hero builds
- [ ] Improvements to CSS
- [ ] Caching API responses
... and more

## Credits

- Data provided by [deadlock-api.com](https://deadlock-api.com)
- Inspired by [op.gg](https://op.gg)

LockStats is a fan project and is not affiliated with or endorsed by Valve Corporation.
Deadlock and all related assets are trademarks of Valve Corporation.