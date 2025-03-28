// src/utils/eventBus.ts

type EventCallback = (...args: any[]) => void;

/**
 * A simple event bus / subscription system
 */
class EventBus {
  private events: Map<string, EventCallback[]> = new Map();

  /**
   * Subscribe to an event
   * @param event Event name
   * @param callback Callback function
   * @returns Unsubscribe function
   */
  subscribe(event: string, callback: EventCallback): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    this.events.get(event)!.push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.events.get(event);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index !== -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  /**
   * Publish an event with data
   * @param event Event name
   * @param args Arguments to pass to callbacks
   */
  publish(event: string, ...args: any[]): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => callback(...args));
    }
  }

  /**
   * Remove all listeners for an event
   * @param event Event name
   */
  clear(event: string): void {
    this.events.delete(event);
  }

  /**
   * Clear all events
   */
  clearAll(): void {
    this.events.clear();
  }
}

// For cart specific events
class CartEventBus extends EventBus {
  // Add specialized cart events
  onItemAdded(callback: (item: any) => void): () => void {
    return this.subscribe("cart:itemAdded", callback);
  }

  onItemRemoved(callback: (itemId: string) => void): () => void {
    return this.subscribe("cart:itemRemoved", callback);
  }

  onQuantityChanged(
    callback: (itemId: string, quantity: number) => void
  ): () => void {
    return this.subscribe("cart:quantityChanged", callback);
  }

  onCartCleared(callback: () => void): () => void {
    return this.subscribe("cart:cleared", callback);
  }

  // Publish specialized cart events
  publishItemAdded(item: any): void {
    this.publish("cart:itemAdded", item);
  }

  publishItemRemoved(itemId: string): void {
    this.publish("cart:itemRemoved", itemId);
  }

  publishQuantityChanged(itemId: string, quantity: number): void {
    this.publish("cart:quantityChanged", itemId, quantity);
  }

  publishCartCleared(): void {
    this.publish("cart:cleared");
  }
}

// Create and export singleton instances
export const eventBus = new EventBus();
export const cartEvents = new CartEventBus();

// Helper hook for client-side components (can be used in React/Solid/Vue/etc.)
export function useEvent(event: string, callback: EventCallback) {
  let unsubscribe: (() => void) | null = null;

  // Setup on mount
  if (typeof window !== "undefined") {
    unsubscribe = eventBus.subscribe(event, callback);
  }

  // Return cleanup function
  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };
}
