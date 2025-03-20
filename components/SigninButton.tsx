import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const SigninButton = () => {
  return (
    <div className="flex gap-3 items-center">
      <Link href={"/login"}>
        <Button className="rounded-full">Login</Button>
      </Link>
      <Link href={"/signup"}>
        <Button variant={"secondary"} className="rounded-full">
          SignUp
        </Button>
      </Link>
    </div>
  );
};

export default SigninButton;
