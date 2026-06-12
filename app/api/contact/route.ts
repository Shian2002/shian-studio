import { NextRequest, NextResponse } from 'next/server';

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'x2938784260u@gmail.com';
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'SHIAN Studio <onboarding@resend.dev>';
const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;
const FORMSUBMIT_ENDPOINT =
  process.env.FORMSUBMIT_ENDPOINT ?? `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

// --- Types ---

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline?: string;
  message?: string;
  source?: string;
  pagePath?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  service?: string;
  caseStudy?: string;
}

interface ContactRecord extends ContactFormData {
  id: string;
  createdAt: string;
  ip: string;
}

// --- Helpers ---

function generateId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${random}`;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function validateBody(body: Record<string, unknown>): {
  valid: boolean;
  data?: ContactFormData;
  error?: string;
} {
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const projectType = typeof body.projectType === 'string' ? body.projectType.trim() : '';
  const budget = typeof body.budget === 'string' ? body.budget.trim() : '';

  if (!name) return { valid: false, error: 'name is required' };
  if (!email) return { valid: false, error: 'email is required' };
  if (!isValidEmail(email)) return { valid: false, error: 'invalid email format' };
  if (!projectType) return { valid: false, error: 'projectType is required' };
  if (!budget) return { valid: false, error: 'budget is required' };

  return {
    valid: true,
    data: {
      name,
      email,
      company: typeof body.company === 'string' ? body.company.trim() : undefined,
      projectType,
      budget,
      timeline: typeof body.timeline === 'string' ? body.timeline.trim() : undefined,
      message: typeof body.message === 'string' ? body.message.trim() : undefined,
      source: typeof body.source === 'string' ? body.source.trim() : undefined,
      pagePath: typeof body.pagePath === 'string' ? body.pagePath.trim() : undefined,
      utm_source: typeof body.utm_source === 'string' ? body.utm_source.trim() : undefined,
      utm_medium: typeof body.utm_medium === 'string' ? body.utm_medium.trim() : undefined,
      utm_campaign: typeof body.utm_campaign === 'string' ? body.utm_campaign.trim() : undefined,
      service: typeof body.service === 'string' ? body.service.trim() : undefined,
      caseStudy: typeof body.caseStudy === 'string' ? body.caseStudy.trim() : undefined,
    },
  };
}

// --- Rate Limiting (in-memory, per-instance) ---

const submissionTimestamps = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 submissions per window
const MAP_CLEANUP_THRESHOLD = 500; // cleanup when Map exceeds this size

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = submissionTimestamps.get(ip)?.filter(
    (t) => now - t < RATE_LIMIT_WINDOW
  ) ?? [];

  // Periodic cleanup to prevent memory leak
  if (submissionTimestamps.size > MAP_CLEANUP_THRESHOLD) {
    for (const [key, ts] of submissionTimestamps) {
      if (ts.every((t) => now - t >= RATE_LIMIT_WINDOW)) {
        submissionTimestamps.delete(key);
      }
    }
  }

  if (timestamps.length >= RATE_LIMIT_MAX) {
    return true;
  }

  submissionTimestamps.set(ip, [...timestamps, now]);
  return false;
}

function buildEmailBody(record: ContactRecord): string {
  return [
    `New contact form submission`,
    ``,
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    record.company ? `Company: ${record.company}` : null,
    `Project Type: ${record.projectType}`,
    `Budget: ${record.budget}`,
    record.timeline ? `Timeline: ${record.timeline}` : null,
    record.message ? `Message: ${record.message}` : null,
    ``,
    `--- Source Tracking ---`,
    record.source ? `Source URL: ${record.source}` : null,
    record.pagePath ? `Page Path: ${record.pagePath}` : null,
    record.utm_source ? `UTM Source: ${record.utm_source}` : null,
    record.utm_medium ? `UTM Medium: ${record.utm_medium}` : null,
    record.utm_campaign ? `UTM Campaign: ${record.utm_campaign}` : null,
    record.service ? `Service: ${record.service}` : null,
    record.caseStudy ? `Case Study: ${record.caseStudy}` : null,
    ``,
    `ID: ${record.id}`,
    `IP: ${record.ip}`,
    `Time: ${record.createdAt}`,
  ]
    .filter(Boolean)
    .join('\n');
}

// --- Email via Formspree ---

async function sendFormspreeNotification(record: ContactRecord): Promise<Response> {
  if (!FORMSPREE_ENDPOINT) {
    throw new Error('FORMSPREE_ENDPOINT is not configured');
  }

  return fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: record.name,
      email: record.email,
      company: record.company,
      projectType: record.projectType,
      budget: record.budget,
      timeline: record.timeline,
      message: record.message,
      source: record.source,
      pagePath: record.pagePath,
      utm_source: record.utm_source,
      utm_medium: record.utm_medium,
      utm_campaign: record.utm_campaign,
      service: record.service,
      caseStudy: record.caseStudy,
      submissionId: record.id,
      submittedAt: record.createdAt,
      clientIp: record.ip,
      _subject: `New Contact: ${record.name} - ${record.projectType}`,
    }),
  });
}

// --- Email via FormSubmit ---

async function sendFormSubmitNotification(record: ContactRecord): Promise<Response> {
  const payload = new URLSearchParams();
  payload.set('name', record.name);
  payload.set('email', record.email);
  payload.set('_replyto', record.email);
  payload.set('_subject', `New Contact: ${record.name} - ${record.projectType}`);
  payload.set('_template', 'table');
  payload.set('_captcha', 'false');
  payload.set('company', record.company ?? '');
  payload.set('projectType', record.projectType);
  payload.set('budget', record.budget);
  payload.set('timeline', record.timeline ?? '');
  payload.set('message', record.message ?? '');
  payload.set('source', record.source ?? '');
  payload.set('pagePath', record.pagePath ?? '');
  payload.set('utm_source', record.utm_source ?? '');
  payload.set('utm_medium', record.utm_medium ?? '');
  payload.set('utm_campaign', record.utm_campaign ?? '');
  payload.set('service', record.service ?? '');
  payload.set('caseStudy', record.caseStudy ?? '');
  payload.set('submissionId', record.id);
  payload.set('submittedAt', record.createdAt);
  payload.set('clientIp', record.ip);

  return fetch(FORMSUBMIT_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: payload.toString(),
  });
}

// --- Email via Resend ---

async function sendEmailNotification(record: ContactRecord): Promise<Response> {
  const emailBody = buildEmailBody(record);

  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [CONTACT_EMAIL],
      reply_to: record.email,
      subject: `New Contact: ${record.name} - ${record.projectType}`,
      text: emailBody,
    }),
  });
}

// --- Route Handler ---
// Deployment note: FormSubmit is the default no-signup, no-domain Gmail delivery path.
// Optional: set FORMSPREE_ENDPOINT or FORMSUBMIT_ENDPOINT to override the default.
// Resend is kept as a final fallback for future domain-verified email delivery.

export async function POST(request: NextRequest) {
  try {
    // Parse body
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    // Validate
    const { valid, data, error } = validateBody(body);
    if (!valid || !data) {
      return NextResponse.json(
        { success: false, error },
        { status: 400 }
      );
    }

    // Rate limit
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // Build record
    const id = generateId();
    const record: ContactRecord = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
      ip,
    };

    if (FORMSPREE_ENDPOINT) {
      const formspreeRes = await sendFormspreeNotification(record);
      if (!formspreeRes.ok) {
        const errText = await formspreeRes.text().catch(() => 'Unknown error');
        console.error('[Contact Form] Formspree API error:', formspreeRes.status, errText);
        return NextResponse.json(
          { success: false, error: 'Failed to send notification email. Please try again later.' },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, id });
    }

    const formSubmitRes = await sendFormSubmitNotification(record);
    if (formSubmitRes.ok) {
      return NextResponse.json({ success: true, id });
    }

    const formSubmitErrText = await formSubmitRes.text().catch(() => 'Unknown error');
    console.error('[Contact Form] FormSubmit API error:', formSubmitRes.status, formSubmitErrText);

    if (!process.env.RESEND_API_KEY) {
      console.error('[Contact Form] No email provider configured. Submission NOT delivered:', JSON.stringify(record, null, 2));
      return NextResponse.json(
        { success: false, error: 'Email service not configured. Please try again later.' },
        { status: 500 }
      );
    }

    const emailRes = await sendEmailNotification(record);
    if (!emailRes.ok) {
      const errText = await emailRes.text().catch(() => 'Unknown error');
      console.error('[Contact Form] Resend API error:', emailRes.status, errText);
      return NextResponse.json(
        { success: false, error: 'Failed to send notification email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
