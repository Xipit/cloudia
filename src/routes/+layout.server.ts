import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { getSession, supabase } }) => {
    console.log('Ran Server Load');
    const session = await getSession();

    const { data: settings } = session 
        ? await supabase
            .from('settings')
            .select('temperature_unit, speed_unit')
            .single()
        : { data: undefined };

    return {
        session,
        settings
    }
};
