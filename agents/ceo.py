import asyncio
from core.llm import call_llm
from prompts.ceo import get_prompt

async def decide(state: dict):
    prompt = get_prompt(state)
    response = await call_llm(prompt)
    # Parse decision
    return {'decision': response, 'timestamp': 'now'}

print('CEO Agent loaded - Sovereign CoIn Trading Firm')