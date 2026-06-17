// AMIS mock data — field names match Amis_public.dbml

export const TAIL_NUMBERS = ['168042', '168043', '168044'];

export const assetInstances = [
  { asset_uuid: 'a1-168042', part_uuid: 'p-airframe', serial_number: '168042', manufacture_date: '2019-03-15', parent_asset_uuid: null },
  { asset_uuid: 'a2-168043', part_uuid: 'p-airframe', serial_number: '168043', manufacture_date: '2019-06-22', parent_asset_uuid: null },
  { asset_uuid: 'a3-168044', part_uuid: 'p-airframe', serial_number: '168044', manufacture_date: '2020-01-08', parent_asset_uuid: null },
  { asset_uuid: 'a4-eng-001', part_uuid: 'p-engine', serial_number: 'ENG-7A-44021', manufacture_date: '2018-11-02', parent_asset_uuid: 'a1-168042' },
  { asset_uuid: 'a5-gear-001', part_uuid: 'p-gearbox', serial_number: 'GBX-99281', manufacture_date: '2019-04-10', parent_asset_uuid: 'a1-168042' },
  { asset_uuid: 'a6-act-001', part_uuid: 'p-actuator', serial_number: 'ACT-77102', manufacture_date: '2020-02-14', parent_asset_uuid: 'a1-168042' },
  { asset_uuid: 'a7-eng-002', part_uuid: 'p-engine', serial_number: 'ENG-7A-44089', manufacture_date: '2019-01-18', parent_asset_uuid: 'a2-168043' },
];

export const fleetAap = {
  fleet: 87.3,
  target: 90.0,
  perTail: [
    { serial_number: '168042', aap: 91.2 },
    { serial_number: '168043', aap: 84.6 },
    { serial_number: '168044', aap: 86.1 },
  ],
};

export const discrepancies = [
  { discrepancy_uuid: 'd-001', aircraft_asset_uuid: 'a1-168042', suspected_asset_uuid: 'a6-act-001', discovered_date: '2026-06-14T08:22:00Z', narrative: 'MLG actuator slow to retract — hydraulic pressure drop noted on post-flight', severity_level: 'Critical', status: 'OPEN' },
  { discrepancy_uuid: 'd-002', aircraft_asset_uuid: 'a2-168043', suspected_asset_uuid: 'a7-eng-002', discovered_date: '2026-06-13T14:05:00Z', narrative: 'N1 vibration exceedance 0.42 IPS during climb — HUMS flagged', severity_level: 'Major', status: 'OPEN' },
  { discrepancy_uuid: 'd-003', aircraft_asset_uuid: 'a3-168044', suspected_asset_uuid: null, discovered_date: '2026-06-12T09:30:00Z', narrative: 'Avionics display flicker on MFD-2 during IFR approach', severity_level: 'Minor', status: 'OPEN' },
  { discrepancy_uuid: 'd-004', aircraft_asset_uuid: 'a1-168042', suspected_asset_uuid: null, discovered_date: '2026-06-11T16:45:00Z', narrative: 'Cabin pressurization advisory — outflow valve sensor drift', severity_level: 'Major', status: 'OPEN' },
  { discrepancy_uuid: 'd-005', aircraft_asset_uuid: 'a2-168043', suspected_asset_uuid: null, discovered_date: '2026-06-10T07:15:00Z', narrative: 'Awaiting hydraulic pump seal kit — AWP hold', severity_level: 'Major', status: 'AWP' },
  { discrepancy_uuid: 'd-006', aircraft_asset_uuid: 'a3-168044', suspected_asset_uuid: null, discovered_date: '2026-06-09T11:00:00Z', narrative: 'Landing light inop — bulb replacement scheduled', severity_level: 'Minor', status: 'OPEN' },
  { discrepancy_uuid: 'd-007', aircraft_asset_uuid: 'a1-168042', suspected_asset_uuid: 'a5-gear-001', discovered_date: '2026-06-08T13:20:00Z', narrative: 'GBX chip detector advisory — metal particles detected', severity_level: 'Critical', status: 'IN_WORK' },
  { discrepancy_uuid: 'd-008', aircraft_asset_uuid: 'a2-168043', suspected_asset_uuid: null, discovered_date: '2026-06-07T10:00:00Z', narrative: 'ECS temperature regulation out of tolerance', severity_level: 'Minor', status: 'OPEN' },
];

export const slaMetrics = [
  { name: 'Discrepancy → Action', value: '4.2h', target: '< 8h', status: 'GREEN' },
  { name: 'Alert → Action', value: '12.6h', target: '< 24h', status: 'GREEN' },
  { name: 'EI Response', value: '36.1h', target: '< 48h', status: 'YELLOW' },
  { name: 'Parts Delivery', value: '9.4d', target: '< 14d', status: 'GREEN' },
  { name: 'TD Compliance', value: '92%', target: '> 95%', status: 'YELLOW' },
  { name: 'Model Inference', value: '1.8s', target: '< 3s', status: 'GREEN' },
];

export const cbmAlerts = [
  { alert_uuid: 'cbm-001', asset_uuid: 'a5-gear-001', alert_timestamp: '2026-06-15T06:00:00Z', predicted_failure_mode_uuid: 'fm-003', predicted_time_to_failure_hours: 48.5, confidence_score: 0.88, status: 'OPEN' },
  { alert_uuid: 'cbm-002', asset_uuid: 'a7-eng-002', alert_timestamp: '2026-06-14T18:30:00Z', predicted_failure_mode_uuid: 'fm-001', predicted_time_to_failure_hours: 120.0, confidence_score: 0.76, status: 'OPEN' },
  { alert_uuid: 'cbm-003', asset_uuid: 'a6-act-001', alert_timestamp: '2026-06-14T02:15:00Z', predicted_failure_mode_uuid: 'fm-002', predicted_time_to_failure_hours: 72.0, confidence_score: 0.91, status: 'OPEN' },
  { alert_uuid: 'cbm-004', asset_uuid: 'a4-eng-001', alert_timestamp: '2026-06-13T09:00:00Z', predicted_failure_mode_uuid: 'fm-001', predicted_time_to_failure_hours: 340.0, confidence_score: 0.62, status: 'OPEN' },
];

export const healthPredictions = [
  { prediction_uuid: 'hp-001', asset_uuid: 'a1-168042', prediction_timestamp: '2026-06-16T12:00:00Z', current_health_score: 0.87, probability_of_failure_next_flight: 0.03, predicted_remaining_useful_life_hours: 420.0 },
  { prediction_uuid: 'hp-002', asset_uuid: 'a2-168043', prediction_timestamp: '2026-06-16T12:00:00Z', current_health_score: 0.72, probability_of_failure_next_flight: 0.08, predicted_remaining_useful_life_hours: 180.0 },
  { prediction_uuid: 'hp-003', asset_uuid: 'a3-168044', prediction_timestamp: '2026-06-16T12:00:00Z', current_health_score: 0.81, probability_of_failure_next_flight: 0.05, predicted_remaining_useful_life_hours: 310.0 },
  { prediction_uuid: 'hp-004', asset_uuid: 'a4-eng-001', prediction_timestamp: '2026-06-16T12:00:00Z', current_health_score: 0.91, probability_of_failure_next_flight: 0.02, predicted_remaining_useful_life_hours: 890.0 },
  { prediction_uuid: 'hp-005', asset_uuid: 'a5-gear-001', prediction_timestamp: '2026-06-16T12:00:00Z', current_health_score: 0.58, probability_of_failure_next_flight: 0.14, predicted_remaining_useful_life_hours: 48.5 },
  { prediction_uuid: 'hp-006', asset_uuid: 'a6-act-001', prediction_timestamp: '2026-06-16T12:00:00Z', current_health_score: 0.65, probability_of_failure_next_flight: 0.11, predicted_remaining_useful_life_hours: 72.0 },
  { prediction_uuid: 'hp-007', asset_uuid: 'a7-eng-002', prediction_timestamp: '2026-06-16T12:00:00Z', current_health_score: 0.74, probability_of_failure_next_flight: 0.07, predicted_remaining_useful_life_hours: 120.0 },
];

export const statusTimeline = {
  '168042': [
    { log_uuid: 'sl-001', asset_uuid: 'a1-168042', status_code: 'flyable', effective_date: '2026-03-18T00:00:00Z', end_date: '2026-04-02T14:00:00Z', duration_hours: 374, display: 'FMC' },
    { log_uuid: 'sl-002', asset_uuid: 'a1-168042', status_code: 'nf', effective_date: '2026-04-02T14:00:00Z', end_date: '2026-04-05T09:00:00Z', duration_hours: 67, display: 'NMC' },
    { log_uuid: 'sl-003', asset_uuid: 'a1-168042', status_code: 'flyable', effective_date: '2026-04-05T09:00:00Z', end_date: '2026-05-20T08:00:00Z', duration_hours: 1080, display: 'FMC' },
    { log_uuid: 'sl-004', asset_uuid: 'a1-168042', status_code: 'AWP', effective_date: '2026-05-20T08:00:00Z', end_date: '2026-05-28T16:00:00Z', duration_hours: 200, display: 'AWP' },
    { log_uuid: 'sl-005', asset_uuid: 'a1-168042', status_code: 'flyable', effective_date: '2026-05-28T16:00:00Z', end_date: '2026-06-10T06:00:00Z', duration_hours: 302, display: 'PMC' },
    { log_uuid: 'sl-006', asset_uuid: 'a1-168042', status_code: 'flyable', effective_date: '2026-06-10T06:00:00Z', end_date: null, duration_hours: 150, display: 'FMC' },
  ],
  '168043': [
    { log_uuid: 'sl-007', asset_uuid: 'a2-168043', status_code: 'flyable', effective_date: '2026-03-18T00:00:00Z', end_date: '2026-05-01T12:00:00Z', duration_hours: 1068, display: 'FMC' },
    { log_uuid: 'sl-008', asset_uuid: 'a2-168043', status_code: 'nf', effective_date: '2026-05-01T12:00:00Z', end_date: '2026-05-15T08:00:00Z', duration_hours: 332, display: 'NMC' },
    { log_uuid: 'sl-009', asset_uuid: 'a2-168043', status_code: 'AWP', effective_date: '2026-05-15T08:00:00Z', end_date: '2026-06-01T10:00:00Z', duration_hours: 410, display: 'AWP' },
    { log_uuid: 'sl-010', asset_uuid: 'a2-168043', status_code: 'flyable', effective_date: '2026-06-01T10:00:00Z', end_date: null, duration_hours: 362, display: 'PMC' },
  ],
  '168044': [
    { log_uuid: 'sl-011', asset_uuid: 'a3-168044', status_code: 'flyable', effective_date: '2026-03-18T00:00:00Z', end_date: null, duration_hours: 2184, display: 'FMC' },
  ],
};

export const faultCodeMaster = [
  { fault_code_uuid: 'fc-001', fault_code: 'ENG-0402', description: 'N1 vibration exceedance — HUMS threshold', system_category: 'Propulsion', baseline_severity: 'Critical' },
  { fault_code_uuid: 'fc-002', fault_code: 'HYD-109', description: 'Hydraulic system A pressure low', system_category: 'Hydraulics', baseline_severity: 'Maintenance' },
  { fault_code_uuid: 'fc-003', fault_code: 'GBX-007', description: 'Chip detector — metal particles in scavenge', system_category: 'Propulsion', baseline_severity: 'Critical' },
  { fault_code_uuid: 'fc-004', fault_code: 'AVN-221', description: 'MFD display bus timeout', system_category: 'Avionics', baseline_severity: 'Advisory' },
];

export const faultLog = [
  { event_uuid: 'tf-001', aircraft_asset_uuid: 'a1-168042', fault_code_uuid: 'fc-003', flight_uuid: 'fl-042', trigger_timestamp: '2026-06-15T14:22:00Z', clear_timestamp: null, duration_seconds: 86400, fault_code: 'GBX-007' },
  { event_uuid: 'tf-002', aircraft_asset_uuid: 'a2-168043', fault_code_uuid: 'fc-001', flight_uuid: 'fl-043', trigger_timestamp: '2026-06-13T14:05:00Z', clear_timestamp: null, duration_seconds: 259200, fault_code: 'ENG-0402' },
  { event_uuid: 'tf-003', aircraft_asset_uuid: 'a1-168042', fault_code_uuid: 'fc-002', flight_uuid: null, trigger_timestamp: '2026-06-14T08:22:00Z', clear_timestamp: null, duration_seconds: 172800, fault_code: 'HYD-109' },
  { event_uuid: 'tf-004', aircraft_asset_uuid: 'a3-168044', fault_code_uuid: 'fc-004', flight_uuid: 'fl-044', trigger_timestamp: '2026-06-12T09:30:00Z', clear_timestamp: '2026-06-12T10:15:00Z', duration_seconds: 2700, fault_code: 'AVN-221' },
];

export const sensorCatalog = [
  { sensor_uuid: 's-001', sensor_name: 'L_ENG_VIB_01', monitored_part_uuid: 'p-engine', sensor_type: 'Vibration' },
  { sensor_uuid: 's-002', sensor_name: 'HYD_SYS_PRESS_A', monitored_part_uuid: 'p-hydraulic', sensor_type: 'Pressure' },
  { sensor_uuid: 's-003', sensor_name: 'GBX_TEMP_01', monitored_part_uuid: 'p-gearbox', sensor_type: 'Temperature' },
];

export const conditionIndicators = [
  { ci_uuid: 'ci-001', sensor_uuid: 's-001', flight_uuid: 'fl-042', asset_uuid: 'a4-eng-001', ci_name: 'RMS_Vibration', ci_value: 0.38, measurement_timestamp: '2026-06-15T14:20:00Z', is_anomaly: false },
  { ci_uuid: 'ci-002', sensor_uuid: 's-001', flight_uuid: 'fl-043', asset_uuid: 'a7-eng-002', ci_name: 'RMS_Vibration', ci_value: 0.52, measurement_timestamp: '2026-06-13T14:03:00Z', is_anomaly: true },
  { ci_uuid: 'ci-003', sensor_uuid: 's-002', flight_uuid: null, asset_uuid: 'a1-168042', ci_name: 'Max_Pressure_Drop', ci_value: 2850, measurement_timestamp: '2026-06-14T08:20:00Z', is_anomaly: true },
  { ci_uuid: 'ci-004', sensor_uuid: 's-003', flight_uuid: 'fl-042', asset_uuid: 'a5-gear-001', ci_name: 'Max_Temp_Exceedance', ci_value: 198.4, measurement_timestamp: '2026-06-15T14:18:00Z', is_anomaly: true },
  { ci_uuid: 'ci-005', sensor_uuid: 's-001', flight_uuid: 'fl-042', asset_uuid: 'a4-eng-001', ci_name: 'RMS_Vibration', ci_value: 0.31, measurement_timestamp: '2026-06-14T10:00:00Z', is_anomaly: false },
];

export const corrosionLedger = [
  { exposure_uuid: 'ce-001', asset_uuid: 'a1-168042', last_calculated_date: '2026-06-16T06:00:00Z', cumulative_corrosion_score: 42.3, predicted_inspection_due_date: '2026-08-15' },
  { exposure_uuid: 'ce-002', asset_uuid: 'a2-168043', last_calculated_date: '2026-06-16T06:00:00Z', cumulative_corrosion_score: 58.7, predicted_inspection_due_date: '2026-07-22' },
  { exposure_uuid: 'ce-003', asset_uuid: 'a3-168044', last_calculated_date: '2026-06-16T06:00:00Z', cumulative_corrosion_score: 28.1, predicted_inspection_due_date: '2026-10-01' },
];

export const installationHistory = [
  { install_uuid: 'ih-001', parent_asset_uuid: 'a1-168042', child_asset_uuid: 'a4-eng-001', install_date: '2019-03-20T00:00:00Z', removal_date: null },
  { install_uuid: 'ih-002', parent_asset_uuid: 'a1-168042', child_asset_uuid: 'a5-gear-001', install_date: '2019-04-01T00:00:00Z', removal_date: null },
  { install_uuid: 'ih-003', parent_asset_uuid: 'a1-168042', child_asset_uuid: 'a6-act-001', install_date: '2020-03-10T00:00:00Z', removal_date: null },
  { install_uuid: 'ih-004', parent_asset_uuid: 'a2-168043', child_asset_uuid: 'a7-eng-002', install_date: '2019-06-25T00:00:00Z', removal_date: null },
  { install_uuid: 'ih-005', parent_asset_uuid: 'a1-168042', child_asset_uuid: 'a5-gear-001', install_date: '2018-06-01T00:00:00Z', removal_date: '2019-03-28T00:00:00Z' },
];

export const fmeaModes = [
  { mode_uuid: 'fm-001', fmea_uuid: 'fmea-eng', failure_mode_description: 'Bearing spalling — N1 shaft', severity_score: 4, probability_score: 3, calculated_hri: 12 },
  { mode_uuid: 'fm-002', fmea_uuid: 'fmea-hyd', failure_mode_description: 'Actuator seal leak — MLG retraction', severity_score: 3, probability_score: 4, calculated_hri: 12 },
  { mode_uuid: 'fm-003', fmea_uuid: 'fmea-gbx', failure_mode_description: 'Gear mesh wear — chip generation', severity_score: 5, probability_score: 2, calculated_hri: 10 },
  { mode_uuid: 'fm-004', fmea_uuid: 'fmea-gbx', failure_mode_description: 'Lubrication starvation — thermal runaway', severity_score: 5, probability_score: 1, calculated_hri: 5 },
];

export const reliabilityModels = [
  { model_uuid: 'rm-001', part_uuid: 'p-engine', effective_start_date: '2025-01-01T00:00:00Z', effective_end_date: null, model_version: 'WEIBULL_v2.1', data_points_used: 847, weibull_beta: 2.8, weibull_eta: 4200, calculated_mtbf_hours: 3800 },
  { model_uuid: 'rm-002', part_uuid: 'p-gearbox', effective_start_date: '2025-06-01T00:00:00Z', effective_end_date: null, model_version: 'WEIBULL_v1.4', data_points_used: 312, weibull_beta: 3.2, weibull_eta: 2800, calculated_mtbf_hours: 2500 },
  { model_uuid: 'rm-003', part_uuid: 'p-actuator', effective_start_date: '2024-09-01T00:00:00Z', effective_end_date: null, model_version: 'WEIBULL_v1.0', data_points_used: 156, weibull_beta: 1.9, weibull_eta: 6000, calculated_mtbf_hours: 5400 },
];

export const bomTree = {
  part_uuid: 'p-airframe',
  part_number: '1680-001',
  dash_number: '-1',
  part_name: 'MQ-9B SkyGuardian Airframe',
  system_category: 'Airframe',
  children: [
    {
      part_uuid: 'p-engine',
      part_number: 'TPE331-12',
      dash_number: '-3',
      part_name: 'Turboprop Engine Assembly',
      system_category: 'Propulsion',
      children: [
        { part_uuid: 'p-gearbox', part_number: 'GBX-4400', dash_number: '-1', part_name: 'Reduction Gearbox', system_category: 'Propulsion', children: [] },
      ],
    },
    {
      part_uuid: 'p-hydraulic',
      part_number: 'HYD-2200',
      dash_number: '-2',
      part_name: 'Hydraulic Power Unit',
      system_category: 'Airframe',
      children: [
        { part_uuid: 'p-actuator', part_number: 'ACT-7710', dash_number: '-1', part_name: 'MLG Retraction Actuator', system_category: 'Airframe', children: [] },
      ],
    },
    {
      part_uuid: 'p-avionics',
      part_number: 'AVN-SALE',
      dash_number: '-4',
      part_name: 'SALE Avionics Suite',
      system_category: 'Avionics',
      children: [],
    },
  ],
};

export const physicalInstallTree = {
  asset_uuid: 'a1-168042',
  serial_number: '168042',
  part_name: 'MQ-9B SkyGuardian',
  children: [
    { asset_uuid: 'a4-eng-001', serial_number: 'ENG-7A-44021', part_name: 'Turboprop Engine', children: [
      { asset_uuid: 'a5-gear-001', serial_number: 'GBX-99281', part_name: 'Reduction Gearbox', children: [] },
    ]},
    { asset_uuid: 'a6-act-001', serial_number: 'ACT-77102', part_name: 'MLG Retraction Actuator', children: [] },
  ],
};

export const tdCompliance = [
  { compliance_uuid: 'tdc-001', td_uuid: 'td-001', td_number: 'TD-2025-0142', pre_mod_asset_uuid: 'a1-168042', post_mod_asset_uuid: 'a1-168042', completion_date: '2025-11-20T00:00:00Z', status: 'COMPLIANT', serial_number: '168042' },
  { compliance_uuid: 'tdc-002', td_uuid: 'td-002', td_number: 'TD-2026-0008', pre_mod_asset_uuid: 'a2-168043', post_mod_asset_uuid: null, completion_date: null, status: 'OVERDUE', serial_number: '168043' },
  { compliance_uuid: 'tdc-003', td_uuid: 'td-003', td_number: 'TD-2026-0015', pre_mod_asset_uuid: 'a3-168044', post_mod_asset_uuid: null, completion_date: null, status: 'SCHEDULED', serial_number: '168044' },
  { compliance_uuid: 'tdc-004', td_uuid: 'td-001', td_number: 'TD-2025-0142', pre_mod_asset_uuid: 'a3-168044', post_mod_asset_uuid: 'a3-168044', completion_date: '2026-01-15T00:00:00Z', status: 'COMPLIANT', serial_number: '168044' },
];

export const softwareReleases = [
  { release_uuid: 'sr-001', part_uuid: 'p-avionics', release_date: '2026-03-01', airworthiness_certification_date: '2026-02-28', is_active: true, version: 'SALE v4.2.1' },
  { release_uuid: 'sr-002', part_uuid: 'p-avionics', release_date: '2025-09-15', airworthiness_certification_date: '2025-09-10', is_active: false, version: 'SALE v4.1.8' },
  { release_uuid: 'sr-003', part_uuid: 'p-engine', release_date: '2026-01-20', airworthiness_certification_date: '2026-01-18', is_active: true, version: 'FADEC v3.0.2' },
];

export const rulTrend = [
  { date: '06-01', engine: 920, gearbox: 180, actuator: 140 },
  { date: '06-04', engine: 905, gearbox: 150, actuator: 120 },
  { date: '06-07', engine: 890, gearbox: 120, actuator: 100 },
  { date: '06-10', engine: 890, gearbox: 90, actuator: 85 },
  { date: '06-13', engine: 890, gearbox: 60, actuator: 75 },
  { date: '06-16', engine: 890, gearbox: 48, actuator: 72 },
];

export const alertLatency = [
  { alert: 'CBM-001', hours: 18 },
  { alert: 'CBM-002', hours: 36 },
  { alert: 'CBM-003', hours: 8 },
  { alert: 'CBM-004', hours: 52 },
];

export const cbmAccuracy = { truePositive: 78, falsePositive: 12, trueNegative: 856, falseNegative: 4 };

export const metaMetrics = [
  { metric_name: 'deploy_count', value: 142, unit: '' },
  { metric_name: 'last_commit', value: 'a3f8c21', unit: '' },
  { metric_name: 'test_pass_rate', value: 97.2, unit: '%' },
  { metric_name: 'schema_version', value: 'Amis_public v1.0', unit: '' },
  { metric_name: 'build_time', value: 42, unit: 's' },
  { metric_name: 'open_issues', value: 3, unit: '' },
];

export const partCatalog = {
  'p-engine': { part_number: 'TPE331-12', part_name: 'Turboprop Engine Assembly', stock_number: '015123456' },
  'p-gearbox': { part_number: 'GBX-4400', part_name: 'Reduction Gearbox', stock_number: '015234567' },
  'p-actuator': { part_number: 'ACT-7710', part_name: 'MLG Retraction Actuator', stock_number: '015345678' },
};

export const inspectionDue = {
  'a4-eng-001': { days: 45, type: 'Hot Section Inspection' },
  'a5-gear-001': { days: 7, type: 'Chip Detector Review' },
  'a6-act-001': { days: 14, type: 'Hydraulic Leak Check' },
  'a7-eng-002': { days: 21, type: 'Borescope Inspection' },
};

export function getAssetByTail(tail) {
  return assetInstances.find((a) => a.serial_number === tail);
}

export function getHealthByAsset(assetUuid) {
  return healthPredictions.find((h) => h.asset_uuid === assetUuid);
}

export function getFaultsByTail(tail) {
  const asset = getAssetByTail(tail);
  if (!asset) return [];
  return faultLog.filter((f) => f.aircraft_asset_uuid === asset.asset_uuid);
}

export function getIndicatorsByTail(tail) {
  const asset = getAssetByTail(tail);
  if (!asset) return [];
  return conditionIndicators.filter((c) => c.asset_uuid === asset.asset_uuid || assetInstances.some((a) => a.parent_asset_uuid === asset.asset_uuid && a.asset_uuid === c.asset_uuid));
}

export function getCorrosionByTail(tail) {
  const asset = getAssetByTail(tail);
  if (!asset) return null;
  return corrosionLedger.find((c) => c.asset_uuid === asset.asset_uuid);
}

export function getPartInstances() {
  return assetInstances.filter((a) => a.parent_asset_uuid !== null);
}

export function weibullPdf(t, beta, eta) {
  if (t <= 0) return 0;
  return (beta / eta) * Math.pow(t / eta, beta - 1) * Math.exp(-Math.pow(t / eta, beta));
}

export function generateWeibullCurve(beta, eta, points = 50) {
  const maxT = eta * 2;
  const data = [];
  for (let i = 1; i <= points; i++) {
    const t = (maxT / points) * i;
    data.push({ t: Math.round(t), pdf: weibullPdf(t, beta, eta) * 1000 });
  }
  return data;
}

export const ariaResponses = {
  default: 'Based on current fleet telemetry, all primary systems are within nominal parameters. Would you like a deeper analysis of a specific tail number or component?',
  home: 'Fleet AAP is 87.3%, below the 90% target. Primary drivers: T-168043 N1 vibration (ENG-0402) and T-168042 GBX chip detector advisory. Recommend prioritizing CBM-001 and CBM-003 alerts.',
  aircraftHealth: 'T-{tail} health score is trending down due to active fault codes. N1 vibration anomaly detected on last sortie. Recommend borescope inspection per DM 72-00-00.',
  partHealth: 'Component {sn} shows RUL of {rul} hours. FMEA HRI score indicates elevated risk. Consider scheduling removal before next deployment cycle.',
  cbm: 'Active CBM+ alert confidence exceeds 0.85 for GBX-99281. Weibull β=3.2 indicates wear-out failure mode. Alert-to-action latency is within SLA.',
  config: 'TD-2026-0008 is overdue on T-168043. Engineering BOM shows 4 open configuration deltas against physical installation tree.',
};

// Logistics
export const supplyRequisitions = [
  { requisition_uuid: 'srq-001', document_number: 'N0018826V0091', part_uuid: 'p-gearbox', quantity_ordered: 1, order_date: '2026-06-01', estimated_delivery_date: '2026-06-15', actual_delivery_date: '2026-06-14', status_code: 'DELIVERED', priority_designator: 'High' },
  { requisition_uuid: 'srq-002', document_number: 'N0018826V0092', part_uuid: 'p-actuator', quantity_ordered: 2, order_date: '2026-06-10', estimated_delivery_date: '2026-06-18', actual_delivery_date: null, status_code: 'BACKORDERED', priority_designator: 'High' },
  { requisition_uuid: 'srq-003', document_number: 'N0018826V0093', part_uuid: 'p-engine', quantity_ordered: 1, order_date: '2026-06-12', estimated_delivery_date: '2026-06-25', actual_delivery_date: null, status_code: 'RELEASED', priority_designator: 'Routine' }
];

export const vendorPerformance = [
  { cage_code: '1ABC2', name: 'Rolls-Royce Aviation Solutions', avg_latency_days: 9.4, quality_rating: 98.2, order_count: 42 },
  { cage_code: '3XYZ4', name: 'Sargent Aerospace & Defense', avg_latency_days: 14.8, quality_rating: 91.5, order_count: 18 },
  { cage_code: '5JKL6', name: 'General Electric Engines', avg_latency_days: 7.2, quality_rating: 99.1, order_count: 35 },
  { cage_code: '7MNO8', name: 'Honeywell Aerospace', avg_latency_days: 18.1, quality_rating: 88.4, order_count: 12 }
];

export const supportEquipment = [
  { se_instance_uuid: 'se-001', se_part_number: 'SE-HYD-550', se_name: 'Hydraulic Test Stand', se_serial_number: 'HTS-0091', last_calibration_date: '2026-01-15', next_calibration_due_date: '2026-07-15', status_code: 'Ready for Use' },
  { se_instance_uuid: 'se-002', se_part_number: 'SE-TRQ-100', se_name: 'Digital Torque Wrench', se_serial_number: 'TW-4402', last_calibration_date: '2025-11-20', next_calibration_due_date: '2026-05-20', status_code: 'Out of Calibration' },
  { se_instance_uuid: 'se-003', se_part_number: 'SE-VIB-900', se_name: 'Vibration Calibrator', se_serial_number: 'VC-8819', last_calibration_date: '2026-03-10', next_calibration_due_date: '2026-09-10', status_code: 'Ready for Use' }
];

// Engineering
export const engineeringInstructions = [
  { instruction_uuid: 'ei-001', tracking_number: 'EI-2026-042', instruction_type: 'Structural Rework', submitted_date: '2026-06-12T09:00:00Z', response_date: '2026-06-13T11:00:00Z', engineer_name: 'T. Vance', request_narrative: 'Wing spar fastener hole corrosion exceeds limit in IETM 53-10-02.', engineering_disposition: 'Ream hole to 0.255in and install oversize fastener NAS6604.', status: 'Closed' },
  { instruction_uuid: 'ei-002', tracking_number: 'EI-2026-043', instruction_type: 'Avionics Patch', submitted_date: '2026-06-14T14:30:00Z', response_date: null, engineer_name: 'R. Chen', request_narrative: 'MFD-2 bus timeout fault code (AVN-221) recurrent after rewrite.', engineering_disposition: 'Awaiting harness isolation check results.', status: 'Open' }
];

export const fracasInvestigations = [
  { fracas_uuid: 'fr-001', fracas_tracking_number: 'FRACAS-2026-003', opened_date: '2026-05-10T08:00:00Z', closed_date: null, status: 'Under Analysis', lead_investigator: 'Sarah Jenkins', problem_statement: 'Reduction Gearbox chip generation rates exceeding Weibull parameters across all hulls.' },
  { fracas_uuid: 'fr-002', fracas_tracking_number: 'FRACAS-2025-019', opened_date: '2025-11-12T09:00:00Z', closed_date: '2025-12-05T16:00:00Z', status: 'Closed - Fixed', lead_investigator: 'Dave Kaval', problem_statement: 'Actuator seal degradation due to hydraulic oil contamination by batch 2025-A.' }
];

export const engineeringProjects = [
  { project_uuid: 'ep-001', project_id: 'ENG-PROJ-2026-01', project_title: 'GBX Mesh Redesign', status: 'Active', priority: 'High', lead_engineer: 'Sarah Jenkins', start_date: '2026-05-15', target_completion_date: '2026-11-30', project_description: 'Redesign gear tooth profile to reduce spalling rates and metal particle generation.', expected_outcome: 'Increase GBX MTBF from 2500 hrs to 3200 hrs' },
  { project_uuid: 'ep-002', project_id: 'ENG-PROJ-2026-02', project_title: 'Vibration Auto-Filter', status: 'Proposed', priority: 'Medium', lead_engineer: 'M. Vance', start_date: '2026-07-01', target_completion_date: '2026-09-30', project_description: 'Develop onboard sensor calibration algorithm to suppress transient N1 vibration sensor noise.', expected_outcome: 'Reduce false positive vibration alerts by 25%' },
  { project_uuid: 'ep-003', project_id: 'ENG-PROJ-2026-03', project_title: 'Corrosion Zone Study', status: 'On Hold', priority: 'Low', lead_engineer: 'K. Patel', start_date: '2026-02-10', target_completion_date: '2026-08-15', project_description: 'Geographic analysis of salt air exposure logs to refine component inspection intervals.', expected_outcome: 'Data-driven structural inspections' }
];

export const documentRepository = [
  { doc_uuid: 'doc-001', document_title: 'Reduction Gearbox Stress Analysis Report', document_type: 'Test Report', author: 'Aerospace Gear Systems Group', revision: 'Rev B', publication_date: '2024-08-10', storage_location: 's3://amis-docs-engineering/gbx_stress_revB.pdf', keywords: 'gearbox, gear mesh, stress, spalling' },
  { doc_uuid: 'doc-002', document_title: 'MQ-9B Environmental Corrosion Control Study', document_type: 'White Paper', author: 'NAVAIR Materials Lab', revision: 'v1.0', publication_date: '2025-02-14', storage_location: 's3://amis-docs-engineering/mq9_corrosion_2025.pdf', keywords: 'corrosion, humidity, salt air' },
  { doc_uuid: 'doc-003', document_title: 'TPE331 Turbine Borescope Inspection Standards', document_type: 'Instruction Manual', author: 'Propulsion Engineering Group', revision: 'Rev 3', publication_date: '2023-11-20', storage_location: 's3://amis-docs-engineering/tpe331_borescope.pdf', keywords: 'engine, borescope, inspection, limit' }
];

// Meta Loop
export const surpriseAuditLog = [
  { event_uuid: 'sa-001', fault_code: 'HYD-109', serial_number: 'T-168042', occurrence_timestamp: '2026-06-11T16:45:00Z', gap_description: 'Outflow valve drift warning triggered with 0.05 anomaly score (no CBM alert)', severity: 'Major' },
  { event_uuid: 'sa-002', fault_code: 'AVN-221', serial_number: 'T-168044', occurrence_timestamp: '2026-06-12T09:30:00Z', gap_description: 'Bus timeout fault on MFD-2 without preceding telemetry trend deviation', severity: 'Minor' }
];

export const vsmMetrics = {
  system1_viability: 94.2,
  system2_coordination: 88.5,
  system3_control: 91.0,
  system4_intelligence: 82.3,
  system5_policy: 95.0,
  overall_cybernetic_health: 90.2
};

// Telemetry Trace
export const flightTelemetryTrace = [
  { t: 0, vibration: 0.12, temperature: 85, altitude: 0, speed: 0, limit: 0.45 },
  { t: 5, vibration: 0.22, temperature: 95, altitude: 3000, speed: 120, limit: 0.45 },
  { t: 10, vibration: 0.31, temperature: 102, altitude: 8000, speed: 160, limit: 0.45 },
  { t: 15, vibration: 0.46, temperature: 105, altitude: 12000, speed: 180, limit: 0.45 },
  { t: 20, vibration: 0.48, temperature: 107, altitude: 15000, speed: 185, limit: 0.45 },
  { t: 25, vibration: 0.35, temperature: 104, altitude: 15000, speed: 185, limit: 0.45 },
  { t: 30, vibration: 0.32, temperature: 101, altitude: 12000, speed: 170, limit: 0.45 },
  { t: 35, vibration: 0.28, temperature: 98, altitude: 6000, speed: 140, limit: 0.45 },
  { t: 40, vibration: 0.18, temperature: 88, altitude: 0, speed: 0, limit: 0.45 }
];

