import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;
// Service role key pour bypasser RLS (côté serveur uniquement)
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

// Utiliser la clé de service si disponible (SSR), sinon la clé anon
const key = supabaseServiceKey || supabaseAnonKey;

export const supabase = createClient(supabaseUrl, key);

// Client spécifique pour les opérations publiques (côté client)
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);
