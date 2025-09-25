import { codeTrue, emailTrue } from "$lib";
import { validateAdmin } from "$lib/server/validateAdmin";
import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request }: { request: Request }) => {
        const data = await request.formData();
        const email = (data.get('email') as string)?.toLowerCase().trim();
        
        if (!emailTrue(email)) {
            return { success: false, message: 'Formato de e-mail inválido' };
        }

        const code = (data.get('code') as string)?.toUpperCase().trim();

        if (!codeTrue(code)) {
            return { success: false, message: 'Formato de código inválido' };
        }

        if (!email || !code) {
            return { success: false, message: 'Por favor, preencha todos os campos.' };
        }

        const isValid = await validateAdmin(email, code);

        if (!isValid) {
            return { success: false, message: 'Código de convite inválido ou expirado.' };
        }

        redirect(301, "/admin");
    }
}