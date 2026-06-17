# About AMIS

**Adaptive Maintenance Intelligence System (AMIS)** is a second-order cybernetic architecture for military and commercial aviation maintenance. It is both a production-grade enterprise system and the technical foundation of a master's thesis in aerospace engineering.

The system's primary operational metric is **Aircraft Availability Probability (AAP)** — the probability that a given aircraft (or the fleet) is mission-capable at any point in time. Every sensing pipeline, predictive model, maintenance action, and engineering decision in AMIS ultimately traces back to maximizing AAP while minimizing lifecycle cost and safety risk.

---

## Second-Order Cybernetics

AMIS is not a simple monitoring dashboard. It is a **second-order cybernetic system** — a system that observes, models, and adapts *itself* in addition to the physical aircraft it manages.

First-order cybernetics: a thermostat regulates temperature.
Second-order cybernetics: AMIS regulates its *own* sensing adequacy, model accuracy, and decision latency while regulating fleet availability.

This distinction is what makes AMIS defensible as thesis research and deployable as enterprise software.

---

## The Six Cybernetic Layers

AMIS is organized into six functional layers, each with a distinct role in the control loop:

| Layer | Name | Function | AMIS Modules |
|-------|------|----------|--------------|
| **L1** | Physical System | The aircraft, parts, and maintainers doing real work | Configuration Management, 3D Parts Viewer |
| **L2** | Sensing | Telemetry, flight logs, pilot debriefs, inspections | Aircraft Health, Part Health, Performance |
| **L3** | Comparator | Predictive models comparing actual vs. expected state | CBM+, RCM, Performance Trending |
| **L4** | Decision | Engineering disposition, ARIA recommendations, project prioritization | Engineering, ARIA Intelligence, MBSE |
| **L5** | Effector | Maintenance actions, supply orders, TD compliance, software updates | Logistics, IETM Viewer |
| **L6** | Meta Loop | The system observing itself — model drift, sensing gaps, override feedback | Meta Loop, Database Schema, Ontology Map |

Each layer has a distinct accent color in the AMIS UI, reflecting its position in the control hierarchy.

---

## AAP — Aircraft Availability Probability

AAP is calculated from:

- Current asset status (`asset_status_log`: flyable, nf, AWP)
- Open discrepancy severity and age (`maintenance_discrepancy`)
- Predictive health scores (`asset_health_prediction_ledger`)
- Supply chain blockers (AWP requisitions from `supply_requisition`)
- Engineering holds (deviations, operating limits)

The Command Dashboard (Tab 1) displays fleet-wide AAP and per-tail breakdowns. Everything downstream — CBM+ alerts, logistics prioritization, engineering queue ordering — is ranked by AAP impact.

---

## ARIA — Enterprise AI Agent

**ARIA** (Adaptive Reasoning & Intelligence Agent) is the enterprise-wide AI agent embedded across all AMIS modules. In the production system, ARIA:

- Answers maintainer questions in context of the current tail number, part, or procedure
- Operates in **Expert Mode** (engineering depth) or **Technician Mode** (plain-language procedures)
- Captures **SME overrides** when human experts disagree with AI recommendations (`sme_override_report`)
- Feeds override data back into model retraining — closing the second-order cybernetic loop

The PoC dashboard includes a mock ARIA drawer with canned responses keyed to the active tab.

---

## Dual Knowledge Representation

AMIS maintains two parallel knowledge structures:

### Relational Schema (`Amis_public.dbml`)
~60 tables modeling the complete maintenance lifecycle: parts catalog, asset instances, installation history, discrepancies, CBM alerts, FRACAS investigations, supply requisitions, software releases, and more. This is the **transactional backbone**.

### Ontology (`Amis_public.owl`)
~96 OWL classes with object properties (`nextHigherAssembly`, `discoveredOnAsset`, `inResponseToDiscrepancy`, etc.) encoding the **semantic relationships** between entities. This enables ARIA's RAG retrieval and cross-module reasoning.

Tabs 15–17 of the dashboard expose these structures directly for thesis demonstration.

---

## Enterprise Vision

The production AMIS architecture (see `ClaudeCode/amis-main/`) targets:

- **Offline-first fleet operations** — maintainers sync via `database_sync_log` when connectivity returns
- **CBM+ closed loop** — `cbm_predictive_alert` → `maintenance_discrepancy` → `maintenance_action` → `cybernetic_feedback_loop`
- **Human-in-the-loop AI** — every ARIA inference is logged (`amis_model_inference`) and overridable (`sme_override_report`)
- **Financial traceability** — `spend_plan_execution` links dollars to engineering deliverables
- **Environmental modeling** — `asset_corrosion_exposure_ledger` tracks salt-air and climatic degradation

The PoC website demonstrates the **UI vision** atop this data architecture. The Streamlit backend in `amis-main` implements the live cybernetic loop.

---

## Tech Stack (This PoC)

| Component | Technology |
|-----------|------------|
| Frontend | React 19, Vite 8, Tailwind CSS v4 |
| Icons | Lucide React |
| Charts | Recharts (mock data) |
| Hosting | GitHub Pages (free) |
| Schema | `Amis_public.dbml` |
| Ontology | `Amis_public.owl` |

---

## Academic Frameworks

The **Meta Loop** tab (Phase 4) will explicitly map AMIS to:

- **Stafford Beer's Viable System Model (VSM)** — recursive organizational cybernetics
- **OODA Loop acceleration** — Observe → Orient → Decide → Act, compressed by AI-assisted sensing and decision
- **Homeostatic control** — the system's ability to maintain AAP within acceptable bounds despite perturbations

These frameworks provide the academic vocabulary for thesis defense while grounding the system in established cybernetic theory.

---

## Author

Built as part of a master's thesis in aerospace engineering by an engineer in the aerospace industry. Precision in schema fidelity, cybernetic architecture, and operational realism is intentional — this is not a generic dashboard template.
