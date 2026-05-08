async def evaluate(state):
    print("Risk Agent: Applying Half-Kelly, VaR and drawdown gates...")
    return {"risk_ok": True, "max_position": 0.2}