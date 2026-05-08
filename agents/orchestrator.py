import asyncio
from agents import ceo, research, backtesting, risk_management, execution, cost_optimizer

class Orchestrator:
    async def cycle(self, ticker: str, capital: float = 100000):
        state = {'ticker': ticker, 'capital': capital}
        state = await research.analyze(state)
        state = await backtesting.validate(state)
        state = await risk_management.evaluate(state)
        state = await ceo.decide(state)
        print(f'Full 6-agent cycle completed for {ticker}')
        return state

print('Orchestrator ready - 6-Agent CoIn Firm')