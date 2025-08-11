# scripts/save_snapshot.py
import os
from datetime import datetime
from typing import Dict
from config import CHARTS_DIR, ARTIST, TIMEZONE
from utils import ensure_dir, read_json_or_none, write_json_atomic
from rank_tracker import compute_delta

def save_platform_snapshot(platform: str, tracks: list, extra: Dict = None) -> Dict:
    now = datetime.now(TIMEZONE)
    day = now.strftime("%Y-%m-%d")
    hour = now.strftime("%H")
    base_dir = os.path.join(CHARTS_DIR, platform, day)
    ensure_dir(base_dir)

    current = {
        "collectedAtKST": now.isoformat(timespec="seconds"),
        "artist": ARTIST,
        "tracks": tracks,
        **(extra or {})
    }

    latest_path = os.path.join(CHARTS_DIR, platform, "latest.json")
    prev = read_json_or_none(latest_path) or {"tracks": []}
    current, events = compute_delta(prev, current)

    hourly_path = os.path.join(base_dir, f"{hour}.json")
    write_json_atomic(hourly_path, current)
    write_json_atomic(latest_path, current)

    return {"events": events, "latest_path": latest_path, "hourly_path": hourly_path}
