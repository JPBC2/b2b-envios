/**
 * Ledger Integration for B2B E-commerce
 * 
 * Central export for all ledger-related functionality.
 */

// Core config and types
export {
    ledgerConfig,
    Amount,
    AccountCode,
    LedgerId,
    type Account,
    type AccountType,
    type NormalBalance,
    type EntryStatus,
    type PartyType,
    type JournalEntry,
    type JournalLine,
} from './config';

// Chart of accounts
export { chartOfAccounts } from './accounts';

// Product commodities
export {
    commodities,
    getCommodity,
    getCommoditiesByCategory,
    categoryNames,
    defaultCurrency,
    type ProductCommodity
} from './commodities';

// Entry helpers
export {
    createPurchaseEntry,
    createSaleEntry,
    createPaymentEntry,
    createSupplierPaymentEntry
} from './entries';
