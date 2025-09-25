import { getAgenda } from "$lib/server/getAgenda";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const agenda = await getAgenda(params.code);
    return { agenda };
}
