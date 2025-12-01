"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { redirect } from "next/navigation";

interface Data {
  password: string;
  email: string;
}

//TODO: need refacton the action to make it server action this is wrong
export function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Data>();
  async function loginAction(data: Data) {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (res.error) {
      setError("root", { message: "Invalid Credentials" });
      return;
    }

    redirect("/");
  }
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to Photosite</CardTitle>
          <CardDescription>
            Login
            {/*with your Apple or Google account*/}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(loginAction)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    {...register("password")}
                    type="password"
                    required
                  />
                </div>
                {errors.root?.message && (
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>{errors.root.message}</AlertTitle>
                  </Alert>
                )}
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
