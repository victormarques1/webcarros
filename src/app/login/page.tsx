"use client";

import Image from "next/image";
import logoImg from "../../assets/logo.svg";
import Link from "next/link";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório"),
  password: z.string().nonempty("O campo senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
      <Link href="/home" className="mb-6 max-w-sm w-full">
        <Image src={logoImg} alt="Logo do site" className="w-full" />
      </Link>

      <form
        className="bg-white max-w-xl w-full rounded-lg p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <Input
            type="email"
            placeholder="Digite seu email..."
            name="email"
            error={errors.email?.message}
            register={register}
          />
        </div>

        <div className="mb-3">
          <Input
            type="password"
            placeholder="Digite sua senha..."
            name="password"
            error={errors.password?.message}
            register={register}
          />
        </div>

        <button className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium">Acessar</button>
      </form>

      <Link href="/register">
       Ainda não possui uma conta? Cadastre-se
      </Link>
    </div>
  );
}
