// src/utils/localStorage.ts

/**
 * Utility service for handling localStorage in Astro with TypeScript
 * Includes SSR safety checks and type safety
 */

// Type for storage items with optional expiry
interface StorageItem<T> {
  value: T;
  expiry?: number; // Unix timestamp in milliseconds
}

/**
 * Check if code is running in browser environment
 * This is needed for Astro's SSR to avoid localStorage errors
 */
const isBrowser = (): boolean => {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
};

/**
 * Set an item in localStorage with optional expiry time
 * @param key - Storage key
 * @param value - Value to store
 * @param expiryInMinutes - Optional expiry time in minutes
 */
export const setStorageItem = <T>(
  key: string,
  value: T,
  expiryInMinutes?: number
): void => {
  if (!isBrowser()) return;

  try {
    const item: StorageItem<T> = {
      value: value,
    };

    // Add expiry time if specified
    if (expiryInMinutes) {
      const now = new Date();
      item.expiry = now.getTime() + expiryInMinutes * 60 * 1000;
    }

    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(`Error setting localStorage item "${key}":`, error);
  }
};

/**
 * Get an item from localStorage with type safety
 * @param key - Storage key
 * @param defaultValue - Default value to return if item doesn't exist
 * @returns The stored value or defaultValue if not found or expired
 */
export const getStorageItem = <T>(key: string, defaultValue: T): T => {
  if (!isBrowser()) return defaultValue;

  try {
    const itemStr = localStorage.getItem(key);

    // Return default value if item doesn't exist
    if (!itemStr) return defaultValue;

    const item: StorageItem<T> = JSON.parse(itemStr);

    // Check if the item has expired
    if (item.expiry && new Date().getTime() > item.expiry) {
      localStorage.removeItem(key);
      return defaultValue;
    }

    return item.value;
  } catch (error) {
    console.error(`Error getting localStorage item "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Remove an item from localStorage
 * @param key - Storage key to remove
 */
export const removeStorageItem = (key: string): void => {
  if (!isBrowser()) return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage item "${key}":`, error);
  }
};

/**
 * Clear all items from localStorage
 */
export const clearStorage = (): void => {
  if (!isBrowser()) return;

  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

/**
 * Check if a storage item exists and is not expired
 * @param key - Storage key to check
 * @returns boolean indicating if item exists and is valid
 */
export const hasStorageItem = (key: string): boolean => {
  if (!isBrowser()) return false;

  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return false;

    const item: StorageItem<any> = JSON.parse(itemStr);

    // Check if item has expired
    if (item.expiry && new Date().getTime() > item.expiry) {
      localStorage.removeItem(key);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error checking localStorage item "${key}":`, error);
    return false;
  }
};
