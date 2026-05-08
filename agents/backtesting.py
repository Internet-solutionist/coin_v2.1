import asyncio
from typing import Dict

from core.llm import call_llm
from prompts import load_prompt
from core.backtest import run_backtest

class BacktestingAgent:
    async def validate(self, state: Dict) -> Dict:
        prompt = load_prompt('backtesting.txt')
        backtest_result = run_backtest(state.get('ticker'))
        user_message = f"Backtest results: {backtest_result}"
        response = await call_llm(prompt, user_message)
        state['backtest_result'] = response
        return state

backtesting = BacktestingAgent()