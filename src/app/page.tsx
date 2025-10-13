import { LoginForm } from "@/components/auth/login-form";
import { ProactivePayLogo } from "@/components/shared/logo";

export default function LoginPage() {
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
