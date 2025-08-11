# scripts/build_indexes.py
import os, glob
from typing import Dict
from config import INDEX_DIR, META_DIR, CHARTS_DIR, PLATFORMS
from utils import read_json_or_none, write_json_atomic, now_kst_iso

def build_summary():
    summary = {
        "updatedAtKST": now_kst_iso(),
        "platforms": {},
        "alerts": [],
    }
    health = {"updatedAtKST": summary["updatedAtKST"], "sources": {}}

    for p in PLATFORMS:
        latest = os.path.join(CHARTS_DIR, p, "latest.json")
        data = read_json_or_none(latest)
        if data:
            top5 = [
                {"title": t["title"], "rank": t["rank"], **({"delta": t.get("delta")} if "delta" in t else {})}
                for t in data.get("tracks", [])[:5]
            ]
            summary["platforms"][p] = {"top": top5, "collectedAtKST": data.get("collectedAtKST")}
            # rank_tracker가 넣은 이벤트를 tracks 기반으로 재구성할 필요가 없으면 생략
            health["sources"][p] = "ok"
        else:
            summary["platforms"][p] = {"top": [], "note": "partial/down"}
            health["sources"][p] = "down"

    os.makedirs(INDEX_DIR, exist_ok=True)
    os.makedirs(META_DIR, exist_ok=True)
    write_json_atomic(os.path.join(INDEX_DIR, "summary.json"), summary)
    write_json_atomic(os.path.join(META_DIR, "health.json"), health)

if __name__ == "__main__":
    build_summary()
