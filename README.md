# Pokédex Tracker

---

## Getting Started

First, install the dependencies:

```bash
yarn
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Testing

The project has some unit and e2e tests. Run them using the following commands:

```bash

# Run unit tests
yarn test

# Run unit tests in watch mode
yarn test:watch

# Run e2e tests 
yarn test:e2e
```

---

## Tech Stack

- Next.js v14: used as the main framework to have some functionality out-of-the-box and focus on implementing the main requirements without having to worry too much about boilerplate code.
- TypeScript: for type safety
- Tailwind: To quickly build a nice-looking (very subjective) UI.
- DDD (Domain-Driven Design): To separate business logic from the application logic. And since it was out of scope to have a proper backend integration, it was easier to use DDD to leave all the business logic in a single part of the application
- Jest + Playwright: for unit and e2e tests

In general I chose this tech stack to have a clear separation of concerns between the business logic and the UI layer, and to have a scalable foundation to allow new things to be added while also having some flexibility on which technologies could be used to integrate new features.

---

## Application Architecture

The application follows a Domain-Driven Design (DDD) architecture, splitting responsibilities into separate layers:

- **Domain Layer:** Contains the core business logic and models (e.g., **Pokedex**, **Pokemon**). This layer is responsible for encapsulating the rules and operations related to the Pokédex and its entities.
- **Application Layer:** Contains services (e.g., **PokedexService**) that mediate between the domain and infrastructure layers. This layer is responsible for coordinating actions like adding notes to a Pokémon, catching Pokémon, and sharing the Pokédex.
- **Infrastructure Layer:** Contains repositories (e.g., **PokedexRepository**) that handle data persistence and retrieval. This layer interacts with external systems like local storage or potential APIs.
- **UI Layer:** Built using Next.js. This layer is responsible for rendering the application's UI and handling user interactions.

### Folder structure (simplified)

```
📦 src
 ┣ 📂 app
 ┃ ┣ 📂 components -> Reusable components
 ┃ ┃ ┗ 📜 PokemonCard.tsx
 ┃ ┃ ┗ 📜 PokemonList.tsx
 ┃ ┣ 📂 pokedex -> Pokédex page
 ┃ ┃ ┗ 📜 page.tsx
 ┃ ┣ 📂 share -> Shared Pokédex page
 ┃ ┃ ┗ 📜 page.tsx
 ┣ 📂 business -> DDD root
 ┃ ┣ 📂 domain
 ┃ ┃ ┣ 📂 models
 ┃ ┃ ┃ ┣ 📜 Pokedex.ts
 ┃ ┃ ┣ 📂 repositories
 ┃ ┃ ┃ ┗ 📜 IPokedexRepository.ts
 ┃ ┃ ┗ 📂 value-objects
 ┃ ┃ ┃ ┗ 📜 Pokemon.ts
 ┃ ┣ 📂 services
 ┃ ┃ ┗ 📜 PokedexService.ts
 ┣ ┣ 📂 infrastructure
 ┃ ┣ ┣ 📂 repositories
 ┃ ┃ ┣ ┗ 📜 PokedexRepository.ts
 ┣ 📂 services -> Shared logic
 ┃ ┣ 📜 PokedexContext.ts
 ┣ 📂 utils
 ┃ ┣ 📜 sortPokedex.ts

```

## Requirements

> See all Pokémons that can be caught with their respective name and picture
> 
> See the most important details of each Pokémon: Types; Height and Weight; Stats: HP, Attack, Defense, Sp. Attack, Sp. Defense, Speed

Go to [http://localhost:3000](http://localhost:3000) and check the Pokémon list

---

> Add Pokémon to the Pokédex
> 
> For Pokémon added to the Pokédex: show the date when it was added

Go to [http://localhost:3000](http://localhost:3000) and click on the Pokéball on a Pokémon card

---

> Show Pokédex progress

Shown in the Header of all pages.

---

> Pokédex page to show only caught Pokémon

Add some Pokémon to you Pokédex on the homepage and click on the "Your Pokédex" link.

---

> Share any Pokémon with others

This was a bit unclear. So my idea was to make a "share" page which shows the user's Pokédex.

Add some Pokémon to you Pokédex on the homepage, click on the "Your Pokédex" link and then click on the "Share Pokédex" button.

---

> Have access to my Pokédex with limited internet connectivity

Pokédex data is persisted in localStorage so you can access your Pokédex data offline, and if React-Query cached the PokeApi response, you can also see the Pokémon list on the homepage.

---

> Manage my Pokédex:
> 
> 1. Filter and sort Pokémon by: name, height, timestamp
> 2. Remove one or multiple Pokémon at once
> 3. Attach a free-text note to each Pokémon

All options (except remove multiple Pokémon at once) are done via the Pokédex page

---

> Export all Pokémons from the Pokédex to CSV


Add some Pokémon to you Pokédex on the homepage, click on the "Your Pokédex" link and then click on the "Export Pokédex to CSV" button.

---

## Possible improvements

If we would want to make this application production-ready there are some improvement I would like to make:

1. Backend Integration: Currently, the application uses local storage for persistence. For a production-ready app, we could add a proper database service and use localStorage as the fallback option
2. Authentication: Integrate user authentication to enable user-specific Pokédex lists
3. Error Monitoring: Use an error monitoring service to track errors in production
4. State Management: In general the app is simple so I could use just a single Context to share some data/logic across multiple pages, but we would probably need a more robust solution if the app got bigger and more data/features were added
5. Accessibility: Ensure that the application follows best practices for accessibility in all components. I've tried to make it work for most things, but probably would need a second-pass to fix some uncaught issues

**Thank you!** 👋
