// packages
import { createClient } from '@supabase/auth-helpers-sveltekit';

// env
import { PUBLIC_SUPABASE_PROJECT_ID } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

const supabaseClient = createClient(
	`https://${PUBLIC_SUPABASE_PROJECT_ID}.supabase.co`,
	SUPABASE_SERVICE_ROLE_KEY,
);

if (!supabaseClient) throw new Error('Supabase client cannot be undefined');

export default supabaseClient;
