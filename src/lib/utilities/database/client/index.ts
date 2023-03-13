// packages
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

// env
import {
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SUPABASE_PROJECT_ID,
} from '$env/static/public';

const supabaseClient = createBrowserSupabaseClient(
	`https://${PUBLIC_SUPABASE_PROJECT_ID}.supabase.co`,
	PUBLIC_SUPABASE_ANON_KEY
);

if (!supabaseClient) throw new Error('Supabase client cannot be undefined');

export default supabaseClient;
