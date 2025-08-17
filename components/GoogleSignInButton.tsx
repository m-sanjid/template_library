import { signIn } from "next-auth/react";
import { GoogleIcon } from "./Icon";

export default function GoogleSignInButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="text-secondary flex w-full items-center justify-center gap-2 rounded-full border bg-black p-2 font-medium dark:bg-white"
    >
      <GoogleIcon />
      <span>Google</span>
    </button>
  );
}
