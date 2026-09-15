import React, { createContext, useContext, useMemo, PropsWithChildren } from 'react';
import { usePersistedState } from '../hooks/usePersistedState';
import { StorageKeys } from '../storage/storage';
import { menuItemById } from '../data/menu';
import { CartLine, MenuItem, SubmittedRequest } from '../types';

export interface CartEntry {
  item: MenuItem;
  quantity: number;
  lineTotal: number;
}

interface OrderContextValue {
  lines: CartLine[];
  entries: CartEntry[];
  itemCount: number;
  total: number;
  hydrated: boolean;
  table: string;
  requests: SubmittedRequest[];
  setTable: (table: string) => void;
  quantityOf: (itemId: string) => number;
  addItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  submitRequest: () => SubmittedRequest | null;
}

interface StoredCart {
  table: string;
  lines: CartLine[];
}

const emptyCart: StoredCart = { table: 'Table 1', lines: [] };

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

function reference(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `SC-${digits}`;
}

export function OrderProvider({ children }: PropsWithChildren): React.JSX.Element {
  const [cart, setCart, hydrated] = usePersistedState<StoredCart>(
    StorageKeys.tableRequest,
    emptyCart,
  );
  const [requests, setRequests] = usePersistedState<SubmittedRequest[]>(
    StorageKeys.requestHistory,
    [],
  );

  const value = useMemo<OrderContextValue>(() => {
    const entries: CartEntry[] = cart.lines
      .map(line => {
        const item = menuItemById(line.itemId);
        if (!item) {
          return null;
        }
        return { item, quantity: line.quantity, lineTotal: item.price * line.quantity };
      })
      .filter((entry): entry is CartEntry => entry !== null);

    const total = entries.reduce((sum, entry) => sum + entry.lineTotal, 0);
    const itemCount = entries.reduce((sum, entry) => sum + entry.quantity, 0);

    return {
      lines: cart.lines,
      entries,
      itemCount,
      total,
      hydrated,
      table: cart.table,
      requests,
      setTable: table => setCart(previous => ({ ...previous, table })),
      quantityOf: itemId => cart.lines.find(line => line.itemId === itemId)?.quantity ?? 0,
      addItem: itemId =>
        setCart(previous => {
          const existing = previous.lines.find(line => line.itemId === itemId);
          if (existing) {
            return {
              ...previous,
              lines: previous.lines.map(line =>
                line.itemId === itemId ? { ...line, quantity: line.quantity + 1 } : line,
              ),
            };
          }
          return { ...previous, lines: [...previous.lines, { itemId, quantity: 1 }] };
        }),
      removeItem: itemId =>
        setCart(previous => ({
          ...previous,
          lines: previous.lines
            .map(line =>
              line.itemId === itemId ? { ...line, quantity: line.quantity - 1 } : line,
            )
            .filter(line => line.quantity > 0),
        })),
      clearCart: () => setCart(previous => ({ ...previous, lines: [] })),
      submitRequest: () => {
        if (entries.length === 0) {
          return null;
        }
        const request: SubmittedRequest = {
          id: `request-${Date.now()}`,
          reference: reference(),
          table: cart.table,
          createdAt: new Date().toISOString(),
          lines: entries.map(entry => ({
            name: entry.item.name,
            quantity: entry.quantity,
            price: entry.lineTotal,
          })),
          total,
        };
        setRequests(previous => [request, ...previous].slice(0, 20));
        setCart(previous => ({ ...previous, lines: [] }));
        return request;
      },
    };
  }, [cart, hydrated, requests, setCart, setRequests]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder(): OrderContextValue {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used inside OrderProvider');
  }
  return context;
}
