import asyncio
from agents.ceo import decide
from agents.research import analyze
from agents.backtesting import validate
from agents.risk_management import evaluate
from agents.execution import prepare
from agents.cost_optimizer import optimize

class Orchestrator:
    async def cycle(self, ticker: str, capital: float = 100000.0):
        state = {
            "ticker": ticker,
            "capital": capital,
            "diagnostics": [],
            "research_output": None,
            "backtest_result": None,
            "risk_assessment": None,
            "ceo_decision": None,
            "execution_plan": None,
            "final_recommendation": None
        }

        # Full 6-agent diagnostic cycle
        state["research_output"] = await analyze(state)
        state["diagnostics"].append("✅ Research complete")

        state["backtest_result"] = await validate(state)
        state["diagnostics"].append("✅ Backtesting complete")

        state["risk_assessment"] = await evaluate(state)
        state["diagnostics"].append("✅ Risk gates applied")

        state["ceo_decision"] = await decide(state)
        state["diagnostics"].append("✅ CEO decision made")

        state["execution_plan"] = await prepare(state)
        state["diagnostics"].append("✅ Execution plan ready")

        state["final_recommendation"] = await optimize(state)
        state["diagnostics"].append("✅ Cost optimization complete")

        return state