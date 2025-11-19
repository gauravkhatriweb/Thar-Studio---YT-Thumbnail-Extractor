<!--
  ┌───────────────────────────────────────────────────────────────┐
  │  YT Thumbnail Extractor – Thar Studio Edition (Version 1)      │
  │  Licensed Product - Unauthorized usage strictly prohibited     │
  │  For licensing contact: Thar Studio                            │
  │  Open for collaboration & contributions (credit guaranteed)    │
  └───────────────────────────────────────────────────────────────┘
  
  Licensed by Thar Studio — Illegal usage prohibited.
  For credits, contributions, and licensing: Contact Thar Studio.
  This project is 100% free for everyone for a lifetime.
-->

<div align="center">

# 🎬 YT Thumbnail Extractor

### **Thar Studio Edition** – Version 1.0.0 (Stable Release)

**Extract and download YouTube video thumbnails in multiple resolutions with one click.**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/tharstudio/yt-thumbnail-extractor)
[![License](https://img.shields.io/badge/license-Thar%20Studio-green.svg)](LICENSE)
[![Made With](https://img.shields.io/badge/made%20with-Vanilla%20JS%20%2B%20Python-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Thar Studio](https://img.shields.io/badge/brand-Thar%20Studio-60A5FA.svg)](https://tharstudio.com)
[![Free Forever](https://img.shields.io/badge/free-forever-success.svg)](LICENSE)
[![Collaboration](https://img.shields.io/badge/collaboration-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

**Made with ❤️ by [Thar Studio](https://tharstudio.com)**

*This project is 100% free for everyone for a lifetime.*

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Why This Extension?](#-why-this-extension)
- [Features](#-features)
- [Thar Studio Design System](#-thar-studio-design-system)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
  - [Chrome / Chromium](#chrome--chromium)
  - [Safari (macOS)](#safari-macos)
- [Usage Guide](#-usage-guide)
- [Auto URL Detection](#-auto-url-detection)
- [Python Helper Script](#-python-helper-script)
- [Development](#-development)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Credits & Acknowledgments](#-credits--acknowledgments)
- [License](#-license)
- [Version Information](#-version-information)

---

## 🎯 About

**YT Thumbnail Extractor** is a lightweight, elegant browser extension designed to help content creators, designers, and YouTube enthusiasts quickly extract and download video thumbnails in multiple resolutions.

Built with **vanilla JavaScript** and a clean, modern UI following the **Thar Studio design system**, this extension eliminates the need for manual screenshot tools or complex URL manipulation. Simply open a YouTube video, click the extension icon, and download thumbnails in seconds.

### What Problem Does It Solve?

- **No more manual screenshots** – Get the original, high-quality thumbnail files directly from YouTube's CDN
- **Multiple resolutions** – Access maxres, SD, HQ, and MQ variants in one place
- **Zero external tools** – Everything works right in your browser
- **Auto-detection** – Automatically detects the video you're watching
- **Fast & lightweight** – No bloat, no tracking, just pure functionality

### Who Benefits?

- **Content Creators** – Quickly grab thumbnails for inspiration or analysis
- **Designers** – Access high-resolution assets for mockups and presentations
- **Developers** – Integrate thumbnail extraction into workflows
- **Researchers** – Collect thumbnail data for analysis
- **Anyone** – Who wants quick access to YouTube thumbnails without hassle

### Why Thar Studio?

Thar Studio is committed to building **free, high-quality tools** that empower creators. This extension is part of our mission to provide professional-grade utilities that are accessible to everyone, forever.

---

## ✨ Features

### Version 1.0.0 (Current Stable Release)

#### ✅ Single Thumbnail Extraction (Fully Functional)

- **Auto-Detection from Active Tab**
  - Automatically detects YouTube videos when you open the popup
  - No manual URL entry required (but still supported)
  - Works with all YouTube URL formats

- **Robust URL Parsing**
  - Supports `youtube.com/watch?v=...`
  - Supports `youtu.be/...` short links
  - Supports `youtube.com/embed/...` embed URLs
  - Supports `youtube.com/shorts/...` Shorts URLs
  - Accepts raw 11-character video IDs

- **Multiple Resolution Options**
  - **Max Resolution** (`maxresdefault.jpg`) – Typically 1280×720 or higher
  - **Standard (SD)** (`sddefault.jpg`) – Typically 640×480
  - **High (HQ)** (`hqdefault.jpg`) – Typically 480×360
  - **Medium (MQ)** (`mqdefault.jpg`) – Typically 320×180

- **One-Click Downloads**
  - Individual download buttons for each quality
  - Files saved as `.jpg` with descriptive filenames
  - Uses Chrome's native download API

- **Clean, Modern UI**
  - Thar Studio design system
  - Responsive popup (380px width)
  - Smooth animations and transitions
  - Accessible and keyboard-friendly

#### 🚧 Bulk Thumbnails (Coming in v2)

- Placeholder tab with "Coming Soon" message
- Planned features:
  - Multiple URL input
  - Playlist support
  - Batch download with ZIP export
  - Progress tracking

---

## 🎨 Thar Studio Design System

This extension uses the **Thar Studio color palette** and typography for a consistent, professional appearance.

### Color Palette

| Element | Hex Code | Usage |
|---------|----------|-------|
| **Graphite** | `#111827` | Headers, brand text, high contrast elements |
| **Electric Blue** | `#2563EB` | Primary buttons, highlights, interactive elements |
| **Sky Accent** | `#60A5FA` | Accents, secondary details, watermark text |
| **Light Gray** | `#F3F4F6` | Card backgrounds, main popup background |

### Typography

- **Font Family**: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-Bold)
- **Usage**: All UI text, buttons, labels, and content

### Visual Design Principles

- **Minimalism** – Clean, uncluttered interface
- **Consistency** – Uniform spacing, rounded corners, subtle shadows
- **Accessibility** – High contrast, readable fonts, ARIA labels
- **Responsiveness** – Fixed-width popup that adapts to content

---

## 📁 Project Structure

```
yt-thumbnail-extractor/
│
├── manifest.json              # Extension manifest (Manifest V3)
├── popup.html                 # Main popup UI structure
├── popup.js                   # Popup logic and event handlers
├── styles.css                 # Thar Studio design system styles
├── background.js              # Background service worker
├── README.md                  # This file
│
├── python/                    # Optional Python helper script
│   ├── thumbnail_downloader.py
│   └── requirements.txt
│
└── icons/                     # Extension icons (replace with real PNGs)
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

> **Note**: The `icons/*.png` files are placeholders. Replace them with real 16×16, 48×48, and 128×128 pixel PNG icons before publishing.

---

## 🚀 Installation

### Chrome / Chromium

1. **Prepare the Extension Folder**
   - Ensure all files are in the `yt-thumbnail-extractor/` directory
   - Verify `manifest.json` exists at the root

2. **Open Chrome Extensions Page**
   - Open Chrome or any Chromium-based browser
   - Navigate to `chrome://extensions/`

3. **Enable Developer Mode**
   - Toggle **Developer mode** ON (top-right corner)

4. **Load Unpacked Extension**
   - Click **"Load unpacked"**
   - Select the `yt-thumbnail-extractor` folder
   - The extension should appear in your extensions list

5. **Pin the Extension (Optional)**
   - Click the puzzle icon in Chrome's toolbar
   - Find "YT Thumbnail Extractor" and click the pin icon

6. **Ready to Use!**
   - Click the extension icon in your toolbar
   - The popup will open with auto-detection enabled

### Safari (macOS)

Safari requires wrapping the extension as a **Safari Web Extension** using Xcode.

1. **Install Xcode**
   - Download from the Mac App Store
   - Ensure you have the latest version

2. **Create Safari Web Extension Project**
   - Open Xcode
   - Select **File → New → Project…**
   - Choose **Safari Web Extension** (macOS or Multiplatform)
   - Name it (e.g., `YTThumbnailExtractor`)

3. **Import Existing Extension**
   - When prompted, select **"Use an existing extension"**
   - Point to the `yt-thumbnail-extractor` folder (where `manifest.json` is located)

4. **Build and Run**
   - Select the **macOS app** target
   - Click **Run** (⌘R)
   - This installs the extension locally

5. **Enable in Safari**
   - Open **Safari → Settings → Extensions**
   - Find "YT Thumbnail Extractor"
   - Enable the extension

6. **Notes**
   - Safari supports `chrome.*` APIs via compatibility layer
   - `chrome.downloads` works in recent Safari versions
   - Behavior may differ slightly from Chrome

---

## 📖 Usage Guide

### Basic Usage

1. **Open a YouTube Video**
   - Navigate to any YouTube video in your browser
   - Example: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`

2. **Open the Extension**
   - Click the **YT Thumbnail Extractor** icon in your toolbar
   - The popup will automatically detect the video and load thumbnails

3. **Download Thumbnails**
   - Four thumbnail previews will appear (maxres, SD, HQ, MQ)
   - Click **"Download .jpg"** under any preview to save it
   - Files are saved to your default Downloads folder

### Manual URL Entry

If auto-detection doesn't work or you want to extract from a different video:

1. **Paste a YouTube URL**
   - Paste any YouTube URL into the input field
   - Supported formats:
     - `https://www.youtube.com/watch?v=VIDEO_ID`
     - `https://youtu.be/VIDEO_ID`
     - `https://www.youtube.com/embed/VIDEO_ID`
     - `https://www.youtube.com/shorts/VIDEO_ID`
     - Raw 11-character video ID

2. **Click "Extract Thumbnails"**
   - Or press **Enter** in the input field
   - Thumbnails will load immediately

### Keyboard Shortcuts

- **Enter** – Extract thumbnails from input field
- **Tab** – Navigate between elements
- **Click** – Switch between Single/Bulk tabs

### Screenshots

> **Placeholder**: Add screenshots to `screenshots/` folder:
> - `screenshots/popup-single.png` – Single thumbnail tab with detected video
> - `screenshots/popup-bulk-placeholder.png` – Bulk tab "Coming Soon" view

---

## 🔍 Auto URL Detection

The extension automatically detects YouTube videos from your active browser tab when you open the popup.

### How It Works

1. **On Popup Open**
   - Extension queries the active tab using `chrome.tabs.query()`
   - Extracts the current tab's URL

2. **URL Parsing**
   - Attempts to extract a video ID from the URL
   - Supports all common YouTube URL formats
   - Validates the ID format (11 characters, alphanumeric)

3. **Success Path**
   - If a valid video ID is found:
     - Input field is auto-populated with the URL
     - Thumbnails are immediately rendered
     - Status message: "Detected YouTube video from active tab."

4. **Fallback Path**
   - If no valid video is detected:
     - Thumbnails area is cleared
     - Status message: "No video selected. Open a YouTube video."
     - User can manually paste a URL

### Supported URL Patterns

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`
- Raw 11-character video ID (e.g., `dQw4w9WgXcQ`)

---

## 🐍 Python Helper Script

An optional Python script is included for command-line thumbnail downloads.

### Setup (macOS with Homebrew)

1. **Install Python**
   ```bash
   brew install python
   ```

2. **Create Virtual Environment**
   ```bash
   cd yt-thumbnail-extractor/python
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

### Usage

```bash
# Download thumbnails for a video
python thumbnail_downloader.py "https://www.youtube.com/watch?v=VIDEO_ID"

# Specify custom output directory
python thumbnail_downloader.py "https://youtu.be/VIDEO_ID" -o my_thumbs
```

### Output

Thumbnails are saved to `thumbnails/` (or your specified directory) with filenames:
- `yt-thumbnail-VIDEO_ID-maxres.jpg`
- `yt-thumbnail-VIDEO_ID-sd.jpg`
- `yt-thumbnail-VIDEO_ID-hq.jpg`
- `yt-thumbnail-VIDEO_ID-mq.jpg`

---

## 🛠 Development

### Tech Stack

- **Frontend**: Vanilla JavaScript (no frameworks)
- **Styling**: CSS3 with Thar Studio design system
- **Extension API**: Chrome Extensions Manifest V3
- **Backend Script**: Python 3.x with `requests` library

### Development Setup

1. **Clone or Download**
   ```bash
   git clone <repository-url>
   cd yt-thumbnail-extractor
   ```

2. **Load in Chrome**
   - Follow [Chrome Installation](#chrome--chromium) steps
   - Enable Developer Mode
   - Load unpacked extension

3. **Make Changes**
   - Edit files directly
   - Reload extension in `chrome://extensions/` to see changes
   - Use Chrome DevTools for debugging (right-click popup → Inspect)

### Code Structure

- **`popup.js`** – Main logic, URL parsing, thumbnail rendering, download handling
- **`popup.html`** – UI structure, semantic HTML, accessibility attributes
- **`styles.css`** – Complete design system, responsive layout, animations
- **`background.js`** – Service worker (minimal, reserved for future features)
- **`manifest.json`** – Extension configuration, permissions, icons

### Best Practices

- **No External Dependencies** – Pure vanilla JavaScript
- **Manifest V3** – Modern extension standard
- **Accessibility** – ARIA labels, keyboard navigation
- **Error Handling** – Graceful fallbacks for API failures
- **Code Comments** – Comprehensive inline documentation

---

## 🗺 Roadmap

### Version 1.0.0 (Current – Stable Release)

✅ Single thumbnail extraction  
✅ Auto URL detection  
✅ Multiple resolution support  
✅ Clean UI with Thar Studio design system  
✅ Chrome and Safari support  
✅ Python helper script  

### Version 2.0.0 (Planned)

- **Bulk Thumbnail Download**
  - Multiple URL input
  - Playlist support
  - Batch download with progress tracking
  - ZIP export option

- **Advanced Features**
  - Custom filename templates
  - Resolution selection toggle
  - Dark/light theme toggle
  - Download history

- **Safari Enhancements**
  - Additional API fallbacks
  - Explicit `browser.*` namespace support
  - Safari-specific optimizations

- **Automation & CLI**
  - Enhanced Python script with playlist support
  - Parallel downloads with rate limiting
  - Configuration file support

### Future Versions

- Context menu integration
- Keyboard shortcuts
- Export to cloud storage
- Thumbnail comparison tool
- Analytics and insights

---

## 🤝 Contributing

We welcome contributions! This project is open for collaboration and contributions with credit guaranteed.

### How to Contribute

1. **Fork the Repository**
   - Create your own fork of the project

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test thoroughly in Chrome and Safari

4. **Submit a Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Ensure all files include the Thar Studio license header

### Contribution Guidelines

- **Code Style**: Follow existing formatting (2 spaces for web, 4 spaces for Python)
- **Comments**: Add helpful inline comments for complex logic
- **Testing**: Test in both Chrome and Safari before submitting
- **License**: All contributions must include the Thar Studio license header
- **Credit**: Contributors will be credited in the README and release notes

### Areas for Contribution

- Bug fixes and improvements
- New features (aligned with roadmap)
- Documentation improvements
- UI/UX enhancements
- Safari compatibility improvements
- Python script enhancements

---

## 🙏 Credits & Acknowledgments

### Thar Studio

**YT Thumbnail Extractor** is developed and maintained by **Thar Studio**.

- **Brand**: Thar Studio
- **Design System**: Thar Studio Design System
- **License**: Thar Studio License (Free Forever)

### Technologies Used

- **Chrome Extensions API** – Browser extension platform
- **Inter Font** – Google Fonts typography
- **Python Requests** – HTTP library for Python script
- **Manifest V3** – Modern extension standard

### Special Thanks

- YouTube for providing accessible thumbnail CDN
- Chrome and Safari teams for Web Extension support
- Open-source community for inspiration and feedback

---

## 📄 License

### Thar Studio License

**Licensed by Thar Studio — Illegal usage prohibited.**

This project is **100% free for everyone for a lifetime**.

### Terms

- ✅ **Free to Use** – This project is free for personal and commercial use
- ✅ **Free Forever** – No expiration, no hidden costs
- ✅ **Open for Collaboration** – Contributions welcome with credit guaranteed
- ❌ **Unauthorized Use Prohibited** – Do not redistribute without permission
- ❌ **No Removal of Attribution** – Keep Thar Studio branding and license headers

### For Licensing & Credits

For licensing inquiries, collaboration opportunities, or to request removal of attribution:

**Contact**: Thar Studio  
**Website**: [tharstudio.com](https://tharstudio.com)

### License Headers

All source files include the Thar Studio license header. Do not remove these headers when using or modifying the code.

---

## 📌 Version Information

### You are currently viewing: **Version 1.0.0 – Stable Release**

This is the **stable release** of YT Thumbnail Extractor. All core features are implemented and tested.

### Next Milestone: **Version 2.0.0 – Bulk Downloader System**

Version 2 will introduce bulk thumbnail downloading, playlist support, and advanced features.

---

<div align="center">

**Made with ❤️ by [Thar Studio](https://tharstudio.com)**

*This project is 100% free for everyone for a lifetime.*

[![Thar Studio](https://img.shields.io/badge/brand-Thar%20Studio-60A5FA.svg)](https://tharstudio.com)
[![Free Forever](https://img.shields.io/badge/free-forever-success.svg)](LICENSE)

</div>
