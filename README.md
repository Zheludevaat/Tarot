# Tarot Explorer

This project packages the **Holographic Tarot Explorer** as a small desktop application using [Electron](https://www.electronjs.org/).

## Quick Setup

1. **Install Node.js**
   - Go to [nodejs.org](https://nodejs.org/) and download the "LTS" installer for your operating system.
   - Run the installer and follow the defaults. After installation you should have the `node` and `npm` commands available.
2. **Download the project**
   - Either clone this repository or download it as a ZIP and extract it.
3. **Install the app files**
   - Open a terminal or command prompt inside the project folder.
   - Run:
     ```bash
     npm install
     ```
     This fetches the Electron runtime. Once done the app works without internet access.
4. **Start the explorer**
   ```bash
  npm start
  ```
  If an error mentions running as root without a sandbox, use:
  ```bash
  npm start -- --no-sandbox
  ```

This command requires an available display server (such as X11 or Wayland).
Without a graphical environment Electron cannot launch.

A window will open displaying `index.html` with the interactive tarot visualization.

If you need help with any of the steps above, let us know which operating system you're using so we can provide more specific instructions.
