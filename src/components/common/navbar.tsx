"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setShow(true);
      } else if (window.scrollY > lastScrollY) {
        setShow(false);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-transform duration-300
        backdrop-blur-md bg-white/70 border-b border-gray-200
        ${show ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold text-gray-900">
          Elevate NITC
        </Link>

        {/* Centered search bar */}
        <div className="flex-1 max-w-md mx-6">
          <Input type="text" placeholder="Search..." />
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          {/* Companies button as Link styled like Button */}
          <Link href="/companies" passHref legacyBehavior>
            <Button variant="outline" >
              Companies
            </Button>
          </Link>

          {/* Auth buttons */}
          {session ? (
            <Button variant="outline" onClick={() => signOut()}>
              Sign out
            </Button>
          ) : (
            <Button onClick={() => signIn("google")}>Sign in</Button>
          )}
        </div>
      </div>
    </nav>
  );
}
