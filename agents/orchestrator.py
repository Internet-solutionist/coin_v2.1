async def run_cycle(ticker: str, capital: float = 100000):
    print(f'\n=== CoIn 6-Agent Diagnostic Cycle Started for {ticker} ===')
    # Simulate full cycle
    state = {'ticker': ticker, 'capital': capital}
    # Call all agents
    state = await research.analyze(state)
    state = await backtesting.validate(state)
    state = await risk_management.evaluate(state)
    state = await ceo.decide(state)
    state = await execution.prepare(state)
    state = await cost_optimizer.optimize(state)
    print('=== Cycle Complete ===')
    return state