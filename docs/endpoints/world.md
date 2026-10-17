# World Map

Places, weather, currencies, holidays, time zones, countries, earthquakes, sun and moon — the physical world for agents.

8 tools · MCP server `https://augur-trade.com/hub/mcp/world`

| Tool | What it does | Price |
|---|---|---|
| [`weather`](#weather) | Current weather and hourly/daily forecast for any place name or lat,lon: temperature, feels-like, wind, gusts, rain, cloud, humidity, UV — up to 9 days. | $0.001 |
| [`geocode`](#geocode) | Place name or address → coordinates (with city, state, country, postcode), or lat,lon → the nearest address. Up to 10 candidates. | $0.001 |
| [`fx_rates`](#fx_rates) | Official exchange rates for 30 major currencies (European Central Bank reference rates): latest or any date since 1999, convert an amount, or a time series. | free |
| [`holidays`](#holidays) | Public holidays for 100+ countries for any year, whether today is a holiday there, and the next upcoming ones — including regional (state) holidays. | free |
| [`time_convert`](#time_convert) | Current time in any time zones, convert a time between zones (DST-correct), and date arithmetic: add/subtract durations, days between dates, weekday, ISO week, Unix time. | free |
| [`country_info`](#country_info) | Any country's essentials: capital, population, GDP and GDP per capita (World Bank), currencies, languages, calling code, internet TLD, time zones, driving side, borders, flag. | free |
| [`earthquakes`](#earthquakes) | Earthquakes worldwide from the last hour to 30 days, filtered by minimum magnitude and optionally within a radius of a place — with depth, tsunami flag and USGS alert level. | free |
| [`sun_moon`](#sun_moon) | Sunrise, sunset, golden hour, twilight, day length and solar noon for any place and date — plus moon phase, illumination, moonrise and moonset. | free |

---

### `weather`

**Weather now + forecast** · $0.001 · 10 free calls/day

Current weather and hourly/daily forecast for any place name or lat,lon: temperature, feels-like, wind, gusts, rain, cloud, humidity, UV — up to 9 days.

Forecast from the Norwegian Meteorological Institute (MET Norway), the same model data yr.no uses, worldwide. Place names are geocoded with OpenStreetMap. Times are UTC plus local time when tz is given (IANA, e.g. Australia/Sydney).

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/weather` |
| MCP | `https://augur-trade.com/hub/mcp/world` → tool `weather` |
| Price | $0.001 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `place` | string | yes | city/address or "lat,lon" |
| `days` | integer |  | Days of daily forecast to include. Range 1-9. Default 3. (default `3`, range 1–9) |
| `tz` | string |  | IANA time zone for local times (optional) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/weather \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"place": "Sydney, Australia", "days": 2, "tz": "Australia/Sydney"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.weather({"place": "Sydney, Australia", "days": 2, "tz": "Australia/Sydney"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.weather(place='Sydney, Australia', days=2, tz='Australia/Sydney')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "weather", "arguments": {"place": "Sydney, Australia", "days": 2, "tz": "Australia/Sydney"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "weather",
 "ms": 971,
 "billing": {
  "mode": "credits",
  "usd": 0.001
 },
 "data": {
  "place": "Sydney, New South Wales, Australia",
  "lat": -33.869844,
  "lon": 151.208285,
  "updated": "2026-10-17T01:17:46Z",
  "now": {
   "time": "2026-10-17T04:00:00Z",
   "temp_c": 19,
   "feels_like_c": 19,
   "sky": "mostly clear",
   "humidity_pct": 53.5,
   "wind_ms": 5,
   "wind_kmh": 18,
   "wind_gust_ms": null,
   "wind_from_deg": 102.1,
   "pressure_hpa": 1029.7,
   "cloud_pct": 27.3,
   "uv_index": 5.1,
   "dew_point_c": 9.4,
   "rain_next_hour_mm": 0
  },
  "daily": [
   {
    "date": "2026-10-17",
    "min_c": 16.6,
    "max_c": 19,
    "rain_mm": 0,
    "max_wind_ms": 6.1,
    "max_gust_ms": null,
    "sky": "mostly clear"
   },
   {
    "date": "2026-10-18",
    "min_c": 13,
    "max_c": 19.3,
    "rain_mm": 0.3,
    "max_wind_ms": 7.2,
    "max_gust_ms": null,
    "sky": "mostly clear"
   },
   {
    "date": "2026-10-19",
    "min_c": 14.8,
    "max_c": 20.1,
    "rain_mm": 0.8,
    "max_wind_ms": 6.7,
    "max_gust_ms": null,
    "sky": "mostly clear"
   }
  ],
  "hourly_48h": [
   {
    "time": "2026-10-17T04:00:00Z",
    "local": "2026-10-17T15:00:00",
    "temp_c": 19,
    "wind_ms": 5,
    "rain_mm": 0,
    "rain_prob_pct": null,
    "sky": "mostly clear"
   },
   {
    "time": "2026-10-17T05:00:00Z",
    "local": "2026-10-17T16:00:00",
    "temp_c": 18.9,
    "wind_ms": 5.4,
    "rain_mm": 0,
    "rain_prob_pct": null,
    "sky": "mostly clear"
   },
   {
    "time": "2026-10-17T06:00:00Z",
    "local": "2026-10-17T17:00:00",
    "temp_c": 18.9,
    "wind_ms": 5.2,
    "rain_mm": 0,
    "rain_prob_pct": null,
    "sky": "partly cloudy"
   },
   "… 46 more"
  ],
  "source": "MET Norway (api.met.no), CC BY 4.0"
 }
}
```

</details>

---

### `geocode`

**Geocode / reverse geocode** · $0.001 · 10 free calls/day

Place name or address → coordinates (with city, state, country, postcode), or lat,lon → the nearest address. Up to 10 candidates.

OpenStreetMap data via Photon. Returns OSM links so results can be checked.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/geocode` |
| MCP | `https://augur-trade.com/hub/mcp/world` → tool `geocode` |
| Price | $0.001 per call (x402 USDC/SOL on Solana, USDC on Base, or credits) |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `query` | string | yes | address/place, or "lat,lon" for reverse |
| `limit` | integer |  | How many candidate matches to return. Range 1-10. Default 3. (default `3`, range 1–10) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/geocode \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer hk_YOUR_CREDIT_KEY' \
  -d '{"query": "Eiffel Tower", "limit": 2}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.geocode({"query": "Eiffel Tower", "limit": 2});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.geocode(query='Eiffel Tower', limit=2)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "geocode", "arguments": {"query": "Eiffel Tower", "limit": 2}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "geocode",
 "ms": 199,
 "billing": {
  "mode": "credits",
  "usd": 0.001
 },
 "data": {
  "mode": "forward",
  "query": "Eiffel Tower",
  "results": [
   {
    "name": "Eiffel Tower",
    "type": "tower",
    "city": "Paris",
    "state": "Île-de-France",
    "country": "France",
    "country_code": "FR",
    "postcode": "75007",
    "street": "5 Avenue Anatole France",
    "lat": 48.85826,
    "lon": 2.294501,
    "osm": "https://www.openstreetmap.org/way/5013364"
   },
   {
    "name": "Eiffel Tower",
    "type": "peak",
    "city": null,
    "state": "Alberta",
    "country": "Canada",
    "country_code": "CA",
    "postcode": null,
    "street": null,
    "lat": 51.3336,
    "lon": -116.235,
    "osm": "https://www.openstreetmap.org/node/2689315641"
   }
  ],
  "attribution": "© OpenStreetMap contributors"
 }
}
```

</details>

---

### `fx_rates`

**Currency exchange rates** · free

Official exchange rates for 30 major currencies (European Central Bank reference rates): latest or any date since 1999, convert an amount, or a time series.

Frankfurter API over ECB reference rates, published each working day ~16:00 CET. For crypto use crypto_price.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/fx_rates` |
| MCP | `https://augur-trade.com/hub/mcp/world` → tool `fx_rates` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `from` | string |  | Base currency ISO 4217 code, e.g. "USD". Default "USD". (default `"USD"`) |
| `to` | array of string |  | targets (default: all) 0-30 items. |
| `amount` | number |  | Amount of the base currency to convert. Default 1. (default `1`, range 0–…) |
| `date` | string |  | historical date (optional) |
| `end_date` | string |  | with date: returns a daily series |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/fx_rates \
  -H 'Content-Type: application/json' \
  -d '{"from": "USD", "to": ["EUR", "AUD", "JPY"], "amount": 100}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.fxRates({"from": "USD", "to": ["EUR", "AUD", "JPY"], "amount": 100});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.fx_rates(from_='USD', to=['EUR', 'AUD', 'JPY'], amount=100)['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "fx_rates", "arguments": {"from": "USD", "to": ["EUR", "AUD", "JPY"], "amount": 100}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "fx_rates",
 "ms": 283,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "from": "USD",
  "amount": 100,
  "date": "2026-10-16",
  "rates": {
   "AUD": 143.7,
   "EUR": 88.87,
   "JPY": 15802
  },
  "source": "European Central Bank reference rates via Frankfurter"
 }
}
```

</details>

---

### `holidays`

**Public holidays** · free

Public holidays for 100+ countries for any year, whether today is a holiday there, and the next upcoming ones — including regional (state) holidays.

Nager.Date open holiday data. Use for scheduling, market-closure awareness or delivery estimates.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/holidays` |
| MCP | `https://augur-trade.com/hub/mcp/world` → tool `holidays` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `country` | string | yes | ISO code or name, e.g. AU, United States |
| `year` | integer |  | Calendar year; defaults to the current year. Range 1975-2075. (range 1975–2075) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/holidays \
  -H 'Content-Type: application/json' \
  -d '{"country": "AU"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.holidays({"country": "AU"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.holidays(country='AU')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "holidays", "arguments": {"country": "AU"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "holidays",
 "ms": 155,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "country": "Australia",
  "code": "AU",
  "year": 2026,
  "today_is_holiday": [],
  "next": [
   {
    "date": "2026-11-03",
    "name": "Melbourne Cup",
    "local_name": "Melbourne Cup",
    "nationwide": false,
    "regions": [
     "AU-VIC"
    ],
    "types": [
     "Public"
    ]
   },
   {
    "date": "2026-12-25",
    "name": "Christmas Day",
    "local_name": "Christmas Day",
    "nationwide": true,
    "regions": null,
    "types": [
     "Public"
    ]
   },
   {
    "date": "2026-12-28",
    "name": "St. Stephen's Day",
    "local_name": "Boxing Day",
    "nationwide": true,
    "regions": null,
    "types": [
     "Public"
    ]
   },
   "… 2 more"
  ],
  "holidays": [
   {
    "date": "2026-01-01",
    "name": "New Year's Day",
    "local_name": "New Year's Day",
    "nationwide": true,
    "regions": null,
    "types": [
     "Public"
    ]
   },
   {
    "date": "2026-01-26",
    "name": "Australia Day",
    "local_name": "Australia Day",
    "nationwide": true,
    "regions": null,
    "types": [
     "Public"
    ]
   },
   {
    "date": "2026-03-02",
    "name": "Labour Day",
    "local_name": "Labour Day",
    "nationwide": false,
    "regions": [
     "AU-WA"
    ],
    "types": [
     "Public"
    ]
   },
   "… 24 more"
  ],
  "source": "Nager.Date"
 }
}
```

</details>

---

### `time_convert`

**Time zones + date math** · free

Current time in any time zones, convert a time between zones (DST-correct), and date arithmetic: add/subtract durations, days between dates, weekday, ISO week, Unix time.

Computed locally from the IANA time-zone database — no rate limits, exact. Zones are IANA names (America/New_York, Asia/Tokyo, UTC).

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/time_convert` |
| MCP | `https://augur-trade.com/hub/mcp/world` → tool `time_convert` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `time` | string |  | ISO time, "now", or a Unix timestamp; naive times are read in from_tz |
| `from_tz` | string |  | IANA time zone the input time is in, e.g. "America/New_York". Default "UTC". (default `"UTC"`) |
| `to_tz` | array of string |  | IANA time zones to convert into. 0-20 items. Default ["UTC"]. (default `["UTC"]`) |
| `add` | string |  | e.g. "+3d 4h", "-90m", "+2w" |
| `until` | string |  | second ISO date: returns the difference |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/time_convert \
  -H 'Content-Type: application/json' \
  -d '{"time": "2026-12-25T09:00", "from_tz": "Australia/Sydney", "to_tz": ["America/New_York", "Europe/London", "Asia/Tokyo"], "add": "+1d"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.timeConvert({"time": "2026-12-25T09:00", "from_tz": "Australia/Sydney", "to_tz": ["America/New_York", "Europe/London", "Asia/Tokyo"], "add": "+1d"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.time_convert(time='2026-12-25T09:00', from_tz='Australia/Sydney', to_tz=['America/New_York', 'Europe/London', 'Asia/Tokyo'], add='+1d')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "time_convert", "arguments": {"time": "2026-12-25T09:00", "from_tz": "Australia/Sydney", "to_tz": ["America/New_York", "Europe/London", "Asia/Tokyo"], "add": "+1d"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "time_convert",
 "ms": 5,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "input_utc": "2026-12-24T22:00:00.000Z",
  "added": "+1d",
  "utc": "2026-12-25T22:00:00.000Z",
  "unix": 1798236000,
  "iso_week": 52,
  "source_zone": {
   "zone": "Australia/Sydney",
   "local": "2026-12-26T09:00:00",
   "readable": "Sat, 26 Dec 2026, 09:00 GMT+11",
   "utc_offset": "+11:00"
  },
  "converted": [
   {
    "zone": "America/New_York",
    "local": "2026-12-25T17:00:00",
    "readable": "Fri, 25 Dec 2026, 17:00 GMT-5",
    "utc_offset": "-05:00"
   },
   {
    "zone": "Europe/London",
    "local": "2026-12-25T22:00:00",
    "readable": "Fri, 25 Dec 2026, 22:00 GMT",
    "utc_offset": "+00:00"
   },
   {
    "zone": "Asia/Tokyo",
    "local": "2026-12-26T07:00:00",
    "readable": "Sat, 26 Dec 2026, 07:00 GMT+9",
    "utc_offset": "+09:00"
   }
  ]
 }
}
```

</details>

---

### `country_info`

**Country facts** · free

Any country's essentials: capital, population, GDP and GDP per capita (World Bank), currencies, languages, calling code, internet TLD, time zones, driving side, borders, flag.

Static facts from the world-countries dataset (no rate limits) plus the latest World Bank population and GDP figures.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/country_info` |
| MCP | `https://augur-trade.com/hub/mcp/world` → tool `country_info` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `country` | string | yes | name or ISO code |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/country_info \
  -H 'Content-Type: application/json' \
  -d '{"country": "Japan"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.countryInfo({"country": "Japan"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.country_info(country='Japan')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "country_info", "arguments": {"country": "Japan"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "country_info",
 "ms": 192,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "name": "Japan",
  "official_name": "Japan",
  "cca2": "JP",
  "cca3": "JPN",
  "capital": [
   "Tokyo"
  ],
  "region": "Asia",
  "subregion": "Eastern Asia",
  "population": {
   "value": 123366734,
   "year": 2025
  },
  "gdp_usd": {
   "value": 4435162999976.94,
   "year": 2025
  },
  "gdp_per_capita_usd": {
   "value": 35951,
   "year": 2025
  },
  "area_km2": 377930,
  "currencies": [
   {
    "code": "JPY",
    "name": "Japanese yen",
    "symbol": "¥"
   }
  ],
  "languages": [
   "Japanese"
  ],
  "calling_code": "+81",
  "tld": [
   ".jp",
   ".みんな"
  ],
  "landlocked": false,
  "borders": [],
  "latlng": [
   36,
   138
  ],
  "flag": "🇯🇵",
  "un_member": true,
  "independent": true,
  "demonym": "Japanese",
  "source": "world-countries + World Bank"
 }
}
```

</details>

---

### `earthquakes`

**Recent earthquakes** · free

Earthquakes worldwide from the last hour to 30 days, filtered by minimum magnitude and optionally within a radius of a place — with depth, tsunami flag and USGS alert level.

USGS real-time earthquake feeds (updated every minute).

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/earthquakes` |
| MCP | `https://augur-trade.com/hub/mcp/world` → tool `earthquakes` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `min_magnitude` | number |  | Only quakes at or above this magnitude. Range 0-9. Default 4.5. (default `4.5`, range 0–9) |
| `period` | string (`hour`, `day`, `week`, `month`) |  | Look-back window. One of "hour", "day", "week", "month". Default "day". (default `"day"`) |
| `near` | string |  | place or lat,lon (optional) |
| `radius_km` | number |  | Search radius around the given place (only when a place is given). Range 10-5000. Default 1000. (default `1000`, range 10–5000) |
| `limit` | integer |  | How many quakes to return, largest first. Range 1-100. Default 20. (default `20`, range 1–100) |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/earthquakes \
  -H 'Content-Type: application/json' \
  -d '{"min_magnitude": 5, "period": "week"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.earthquakes({"min_magnitude": 5, "period": "week"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.earthquakes(min_magnitude=5, period='week')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "earthquakes", "arguments": {"min_magnitude": 5, "period": "week"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "earthquakes",
 "ms": 18,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "period": "week",
  "min_magnitude": 5,
  "count": 30,
  "strongest": {
   "time": "2026-10-16T03:35:31.925Z",
   "magnitude": 6.9,
   "place": "76 km NE of Ozernovskiy, Russia",
   "depth_km": 135,
   "lat": 51.9848,
   "lon": 157.2701,
   "tsunami_flag": false,
   "alert": "green",
   "felt_reports": 2,
   "url": "https://earthquake.usgs.gov/earthquakes/eventpage/us6000u2mq"
  },
  "quakes": [
   {
    "time": "2026-10-16T19:34:10.597Z",
    "magnitude": 5.2,
    "place": "off the coast of Ecuador",
    "depth_km": 10,
    "lat": 1.2955,
    "lon": -85.2725,
    "tsunami_flag": false,
    "alert": null,
    "felt_reports": null,
    "url": "https://earthquake.usgs.gov/earthquakes/eventpage/us6000u2v8"
   },
   {
    "time": "2026-10-16T14:09:54.288Z",
    "magnitude": 5,
    "place": "Auckland Islands, New Zealand region",
    "depth_km": 10,
    "lat": -49.8826,
    "lon": 163.4041,
    "tsunami_flag": false,
    "alert": null,
    "felt_reports": null,
    "url": "https://earthquake.usgs.gov/earthquakes/eventpage/us6000u2q5"
   },
   {
    "time": "2026-10-16T03:35:31.925Z",
    "magnitude": 6.9,
    "place": "76 km NE of Ozernovskiy, Russia",
    "depth_km": 135,
    "lat": 51.9848,
    "lon": 157.2701,
    "tsunami_flag": false,
    "alert": "green",
    "felt_reports": 2,
    "url": "https://earthquake.usgs.gov/earthquakes/eventpage/us6000u2mq"
   },
   "… 17 more"
  ],
  "source": "USGS"
 }
}
```

</details>

---

### `sun_moon`

**Sunrise, sunset + moon** · free

Sunrise, sunset, golden hour, twilight, day length and solar noon for any place and date — plus moon phase, illumination, moonrise and moonset.

Astronomical calculation (SunCalc), exact and instant. Pass tz for local times.

| | |
|---|---|
| HTTP | `POST https://augur-trade.com/hub/api/v1/tools/sun_moon` |
| MCP | `https://augur-trade.com/hub/mcp/world` → tool `sun_moon` |
| Price | free |

**Arguments**

| Argument | Type | Required | Description |
|---|---|---|---|
| `place` | string | yes | Place name or "lat,lon". |
| `date` | string |  | default today (UTC) |
| `tz` | string |  | IANA zone for local times |

<details><summary><b>Request examples</b>: curl · JavaScript · Python · MCP</summary>

```bash
curl -s -X POST https://augur-trade.com/hub/api/v1/tools/sun_moon \
  -H 'Content-Type: application/json' \
  -d '{"place": "Reykjavik", "tz": "Atlantic/Reykjavik"}'
```

```js
import { Synapse } from './sdk/js/augur-synapse.mjs';
const synapse = new Synapse({ key: process.env.SYNAPSE_KEY });
const { data } = await synapse.sunMoon({"place": "Reykjavik", "tz": "Atlantic/Reykjavik"});
```

```python
import os
from augur_synapse import Synapse
synapse = Synapse(key=os.environ.get("SYNAPSE_KEY"))
data = synapse.sun_moon(place='Reykjavik', tz='Atlantic/Reykjavik')['data']
```

```json
{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "sun_moon", "arguments": {"place": "Reykjavik", "tz": "Atlantic/Reykjavik"}}}
```

</details>

<details><summary><b>Sample response</b> (real output, lists trimmed to 3 items)</summary>

```json
{
 "ok": true,
 "tool": "sun_moon",
 "ms": 178,
 "billing": {
  "mode": "free",
  "usd": 0
 },
 "data": {
  "place": "Reykjavik, Iceland",
  "lat": 64.145981,
  "lon": -21.942237,
  "date": "2026-10-17",
  "times_in": "Atlantic/Reykjavik",
  "sun": {
   "dawn": "2026-10-17T07:34:55",
   "sunrise": "2026-10-17T08:24:01",
   "golden_hour_morning_ends": "2026-10-17T09:35:25",
   "solar_noon": "2026-10-17T13:13:07",
   "golden_hour_evening_starts": "2026-10-17T16:49:38",
   "sunset": "2026-10-17T18:00:54",
   "dusk": "2026-10-17T18:49:53",
   "night": "2026-10-17T20:40:46",
   "day_length_hours": 9.61,
   "polar": null
  },
  "moon": {
   "phase": "waxing crescent",
   "phase_fraction": 0.205,
   "illumination_pct": 36.2,
   "rise": null,
   "set": null,
   "always_up": false,
   "always_down": true
  }
 }
}
```

</details>

---

[← All endpoints](README.md)
