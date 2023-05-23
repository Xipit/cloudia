// AUTHENTICATION STUFF
import {
    PUBLIC_SUPABASE_ANON_KEY, 
    PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = (async ({ fetch, data:serverData, depends }) => {
    depends('supabase:auth');

    // create supabase client for sveltekit client environment using the session on the server
    const supabase = createSupabaseLoadClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event: { fetch },
        serverSession: serverData.session
    });

    const { data : { session } } = await supabase.auth.getSession();

    const { settings, savedLocations } = serverData;

    return { savedLocations, supabase, session, settings };
}) satisfies LayoutLoad;