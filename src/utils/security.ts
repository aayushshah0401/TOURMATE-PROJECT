/**
 * TourMate Security Utility Layer
 * Implements input validation, XSS sanitization, rate-limiting, prompt injection defenses,
 * and email enumeration protection per PRD Security Requirements (Sections 53-96).
 */

// XSS Sanitizer: Escape dangerous HTML characters
export function sanitizeHTML(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// AI Prompt Security Filter: Protects against prompt injection & credential leaks
export function sanitizeAIPrompt(prompt: string): string {
  if (!prompt) return '';
  
  // Remove potential script injection or system override attempts
  let sanitized = prompt
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '')
    .replace(/DROP TABLE|INSERT INTO|DELETE FROM/gi, '')
    .replace(/IGNORE SYSTEM INSTRUCTIONS|DISREGARD PREVIOUS RULES/gi, '[FILTERED_PROMPT]');

  return sanitized.trim().slice(0, 1000); // Enforce max 1000 char prompt limit
}

// Client-Side Rate Limiter for AI Requests
const requestTimestamps: number[] = [];
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

export function checkRateLimit(): { allowed: boolean; remainingMs?: number } {
  const now = Date.now();
  // Filter out timestamps older than 1 minute
  while (requestTimestamps.length > 0 && requestTimestamps[0] < now - RATE_LIMIT_WINDOW_MS) {
    requestTimestamps.shift();
  }

  if (requestTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldestTimestamp = requestTimestamps[0];
    const waitMs = RATE_LIMIT_WINDOW_MS - (now - oldestTimestamp);
    return { allowed: false, remainingMs: waitMs };
  }

  requestTimestamps.push(now);
  return { allowed: true };
}

// Email Validator
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password Strength Meter
export function evaluatePasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (!password) return { score: 0, label: 'Too Short', color: 'bg-slate-200' };

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 0:
    case 1:
      return { score: 1, label: 'Weak', color: 'bg-red-500' };
    case 2:
      return { score: 2, label: 'Fair', color: 'bg-amber-500' };
    case 3:
      return { score: 3, label: 'Good', color: 'bg-emerald-500' };
    case 4:
      return { score: 4, label: 'Strong', color: 'bg-emerald-600' };
    default:
      return { score: 0, label: 'Weak', color: 'bg-red-500' };
  }
}

// Generic Authentication Error (Email Enumeration Protection)
export const GENERIC_AUTH_ERROR = 'Invalid email or password. Please verify your credentials and try again.';
