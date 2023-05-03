// AUTHENTICATION STUFF
import {
    PUBLIC_SUPABASE_ANON_KEY, 
    PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
    depends('supabase:auth');

    const supabase = createSupabaseLoadClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event: { fetch },
        serverSession: data.session
    });

    const { data: savedLocations } = await supabase
        .from('saved_locations')
        .select('*');

    const { data : { session } } = await supabase.auth.getSession();

    return { savedLocations, supabase, session };
}