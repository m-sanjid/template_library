import { Link } from "next-view-transitions";
import React from "react";
import { Button } from "./ui/button";

const SigninButton = () => {
  return (
    <div className="mx-2 flex items-center gap-3">
      <Link href={"/login"}>
        <Button size="sm" className="rounded-full">
          Login
        </Button>
      </Link>
      <Link href={"/signup"}>
        <Button size="sm" variant={"secondary"} className="rounded-full">
          SignUp
        </Button>
      </Link>
    </div>
  );
};

export default SigninButton;
