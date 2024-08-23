import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface SignUpProps {
    email: string;
    username: string;
    fullname: string;
    password: string;
}

export const useSignUpMutation = () => {
    const queryClient = useQueryClient();

    const signUp = async ({ email, username, fullname, password }: SignUpProps) => {
        try {
            const response = await fetch("/api/auth/signup", { // Added leading slash
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, username, fullname, password }) // JSON.stringify is correct
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to create account");
            }

            return data;
        } catch (error) {
            throw error;
        }
    };

    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            toast.success("Account created successfully");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        }
    });

    return { mutate, isError, isPending, error };
};

export default useSignUpMutation;
