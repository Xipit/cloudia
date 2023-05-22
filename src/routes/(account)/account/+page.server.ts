import { fail, redirect, type Actions } from '@sveltejs/kit';
import { error } from 'console';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: {supabase, getSession } }) => {
    const session = await getSession();

    // if user is not logged in, redirect to homepage
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
    updateSettings: async ({ request, locals }) => {
        const formData = await request.formData();
        const speedUnit = formData.get('speedUnit') as string;
        const temperatureUnit = formData.get('temperatureUnit') as string;

        const session = await locals.getSession();

        const { error:err } = await locals.supabase.from('settings').upsert({
            id: session?.user.id,
            temperature_unit: temperatureUnit,
            speed_unit: speedUnit
        });

        // error handling
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
    },
    deleteUser: async ({ request, url, locals: { getSession, supabase} }) => {
        const formData = await request.formData();
        const email = formData.get('email') as string;
        
        const session = await getSession();

        if(email == session?.user.email){
            
            /*
                execute database function through remote procedure call (rpc)

                function definition in supabase: 

                    CREATE or replace function delete_user()
                        returns void
                    LANGUAGE SQL SECURITY DEFINER
                    AS $$
                        --delete from public.profiles where id = auth.uid();
                        delete from auth.users where id = auth.uid();
                    $$;
            */
            const { data, error } = await supabase.rpc('delete_user');

            // invalidate client user session
            await supabase.auth.signOut();

        } else {
            // error handling
            return(
                {
                    errors: [
                        { 
                            field: 'deleteAccountEmail', 
                            message: 'email is incorrect.' 
                        },
                    ],
                    data: {},
                    success: false,
                }
            );
        }




    }
}