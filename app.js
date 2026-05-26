// ============================================================
// AirWatch — app.js  (shared utilities + auth)
// ============================================================

// ---- Credentials (replace with real auth when backend added) ----
const CREDENTIALS = {
  admin:   { email: 'admin@airwatch.in',  password: 'admin123',   redirect: 'admin.html'      },
  govt:    { email: 'govt@airwatch.in',   password: 'govt123',    redirect: 'government.html' },
  citizen: { email: 'citizen@airwatch.in',password: 'citizen123', redirect: 'citizen.html'    },
};

function handleLogin(role) {
  const emailEl = document.getElementById(`${role}-email`);
  const passEl  = document.getElementById(`${role}-pass`);
  const errEl   = document.getElementById(`${role}-error`);

  const cred = CREDENTIALS[role];
  if (emailEl.value.trim() === cred.email && passEl.value === cred.password) {
    sessionStorage.setItem('aw-role', role);
    window.location.href = cred.redirect;
  } else {
    errEl.textContent = 'Invalid credentials. Please try again.';
    errEl.style.display = 'block';
    emailEl.parentElement.classList.add('shake');
    setTimeout(() => emailEl.parentElement.classList.remove('shake'), 500);
  }
}

function logout() {
  sessionStorage.removeItem('aw-role');
  window.location.href = 'index.html';
}

// ---- Clock ----
function updateClock() {
  const el = document.getElementById('live-clock');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
setInterval(updateClock, 1000);
document.addEventListener('DOMContentLoaded', updateClock);

// ---- Date display ----
function setDateDisplay() {
  const el = document.getElementById('live-date');
  if (!el) return;
  el.textContent = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}
document.addEventListener('DOMContentLoaded', setDateDisplay);

// ---- Sidebar active link ----
function setActiveNav() {
  const page = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === page) link.classList.add('active');
  });
}
document.addEventListener('DOMContentLoaded', setActiveNav);

// ---- AQI color helper ----
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function aqiGradientColor(value) {
  // Returns CSS color string matching AQI severity
  if (value <= 50)  return '#00e400';
  if (value <= 100) return '#92d050';
  if (value <= 200) return '#ffff00';
  if (value <= 300) return '#ff7e00';
  if (value <= 400) return '#ff0000';
  return '#8f3f97';
}

// ---- Animated number counter ----
function animateCounter(el, target, duration = 1200, decimals = 0) {
  const start = 0;
  const step = (target / duration) * 10;
  let current = start;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toFixed(decimals);
    if (current >= target) clearInterval(timer);
  }, 10);
}

// ---- Road condition color ----
function roadConditionStyle(condition) {
  switch (condition) {
    case 'Good':   return { color: '#00e400', icon: '✅' };
    case 'Medium': return { color: '#ffca28', icon: '⚠️' };
    case 'Bad':    return { color: '#ff4444', icon: '🚨' };
    default:       return { color: '#888',    icon: '❓' };
  }
}

// ---- Priority badge color ----
function priorityColor(priority) {
  switch (priority) {
    case 'High':   return '#ff4444';
    case 'Medium': return '#ffca28';
    case 'Low':    return '#00e400';
    default:       return '#888';
  }
}

// ---- Severity badge color ----
function severityColor(severity) {
  switch (severity) {
    case 'Critical': return '#8f3f97';
    case 'High':     return '#ff4444';
    case 'Medium':   return '#ffca28';
    case 'Low':      return '#00e400';
    default:         return '#888';
  }
}

// ---- Light pollution info ----
// (also defined in data.js; this version usable standalone)
function lightPollutionClass(lux) {
  if (lux < 10)  return { label: 'Severe',   color: '#ff4444' };
  if (lux < 30)  return { label: 'High',     color: '#ff7e00' };
  if (lux < 60)  return { label: 'Moderate', color: '#ffff00' };
  if (lux < 100) return { label: 'Low',      color: '#92d050' };
  return               { label: 'Minimal',   color: '#00e400' };
}
