import { supabase } from "./supabaseClient";

export const validadeCode = async (code: string): Promise<boolean> => {
    const { data: community, error: communityError } = await supabase
        .from('communities')
        .select('id')
        .eq('code', code)
        .single();

    if (communityError || !community) return false;

    return true;
}