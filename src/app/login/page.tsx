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
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [tab, setTab] = useState("login");

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
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="font-bold text-[32px] mb-[18px]">
                  Entrar
                </CardTitle>
                <CardDescription>
                  Digite suas credenciais para entrar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="e-mail@website.com"
                    className="h-[61px] mt-3 mb-4"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    placeholder="min. 8 caracteres"
                    className="h-[61px] mt-3 mb-4"
                  />
                </div>

                <div className="flex items-center space-x-2 mt-[30px] justify-between">
                  <div>
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-[10px]"
                    >
                      Lembrar
                    </label>
                  </div>
                  <div>
                    <p className="text-primary text-sm font-medium">
                      Esqueceu a senha?
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col w-full gap-4">
                <Button className="w-full h-[51px]">Entrar</Button>
                <Button variant={"outline"} className="w-full h-[51px]">
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
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="font-bold text-[32px] mb-[18px]">
                  Cadastrar
                </CardTitle>
                <CardDescription>
                  Digite um email e senha para se cadastrar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e-mail@website.com"
                    className="h-[61px] mt-3 mb-4"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="min. 8 caracteres"
                    className="h-[61px] mt-3 mb-4"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password2">Confirmar Senha</Label>
                  <Input
                    id="password2"
                    type="password"
                    placeholder="Digite a mesma senha escolhida"
                    className="h-[61px] mt-3 mb-4"
                  />
                </div>
                <div className="flex items-center space-x-2 mt-[30px]">
                  <Checkbox id="terms" />
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
                <Button className="w-full h-[51px]">Cadastrar</Button>
                <Button variant={"outline"} className="w-full h-[51px]">
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
