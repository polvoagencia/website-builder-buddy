// Utilities to capture UTM parameters and source context for FOHAT lead forms.

const STORAGE_KEY = "fohat:utms";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export function captureUtmsFromLocation(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const incoming: UtmParams = {};
    let hasAny = false;
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) {
        incoming[key] = value;
        hasAny = true;
      }
    }
    if (!hasAny) return;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(incoming));
  } catch {
    // ignore storage errors
  }
}

export function getStoredUtms(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function getPageContext() {
  if (typeof window === "undefined") {
    return { source_page: "", page_url: "" };
  }
  return {
    source_page: window.location.pathname,
    page_url: window.location.href,
  };
}

// Simple throttle to block rapid duplicate submissions of the same form kind.
const lastSubmitAt = new Map<string, number>();
export function canSubmit(kind: string, cooldownMs = 4000): boolean {
  const now = Date.now();
  const prev = lastSubmitAt.get(kind) ?? 0;
  if (now - prev < cooldownMs) return false;
  lastSubmitAt.set(kind, now);
  return true;
}

export function safeFileName(name: string): string {
  const cleaned = name
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "_")
    .replace(/_+/g, "_")
    .slice(-120);
  return cleaned || "arquivo";
}

export function attachmentPath(leadId: string, fileName: string): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}/${month}/${leadId}/${Date.now()}-${safeFileName(fileName)}`;
}
