import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
    console.log('Ran Server Load');
    return {
        session: await getSession()
    }
};