import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    login: async ({ request, locals }) => {
        // get all data of the svelte form into an object
        const body = Object.fromEntries(await request.formData());

        const { data, error:err } = await locals.supabase.auth.signInWithPassword({
            email: body.email as string,
            password: body.password as string
        });

        // error handling
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

        // redirect to loading page, with a redirect to the homepage when authentication is finished
        throw redirect(303, "/logging-in?redirect=/");
    }

};