// ============================================================
// AirWatch — Mock Data Layer
// Replace these arrays / objects with real model outputs
// ============================================================

// ------ AQI helpers ------
const AQI_BREAKPOINTS = [
  { min: 0,   max: 50,  label: 'Good',            color: '#00e400', bg: '#00e40022' },
  { min: 51,  max: 100, label: 'Satisfactory',    color: '#92d050', bg: '#92d05022' },
  { min: 101, max: 200, label: 'Moderate',         color: '#ffff00', bg: '#ffff0022' },
  { min: 201, max: 300, label: 'Poor',             color: '#ff7e00', bg: '#ff7e0022' },
  { min: 301, max: 400, label: 'Very Poor',        color: '#ff0000', bg: '#ff000022' },
  { min: 401, max: 500, label: 'Hazardous',        color: '#8f3f97', bg: '#8f3f9722' },
];

function getAQIInfo(value) {
  for (const bp of AQI_BREAKPOINTS) {
    if (value >= bp.min && value <= bp.max) return bp;
  }
  return AQI_BREAKPOINTS[AQI_BREAKPOINTS.length - 1];
}

// ------ Current readings ------
const CURRENT = {
  aqi: 178,
  pm25: 62.4,
  pm10: 134.7,
  temperature: 31.2,
  humidity: 58,
  windSpeed: 12.4,
  lightPollution: 42,   // Lux night-sky reading (lower = more polluted sky)
  location: 'Connaught Place, New Delhi',
  lastUpdated: new Date().toISOString(),
};

// ------ Hourly trend (past 24 h) ------
function generateHourlyLabels() {
  const labels = [];
  for (let i = 23; i >= 0; i--) {
    const d = new Date();
    d.setHours(d.getHours() - i);
    labels.push(d.getHours().toString().padStart(2, '0') + ':00');
  }
  return labels;
}

const HOURLY_LABELS = generateHourlyLabels();

const HOURLY_AQI = [
  145,150,158,162,170,175,178,182,188,192,195,190,
  185,178,172,168,165,170,178,182,185,180,178,178
];
const HOURLY_PM25 = [
  48,52,55,58,62,64,65,67,70,72,74,70,
  67,64,60,58,57,59,63,66,68,65,63,62
];
const HOURLY_PM10 = [
  110,115,120,125,130,134,137,140,145,148,150,145,
  140,136,130,126,124,128,133,138,142,138,135,134
];
const HOURLY_TEMP = [
  27,26,26,25,25,24,24,24,25,26,28,30,
  31,32,33,34,34,33,32,31,30,29,28,31
];

// ------ 6-hour predictions ------
function generatePredictionLabels() {
  const labels = [];
  for (let i = 1; i <= 6; i++) {
    const d = new Date();
    d.setHours(d.getHours() + i);
    labels.push(d.getHours().toString().padStart(2, '0') + ':00');
  }
  return labels;
}

const PRED_LABELS = generatePredictionLabels();
const PRED_AQI    = [182, 188, 195, 201, 210, 205];
const PRED_TEMP   = [30.5, 29.8, 29.1, 28.6, 28.0, 27.4];

// ------ Health Advisory ------
const ADVISORIES = {
  'Good': {
    icon: '😊',
    general: 'Air quality is excellent. Enjoy outdoor activities.',
    sensitive: 'No special precautions needed.',
    actions: ['Open windows for ventilation', 'Great day for outdoor exercise'],
  },
  'Satisfactory': {
    icon: '🙂',
    general: 'Air quality is acceptable.',
    sensitive: 'Unusually sensitive people should consider reducing prolonged outdoor exertion.',
    actions: ['Outdoor exercise is generally fine', 'Monitor if you have respiratory issues'],
  },
  'Moderate': {
    icon: '😐',
    general: 'Members of sensitive groups may experience health effects.',
    sensitive: 'Reduce prolonged outdoor exertion. Wear N95 mask if needed.',
    actions: ['Wear N95/N99 masks outdoors', 'Use air purifiers indoors', 'Keep windows closed'],
  },
  'Poor': {
    icon: '😷',
    general: 'Everyone may begin to experience health effects.',
    sensitive: 'Avoid all outdoor exertion. Stay indoors.',
    actions: ['Avoid outdoor activities', 'Use air purifiers (HEPA)', 'Wear N99 masks', 'Seek medical advice if symptomatic'],
  },
  'Very Poor': {
    icon: '🚨',
    general: 'Health alert: everyone may experience serious health effects.',
    sensitive: 'Remain indoors with windows shut. Seek medical attention if needed.',
    actions: ['Stay indoors 100%', 'Do not use fans (draws in outside air)', 'HEPA purifier on high', 'Consult doctor immediately if symptomatic'],
  },
  'Hazardous': {
    icon: '☠️',
    general: 'Health emergency! Entire population is at risk.',
    sensitive: 'Emergency health alert. Do not go outside.',
    actions: ['Emergency shelter-in-place', 'Seal windows with tape', 'Highest-rated respirators only', 'Immediate medical attention for symptoms'],
  },
};

// ------ Light Pollution Advisory ------
function getLightPollutionInfo(lux) {
  if (lux < 10)  return { label: 'Severe',   color: '#ff4444', tip: 'Extremely light-polluted. No stars visible. Use blackout curtains.' };
  if (lux < 30)  return { label: 'High',     color: '#ff7e00', tip: 'Milky Way barely visible. Limit outdoor lighting after 9 PM.' };
  if (lux < 60)  return { label: 'Moderate', color: '#ffff00', tip: 'Some stars visible. Use shielded, downward-facing lights.' };
  if (lux < 100) return { label: 'Low',      color: '#92d050', tip: 'Good night sky visibility. Maintain current lighting standards.' };
  return                { label: 'Minimal',  color: '#00e400', tip: 'Excellent dark sky. Ideal for astronomy.' };
}

// ------ AQI Source Breakdown (Residential removed) ------
const SOURCE_LABELS = ['Vehicle Traffic', 'Stubble Burning', 'Construction Dust', 'Industrial'];
const SOURCE_DATA   = [41, 25, 19, 15];
const SOURCE_COLORS = ['#4e9af1', '#ff7043', '#ffca28', '#ab47bc'];

// ------ 7-day stacked bar (Government, Residential removed) ------
const WEEK_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WEEK_TRAFFIC     = [80, 95, 88, 102, 110, 70, 65];
const WEEK_STUBBLE     = [40, 38, 42, 45, 40, 35, 30];
const WEEK_CONSTRUCTION= [30, 32, 28, 35, 38, 20, 15];
const WEEK_INDUSTRIAL  = [25, 28, 26, 30, 28, 20, 18];

// ------ Road Conditions — Biswa Bangla Sarani → UEM, New Town, Kolkata ------
// Source: kolkata_map.py ROUTE_SEGMENTS (realistic field data for this corridor)
const ROAD_CONDITIONS = [
  { from:[22.5800,88.4700], to:[22.5785,88.4715], road:'Biswa Bangla Sarani (Start)',    condition:'Good',   score:88, reason:'Freshly laid – near Eco Park junction' },
  { from:[22.5785,88.4715], to:[22.5770,88.4728], road:'Biswa Bangla Sarani (Mid-North)',condition:'Good',   score:84, reason:'Wide 6-lane arterial, smooth surface' },
  { from:[22.5770,88.4728], to:[22.5755,88.4742], road:'AA-I Connector Junction',        condition:'Medium', score:55, reason:'Wear near signalised junction' },
  { from:[22.5755,88.4742], to:[22.5740,88.4756], road:'AA-II Construction Stretch',     condition:'Bad',    score:18, reason:'Active construction – multiple potholes' },
  { from:[22.5740,88.4756], to:[22.5723,88.4768], road:'Sewerage Work Zone',             condition:'Bad',    score:14, reason:'Under repair – open trenches, diversions' },
  { from:[22.5723,88.4768], to:[22.5706,88.4782], road:'Mid-Route Patched Section',      condition:'Medium', score:52, reason:'Patched asphalt, uneven surface' },
  { from:[22.5706,88.4782], to:[22.5690,88.4797], road:'MAR (Major Arterial Road)',      condition:'Good',   score:80, reason:'MAR stretch – well-maintained surface' },
  { from:[22.5690,88.4797], to:[22.5672,88.4813], road:'Speed Breaker Zone (AA-III)',    condition:'Medium', score:58, reason:'Multiple speed breakers, minor crazing' },
  { from:[22.5672,88.4813], to:[22.5655,88.4830], road:'AA-III Waterlogged Patch',       condition:'Bad',    score:20, reason:'Waterlogging damage – potholes + subsidence' },
  { from:[22.5655,88.4830], to:[22.5638,88.4847], road:'Approaching Action Area III',    condition:'Medium', score:60, reason:'Partially resurfaced near IT hub' },
  { from:[22.5638,88.4847], to:[22.5620,88.4863], road:'UEM Approach Road',              condition:'Good',   score:82, reason:'Widened road near UEM campus' },
  { from:[22.5620,88.4863], to:[22.5600,88.4900], road:'UEM Campus Road',                condition:'Good',   score:90, reason:'Campus road – well maintained' },
];

// Map center for Leaflet (Kolkata New Town)
const MAP_CENTER_LAT  = 22.5700;
const MAP_CENTER_LNG  = 88.4800;
const MAP_ZOOM        = 14;
const START_MARKER    = { lat:22.5800, lng:88.4700, label:'START – Biswa Bangla Sarani' };
const END_MARKER      = { lat:22.5600, lng:88.4900, label:'END – UEM, Action Area III' };




// ------ AQI Heat Map — New Town, Kolkata ------
// Bad-road hotspots have higher AQI due to dust + traffic congestion
// Background: Kolkata New Town AQI typically 120–180 (Moderate-Unhealthy)
const AQI_HEATMAP_POINTS = [
  { lat:22.5800, lng:88.4700, aqi:145, area:'Biswa Bangla Sarani (Start)' },
  { lat:22.5777, lng:88.4721, aqi:138, area:'Biswa Bangla Sarani (Mid)' },
  { lat:22.5762, lng:88.4735, aqi:162, area:'AA-I Junction' },
  { lat:22.5747, lng:88.4749, aqi:195, area:'AA-II Construction Zone' },
  { lat:22.5731, lng:88.4762, aqi:210, area:'Sewerage Work Zone' },
  { lat:22.5714, lng:88.4775, aqi:168, area:'Mid-Route Patched Section' },
  { lat:22.5698, lng:88.4789, aqi:135, area:'MAR Stretch' },
  { lat:22.5681, lng:88.4805, aqi:155, area:'Speed Breaker Zone' },
  { lat:22.5663, lng:88.4821, aqi:188, area:'AA-III Waterlogged Patch' },
  { lat:22.5646, lng:88.4838, aqi:165, area:'Approaching AA-III' },
  { lat:22.5629, lng:88.4854, aqi:140, area:'UEM Approach Road' },
  { lat:22.5600, lng:88.4900, aqi:128, area:'UEM Campus Road' },
];


// ------ Construction Site Alerts ------
const CONSTRUCTION_SITES = [
  { id: 'CS-001', lat: 28.6490, lng: 77.1025, name: 'NH48 Widening Project',        currentAQI: 312, threshold: 200, status: 'ALERT',  contractor: 'XYZ Infra Pvt Ltd' },
  { id: 'CS-002', lat: 28.7000, lng: 77.2800, name: 'Shahdara Elevated Corridor',   currentAQI: 185, threshold: 200, status: 'OK',     contractor: 'ABC Constructions' },
  { id: 'CS-003', lat: 28.5500, lng: 77.2500, name: 'Badarpur Metro Extension',     currentAQI: 278, threshold: 200, status: 'ALERT',  contractor: 'Delhi Metro Rail Corp' },
  { id: 'CS-004', lat: 28.6100, lng: 77.0800, name: 'Dwarka Expressway Phase 2',    currentAQI: 156, threshold: 200, status: 'OK',     contractor: 'National Highways Auth' },
  { id: 'CS-005', lat: 28.5300, lng: 77.1800, name: 'Mehrauli Flyover Construction',currentAQI: 224, threshold: 200, status: 'ALERT',  contractor: 'PWD Delhi' },
];

// ------ Road Condition + AQI Prediction (Random Forest model output) ------
// Scenario: Hour=18 (PM peak), Rainfall=20mm, Traffic=4900vph, Travel=90min, Visibility=2km
// Source: road_prediction.py RandomForestRegressor
const ROAD_PREDICTION_DATA = {
  rainfallInput: 20,        // mm/day (monsoon-season rain)
  trafficInput: 98,         // % capacity (4900vph — near saturation)
  predictedCondition: 'Bad',
  predictedScore: 18,       // Weighted road quality index
  predictedAQI: 273,        // Random Forest output for this scenario
  confidencePercent: 84,
  breakdown: {
    rainfallImpact: 'Very High (20mm — active waterlogging, pothole formation)',
    trafficImpact: 'Critical (4900vph at 18:00 peak — maximum congestion)',
    recommendation: 'Deploy pumping units on AA-III waterlogged patch. Issue traffic advisory for Biswa Bangla Sarani corridor. Deploy rapid-repair asphalt to construction zones.',
  },
};

// ------ Pearson Correlation Matrix (from correlation_analysis.py output) ------
// Key correlations between traffic, rainfall, and indoor AQI
const CORRELATION_MATRIX = {
  labels: ['Hour', 'Rainfall', 'Traffic Vol', 'Travel Time', 'Visibility', 'Indoor AQI'],
  data: [
  //  Hour    Rain   Traffic  Travel  Visib   AQI
    [ 1.00,  -0.08,   0.62,   0.55,  -0.15,  0.58],  // Hour
    [-0.08,   1.00,  -0.41,  -0.38,  -0.52,  0.35],  // Rainfall
    [ 0.62,  -0.41,   1.00,   0.71,  -0.28,  0.76],  // Traffic Volume
    [ 0.55,  -0.38,   0.71,   1.00,  -0.24,  0.68],  // Avg Travel Time
    [-0.15,  -0.52,  -0.28,  -0.24,   1.00, -0.45],  // Visibility
    [ 0.58,   0.35,   0.76,   0.68,  -0.45,  1.00],  // Indoor AQI
  ],
};


// ------ Government Hotspot Zones ------
const HOTSPOT_ZONES = [
  { lat: 28.6300, lng: 77.3500, radius: 1800, aqi: 320, name: 'Anand Vihar',    source: 'Traffic + Industrial' },
  { lat: 28.5500, lng: 77.2500, radius: 1500, aqi: 280, name: 'Badarpur',       source: 'Traffic + Stubble' },
  { lat: 28.6490, lng: 77.1025, radius: 1200, aqi: 310, name: 'Dwarka (NH48)',  source: 'Construction Dust' },
  { lat: 28.7000, lng: 77.2800, radius: 1400, aqi: 260, name: 'Shahdara',       source: 'Industrial + Traffic' },
  { lat: 28.5800, lng: 77.3200, radius: 1000, aqi: 285, name: 'Mayur Vihar',    source: 'Traffic' },
];

// ------ Government Mitigation Recommendations ------
const GOVT_MITIGATIONS = [
  { priority: 'High',   action: 'Deploy water-sprinkler trucks on NH48 and Badarpur stretch to suppress construction dust' },
  { priority: 'High',   action: 'Impose odd-even vehicle restrictions in Anand Vihar and Shahdara zones (AQI > 300)' },
  { priority: 'High',   action: 'Issue stop-work notice to XYZ Infra Pvt Ltd (NH48 site, AQI 312)' },
  { priority: 'Medium', action: 'Install green anti-smog nets at all active construction sites' },
  { priority: 'Medium', action: 'Coordinate with Punjab/Haryana on stubble burning crackdown (22% source share)' },
  { priority: 'Medium', action: 'Increase frequency of mechanical sweeping on Ring Road and Mall Road' },
  { priority: 'Low',    action: 'Plant additional trees along Chandni Chowk corridor as long-term buffer' },
  { priority: 'Low',    action: 'Upgrade street-level AQI sensor network in Rohini and Dwarka' },
];

// ------ Admin: Users ------
const ADMIN_USERS = [
  { id: 1, name: 'Priya Kapoor',    email: 'priya@delhi.gov.in',    role: 'Government', status: 'Active',   lastLogin: '2026-03-27' },
  { id: 2, name: 'Arjun Sharma',   email: 'arjun@delhi.gov.in',    role: 'Government', status: 'Active',   lastLogin: '2026-03-27' },
  { id: 3, name: 'Riya Mehta',     email: 'riya@citizen.in',       role: 'Citizen',    status: 'Active',   lastLogin: '2026-03-26' },
  { id: 4, name: 'Dev Anand',      email: 'dev@citizen.in',        role: 'Citizen',    status: 'Inactive', lastLogin: '2026-03-20' },
  { id: 5, name: 'Sonia Gupta',    email: 'sonia@delhi.gov.in',    role: 'Government', status: 'Active',   lastLogin: '2026-03-25' },
  { id: 6, name: 'Rohit Verma',    email: 'rohit@citizen.in',      role: 'Citizen',    status: 'Active',   lastLogin: '2026-03-27' },
  { id: 7, name: 'Admin User',     email: 'admin@airwatch.in',     role: 'Admin',      status: 'Active',   lastLogin: '2026-03-28' },
];

// ------ Admin: System Alerts Log ------
const SYSTEM_ALERTS = [
  { time: '01:02', type: 'AQI Alert',       severity: 'Critical', message: 'NH48 site AQI crossed 300 threshold' },
  { time: '00:47', type: 'Road Alert',      severity: 'High',     message: 'New pothole reported: Badarpur Border (severe)' },
  { time: '00:15', type: 'AQI Alert',       severity: 'High',     message: 'Anand Vihar AQI reached 320 — Very Poor' },
  { time: '23:58', type: 'Construction',    severity: 'Critical', message: 'Mehrauli site AQI 224 — exceeds 200 limit' },
  { time: '23:30', type: 'Sensor Offline',  severity: 'Medium',   message: 'Sensor #DL-042 (Rohini) offline — reconnecting' },
  { time: '22:45', type: 'Road Alert',      severity: 'Medium',   message: 'Damage reported on NH48 stretch — patrol assigned' },
];
