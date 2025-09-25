import type { agendaData } from "$lib";
import { supabase } from "./supabaseClient";

export const getAgenda = async (code: string): Promise<agendaData> => {
    const { data: community, error: communityError } = await supabase
        .from('communities')
        .select('id, name')
        .eq('code', code)
        .single();

    if (communityError || !community) return {name: '', agenda: []};

    const { data: agenda, error: agendaError } = await supabase
        .from('notices')
        .select('id, page, title, description, expire_at')
        .eq('community_id', community.id)
        .gte('expire_at', new Date().toISOString())
        .order('expire_at', { ascending: true });

    return agendaError || !agenda ? {name: '', agenda: []} : {name: community.name, agenda}
}