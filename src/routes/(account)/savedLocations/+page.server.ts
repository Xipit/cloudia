import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals: {supabase, getSession } }) => {
    const session = await getSession();

    if(!session){
        throw redirect(303, '/');
    }

    const { data: savedLocations } = await supabase
        .from('saved_locations')
        .select('*');

    return { session, savedLocations };
}) satisfies PageServerLoad;


export const actions:Actions = {
    addLocation: async ({ request, locals }) => {
        const formData = await request.formData();
        const name = formData.get('locationName') as string;

        const session = await locals.getSession();

        let { error:err } = await locals.supabase
            .from('saved_locations')
            .insert({ 
                user_id: session?.user.id,
                location_name: name 
            });

        if(err){
            console.log(err);
            return fail(500, {
                name
            });
        }

        return { 
            name
        };
    },
    deleteLocation: async ({ request, locals }) => {
        const formData = await request.formData();
        const name = formData.get('locationName') as string;

        console.log(name);

        const session = await locals.getSession();

        let { error:err } = await locals.supabase
            .from('saved_locations')
            .delete()
            .eq("location_name", name);

        if(err){
            console.log(err);
            return fail(500, {
                name
            });
        }

        return { 
            name
        };
    }
}