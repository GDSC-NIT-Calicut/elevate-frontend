"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSideBar } from "@/components/ui/adminsidebar";
import { useAuth } from "@/components/common/AuthProvider";
import LoadingScreen from "@/components/ui/loading";

const Adminpanel = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !loading) {
      if (!isAuthenticated || user?.role !== 'admin') {
        console.log("Unauthorized access. User:", user);
        router.replace('/401');
      }
    }
  }, [isAuthenticated, user, loading, isMounted, router]);


  if (!isMounted || loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <AdminSideBar />
    </div>
  );
};

export default Adminpanel;