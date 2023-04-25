import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    register: async ({ request, locals }) => {
        // get all data of the svelte form into an object
        const body = Object.fromEntries(await request.formData());

        const { data, error:err } = await locals.supabase.auth.signUp({
            email: body.email as string,
            password: body.password as string
        });

        if (err){
            if(err instanceof AuthApiError && err.status == 400) {
                return fail(400, {
                    error: 'Invalide E-Mail oder Passwort'
                });
            }
            
            return fail (500, {
                error: 'Server Fehler, Bitte versuchen Sie es später noch einmal'
            });
        }

        // everythings fine, no supabase errors here
        throw redirect(303, "/"); // redirect to homepage
    }
};