/*
  ┌───────────────────────────────────────────────────────────────┐
  │  YT Thumbnail Extractor – Thar Studio Edition (Version 1)      │
  │  Licensed Product - Unauthorized usage strictly prohibited     │
  │  For licensing contact: Thar Studio                            │
  │  Open for collaboration & contributions (credit guaranteed)    │
  └───────────────────────────────────────────────────────────────┘
  
  Licensed by Thar Studio — Illegal usage prohibited.
  For credits, contributions, and licensing: Contact Thar Studio.
  This project is 100% free for everyone for a lifetime.
  
  Main popup logic:
  - Tab switching
  - YouTube URL parsing and video ID extraction
  - Auto-detection from active tab
  - Thumbnail preview generation and download handling
*/

// ============================================================================
// TAB SWITCHING LOGIC
// ============================================================================

const tabButtons = document.querySelectorAll(".tab");
const tabPanels = document.querySelectorAll(".tab-panel");

/**
 * Initialize tab switching functionality.
 * Switches between Single and Bulk tabs on button click.
 */
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-tab");

    // Remove active state from all tabs and panels
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabPanels.forEach((panel) => panel.classList.remove("active"));

    // Activate clicked tab and corresponding panel
    btn.classList.add("active");
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add("active");
    }
  });
});

// ============================================================================
// DOM ELEMENT REFERENCES
// ============================================================================

const ytUrlInput = document.getElementById("yt-url");
const extractBtn = document.getElementById("extract-btn");
const statusMessage = document.getElementById("status-message");
const errorMessage = document.getElementById("error-message");
const thumbnailsContainer = document.getElementById("thumbnails-container");

// ============================================================================
// YOUTUBE VIDEO ID EXTRACTION
// ============================================================================

/**
 * Extract a YouTube video ID from many possible URL formats.
 * 
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - Raw 11-character video ID
 * 
 * @param {string} url - YouTube URL or video ID
 * @returns {string|null} - Extracted video ID or null if invalid
 */
function extractVideoId(url) {
  if (!url || typeof url !== "string") return null;

  const trimmed = url.trim();

  // If it's just a naked 11-char ID, accept it
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Parse URL
  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch (_e) {
    return null;
  }

  const hostname = parsed.hostname.replace(/^www\./, "");

  // Handle youtu.be short links
  if (hostname === "youtu.be") {
    const id = parsed.pathname.replace("/", "");
    return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
  }

  // Must be a youtube.com domain
  if (!hostname.endsWith("youtube.com")) {
    return null;
  }

  // Classic watch URL: https://www.youtube.com/watch?v=VIDEO_ID
  if (parsed.pathname === "/watch") {
    const v = parsed.searchParams.get("v");
    return /^[a-zA-Z0-9_-]{11}$/.test(v || "") ? v : null;
  }

  // Embed URL: /embed/VIDEO_ID
  if (parsed.pathname.startsWith("/embed/")) {
    const id = parsed.pathname.split("/")[2];
    return /^[a-zA-Z0-9_-]{11}$/.test(id || "") ? id : null;
  }

  // Shorts URL: /shorts/VIDEO_ID
  if (parsed.pathname.startsWith("/shorts/")) {
    const id = parsed.pathname.split("/")[2];
    return /^[a-zA-Z0-9_-]{11}$/.test(id || "") ? id : null;
  }

  return null;
}

// ============================================================================
// UI STATE MANAGEMENT
// ============================================================================

/**
 * Clear all thumbnail previews from the container.
 */
function clearThumbnails() {
  thumbnailsContainer.innerHTML = "";
}

/**
 * Set status message (info/informational).
 * @param {string} message - Status message text
 */
function setStatus(message) {
  if (!statusMessage) return;
  statusMessage.textContent = message || "";
}

/**
 * Set error message (validation/error state).
 * @param {string} message - Error message text
 */
function setError(message) {
  errorMessage.textContent = message || "";
}

// ============================================================================
// THUMBNAIL CARD GENERATION
// ============================================================================

/**
 * Create a thumbnail preview card with download button.
 * 
 * @param {string} videoId - YouTube video ID
 * @param {string} label - Quality label (e.g., "Max Resolution")
 * @param {string} key - Quality key (e.g., "maxres", "sd", "hq", "mq")
 * @param {string} sizeHint - Size description (e.g., "Typically 1280×720")
 * @returns {HTMLElement} - Thumbnail card element
 */
function createThumbnailCard(videoId, label, key, sizeHint) {
  // Build thumbnail URL using YouTube's CDN pattern
  const url = `https://i.ytimg.com/vi/${videoId}/${key}default.jpg`;

  // Create card container
  const card = document.createElement("div");
  card.className = "thumbnail-card";

  // Create header with quality label and size hint
  const header = document.createElement("div");
  header.className = "thumbnail-header";

  const qualitySpan = document.createElement("span");
  qualitySpan.className = "thumbnail-quality";
  qualitySpan.textContent = label;

  const sizeSpan = document.createElement("span");
  sizeSpan.className = "thumbnail-size-hint";
  sizeSpan.textContent = sizeHint;

  header.appendChild(qualitySpan);
  header.appendChild(sizeSpan);

  // Create preview image
  const img = document.createElement("img");
  img.className = "thumbnail-preview";
  img.src = url;
  img.alt = `${label} thumbnail preview`;

  // Create download button
  const downloadBtn = document.createElement("button");
  downloadBtn.className = "secondary-button";
  downloadBtn.type = "button";
  downloadBtn.innerHTML = `
    <span class="download-icon">↓</span>
    <span>Download .jpg</span>
  `;

  // Download button click handler
  downloadBtn.addEventListener("click", () => {
    // Check if chrome.downloads API is available
    if (!chrome || !chrome.downloads || typeof chrome.downloads.download !== "function") {
      alert("The downloads API is not available in this browser.");
      return;
    }

    // Trigger download via Chrome Downloads API
    chrome.downloads.download(
      {
        url: url,
        filename: `yt-thumbnail-${videoId}-${key}.jpg`,
        saveAs: true
      },
      (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error("Download failed:", chrome.runtime.lastError);
        }
      }
    );
  });

  // Assemble card
  card.appendChild(header);
  card.appendChild(img);
  card.appendChild(downloadBtn);

  return card;
}

/**
 * Render all available thumbnail quality options for a video.
 * 
 * @param {string} videoId - YouTube video ID
 */
function renderThumbnails(videoId) {
  clearThumbnails();

  // Thumbnail quality configurations
  const configs = [
    { label: "Max Resolution", key: "maxres", size: "Typically 1280×720 or higher" },
    { label: "Standard (SD)", key: "sd", size: "Typically 640×480" },
    { label: "High (HQ)", key: "hq", size: "Typically 480×360" },
    { label: "Medium (MQ)", key: "mq", size: "Typically 320×180" }
  ];

  // Create and append cards for each quality
  configs.forEach((cfg) => {
    const card = createThumbnailCard(videoId, cfg.label, cfg.key, cfg.size);
    thumbnailsContainer.appendChild(card);
  });
}

// ============================================================================
// MANUAL EXTRACTION HANDLER
// ============================================================================

/**
 * Handle manual "Extract Thumbnails" button click or Enter key.
 * Validates input, extracts video ID, and renders thumbnails.
 */
function handleExtract() {
  setStatus("");
  setError("");
  clearThumbnails();

  const url = ytUrlInput.value;
  const videoId = extractVideoId(url);

  if (!videoId) {
    setError("Please enter a valid YouTube video URL or 11-character video ID.");
    return;
  }

  renderThumbnails(videoId);
  setStatus("Thumbnails loaded.");
}

// Extract button click handler
extractBtn.addEventListener("click", handleExtract);

// Enter key handler for input field
ytUrlInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleExtract();
  }
});

// ============================================================================
// AUTO-DETECTION FROM ACTIVE TAB
// ============================================================================

/**
 * Show "No video selected" message when auto-detection fails.
 */
function showNoVideoSelectedMessage() {
  clearThumbnails();
  setStatus("No video selected. Open a YouTube video.");
}

/**
 * Automatically detect YouTube video from the active browser tab.
 * On success: auto-populates input and renders thumbnails.
 * On failure: shows "No video selected" message.
 */
function detectFromActiveTab() {
  // Check if chrome.tabs API is available
  if (typeof chrome === "undefined" || !chrome.tabs || !chrome.tabs.query) {
    showNoVideoSelectedMessage();
    return;
  }

  // Query active tab in current window
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs.length) {
      showNoVideoSelectedMessage();
      return;
    }

    const activeTab = tabs[0];
    if (!activeTab || !activeTab.url) {
      showNoVideoSelectedMessage();
      return;
    }

    // Extract video ID from active tab URL
    const videoId = extractVideoId(activeTab.url);
    if (!videoId) {
      showNoVideoSelectedMessage();
      return;
    }

    // Success: auto-populate and render
    ytUrlInput.value = activeTab.url;
    setStatus("Detected YouTube video from active tab.");
    setError("");
    renderThumbnails(videoId);
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Auto-detect video from the active tab on popup open
detectFromActiveTab();
