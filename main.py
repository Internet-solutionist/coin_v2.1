from fastapi import FastAPI
from agents.orchestrator import Orchestrator

app = FastAPI(title="CoIn - Counter Insurance AI Trading Firm")
orchestrator = Orchestrator()

@app.post("/cycle")
async def run_cycle(ticker: str, capital: float = 100000):
    result = await orchestrator.cycle(ticker, capital)
    return result

@app.get("/health")
def health():
    return {"status": "alive", "firm": "CoIn Counter Insurance"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)