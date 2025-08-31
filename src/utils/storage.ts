export function saveToLocalStorage(key: string, value: object): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // noop
  }
}

export function loadFromLocalStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function clearLocalStorageKey(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // noop
  }
}

