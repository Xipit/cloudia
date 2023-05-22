import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals: { getSession, supabase } }) => {
    console.log('Ran Server Load');
    const session = await getSession();

    /*
        get user settings for every page 
        settings influence the view
    */
    const { data: settings } = session 
        ? await supabase
            .from('settings')
            .select('temperature_unit, speed_unit')
            .single()
        : { data: undefined };

    const { data: savedLocations } = await supabase
        .from('saved_locations')
        .select('*');

    return {
        session,
        settings,
        savedLocations
    }
}) satisfies LayoutServerLoad;
