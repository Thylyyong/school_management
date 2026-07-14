// authService.js
// Prototype auth layer for EduManager Pro.
// IMPORTANT: For real security you need a backend.
// This uses salted hashing in-browser and stores users in localStorage.

// Browser-safe hashing using Web Crypto.
const USERS_KEY = 'edu_users_v1';


function bufToHex(buffer) {
  return [...new Uint8Array(buffer)].map(b => b.toString(16).padStart(2, '0')).join('');
}

// Pure-JS SHA-256 (used when crypto.subtle is unavailable, e.g. served over
// http on a LAN IP which is a non-secure context). Keeps hashes consistent.
function sha256Js(str) {
  const rotr = (x, n) => (x >>> n) | (x << (32 - n));
  const K = [
    0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
    0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
    0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
    0xa2bfe8a1,0xa81a664b,0xbef9a3f7,0xc6ba4a93,0xc24b8b70,0xd0f8938c,0xe19ad8ae,0xe3b0c442,
    0x0fe1edc5,0xf0f1e563,0x1e9e0c8f,0xcb612188,0x1c9d8e5a,0x4f7e16c8,0x672b8f88,0x715c6cae,
    0xb7715fb6,0x8e1a3790,0xfd9e1b3f,0x8ce6ed20,0x6927e6f6,0x6a6b6f18,0x689bc6b8,0x7076c8ba,
    0xa4506ceb,0xbef9a3f7,0xc67178f2,0xca273ece,0xd186b8c7,0xeada7dd6,0xf57d4f7f,0x06f067aa,
    0x72176fba,0x0a637dc5,0xa2c898a6,0xbef90dae,0xc67178f2,0xca273ece,0xd186b8c7,0xeaa127fa,
    0x14adf0ab,0x57aed329,0x9af6d4a5,0xcc9b1d65,0x1e9e0c8f,0xcb612188,0x1c9d8e5a,0x4f7e16c8
  ];
  const utf8 = unescape(encodeURIComponent(str));
  let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
  let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
  const msg = [];
  for (let i = 0; i < utf8.length; i++) msg.push(utf8.charCodeAt(i));
  msg.push(0x80);
  while (msg.length % 64 !== 56) msg.push(0);
  const bitLen = utf8.length * 8;
  for (let i = 7; i >= 0; i--) msg.push((bitLen >>> (i * 8)) & 0xff);
  for (let off = 0; off < msg.length; off += 64) {
    const w = new Array(64);
    for (let i = 0; i < 16; i++) {
      w[i] = (msg[off + i * 4] << 24) | (msg[off + i * 4 + 1] << 16) | (msg[off + i * 4 + 2] << 8) | msg[off + i * 4 + 3];
    }
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
    }
    let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;
    for (let i = 0; i < 64; i++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const t1 = (h + S1 + ch + K[i] + w[i]) | 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const t2 = (S0 + maj) | 0;
      h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    h0 = (h0 + a) | 0; h1 = (h1 + b) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0;
    h4 = (h4 + e) | 0; h5 = (h5 + f) | 0; h6 = (h6 + g) | 0; h7 = (h7 + h) | 0;
  }
  return [h0, h1, h2, h3, h4, h5, h6, h7].map(x => (x >>> 0).toString(16).padStart(8, '0')).join('');
}

function hasCryptoSubtle() {
  return typeof crypto !== 'undefined' && crypto.subtle && typeof crypto.subtle.digest === 'function';
}

async function sha256Hex(text) {
  if (hasCryptoSubtle()) {
    const data = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return bufToHex(hash);
  }
  return sha256Js(text);
}

async function hashPassword(password, salt) {
  // salt is part of the hash input
  return sha256Hex(`edumanager-pro:${salt}:${password}`);
}

function constantTimeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function ensureDefaultUsers() {
  // Always regenerate defaults so login works reliably even if localStorage is stale/corrupted.
  const defaults = [
    { role: 'admin', idUser: 'A-100', password: 'Admin@123' },
    { role: 'teacher', idUser: 'T-200', password: 'Teacher@123' },
    { role: 'student', idUser: 'S-300', password: 'Student@123' },
  ];

  const now = Date.now();
  const users = [];
  for (const u of defaults) {
    const salt = bufToHex(new Uint8Array(16).map((_, i) => (i * 31 + now) % 256));
    const passwordHash = await hashPassword(u.password, salt);
    users.push({
      role: u.role,
      idUser: u.idUser,
      passwordHash,
      salt,
      createdAt: now,
    });
  }

  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // ignore write failures (private mode etc.)
  }

  return users;
}

export async function loginWithIdUserAndPassword({ role, idUser, password }) {
  if (!role || !idUser || !password) {
    return { ok: false, error: 'Missing credentials.' };
  }

  const users = await ensureDefaultUsers();
  const match = users.find(u => u.role === role && u.idUser === idUser);
  if (!match) {
    return { ok: false, error: 'Invalid ID or password.' };
  }

  const attempted = await hashPassword(password, match.salt);
  const ok = constantTimeEqual(attempted, match.passwordHash);
  if (!ok) return { ok: false, error: 'Invalid ID or password.' };

  // Return a minimal auth payload
  return {
    ok: true,
    session: {
      role,
      idUser,
    }
  };
}

export function clearSession() {
  sessionStorage.removeItem('edu_session_v1');
}

export function getSession() {
  const raw = sessionStorage.getItem('edu_session_v1');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setSession(session) {
  sessionStorage.setItem('edu_session_v1', JSON.stringify(session));
}

