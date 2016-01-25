## Introduction
Connect 4 game implemented using React and Pixi via react-pixi renderer.
Uses Redux and the localStorage adapter to persist the game state.

## Run it
Dev server
```
npm start
```
Linter
```
npm run lint
```
Build
```
npm run build
```

## Notes
- Game logic in src/ConnectFour.js . Functional aproach, the game state will be an Immutable.js Map in the future
- React Components
-- Board: Wrapper for the game
-- Grid: The 7x6 grid
-- Cell: The cell for each grid position
-- PlayerInput: the upper row, where the coin is being placed and the game stats are displayed
