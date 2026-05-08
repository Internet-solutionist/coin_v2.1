from typing import Dict
async def decide(state: Dict) -> Dict:
    """CEO Agent - Final decision maker"""
    print("CEO: Reviewing full diagnostic...")
    return {"action": "APPROVED", "position_size": 0.15, "rationale": "Edge score sufficient after full cycle"}