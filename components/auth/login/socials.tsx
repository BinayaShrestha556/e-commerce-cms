"use client"
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {signIn} from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";
export const Social =({admin}:{admin:boolean}) => {
  const params = useSearchParams()
  const callbackUrl=params.get("redirect")
    const onClick=(providers:"google"|"github")=>{

      const redirectUrl = Array.isArray(callbackUrl) ? callbackUrl[0] :callbackUrl || DEFAULT_LOGIN_REDIRECT;
       signIn(providers,{
        redirectTo:redirectUrl,
        redirect:!admin
       

       })

    }
    

  return (
    <div className="flex w-full gap-x-4">
  <Button
      type="button"
        variant={"outline"}
        className="flex-1 flex items-center gap-2"
        size="lg"
        onClick={()=>onClick("google")}
      >
        <FcGoogle className="h-5 w-5 " /> <p>Continue with google</p>
      </Button>
      <Button
      type="button"
        variant={"outline"}
        size="lg"
        className="flex-1 flex items-center gap-2"
        onClick={() => {onClick("github")}}
      >
        <FaGithub className="h-5 w-5" /> <p>Continue with github</p>
      </Button>
    </div>
  );
};
