/**
 * Ledger Configuration & Initialization
 * 
 * Note: The full @openbancor/ledger library requires building.
 * This file provides the core types and setup for the e-commerce UI.
 * 
 * To use the full ledger library:
 * 1. cd C:\Users\apbar\Desktop\ledger\packages\typescript
 * 2. npm install
 * 3. npm run build
 */

// ═══════════════════════════════════════════════════════════════════
// Type Definitions (matching @openbancor/ledger)
// ═══════════════════════════════════════════════════════════════════

export type AccountType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
export type NormalBalance = 'debit' | 'credit';
export type EntryStatus = 'draft' | 'posted' | 'cancelled';
export type PartyType = 'customer' | 'supplier' | 'employee' | 'bank' | 'other';

export interface Account {
  code: string;
  name: string;
  type: AccountType;
  normalBalance: NormalBalance;
  parentCode?: string;
  active: boolean;
  description?: string;
  requiresParty?: boolean;
  requiresCommodity?: boolean;
  requiredDimensions?: string[];
}

export interface JournalLine {
  lineNumber: number;
  accountCode: string;
  debit: string;
  credit: string;
  commodity?: string;
  price?: string;
  priceCommodity?: string;
  quantity?: string;
  partyCode?: string;
  partyType?: PartyType;
  description?: string;
  dimensions?: Record<string, string>;
}

export interface JournalEntry {
  id: string;
  ledgerId: string;
  documentType: string;
  documentNumber: string;
  documentDate: string;
  postingDate: string;
  description: string;
  status: EntryStatus;
  lines: JournalLine[];
  createdAt: string;
}

// ═══════════════════════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════════════════════

export function Amount(value: string): string {
  return value;
}

export function AccountCode(code: string): string {
  return code;
}

export function LedgerId(id: string): string {
  return id;
}

// ═══════════════════════════════════════════════════════════════════
// Ledger Configuration
// ═══════════════════════════════════════════════════════════════════

export const ledgerConfig = {
  ledgerId: 'b2b-envios',
  defaultPrecision: 2,
  entityId: 'b2b-envios-cdmx',
  defaultCurrency: 'MXN',
  ivaRate: 0.16, // 16% Mexican VAT
};
