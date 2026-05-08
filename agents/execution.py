import asyncio
from typing import Dict

from core.llm import call_llm
from prompts import load_prompt

class ExecutionAgent:
    async def prepare(self, state: Dict) -> Dict:
        prompt = load_prompt('execution.txt')
        user_message = f"Prepare execution plan for {state.get('ticker')}"
        response = await call_llm(prompt, user_message)
        state['execution_plan'] = response
        return state

execution = ExecutionAgent()