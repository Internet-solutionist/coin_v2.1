import asyncio
from core.llm import get_llm_response
from prompts import load_prompt

async def validate(state: dict):
    prompt = load_prompt('backtesting.txt')
    response = await get_llm_response(prompt, str(state))
    return response