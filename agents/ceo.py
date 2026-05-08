import asyncio
from core.llm import get_llm_response
from prompts import load_prompt

async def decide(state: dict):
    prompt = load_prompt('ceo.txt')
    response = await get_llm_response(prompt, str(state))
    return response