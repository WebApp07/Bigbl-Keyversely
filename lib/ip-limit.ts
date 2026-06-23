const ipMap = new Map<string, { count: number; resetAt: number }>();

const LIMIT = 100;
const WINDOW = 60 * 1000;

export function checkIpLimit(ip: string) {
  const now = Date.now();

  const record = ipMap.get(ip);

  if (!record || record.resetAt < now) {
    ipMap.set(ip, {
      count: 1,
      resetAt: now + WINDOW,
    });
    return true;
  }

  record.count++;

  if (record.count > LIMIT) {
    return false;
  }

  return true;
}
