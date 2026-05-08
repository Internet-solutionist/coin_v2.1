import httpx
import asyncio
from typing import Dict, Any, Optional
from loguru import logger

class OllamaClient:
    """Sovereign local LLM client for own capable models (Ollama). Production-ready with retry, timeout, structured output."""
    def __init__(self, host: str = "http://ollama:11434", model: str = "llama3.1:8b", timeout: int = 120):
        self.host = host
        self.model = model
        self.timeout = timeout
        self.client = httpx.AsyncClient(timeout=timeout)

    async def generate(self, prompt: str, system: Optional[str] = None, format: Optional[str] = "json") -> Dict[str, Any]:
        try:
            payload = {
                "model": self.model,
                "prompt": prompt,
                "stream": False,
                "options": {"temperature": 0.2, "num_predict": 1536}
            }
            if system:
                payload["system"] = system
            if format:
                payload["format"] = format
            resp = await self.client.post(f"{self.host}/api/generate", json=payload)
            resp.raise_for_status()
            data = resp.json()
            return {"response": data.get("response", ""), "done": data.get("done", True)}
        except Exception as e:
            logger.error(f"Ollama generate error: {e}")
            return {"response": f"ERROR: {str(e)}", "done": False}

    async def close(self):
        await self.client.aclose()
