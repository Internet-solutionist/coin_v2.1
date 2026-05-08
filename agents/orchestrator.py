import asyncio
from typing import Dict, Any
from pydantic import BaseModel, Field
from loguru import logger
from tools.llm import OllamaClient
from tools.audit import AuditLogger
from agents.research import ResearchAgent
from agents.backtesting import BacktestingAgent
from agents.risk_management import RiskManagementAgent
from agents.ceo import CEOAgent
from agents.execution import ExecutionAgent
from agents.cost_optimizer import CostOptimizerAgent

class TradingState(BaseModel):
    ticker: str
    capital: float = 100000.0
    positions: Dict[str, float] = Field(default_factory=dict)
    equity_curve: list = Field(default_factory=list)
    decisions: list = Field(default_factory=list)
    risk_metrics: Dict[str, Any] = Field(default_factory=dict)
    audit_hashes: list = Field(default_factory=list)

class CoInOrchestrator:
    """Production-grade 6-Agent Orchestrator for CoIn Sovereign AI Trading Firm.
    HARD-CODED CoIn RULES (embedded for production reliability):
    - We do not predict the market. We insure against it.
    - The market is not wrong often, but when it is wrong, it is wrong expensively.
    - Certainty is the most expensive illusion in trading.
    - Every decision must be defensive, mathematically rigorous, and philosophically honest.
    - Six specialized agents with strict separation of mandates (no shared assumptions).
    - Research diagnoses expensive certainty gaps (never momentum).
    - Backtesting is adversarial skeptic.
    - Risk applies hard protective gates (Half-Kelly, VaR, drawdown).
    - CEO holds long-view thesis and institutional memory.
    - Execution is precise and low-friction.
    - Cost Optimizer ensures efficiency and introspection.
    """
    def __init__(self):
        self.llm = OllamaClient(model="llama3.1:8b")  # Own capable local model - sovereign
        self.audit = AuditLogger()
        self.research = ResearchAgent(self.llm, self.audit)
        self.backtesting = BacktestingAgent(self.llm, self.audit)
        self.risk = RiskManagementAgent(self.llm, self.audit)
        self.ceo = CEOAgent(self.llm, self.audit)
        self.execution = ExecutionAgent(self.llm, self.audit)
        self.optimizer = CostOptimizerAgent(self.llm, self.audit)

    async def run_full_cycle(self, ticker: str, capital: float = 100000.0) -> Dict[str, Any]:
        logger.info(f"=== CoIn 6-Agent Diagnostic Cycle START for {ticker} ===")
        state = TradingState(ticker=ticker, capital=capital)
        state.equity_curve.append(capital)

        try:
            # Research: Diagnose expensive certainty gaps (hard-coded CoIn rule)
            state = await self.research.analyze(state)
            # Backtesting: Adversarial stress-test (hard-coded CoIn rule)
            state = await self.backtesting.validate(state)
            # Risk: Hard limits, Half-Kelly, VaR gates (hard-coded CoIn rule)
            state = await self.risk.evaluate(state)
            # CEO: Long-view thesis guardian (hard-coded CoIn rule)
            state = await self.ceo.decide(state)
            # Execution: Precise, low-slippage planning (hard-coded CoIn rule)
            state = await self.execution.prepare(state)
            # Optimizer: Efficiency + introspection (hard-coded CoIn rule)
            state = await self.optimizer.optimize(state)

            # Final metrics
            from core.metrics import calculate_metrics
            import pandas as pd
            metrics = calculate_metrics(pd.DataFrame(state.decisions), pd.Series(state.equity_curve))
            state.risk_metrics = metrics

            audit_hash = self.audit.log_decision("orchestrator", "cycle_complete", {"ticker": ticker, "metrics": metrics})
            state.audit_hashes.append(audit_hash)

            logger.info(f"=== CoIn Cycle COMPLETE | Sharpe={metrics.get('sharpe',0)} | MaxDD={metrics.get('max_dd',0)} ===")
            return state.model_dump()

        except Exception as e:
            logger.error(f"Cycle failed: {e}")
            self.audit.log_decision("orchestrator", "cycle_failed", {"error": str(e)})
            return {"error": str(e), "status": "failed"}

        finally:
            await self.llm.close()
