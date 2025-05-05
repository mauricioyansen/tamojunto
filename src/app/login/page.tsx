"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { RegisterData, registerSchema } from "@/lib/validations/registerSchema";
import { LoginData, loginSchema } from "@/lib/validations/signinSchema";
import { toast } from "sonner";

export default function Login() {
  const [tab, setTab] = useState("login");
  const router = useRouter();

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    control,
    reset,
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  async function onRegister(data: RegisterData) {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const response = await res.json();

      if (!res.ok) {
        toast.error(response.error || "Erro ao cadastrar.");
        return;
      }

      toast.success("Usuário cadastrado com sucesso!");
      reset();
      setTab("login");
    } catch (err) {
      toast.error("Erro inesperado. Tente novamente.");
    }
  }

  async function onLogin(data: LoginData) {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!res?.ok) {
        toast.error("Credenciais inválidas");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Erro inesperado ao fazer login:", error);
      toast.error("Erro inesperado. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2 relative overflow-hidden">
      {/* Mobile Bg Image */}
      <div className="lg:hidden fixed inset-0 -z-10 h-full min-h-screen">
        <Image
          src="/bg.png"
          alt="Imagem de fundo"
          fill
          className="object-fill"
          priority
        />
      </div>

      {/* Form Section */}
      <div className="flex flex-col pt-[68px] px-6 sm:px-12 lg:px-0 lg:pl-[91px] lg:pt-[68px] bg-white bg-opacity-90 lg:bg-opacity-100 lg:bg-white lg:rounded-none lg:m-0 lg:h-screen lg:overflow-y-auto m-7 rounded-2xl">
        <Image
          src="/logo.svg"
          alt="logo"
          width={190}
          height={40}
          className="mb-[30px] lg:mb-[50px] mx-auto lg:mx-0"
        />
        <Tabs value={tab} onValueChange={setTab} className="w-full max-w-md">
          <TabsList className="grid w-[211px] mx-auto lg:mx-0 max-w-xs grid-cols-2  mb-0 lg:mb-[18px]">
            <TabsTrigger value="login" className="text-xs font-medium">
              Entrar
            </TabsTrigger>
            <TabsTrigger value="register" className="text-xs font-medium">
              Cadastrar
            </TabsTrigger>
          </TabsList>

          {/* LOGIN */}
          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit(onLogin)}>
              <Card>
                <CardHeader>
                  <CardTitle className="font-bold text-2xl lg:text-[32px] mb-[18px]">
                    Entrar
                  </CardTitle>
                  <CardDescription className="text-xs lg:text-base">
                    Digite suas credenciais para entrar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label
                      htmlFor="email"
                      className="text-xs lg:text-base font-medium"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e-mail@website.com"
                      className="h-[51px] mt-3 mb-4 text-sm lg:text-base"
                      {...registerLogin("email")}
                    />
                    {loginErrors.email && (
                      <p className="text-red-500 text-sm font-medium">
                        {loginErrors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="password"
                      className="text-xs lg:text-base font-medium"
                    >
                      Senha
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="min. 8 caracteres"
                      className="h-[51px] mt-3 mb-4 text-sm lg:text-base"
                      {...registerLogin("password")}
                    />
                    {loginErrors.password && (
                      <p className="text-red-500 text-sm font-medium">
                        {loginErrors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-[30px]">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" className="size-5" />
                      <label
                        htmlFor="remember"
                        className="text-xs lg:text-base font-medium"
                      >
                        Lembrar
                      </label>
                    </div>
                    <p className="text-primary text-xs lg:text-base font-medium">
                      Esqueceu a senha?
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col w-full gap-4">
                  <Button
                    type="submit"
                    className="w-full h-[51px] text-sm lg:text-base font-medium"
                  >
                    Entrar
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-[51px] text-sm lg:text-base font-medium"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                  >
                    <Image
                      width={24}
                      height={24}
                      src="/google.svg"
                      alt="google icon"
                    />
                    Entrar com o Google
                  </Button>
                  <p className="text-xs lg:text-sm font-medium mt-2">
                    Ainda não tem conta?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("register")}
                      className="text-primary"
                    >
                      Assine Agora
                    </button>
                  </p>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>

          {/* REGISTER */}
          <TabsContent value="register">
            <form onSubmit={handleRegisterSubmit(onRegister)}>
              <Card>
                <CardHeader>
                  <CardTitle className="font-bold text-2xl lg:text-[32px] mb-[18px]">
                    Cadastrar
                  </CardTitle>
                  <CardDescription className="text-xs lg:text-base font-medium">
                    Digite um email e senha para se cadastrar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label
                      htmlFor="email"
                      className="text-xs lg:text-base font-medium"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e-mail@website.com"
                      className="h-[51px] mt-3 mb-4 text-sm lg:text-base"
                      {...registerRegister("email")}
                    />
                    {registerErrors.email && (
                      <p className="text-red-500 text-sm font-medium">
                        {registerErrors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="password"
                      className="text-xs lg:text-base font-medium"
                    >
                      Senha
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="min. 8 caracteres"
                      className="h-[51px] mt-3 mb-4 text-sm lg:text-base"
                      {...registerRegister("password")}
                    />
                    {registerErrors.password && (
                      <p className="text-red-500 text-sm font-medium">
                        {registerErrors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-xs lg:text-base font-medium"
                    >
                      Confirmar Senha
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Digite a mesma senha escolhida"
                      className="h-[51px] mt-3 mb-4 text-sm lg:text-base"
                      {...registerRegister("confirmPassword")}
                    />
                    {registerErrors.confirmPassword && (
                      <p className="text-red-500 text-sm font-medium">
                        {registerErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-[30px]">
                    <Controller
                      control={control}
                      name="terms"
                      render={({ field }) => (
                        <Checkbox
                          id="terms"
                          className="size-5"
                          checked={field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                        />
                      )}
                    />
                    <label
                      htmlFor="terms"
                      className="text-xs lg:text-sm font-medium"
                    >
                      Concordo com os{" "}
                      <span className="text-primary">Termos e Condições</span>
                    </label>
                  </div>
                  {registerErrors.terms && (
                    <p className="text-red-500 text-sm font-medium">
                      {registerErrors.terms.message}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-4 w-full">
                  <Button
                    type="submit"
                    className="w-full h-[51px] text-sm lg:text-base font-medium"
                  >
                    Cadastrar
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-[51px] text-sm lg:text-base font-medium"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                  >
                    <Image
                      width={24}
                      height={24}
                      src="/google.svg"
                      alt="google icon"
                    />
                    Entrar com o Google
                  </Button>
                  <p className="text-xs lg:text-sm font-medium mt-2">
                    Já tem conta?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("login")}
                      className="text-primary"
                    >
                      Entre aqui
                    </button>
                  </p>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop only - Side img and h1 */}
      <div className="hidden lg:flex relative items-center justify-center h-screen w-full overflow-hidden">
        <Image
          src="/bg.png"
          alt="Imagem de fundo"
          fill
          className="object-fill inset-0 -z-10"
          priority
        />
        <h1 className="text-5xl max-w-[500px] font-bold text-[#1B1D28] text-left px-8 leading-tight">
          A Revolução do Marketing por{" "}
          <span className="text-[#4FD8CD]">Influência</span>
        </h1>
      </div>
    </div>
  );
}
