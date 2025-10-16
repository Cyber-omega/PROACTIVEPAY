"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Fingerprint } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import React from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isBiometricLoading, setIsBiometricLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (values.email === "user@proactive.pay" && values.password === "password123") {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid credentials. Hint: user@proactive.pay / password123",
        });
        setIsLoading(false);
      }
    }, 1000);
  }

  const handleBiometricSignIn = async () => {
    setIsBiometricLoading(true);

    try {
      // 1. Check for WebAuthn support
      const isSupported = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      if (!isSupported) {
        toast({
          variant: "destructive",
          title: "Biometrics Not Supported",
          description: "Your browser or device does not support biometric authentication.",
        });
        setIsBiometricLoading(false);
        return;
      }
      
      // 2. Simulate a challenge from the server
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      // 3. Create the credential request
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge,
          rpId: window.location.hostname,
          allowCredentials: [], // In a real app, you'd provide credential IDs
          userVerification: "required",
        },
      });

      // 4. In a real app, you would send `credential` to your server for verification.
      // Here, we'll just simulate success.
      if (credential) {
        toast({
          title: "Biometric Login Successful",
          description: "Welcome back!",
        });
        router.push("/dashboard");
      } else {
        throw new Error("Credential creation failed.");
      }

    } catch (error) {
      console.error("Biometric authentication error:", error);
      let description = "An unknown error occurred.";
      if (error instanceof Error) {
        if (error.name === "NotAllowedError") {
          description = "Authentication was cancelled.";
        } else if (error.name === 'AbortError') {
          description = 'Authentication timed out.';
        } else {
          description = "Could not sign in with biometrics. Please try again or use your password.";
        }
      }
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description,
      });
    } finally {
        setIsBiometricLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
                <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <a href="#" className="text-sm font-medium text-primary hover:text-primary/90">
                        Forgot your password?
                    </a>
                </div>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading || isBiometricLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={handleBiometricSignIn} disabled={isLoading || isBiometricLoading}>
                <Fingerprint className="mr-2 h-4 w-4" />
                {isBiometricLoading ? "Verifying..." : "Sign in with biometrics"}
            </Button>
        </div>
      </form>
    </Form>
  );
}
