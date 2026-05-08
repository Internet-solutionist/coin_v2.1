import asyncio
from core.llm import call_llm
from prompts.research import get_prompt

async def analyze(state: dict):
    prompt = get_prompt(state)
    response = await call_llm(prompt)
    return {'research': response, 'edge_score': 75}

print('Research Agent loaded')