# AMIS — Claude Code Kickoff Prompt
### Adaptive Maintenance Intelligence System | NPS Thesis Project
**Use with: Claude Fable 5 via Claude Code | Model: `claude-fable-5`**
**Attach: `amis_database_schema.dbml`, `amis_archetecture1.jsx`, `amis_archetecture2.jsx`**

---

## SYSTEM CONTEXT

You are building **AMIS** (Adaptive Maintenance Intelligence System) — a second-order cybernetic architecture for military aviation maintenance. This is both a real production system and an NPS master's thesis by a NAVAIR engineer. Every architectural decision must be defensible in a thesis defense and also deployable in a government environment.

The system centers on **Mission Availability Probability (MAP)** and **Fuel Delivered** as its two primary operational metrics. Everything AMIS does ultimately traces back to one of these two numbers.


---

## ATTACHED FILES 

- **`amis_database_schema.dbml`** — The complete relational schema (~50 tables). This is the data backbone. SQLAlchemy models must match this exactly.
- **`amis_archetecture1.jsx`** — Six-layer cybernetic architecture diagram (Layer detail view)
- **`amis_archetecture2.jsx`** — Six-layer cybernetic architecture diagram (Flow/attractor view)

---

## TECH STACK

| Layer | Technology | Notes |
|-------|-----------|-------|
| Database (local dev) | SQLite + SQLAlchemy | no Docker/Postgres locally |
| Database (production) | AWS RDS PostgreSQL → data lake | Migration target |
| Backend | FastAPI (async) | REST + WebSocket endpoints |
| ML / Analytics | scikit-learn, XGBoost, Gaussian Process, SHAP | Comparator layer |
| Orchestration | Databricks / Cloudera ML (CML) | 
| Prototype Frontend | Streamlit | Toy model / thesis demo |
| Production Frontend | FastAPI + React | Final deliverable |
| Infrastructure | AWS (ECS, RDS, S3) | Migration path |
| Migrations | Alembic | SQLAlchemy migration manager |

---

## PHASE 0 — STOP AND PLAN FIRST

**Do not write a single line of code until you**

1. **Full project file tree** — every directory and file you intend to create
2. **Layer-by-layer build sequence** — what gets built in what order and why
3. **Key architectural decisions** — any choices you're making that aren't explicit here
4. **Confirmation that all DBML tables are represented** — list them. If you add any explain why.

---

## PROJECT FILE TREE (Suggested STRUCTURE)

```
amis/
├── README.md
├── pyproject.toml
├── .env.example
├── alembic/
│   ├── env.py
│   └── versions/
├── database/
│   ├── models/              # One file per domain group (e.g., parts.py, maintenance.py)
│   ├── schema.py            # SQLAlchemy base + engine setup
│   └── seed.py              # Synthetic data seeder (100+ realistic rows)
├── api/
│   ├── main.py              # FastAPI app entrypoint
│   ├── routers/             # One router per module (see modules below)
│   └── dependencies.py      # DB session injection, auth stubs
├── agents/
│   ├── aria.py              # ARIA — master AMIS AI agent
│   ├── subagents/
│   │   ├── cbm_agent.py
│   │   ├── logistics_agent.py
│   │   ├── ietm_agent.py
│   │   ├── fst_agent.py
│   │   ├── rcm_agent.py
│   │   └── meta_agent.py
├── cybernetics/
│   ├── map_calculator.py    # Mission Availability Probability
│   ├── fuel_delivered.py    # Fuel delivered tracking
│   ├── latency_tracker.py   # All system latency metrics
│   ├── effectiveness.py     # Action/output effectiveness scoring
│   └── meta_loop.py         # Second-order observer
├── ml/
│   ├── comparator.py        # GP + XGBoost fault prediction
│   ├── shap_explainer.py    # SHAP explanations
│   ├── weibull.py           # RCM Weibull modeling
│   ├── smote_pipeline.py    # Class balancing
│   └── drift_detector.py    # Model drift detection
├── rag/
│   ├── embedder.py          # nomic-embed-text + FAISS
│   ├── retriever.py         # Semantic search over IETMs / tech manuals
│   └── generator.py         # Dual-persona RAG (expert / novice)
├── streamlit_app/
│   ├── main.py              # Dashboard entrypoint
│   ├── pages/               # One file per module (see modules below)
│   └── components/          # Reusable chart/table widgets
├── docs/
│   ├── theory/              # Theoretical documentation (cybernetics, Ashby, etc.)
│   ├── user_guide/          # How to use AMIS (software + process)
│   ├── mbse/                # MBSE / SysML-style diagrams
│   └── api_docs/            # Auto-generated FastAPI docs
└── tests/
    ├── test_map.py
    ├── test_latency.py
    ├── test_effectiveness.py
    └── test_models.py
```

---

## BUILD SEQUENCE suggestion

### Phase 1 — Database Foundation
- SQLAlchemy models for all DBML tables
- Alembic migration: `v0.1.0-schema`
- Synthetic seeder: 100+ rows covering all major tables
- Pytest: test all FK constraints and model round-trips

### Phase 2 — Core Cybernetic Metrics
- MAP calculator (see specification below)
- Fuel delivered tracker
- All latency metrics (see specification below)
- All effectiveness metrics (see specification below)
- Pytest: test each metric against known synthetic data

### Phase 3 — ML Comparator Layer
- XGBoost fault classifier (trained on synthetic data)
- Gaussian Process anomaly baseline
- SHAP explainer wrapper
- SMOTE pipeline for rare fault classes
- Weibull RCM model per part_catalog entry
- Drift detector with scheduled retraining trigger

### Phase 4 — RAG Decision Layer
- FAISS vector store with nomic-embed-text embeddings
- Retriever over IETM data_module table
- Dual-persona generator: `EXPERIENCED` and `NOVICE` outputs
- Override capture pipeline → feeds back to SME training signal

### Phase 5 — ARIA and Subagents
- ARIA master agent (see specification below)
- All 6 subagents with tool definitions

### Phase 6 — FastAPI Backend
- Routers for every front-end module
- WebSocket endpoints for live feeds
- Auth stubs (placeholder — real auth handled by gov IdAM)

### Phase 7 — Streamlit Prototype
- All 14 modules (see specification below)
- AMIS logo displayed in sidebar
- Color scheme from architecture JSX files (dark navy / cyan / orange / green)

### Phase 8 — Meta Loop
- Sensing adequacy monitor
- Comparator accuracy tracker
- Surprise/anomaly audit
- System health dashboard
- GitLab or equivalent meta-metrics integration

### Phase 9 — Documentation
- Theory docs (cybernetics, Ashby, second-order feedback)
- User guide (software + process)
- MBSE diagram (see specification below)
- Auto API docs (FastAPI /docs)

---

## METRIC SPECIFICATIONS

### Primary Operational Metrics

#### MAP — Mission Availability Probability
```
MAP = (FMC_hours) / (FMC_hours + PMC_hours + NMC_hours)
```
- Sourced from: `asset_status_log` table
- Per-aircraft and fleet aggregate views
- Trend over time with 7/30/90-day rolling windows
- Decomposed by driving discrepancy type
- Target: ≥ 0.75 fleet average (configurable)

#### Fuel Delivered
```
fuel_delivered_total = SUM(flight_log.fuel_delivered) per aircraft per period
fuel_delivered_per_mission = fuel_delivered / total_missions_flown
```
- Sourced from: `flight_log` table
- Trends, per-aircraft comparison, anomaly flagging

---

### Latency Metrics

Track all of these as `latency_tracker` records with timestamps, status, and SLA thresholds:

| Metric | Start Event | End Event | Source Tables | SLA Target |
|--------|------------|-----------|--------------|-----------|
| **Discrepancy-to-Resolution** | `maintenance_discrepancy.discovered_date` | `maintenance_action.completed_date` OR `sme_override_report.override_timestamp` | discrepancy, action, override | Configurable per severity |
| **Parts Order Latency** | `supply_requisition.order_date` | `supply_requisition.actual_delivery_date` | supply_requisition | Priority-dependent |
| **TPDR-to-TMSDR** | `tpdr_report.submission_date` | `tmsdr_record` creation date (linked via `data_module`) | tpdr_report, tmsdr_record | 30 days Cat 1, 90 days Cat 2 |
| **TMSDR-to-IETM Incorporation** | `tmsdr_record` creation | `tpdr_report.status = 'Incorporated'` | tmsdr_record, tpdr_report | Configurable |
| **REI-to-TEI (FST Response)** | `engineering_instruction.submitted_date` | `engineering_instruction.response_date` | engineering_instruction | 72 hrs (critical), 14 days (routine) |
| **EI Open-to-Close** | `engineering_investigation` created | `status = Closed` | engineering_investigation | Configurable |
| **FRACAS Open-to-RCCA** | `fracas_investigation.opened_date` | `fracas_rcca.determination_date` | fracas_investigation, fracas_rcca | Configurable |
| **CBM Alert-to-Action** | `cbm_predictive_alert.alert_timestamp` | `resulting_discrepancy_uuid` created | cbm_predictive_alert, maintenance_discrepancy | 48 hours |
| **AI Inference Latency** | `amis_model_inference.inference_timestamp` | response returned | amis_model_inference | < 2 seconds |
| **IFC Clearance Latency** | `flight_clearance_record.issue_date` | Aircraft back to FMC | flight_clearance_record, asset_status_log | Per clearance type |

Build a unified `latency_dashboard` view that shows all metrics as a Gantt-style timeline per aircraft tail number with color-coded SLA health (green/yellow/red).

---

### Effectiveness Metrics

Track effectiveness scores per output type in a dedicated `effectiveness_ledger` table:

| Output Type | Effectiveness Definition | Numerator | Denominator |
|-------------|------------------------|-----------|-------------|
| **Maintenance Action** | Did the action resolve the discrepancy? | Actions with no recurrence within 30 days | All closed actions |
| **EI (Engineering Investigation)** | Did the EI result in a corrective action? | EIs with resulting TD or FMEA update | All closed EIs |
| **TD (Technical Directive)** | Did compliance eliminate the fault pattern? | TDs where fault recurrence dropped post-compliance | All TDs with sufficient post-compliance history |
| **TEI (Temporary Engineering Instruction)** | Did the TEI repair hold for its authorized life? | TEIs cleared without re-opening the discrepancy | All cleared TEIs |
| **FED (Fleet Engineering Disposition)** | Did the deviation remain safe through its expiration? | FEDs that expired without triggering a new discrepancy on the affected system | All expired FEDs |
| **IETM Update (via TPDR)** | Did the update reduce related maintenance errors? | Post-update discrepancy rate vs. pre-update rate | Rolling 90-day comparison |
| **CBM+ Alert** | Was the predicted failure actually found? | Alerts that resulted in a confirmed discrepancy | All alerts |
| **AMIS AI Recommendation** | Was the recommendation followed? Was the outcome correct? | Accepted recommendations with no recurrence | All recommendations issued |
| **ARIA Chat Response** | Was the response rated useful? | Thumbs-up responses | All rated responses |

---

## FRONT-END MODULE SPECIFICATIONS

Build the following as separate Streamlit pages (prototype) and React routes (production):

### 1. AMIS Home / Command Dashboard
- MAP gauge (fleet-wide and per-BUNO)
- Fuel Delivered KPI card
- Active discrepancy count, by severity
- Latency SLA health summary (all metrics, RAG-colored)
- CBM+ active alert count
- ARIA chat widget (pinned)
- GitLab or equivalent meta-metrics strip at bottom

### 2. Aircraft Health — Live Feed
- Per-BUNO health score from `asset_health_prediction_ledger`
- `asset_status_log` timeline (FMC/PMC/NMC/AWP) as Gantt
- Active fault codes from `triggered_fault_log`
- Live sensor anomaly indicators from `condition_indicator_log`
- Corrosion exposure score from `asset_corrosion_exposure_ledger`

### 3. Part Health — Live Feed
- Health score per serialized part (S/N)
- Remaining Useful Life (RUL) bar
- Time-to-next-inspection
- Installation history from `asset_installation_history`
- Drill-down to FMEA failure modes

### 4. CBM+ (Condition Based Maintenance Plus)
- Active predictive alerts table with confidence scores
- RUL trend charts per critical component
- Weibull curves per part from `reliability_model_parameters`
- Alert-to-action latency tracking
- False positive / true positive rates

### 5. Configuration Management
- BOM tree view (engineering BOM from `part_catalog` NHA hierarchy)
- Physical installation tree (from `asset_installation_history`)
- TD compliance status per BUNO
- IFC/MFC clearance status and expiration calendar
- Software release versions from `software_release`

### 6. Performance Trending & Grading
- MAP trend (7/30/90-day)
- Fuel delivered trend and per-mission efficiency
- MTBF actual vs. Weibull prediction
- Discrepancy rate per workcenter
- Maintainer performance scores (anonymized, by rank/rate)

### 7. Reliability Centered Maintenance (RCM)
- FMEA table viewer with HRI matrix
- Weibull parameter tuning interface
- Reliability model version history
- RCM recommendation generator (ARIA-powered)
- Fleet reliability trend by system category

### 8. Logistics
- Supply requisition tracker with MILSTRIP status
- Parts order latency dashboard
- AWP (Awaiting Parts) discrepancy list
- Vendor CAGE code performance scorecard (from `pqdr_report`)
- Support equipment calibration calendar

### 9. FST Engineering
- Open REI/TEI queue with response latency
- FED tracker with expiration alerts
- FRACAS investigation status board
- EI open/close latency
- Engineering project board (Kanban-style from `engineering_project`)
- Document repository browser

### 10. IETM Viewer
- S1000D data module browser (from `data_module` + `ietm_publication`)
- TPDR submission interface (linked to current DM)
- TMSDR/TPDR status tracker with latency
- ARIA integration: ask ARIA about this procedure
- Side-by-side: procedure text + relevant fault history

### 11. 3D Parts Viewer
- Placeholder module with integration hooks for glTF/THREE.js viewer
- Part search by NSN / P/N / name
- On-select: pull part health, installation history, active discrepancies
- Annotation overlay: highlight faulted components
- Note: "Full 3D model requires OEM CAD data — this module provides the data integration layer"

### 12. MBSE Diagram Viewer
- Interactive MBSE/SysML diagram rendered in-browser
- Cameo-style block diagram format (see MBSE specification below)
- Clickable nodes navigate to relevant AMIS module
- Auto-generated from live data where possible

### 13. Meta Loop
- Sensing adequacy score (are we capturing enough variety?)
- Comparator accuracy over time (prediction accuracy trend)
- Model drift alert status
- Retraining pipeline last run / next scheduled
- Surprise audit: faults with no matched prediction (the system's blind spots)
- System health score: overall AMIS cybernetic loop health

### 14. AMIS Intelligence (ARIA Chat)
- Full conversational interface
- Context-aware: knows which BUNO/part/module user is viewing
- Dual-persona toggle: Expert Mode / Technician Mode
- Override capture: "ARIA was wrong — here's what actually happened"
- Response rating (thumbs up/down → feeds effectiveness metric)
- Conversation history per session

---

## ARIA AND SUBAGENT SPECIFICATIONS

### ARIA — Adaptive Reasoning and Intelligence Agent (Master Agent)

ARIA is the single AI face of AMIS. All user-facing AI interactions route through ARIA. ARIA has access to all subagents as tools.

**ARIA's tools:**
- `query_aircraft_health(buno)` → Aircraft Health Subagent
- `query_part_health(serial_number)` → Part Health Subagent
- `predict_fault(discrepancy_narrative)` → CBM+ Subagent
- `recommend_maintenance_action(discrepancy_uuid)` → RAG Decision Layer
- `get_ietm_procedure(dm_code, persona)` → IETM Subagent
- `query_logistics(part_number)` → Logistics Subagent
- `query_fst_engineering(issue)` → FST Subagent
- `run_rcm_analysis(part_uuid)` → RCM Subagent
- `query_meta_loop()` → Meta Loop Subagent
- `capture_override(inference_uuid, rationale)` → SME override recorder

**ARIA system prompt skeleton:**
```
You are ARIA — the Adaptive Reasoning and Intelligence Agent for AMIS.
You support military aviation maintenance professionals on the MQ-25 program.
Always ground recommendations in technical authority (cite the IETM DM code or TD number).
When uncertain, say so and route to human review.
Match your output complexity to the user's persona:
  - EXPERT mode: concise, assumes domain knowledge, provides technical references
  - TECHNICIAN mode: step-by-step, plain language, includes safety cautions
Never recommend a grounding or flight clearance change without explicit human approval.
```

### Subagents

| Subagent | Responsibility | Key Data Sources |
|----------|---------------|-----------------|
| `cbm_agent` | RUL prediction, alert generation, Weibull inference | condition_indicator_log, asset_health_prediction_ledger |
| `logistics_agent` | Parts status, supply chain latency, AWP resolution | supply_requisition, part_catalog, part_life_limit |
| `ietm_agent` | Procedure retrieval, TPDR awareness, dual-persona output | data_module, ietm_publication, tpdr_report |
| `fst_agent` | REI/TEI generation, FED status, FRACAS support | engineering_instruction, fleet_engineering_disposition, fracas_investigation |
| `rcm_agent` | Weibull analysis, RCM recommendations, FMEA review | reliability_model_parameters, fmea_document, fmea_failure_mode |
| `meta_agent` | System self-monitoring, drift detection, surprise audit | cybernetic_feedback_loop, amis_model_inference, sme_override_report |

---

## MBSE DIAGRAM SPECIFICATION

Create a Model-Based Systems Engineering (MBSE) diagram in the style of Cameo Systems Modeler. The diagram should be implemented as an interactive SVG or React component (for the in-app viewer) AND as a static PNG/SVG for the thesis document.

### Diagram Type: Block Definition Diagram (BDD) + Internal Block Diagram (IBD) hybrid

**Top-level blocks to represent:**
1. `<<system>> AMIS` — root block
2. `<<subsystem>> PhysicalSystem` — L1
3. `<<subsystem>> SensingLayer` — L2 (with ports: rawData, nlpOutput, sequenceData)
4. `<<subsystem>> ComparatorLayer` — L3 (with ports: sensorInput, threshold, anomalyScore)
5. `<<subsystem>> DecisionLayer` — L4 (with ports: comparatorOutput, ragContext, recommendation)
6. `<<subsystem>> EffectorLayer` — L5 (with ports: decision, outcomeTracking)
7. `<<subsystem>> MetaLoop` — L6 (with ports: allLayerFeedback, systemHealthScore)
8. `<<agent>> ARIA` — top-level AI agent with connections to all layers
9. `<<database>> AMISDatabase` — connects to all layers
10. `<<interface>> UserFrontend` — connects to Decision, Meta, ARIA

**Flow connections to show:**
- Physical → Sensing (raw signals)
- Sensing → Comparator (processed data)
- Comparator → Decision (anomaly score + confidence)
- Decision → Effector (recommendation)
- Effector → Physical (maintenance action)
- Effector → Comparator (outcome feedback — **this is the closed loop**)
- MetaLoop ↔ all layers (bidirectional monitoring)
- ARIA ↔ Decision + Meta (AI augmentation)

**Styling requirements (thesis-quality):**
- Navy color scheme matching AMIS brand (dark backgrounds not appropriate for print — use white background with navy/gold/teal accents for the thesis version)
- Layer colors match the JSX architecture files
- Include Ashby's Law annotation: "Req. Variety constraint" on the Physical→Sensing edge
- SysML stereotypes in `<<>>` notation
- Port labels in monospace font
- Include a legend

---

## META-METRICS (GitLab or equivalent Integration)

Track the following AMIS-building-AMIS metrics in a `amis_meta_metrics` table and display on the Home dashboard:

| Metric | Source | How to Collect |
|--------|--------|---------------|
| GitLab Issues Open | GitLab API | `/api/v4/projects/{id}/issues?state=opened` |
| GitLab Issues Closed | GitLab API | `/api/v4/projects/{id}/issues?state=closed` |
| Total Commits | GitLab API | `/api/v4/projects/{id}/repository/commits` |
| Lines of Code | `git diff --stat` or `cloc` | Run on commit hook |
| Compute Used (approx. FLOPs) | Databricks job metrics | CML job duration × node spec |
| AI Tokens Spent | Anthropic/OpenAI API billing | Log per ARIA call in `aria_token_log` |
| Model Training Runs | MLflow / CML experiment tracker | Hook into retraining pipeline |
| Test Coverage | pytest-cov | CI pipeline |
| API Uptime | FastAPI health endpoint | Ping every 5 min |
| Active Users | FastAPI session logs | Count unique sessions per day |

---

## DOCUMENTATION REQUIREMENTS

### Theory Documentation (docs/theory/)
Generate the following documents as Markdown:

1. **`cybernetics_primer.md`** — Ashby's Law of Requisite Variety explained for a maintenance engineer audience. Include concrete MQ-25 examples.
2. **`second_order_cybernetics.md`** — Why the meta loop matters. What makes AMIS different from other maintenance systems.
3. **`map_derivation.md`** — Mathematical derivation of MAP with Markov state transitions, steady-state analysis, and sensitivity to each input variable.
4. **`feedback_loops.md`** — The four feedback loops in AMIS (fast/medium/slow/meta) with signal flow diagrams.
5. **`data_starvation_attractor.md`** — The pathological attractor problem and AMIS's countermeasures (SMOTE, trust loop design, SHAP).

### User Guide (docs/user_guide/)
1. **`getting_started.md`** — Install, configure, first run
2. **`module_guide.md`** — How to use each of the 14 modules
3. **`aria_guide.md`** — How to effectively query ARIA; what it can and cannot do
4. **`override_process.md`** — When and how to override ARIA; why this matters for system learning
5. **`maintenance_process_guide.md`** — How AMIS integrates into the existing MQ-25 maintenance workflow (MAF lifecycle, REI/TEI process, TPDR process)

---

## SYNTHETIC DATA SEEDER Suggestions

The seeder (`database/seed.py`) must generate realistic synthetic data that supports all metric calculations:

- 3 aircraft (BUNOs): T-01, T-02, T-03
- 50+ parts in `part_catalog` covering all system categories
- 90 days of `flight_log` data including `fuel_delivered` values
- `asset_status_log` entries showing realistic FMC/PMC/NMC/AWP transitions
- 20+ `maintenance_discrepancy` records with varied severities and discovered dates
- Corresponding `maintenance_action` records (some resolved, some open)
- 5+ `supply_requisition` records including some with delayed actual_delivery_date
- 5+ `tpdr_report` records at various statuses
- 3+ `engineering_instruction` (REI/TEI) pairs
- 10+ `amis_model_inference` records with confidence scores
- 3+ `sme_override_report` records
- Enough `triggered_fault_log` entries to demonstrate sequence patterns
- `asset_health_prediction_ledger` entries for each aircraft

The seeder must be idempotent (running it twice should not duplicate data).

---

## CODING STANDARDS

- All Python: type-annotated (PEP 484)
- All SQLAlchemy models: use `UUID` primary keys generated in Python (not database)
- All timestamps: `timezone=True` (UTC)
- All API endpoints: async
- All sensitive fields: never log (PII, SSN stubs)
- Error handling: explicit try/except with structured logging
- Secrets: via `.env` / `python-dotenv`, never hardcoded
- Version tags: semantic versioning (`v0.1.0`, `v0.2.0`, etc.) per phase

---

## DEFINITION OF DONE (per phase)

A phase is not complete until:
- [ ] All pytest tests pass
- [ ] The Streamlit prototype displays the relevant module without errors
- [ ] At least one synthetic-data scenario demonstrates the metric or feature end-to-end
- [ ] A one-paragraph entry is added to `docs/build_log.md` describing what was built and any decisions made

---

## WHAT TO DO NOW

1. Read all attached files carefully.
2. Build baby build.

**This is a thesis-quality system. Precision matters more than speed.**