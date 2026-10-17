"""A.U.G.U.R Synapse over plain HTTP. Standard library only: python3 quickstart.py"""
import json
import urllib.error
import urllib.request

HUB = "https://augur-trade.com/hub/api/v1"


def call(tool, args=None, free_tier=False):
    headers = {"content-type": "application/json"}
    if free_tier:
        headers["X-Synapse-Free"] = "1"  # 10 paid-tool calls/day at no cost
    req = urllib.request.Request(f"{HUB}/tools/{tool}", json.dumps(args or {}).encode(), headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        if e.code == 402:  # unpaid: the body carries x402 payment requirements
            return {"status": 402, **json.load(e)}
        raise


pulse = call("pump_pulse")["data"]
print("pump.fun right now:", pulse["trades_per_min"], "trades/min,", pulse["last_24h"]["launches"], "launches in 24h")

bonk = "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
risk = call("token_risk", {"mint": bonk}, free_tier=True)
print("token_risk:", json.dumps(risk.get("data", risk), indent=1)[:600])

unpaid = call("token_risk", {"mint": bonk})
if unpaid.get("status") == 402:
    for a in unpaid["accepts"]:
        print("402 accepts", a["extra"]["name"], a["maxAmountRequired"], "->", a["payTo"])
