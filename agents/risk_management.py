import asyncio
from typing import Dict

from core.llm import call_llm
from prompts import load_prompt
from core.risk import assess_risk

class RiskManagementAgent:
    async def evaluate(self, state: Dict) -> Dict:
        prompt = load_prompt('risk_management.txt')
        risk_data = assess_risk(state.get('ticker'))
        user_message = f"Risk assessment data: {risk_data}"
        response = await call_llm(prompt, user_message)
        state['risk_assessment'] = response
        return state

risk_management = RiskManagementAgent()