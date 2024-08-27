import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/navigation'

import toast from "react-hot-toast";
interface LoginProps{ 
    username: string;
    password: string;

}
export const useLoginMutation=()=> {
    const router = useRouter();
    const queryClient = useQueryClient();
    const Login = async({username , password}:LoginProps)=>{
        try {
           const res= await fetch("/api/auth/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
           }) 
           const data= await res.json()
           if(!res.ok) throw new Error (data.error || "Something went wrong")
            return data;
        } catch (error) {
            throw error
        }
    }

    const {mutate , isError, isPending, error} = useMutation({
        mutationFn: Login,
        onSuccess:()=>{
            toast.success("Login successfully");
            queryClient.invalidateQueries({queryKey:["authUser"]})
            router.push('/')
        },
    });
    return {mutate, isError, isPending, error};

};
export default useLoginMutation;