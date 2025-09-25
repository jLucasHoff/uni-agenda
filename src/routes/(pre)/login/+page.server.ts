import { validadeCode } from "$lib/server/validateCode";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request }: { request: Request }) => {
        const data = await request.formData();
        const code = data.get("code")?.toString();

        if (!code) {
            return { success: false, message: "Code is required" };
        }

        const isValid = await validadeCode(code);

        if (!isValid) {
            return { success: false, message: "Invalid code" };
        }

        redirect(301, `agenda/${code}`);

        return { success: true, message: "Code is valid" };
    }
}