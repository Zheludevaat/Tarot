# Tarot Explorer

This project packages the **Holographic Tarot Explorer** as a small desktop application using [Electron](https://www.electronjs.org/).

## Quick Setup

1. **Install Node.js**
   - Go to [nodejs.org](https://nodejs.org/) and download the "LTS" installer for your operating system.
   - Run the installer and follow the defaults. After installation you should have the `node` and `npm` commands available.
2. **Download the project**
   - Either clone this repository or download it as a ZIP and extract it.
3. **Install and launch**
   - On macOS/Linux you can double-click `launch.sh`.
   - On Windows double-click `launch.bat`. If the window closes too quickly, open a **Command Prompt** in this folder and run `launch.bat` so any messages remain visible.
   - Alternatively run the command below inside the project folder:
     ```bash
     npm run launch
     ```
     The script installs dependencies (only the first time) and then opens the explorer.
   - If an error mentions running as root without a sandbox, use:
     ```bash
     npm start -- --no-sandbox
     ```

This command requires an available display server (such as X11 or Wayland).
Without a graphical environment Electron cannot launch.

A window will open displaying `index.html` with the interactive tarot visualization.

If you need help with any of the steps above, let us know which operating system you're using so we can provide more specific instructions.

## Packaging

To create a standalone build for your current platform, run:

```bash
npm run package
```

The resulting application will appear in a folder named `tarot-explorer-*`.

Electron stores its cache in a temporary folder inside your user directory to avoid permission errors. You can safely delete this folder if needed.

## License

This project is released under the [MIT License](LICENSE).

