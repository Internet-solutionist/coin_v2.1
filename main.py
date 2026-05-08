from fastapi import FastAPI
from agents.orchestrator import Orchestrator
from pydantic import BaseModel

app = FastAPI(title="CoIn v2.1 - Counter Insurance AI Trading Firm")
orchestrator = Orchestrator()

class CycleRequest(BaseModel):
    ticker: str
    capital: float = 100000.0

@app.post("/cycle")
async def run_cycle(request: CycleRequest):
    result = await orchestrator.cycle(request.ticker, request.capital)
    return result

@app.get("/health")
def health():
    return {"status": "CoIn Trading Firm is alive"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)