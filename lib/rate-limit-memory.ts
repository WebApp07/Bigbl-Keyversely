type Record = {
  count: number;
  firstHit: number;
};

const store = new Map<string, Record>();

const WINDOW_MS = 15 * 60 * 1000; // 15 min
const MAX_REQUESTS = 10; // fast block threshold

export function memoryLoginLimit(key: string) {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing) {
    store.set(key, { count: 1, firstHit: now });
    return false;
  }

  // reset window
  if (now - existing.firstHit > WINDOW_MS) {
    store.set(key, { count: 1, firstHit: now });
    return false;
  }

  existing.count++;

  return existing.count > MAX_REQUESTS;
}
