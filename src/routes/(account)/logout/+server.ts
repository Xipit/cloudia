import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

// when posting to "/logout" this function gets executed
export const POST: RequestHandler = async ({ locals }) => {
    const { error:err } = await locals.supabase.auth.signOut();

    if(err){
        throw error(500, 'Etwas is beim Log-Out Vorgang falsch gelaufen');
    }

    throw redirect(303, "/");    
};