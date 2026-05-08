import asyncio
from typing import Dict

from core.llm import call_llm
from prompts import load_prompt

class CostOptimizerAgent:
    async def optimize(self, state: Dict) -> Dict:
        prompt = load_prompt('cost_optimizer.txt')
        user_message = "Review the full cycle and optimize costs and efficiency."
        response = await call_llm(prompt, user_message)
        state['final_recommendation'] = response
        return state

cost_optimizer = CostOptimizerAgent()