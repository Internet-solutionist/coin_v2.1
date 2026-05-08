from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
from agents.orchestrator import CoInOrchestrator
from loguru import logger
import uvicorn

app = FastAPI(title="CoIn v2.1 - Sovereign 6-Agent AI Trading Firm", version="2.1.0")

orchestrator = CoInOrchestrator()

class CycleRequest(BaseModel):
    ticker: str
    capital: float = 100000.0

@app.on_event("startup")
async def startup():
    logger.info("CoIn v2.1 Sovereign AI Trading Firm starting with local Ollama models...")

@app.post("/cycle")
async def run_cycle(req: CycleRequest, background_tasks: BackgroundTasks):
    """Trigger full 6-agent diagnostic cycle with HARD-CODED CoIn rules."""
    result = await orchestrator.run_full_cycle(req.ticker, req.capital)
    return {
        "status": "success" if "error" not in result else "failed",
        "ticker": req.ticker,
        "result": result,
        "philosophy": "We do not predict the market. We insure against it. Hard-coded rules for production reliability."
    }

@app.get("/health")
async def health():
    return {"status": "healthy", "version": "2.1.0", "models": "local-ollama (sovereign)"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
