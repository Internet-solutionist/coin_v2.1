import json
import hashlib
from datetime import datetime
from pathlib import Path
from loguru import logger

class AuditLogger:
    """Tamper-proof, hash-chained audit log - CRITICAL for AI Trading Firm compliance, legal protection, and trust. Every decision is immutable and verifiable."""
    def __init__(self, log_path: str = "logs/audit.log"):
        self.log_path = Path(log_path)
        self.log_path.parent.mkdir(parents=True, exist_ok=True)
        self.last_hash = "GENESIS"

    def log_decision(self, agent: str, action: str, details: dict, state_hash: str = "") -> str:
        entry = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "agent": agent,
            "action": action,
            "details": details,
            "prev_hash": self.last_hash,
            "state_hash": state_hash
        }
        entry_str = json.dumps(entry, sort_keys=True)
        current_hash = hashlib.sha256(entry_str.encode()).hexdigest()
        entry["entry_hash"] = current_hash
        with open(self.log_path, "a") as f:
            f.write(json.dumps(entry) + "\n")
        self.last_hash = current_hash
        logger.info(f"AUDIT: {agent} {action} | hash={current_hash[:12]}...")
        return current_hash

    def verify_chain(self) -> bool:
        if not self.log_path.exists():
            return True
        prev = "GENESIS"
        for line in self.log_path.read_text().strip().split("\n"):
            if not line.strip():
                continue
            entry = json.loads(line)
            entry_copy = entry.copy()
            entry_hash = entry_copy.pop("entry_hash", None)
            calc = hashlib.sha256(json.dumps({k: entry_copy[k] for k in sorted(entry_copy) if k != "entry_hash"}, sort_keys=True).encode()).hexdigest()
            if entry.get("prev_hash") != prev or entry_hash != calc:
                logger.error("!!! AUDIT CHAIN BROKEN - TAMPERING DETECTED !!!")
                return False
            prev = entry_hash
        return True
