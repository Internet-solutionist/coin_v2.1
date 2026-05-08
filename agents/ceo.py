import asyncio
from typing import Dict

from core.llm import call_llm
from prompts import load_prompt

class CEO:
    async def decide(self, state: Dict) -> Dict:
        prompt = load_prompt('ceo.txt')
        user_message = f"""
Current state:
Ticker: {state.get('ticker')}
Research: {state.get('research_output')}
Backtest: {state.get('backtest_result')}
Risk: {state.get('risk_assessment')}

Make the final strategic decision as CEO of CoIn.
"""
        response = await call_llm(prompt, user_message)
        state['ceo_decision'] = response
        return state

ceo = CEO()