export function getItem<T>(key: string): T | null {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    if (!value) return null;

    const parsedValue = JSON.parse(value);
    return parsedValue;
  }
  console.error("Store not found!");
  return null;
}

export function setItem<T>(key: string, value: T): boolean {
  if (typeof window !== "undefined") {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
    return true;
  }
  console.error("Store not found!");
  return false;
}

export const removeItem = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
    return true;
  }
  console.error("Store not found!");
  return false;
};

export const clear = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
    return true;
  }
  console.error("Store not found!");
  return false;
};
