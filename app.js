// ============================================================
// AirWatch — app.js  (shared utilities + auth)
// ============================================================

// ---- Supabase Configuration ----
const SUPABASE_URL = 'https://twolhlkigplkhnqcfftx.supabase.co'; // Your URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3b2xobGtpZ3Bsa2hucWNmZnR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MDc3MzEsImV4cCI6MjA5NTM4MzczMX0.zU8sZiUydaCWYDiuPu7dw-vOnFzggSbRA8cI1DOzBCk'; // Paste your key here

const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const ROLE_CONFIG = {
  admin:   { redirect: 'admin.html' },
  govt:    { redirect: 'government.html' },
  citizen: { redirect: 'citizen.html' }
};

async function handleLogin(role, isSignUp = false) {
  const emailEl = document.getElementById(`${role}-email`);
  const passEl  = document.getElementById(`${role}-pass`);
  const errEl   = document.getElementById(`${role}-error`);
  
  const email = emailEl.value.trim();
  const password = passEl.value;

  errEl.style.display = 'none';

  if (!email || !password) {
    showError(errEl, emailEl, 'Please enter email and password.');
    return;
  }

  if (!supabaseClient) {
     showError(errEl, emailEl, 'Supabase credentials not configured. Please check app.js.');
     return;
  }

  try {
    if (isSignUp) {
      const { error } = await supabaseClient.auth.signUp({ email, password });
      if (error) throw error;
      alert('Account created! You can now sign in.');
      
    } else {
      // 1. Authenticate with Supabase
      const { data: authData, error: authError } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (authError) throw authError;

      // 2. Fetch role from database securely
      const { data: profileData, error: profileError } = await supabaseClient
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError) throw new Error("Could not verify user role.");

      // 3. Match HTML role tags to Database role tags
      const expectedDbRole = role === 'govt' ? 'government' : role;

      // 4. SUPERUSER CHECK: Proceed if their database role matches the portal, OR if they are an admin
      if (profileData.role === expectedDbRole || profileData.role === 'admin') {
        sessionStorage.setItem('aw-role', role);
        window.location.href = ROLE_CONFIG[role].redirect;
      } else {
        // Log them out immediately if they try to access a portal they don't have rights to
        await supabaseClient.auth.signOut();
        throw new Error(`Access Denied: You do not have permissions for the ${role} portal.`);
      }
    }
  } catch (error) {
    showError(errEl, emailEl, error.message || 'Authentication failed.');
  }
}

async function handleCitizenForgotPassword() {
  const emailEl = document.getElementById('citizen-email');
  const errEl = document.getElementById('citizen-error');
  const email = emailEl.value.trim();

  errEl.style.display = 'none';

  if (!email) {
    showError(errEl, emailEl, 'Please enter your email first to reset password.');
    return;
  }

  if (!supabaseClient) return;

  try {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email);
    if (error) throw error;
    alert('Password reset link sent to your email!');
  } catch (error) {
    showError(errEl, emailEl, error.message);
  }
}

function showError(errEl, inputEl, msg) {
  errEl.textContent = msg;
  errEl.style.display = 'block';
  if (inputEl) {
    inputEl.parentElement.classList.add('shake');
    setTimeout(() => inputEl.parentElement.classList.remove('shake'), 500);
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
  if (value <= 50)  return '#00e400';
  if (value <= 100) return '#92d050';
  if (value <= 200) return '#ffff00';
  if (value <= 300) return '#ff7e00';
  if (value <= 400) return '#ff0000';
  return '#8f3f97';
}

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

function roadConditionStyle(condition) {
  switch (condition) {
    case 'Good':   return { color: '#00e400', icon: '✅' };
    case 'Medium': return { color: '#ffca28', icon: '⚠️' };
    case 'Bad':    return { color: '#ff4444', icon: '🚨' };
    default:       return { color: '#888',    icon: '❓' };
  }
}

function priorityColor(priority) {
  switch (priority) {
    case 'High':   return '#ff4444';
    case 'Medium': return '#ffca28';
    case 'Low':    return '#00e400';
    default:       return '#888';
  }
}

function severityColor(severity) {
  switch (severity) {
    case 'Critical': return '#8f3f97';
    case 'High':     return '#ff4444';
    case 'Medium':   return '#ffca28';
    case 'Low':      return '#00e400';
    default:         return '#888';
  }
}

function lightPollutionClass(lux) {
  if (lux < 10)  return { label: 'Severe',   color: '#ff4444' };
  if (lux < 30)  return { label: 'High',     color: '#ff7e00' };
  if (lux < 60)  return { label: 'Moderate', color: '#ffff00' };
  if (lux < 100) return { label: 'Low',      color: '#92d050' };
  return               { label: 'Minimal',   color: '#00e400' };
}
