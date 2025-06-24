"use client";

import { useSession } from "next-auth/react";
import { Link } from "next-view-transitions";
import React from "react";

const Logo = ({label}:{label?:string}) => {
  const { data: session } = useSession();
  const isAuthenticated = !!session;
  return <Link href={`${isAuthenticated ? "/home" : "/"}`}>
    <div className="flex items-center gap-2 font-bold">
      {/* <Image src="/logo.png" alt="Logo" width={32} height={32} />
       */}
       <div className="w-10 h-10 flex items-center justify-center">logo</div>
      {label}
    </div>
    </Link>;
};

export default Logo;
