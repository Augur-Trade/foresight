# augur_synapse (Python)

Standard-library client, one method per endpoint, generated from the live catalog. Python 3.8+.

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))   # or Synapse(free_tier=True)
scan = synapse.launch_scan(mint="<pump.fun mint>")["data"]
```

Every tool is a method with keyword arguments (`synapse.token_risk(mint=...)`), or use `synapse.call(tool_id, args)`.
Errors raise `SynapseError` with `.status` and `.body`.
