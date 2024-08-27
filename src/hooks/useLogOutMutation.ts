import { useMutation,useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'

export const useLogOutMutation =() => {
    const router = useRouter();
const queryClient = useQueryClient();
    const Logout = async() => {
        try {
            const res  =await fetch("/api/auth/logout",{
                method:"POST",
             })
             const data= await res.json();
        if(!res.ok){
            throw new Error(data.error || "Something went wrong")
        } 
        return data;
        } 
        catch (error) {
            throw error;
        }
       
    }

    const{mutate, error, isError, isPending} = useMutation({
        mutationFn: Logout,
        onSuccess:()=>{
            toast.success("Logout Successfully")
            queryClient.invalidateQueries({queryKey:["authUser"]});
            router.push("/login")
        },
        onError: () => {
			toast.error("Logout failed");
		},
    })
    return {mutate, error, isError, isPending}
}