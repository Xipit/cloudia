import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    sendRecovery: async ({ request, locals, url }) => {
        const body = Object.fromEntries(await request.formData());

        const { data, error:err } = await locals.supabase.auth.resetPasswordForEmail(
            body.email as string,
            {
                redirectTo: url.hostname + '/change-password'
            }
        );

        if (err){
            if(err instanceof AuthApiError && err.status == 400) {
                return fail(400, {
                    error: 'Invalide E-Mail'
                });
            }
            
            return fail (500, {
                error: 'Server Fehler, Bitte versuchen Sie es später noch einmal'
            });
        }

        return {
            email: body.email,
            success: true
        };
    }

};