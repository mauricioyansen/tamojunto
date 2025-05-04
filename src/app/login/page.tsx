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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Login schema
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

// Register schema
const registerSchema = z
  .object({
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "A senha precisa de pelo menos 8 caracteres"),
    confirmPassword: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: "Você precisa aceitar os termos" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

export default function Login() {
  const [tab, setTab] = useState("login");

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
        alert(response.error || "Erro ao cadastrar.");
        return;
      }

      alert("Usuário cadastrado com sucesso!");
      setTab("login");
    } catch (err) {
      alert("Erro inesperado. Tente novamente.");
    }
  }

  async function onLogin(data: LoginData) {
    console.log("Login data:", data);
    // Aqui você pode implementar o fetch para login
  }

  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="h-screen overflow-y-auto flex flex-col pt-[68px] pl-[91px]">
        <Image
          src="/logo.svg"
          alt="logo"
          width={190}
          height={40}
          className="mb-[50px]"
        />
        <Tabs value={tab} onValueChange={setTab} className="w-[406px]">
          <TabsList className="grid w-[211px] grid-cols-2 mb-[18px]">
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
                  <CardTitle className="font-bold text-[32px] mb-[18px]">
                    Entrar
                  </CardTitle>
                  <CardDescription className="text-base">
                    Digite suas credenciais para entrar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-base font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e-mail@website.com"
                      className="h-[61px] mt-3 mb-4"
                      {...registerLogin("email")}
                    />
                    {loginErrors.email && (
                      <p className="text-red-500 text-sm font-medium">
                        {loginErrors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-base font-medium">
                      Senha
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="min. 8 caracteres"
                      className="h-[61px] mt-3 mb-4"
                      {...registerLogin("password")}
                    />
                    {loginErrors.password && (
                      <p className="text-red-500 text-sm font-medium">
                        {loginErrors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-[30px] justify-between">
                    <div className="flex size-5 items-center">
                      <Checkbox id="remember" className="size-5" />
                      <label
                        htmlFor="remember"
                        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-[10px]"
                      >
                        Lembrar
                      </label>
                    </div>
                    <p className="text-primary text-sm font-medium">
                      Esqueceu a senha?
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col w-full gap-4">
                  <Button
                    type="submit"
                    className="w-full h-[51px] text-base font-medium"
                  >
                    Entrar
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-[51px] text-base font-medium"
                  >
                    <Image
                      width={24}
                      height={24}
                      src="/google.svg"
                      alt="google icon"
                    />
                    Entrar com o Google
                  </Button>
                  <p className="text-sm font-medium mt-2">
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
                  <CardTitle className="font-bold text-[32px] mb-[18px]">
                    Cadastrar
                  </CardTitle>
                  <CardDescription className="text-base font-medium">
                    Digite um email e senha para se cadastrar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-base font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e-mail@website.com"
                      className="h-[61px] mt-3 mb-4"
                      {...registerRegister("email")}
                    />
                    {registerErrors.email && (
                      <p className="text-red-500 text-sm font-medium">
                        {registerErrors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-base font-medium">
                      Senha
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="min. 8 caracteres"
                      className="h-[61px] mt-3 mb-4"
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
                      className="text-base font-medium"
                    >
                      Confirmar Senha
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Digite a mesma senha escolhida"
                      className="h-[61px] mt-3 mb-4"
                      {...registerRegister("confirmPassword")}
                    />
                    {registerErrors.confirmPassword && (
                      <p className="text-red-500 text-sm font-medium">
                        {registerErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-[30px]">
                    <Checkbox id="terms" className="size-5" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Concordo com os{" "}
                      <span className="text-primary">Termos e Condições</span>
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 w-full">
                  <Button
                    type="submit"
                    className="w-full h-[51px] text-base font-medium"
                  >
                    Cadastrar
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-[51px] text-base font-medium"
                  >
                    <Image
                      width={24}
                      height={24}
                      src="/google.svg"
                      alt="google icon"
                    />
                    Entrar com o Google
                  </Button>
                  <p className="text-sm font-medium mt-2">
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

      <div className="relative flex items-center justify-center h-screen w-full">
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
