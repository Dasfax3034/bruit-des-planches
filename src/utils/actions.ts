"use server";

import { revalidatePath } from "next/cache";

export async function newsletterInscr(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;

    if (!email) {
        throw new Error("Email is required");
    }

    try {
        const response = await fetch(
            `${process.env.BUTTONDOWN_API_URL}/subscribers/`,
            {
                method: "POST",
                headers: {
                    Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to subscribe to newsletter");
        }

        revalidatePath("/");

        return { result: "success", message: "Inscription réussie !" };
    } catch (error) {
        console.error("Error during newsletter signup:", error);
        const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite.";
        return { result: "error", message: errorMessage };
    }
}