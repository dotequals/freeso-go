# FreeSO Go (working title)
A cross-platform launcher for [FreeSO](https://github.com/riperiperi/FreeSO) written with electron.

### Known Issues
- (Windows) Frameless, transparent windows have issues with unmaximizing. All the [GitHub issues](https://github.com/electron/electron/issues?utf8=%E2%9C%93&q=unmaximize+frameless) seem to die and get closed.
- (macOS & Linux) Closing FreeSO by clicking the title bar button will cause the process to stay open and potentially hang. It must then be Force Quit via Activity/System Monitor.
- (Linux) Users have to put --enable-transparent-visuals --disable-gpu in the command line to disable GPU and allow ARGB to make transparent window, this is caused by an upstream bug that [alpha channel doesn't work on some NVidia drivers](https://bugs.chromium.org/p/chromium/issues/detail?id=369209) on Linux.

#### Linux Support
Many distros may be compatible, but I will only be ensuring compatibility with Ubuntu LTS using GNOME. If minor changes can be made to support other distros they may be accomadated, but it'd be better to fork for any larger specific changes.

### Goals
- 🚀 Powered by [React](https://reactjs.org/)
- 💻 Cross platform
- ↔ Responsive and scalable
- 🎨 Modern design
- 🖌 Themeable
- 📦 Portable
- 🚫 _Can_ work without Administrator privileges
- 🐞 Helps with debugging FreeSO issues

## Getting Started
1. `git clone https://github.com/dotequals/freeso-go`
2. `cd freeso-go && npm install`
3. `npm start`

## Packaging
1. `npm run build`
2. `npm run dist`