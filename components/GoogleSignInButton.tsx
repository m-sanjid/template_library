import { signIn } from "next-auth/react";
import { GoogleIcon } from "./Icon";

export default function GoogleSignInButton() {
	return (
		<button
			onClick={() => signIn("google")}
			className="w-full bg-black dark:bg-white text-secondary font-medium flex justify-center items-center gap-2 p-2 border rounded-md"
		>
			<GoogleIcon />
			<span>Google</span>
		</button>
	);
}
