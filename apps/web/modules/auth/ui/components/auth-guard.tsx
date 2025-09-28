"use client";

import React from "react";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import AuthLayout from "@/modules/auth/ui/layouts/auth-layout";
import { Loader } from "@workspace/ui/components/loader";
import SignInView from "@/modules/auth/ui/views/sign-in-view";

function AuthGuard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthLoading>
        <AuthLayout>
          <Loader />
        </AuthLayout>
      </AuthLoading>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <AuthLayout>
          <SignInView />
        </AuthLayout>
      </Unauthenticated>
    </>
  );
}

export default AuthGuard;
