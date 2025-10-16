"use client";

import dynamic from 'next/dynamic';
import { ProactivePayLogo } from "@/components/shared/logo";
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import the LoginForm with SSR turned off
const LoginForm = dynamic(() => import('@/components/auth/login-form').then(mod => mod.LoginForm), {
  ssr: false,
  loading: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-4 pt-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  ),
});


export function LoginPageClient() {
  return (
    <main className="flex min-h-full w-full flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <ProactivePayLogo className="mx-auto h-12 w-auto" />
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Your personal financial partner awaits.
          </p>
        </div>
        <LoginForm />
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <a href="#" className="font-medium text-primary hover:text-primary/90">
            Get started
          </a>
        </p>
      </div>
    </main>
  );
}
