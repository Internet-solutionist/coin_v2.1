import asyncio
from typing import Dict

from core.llm import call_llm
from prompts import load_prompt

class ResearchAgent:
    async def analyze(self, state: Dict) -> Dict:
        prompt = load_prompt('research.txt')
        user_message = f"Analyze market for {state.get('ticker')} and identify certainty gaps."
        response = await call_llm(prompt, user_message)
        state['research_output'] = response
        return state

research = ResearchAgent()