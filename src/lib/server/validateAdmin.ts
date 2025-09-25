import { supabase } from "./supabaseClient";

export const validateAdmin = async (email: string, code: string): Promise<boolean> => {
    const { data: community, error: communityError } = await supabase
        .from('communities')
        .select('id')
        .eq('code', code)
        .single();

    if (communityError || !community) return false;

    const { data: invite, error: inviteError } = await supabase
        .from('invites')
        .select('id')
        .eq('email', email)
        .eq('community_id', community.id)
        .single();

    if (inviteError || !invite) return false;

    return true;
}