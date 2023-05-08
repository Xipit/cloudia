import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load = (async ({ locals: {supabase, getSession } }) => {
    const session = await getSession();

    if(!session){
        throw redirect(303, '/');
    }

    return { session };
}) satisfies PageServerLoad;

// source: https://blog.skorp.io/reset-password-via-email-with-supabase-and-sveltekit

export const actions = {
    new_password: async (event:any) => {
        const { request, locals } = event;
        const { supabase, getSession } = locals;
        const session = await getSession();

        // user is logged in from the supabase reset password flow - from +layout.svelte onMount
        if (!session) {
            throw error(401, { message: 'not authorized' });
        }

        const data = await request.formData();
        const obj = Object.fromEntries(data);

        try {
            // supabase logged the user in, so we can change the users password
            const { data: user, error } = await supabase.auth.updateUser({
                password: obj.password as string,
            });

            if (error) {
                console.log('supa change pw error', error);
                return {
                    errors: [
                        { field: 'password', message: 'Something went wrong, cant update password' },
                    ],
                    data: {},
                    success: false,
                };
            }

            if (user) {
                throw redirect(302, '/');

                /*
                return {
                    data: user,
                    errors: [],
                    success: true,
                };
                */
            }
            
        } catch (error: any) {
            try {
                const { fieldErrors: errors } = error.flatten();
                console.log('catch error', errors);

                return {
                    errors: errors,
                    data: obj,
                    success: false,
                };
            } catch (error2) {
                console.log(error);
            }
        }
    },
};