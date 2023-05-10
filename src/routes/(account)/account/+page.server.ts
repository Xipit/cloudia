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
    },
    deleteUser: async ({ request, locals: { getSession, supabase} }) => {
        const formData = await request.formData();
        const email = formData.get('email') as string;
        
        const session = await getSession();

        if(email == session?.user.email){
            
            const { data, error } = await supabase.rpc('delete_user');

                /*
                    in supabase: 

                    CREATE or replace function delete_user()
                        returns void
                    LANGUAGE SQL SECURITY DEFINER
                    AS $$
                        --delete from public.profiles where id = auth.uid();
                        delete from auth.users where id = auth.uid();
                    $$;
                */

            throw redirect(303, '/');

        } else {
            console.log('Email: ' + email, 'user email: ' + session?.user.email);
            return(
                {
                    errors: [
                        { field: 'deleteAccountEmail', message: 'email is incorrect.' },
                    ],
                    data: {},
                    success: false,
                }
            );
        }




    }
}