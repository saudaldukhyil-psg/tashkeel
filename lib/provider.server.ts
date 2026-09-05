// Real model integration is server-only; the prototype deliberately stays deterministic.
// Configure TASHKEEL_PROVIDER_URL, TASHKEEL_PROVIDER_KEY and TASHKEEL_MODEL
// in a future authenticated server adapter. Never expose keys with NEXT_PUBLIC_.
import { localProvider, type AIProvider } from './engine';
export function getProvider():AIProvider { return localProvider; }
