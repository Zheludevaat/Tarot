# Tarot Explorer

This project packages the **Holographic Tarot Explorer** as a small desktop application using [Electron](https://www.electronjs.org/).

# Installation

1. Ensure you have [Node.js](https://nodejs.org/) installed (version 16 or later).
   The app uses `npm` to fetch the Electron runtime and does not require an
   internet connection after the dependencies are installed.
2. Install the dependencies:
   ```bash
   npm start
   ```

## Running

Start the Electron application with:
```bash
npm start
```

If you are running in a container or as the `root` user you may need to disable
the Chromium sandbox:
```bash
npm start -- --no-sandbox
```

The explorer opens a window rendering `index.html` with the interactive tarot
visualization completely offline.


