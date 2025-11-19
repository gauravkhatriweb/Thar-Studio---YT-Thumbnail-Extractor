"""
  ┌───────────────────────────────────────────────────────────────┐
  │  YT Thumbnail Extractor – Thar Studio Edition (Version 1)      │
  │  Licensed Product - Unauthorized usage strictly prohibited     │
  │  For licensing contact: Thar Studio                            │
  │  Open for collaboration & contributions (credit guaranteed)    │
  └───────────────────────────────────────────────────────────────┘
  
  Licensed by Thar Studio — Illegal usage prohibited.
  For credits, contributions, and licensing: Contact Thar Studio.
  This project is 100% free for everyone for a lifetime.
  
  Optional local helper script for downloading YouTube thumbnails via Python.
  
  Usage (after installing requirements in this folder):
      python thumbnail_downloader.py "https://www.youtube.com/watch?v=VIDEO_ID"
  
  This script will attempt to download the available thumbnail variants:
  maxresdefault, sddefault, hqdefault, mqdefault.
"""

import argparse
import os
from urllib.parse import urlparse, parse_qs

import requests


def extract_video_id(url: str) -> str | None:
    """
    Extract a YouTube video ID from common URL formats or a naked ID.
    
    Supports:
    - https://www.youtube.com/watch?v=VIDEO_ID
    - https://youtu.be/VIDEO_ID
    - https://www.youtube.com/embed/VIDEO_ID
    - https://www.youtube.com/shorts/VIDEO_ID
    - Raw 11-character video ID
    
    Args:
        url: YouTube URL or video ID string
        
    Returns:
        Video ID string if valid, None otherwise
    """
    if not url:
        return None

    url = url.strip()

    # Naked 11-char ID
    if len(url) == 11 and all(c.isalnum() or c in "-_" for c in url):
        return url

    # Parse URL
    try:
        parsed = urlparse(url)
    except Exception:
        return None

    hostname = parsed.hostname or ""
    hostname = hostname.replace("www.", "")

    # Handle youtu.be short links
    if hostname == "youtu.be":
        video_id = parsed.path.lstrip("/")
        return video_id if len(video_id) == 11 else None

    # Must be a youtube.com domain
    if not hostname.endswith("youtube.com"):
        return None

    # Classic watch URL
    if parsed.path == "/watch":
        params = parse_qs(parsed.query or "")
        v = params.get("v", [None])[0]
        return v if v and len(v) == 11 else None

    # Embed URL
    if parsed.path.startswith("/embed/"):
        video_id = parsed.path.split("/")[2]
        return video_id if len(video_id) == 11 else None

    # Shorts URL
    if parsed.path.startswith("/shorts/"):
        video_id = parsed.path.split("/")[2]
        return video_id if len(video_id) == 11 else None

    return None


def build_thumbnail_urls(video_id: str) -> dict[str, str]:
    """
    Build thumbnail URLs for all available quality variants.
    
    Args:
        video_id: YouTube video ID
        
    Returns:
        Dictionary mapping quality keys to thumbnail URLs
    """
    base = f"https://i.ytimg.com/vi/{video_id}"
    return {
        "maxres": f"{base}/maxresdefault.jpg",
        "sd": f"{base}/sddefault.jpg",
        "hq": f"{base}/hqdefault.jpg",
        "mq": f"{base}/mqdefault.jpg",
    }


def download_thumbnail(url: str, dest_path: str) -> bool:
    """
    Download a thumbnail image from URL to local file.
    
    Args:
        url: Thumbnail image URL
        dest_path: Local file path to save the image
        
    Returns:
        True if download succeeded, False otherwise
    """
    try:
        resp = requests.get(url, timeout=15)
        if resp.status_code != 200:
            return False
        with open(dest_path, "wb") as f:
            f.write(resp.content)
        return True
    except Exception:
        return False


def main() -> None:
    """
    Main entry point for the thumbnail downloader script.
    Parses command-line arguments and downloads thumbnails.
    """
    parser = argparse.ArgumentParser(
        description="Download YouTube thumbnails for a single video."
    )
    parser.add_argument(
        "url",
        help="YouTube video URL or 11-character video ID",
    )
    parser.add_argument(
        "-o",
        "--output",
        default="thumbnails",
        help="Output directory (default: thumbnails)",
    )

    args = parser.parse_args()

    # Extract video ID
    video_id = extract_video_id(args.url)
    if not video_id:
        raise SystemExit("Could not extract a valid YouTube video ID from the input.")

    # Create output directory
    os.makedirs(args.output, exist_ok=True)

    # Build thumbnail URLs
    urls = build_thumbnail_urls(video_id)

    # Download each thumbnail
    print(f"Downloading thumbnails for video: {video_id}")
    for quality, url in urls.items():
        filename = f"yt-thumbnail-{video_id}-{quality}.jpg"
        dest = os.path.join(args.output, filename)
        ok = download_thumbnail(url, dest)
        if ok:
            print(f"  ✓ {quality}: {dest}")
        else:
            print(f"  ✗ {quality}: not available or request failed")


if __name__ == "__main__":
    main()
