import asyncio
from core.llm import get_llm_response
from prompts import load_prompt

async def optimize(state: dict):
    prompt = load_prompt('cost_optimizer.txt')
    response = await get_llm_response(prompt, str(state))
    return response