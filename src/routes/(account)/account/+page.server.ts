import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: {supabase, getSession } }) => {
    const session = await getSession();

    if(!session){
        throw redirect(303, '/');
    }

    const { data: settings } = await supabase
        .from('settings')
        .select('temperature_unit, speed_unit')
        .single();

    return { session, settings };
}) satisfies PageServerLoad;

export const actions:Actions = {
    update: async ({ request, locals }) => {
        const formData = await request.formData();
        const speedUnit = formData.get('speedUnit') as string;
        const temperatureUnit = formData.get('temperatureUnit') as string;

        const session = await locals.getSession();

        const { error:err } = await locals.supabase.from('settings').upsert({
            id: session?.user.id,
            temperature_unit: temperatureUnit,
            speed_unit: speedUnit
        });

        if(err){
            console.log(err);
            return fail(500, {
                temperatureUnit,
                speedUnit
            });
        }

        return {
            temperatureUnit,
            speedUnit
        };

        throw redirect(303, "/account"); // redirect to accountpage
    }
}