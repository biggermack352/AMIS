# AMIS — Adaptive Maintenance Intelligence System

**A second-order cybernetic architecture for military aviation maintenance.**
NPS master's thesis · NAVAIR · MQ-25 program.

AMIS treats aircraft maintenance as a control problem: sense the physical system,
compare against expectation, decide, act — and, uniquely, **observe itself observing**
(the L6 meta loop: sensing adequacy, comparator accuracy, surprise audit, loop-closure
verification). Everything traces to two operational numbers: **Mission Availability
Probability (MAP)** and **Fuel Delivered**.

## Quick start

```bash
python -m venv .venv && .venv\Scripts\activate
pip install -e ".[ml,rag,llm,ui,dev]"
copy .env.example .env
alembic upgrade head
python -m database.seed          # idempotent 90-day synthetic fleet scenario
pytest                           # 109 tests
streamlit run streamlit_app/main.py     # the prototype (14 modules)
uvicorn api.main:app --reload           # the API (http://localhost:8000/docs)
```

Runs fully offline: no API key → ARIA answers deterministically from grounded data;
no Ollama → TF-IDF embeddings; no GitLab → local collectors.

## Architecture (six layers + agent)

| Layer | Role | Code |
|---|---|---|
| L1 Physical | MQ-25A aircraft — maximum variety | (the referent) |
| L2 Sensing | state → information; sequences, free text, indicators | `database/models/cbm.py` |
| L3 Comparator | per-aircraft dynamic baselines vs static thresholds | `ml/` (XGBoost, GP, SHAP, SMOTE, Weibull, drift) |
| L4 Decision | grounded recommendations, dual persona, override capture | `rag/`, `agents/` |
| L5 Effector | actions + per-action outcome predictions — **the closed loop** | `cybernetics/effectiveness.py` |
| L6 Meta | the system watching itself — **the thesis contribution** | `cybernetics/meta_loop.py` |
| ARIA | single AI face; 10 tools over 6 subagents | `agents/aria.py` |

## Layout

```
database/    51-table SQLAlchemy schema, Alembic migrations, synthetic seeder
cybernetics/ MAP, fuel delivered, 10 latency metrics, 9 effectiveness metrics, meta loop
ml/          comparator, GP baseline, SHAP, SMOTE, Weibull RCM, drift detection
rag/         embedder (nomic/TF-IDF), FAISS retriever over S1000D DMs, dual-persona generator
agents/      ARIA + cbm/logistics/ietm/fst/rcm/meta subagents, offline-capable LLM client
api/         FastAPI — 14 module routers + WebSocket ARIA chat
streamlit_app/ 14-module thesis prototype (palette from the architecture diagrams)
docs/        PLAN, build log, theory (5), user guide (5), MBSE SVG, API docs
tests/       109 tests
```

## Documentation

- Plan & decisions: [docs/PLAN.md](docs/PLAN.md) · Build log: [docs/build_log.md](docs/build_log.md)
- Theory: cybernetics primer, second-order cybernetics, MAP derivation, feedback loops,
  data-starvation attractor — [docs/theory/](docs/theory/)
- User guide: getting started, module guide, ARIA guide, override process, maintenance
  process integration — [docs/user_guide/](docs/user_guide/)
- MBSE: [docs/mbse/amis_bdd_ibd.svg](docs/mbse/amis_bdd_ibd.svg) (print) + interactive viewer (module 12)

## Production path

SQLite → AWS RDS PostgreSQL (the `GUID`/`UTCDateTime` type decorators already map to
native types), Streamlit → FastAPI + React (the API serves every module already),
Alembic migrations throughout, auth via government IdAM at the proxy.
