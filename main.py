from fastapi import FastAPI
from agents.orchestrator import Orchestrator

app = FastAPI(title="CoIn v2.1 - Counter Insurance AI Trading Firm")

orchestrator = Orchestrator()

@app.get("/health")
def health():
    return {"status": "CoIn Trading Firm is alive"}

@app.post("/cycle")
async def cycle(ticker: str, capital: float = 100000):
    result = await orchestrator.run_cycle(ticker, capital)
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)