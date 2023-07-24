"use client";

import { useEffect } from "react";
import Image from "next/image";
import logoImg from "../../assets/logo.svg";
import Link from "next/link";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/services/firebaseConnection";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório"),
  password: z.string().nonempty("O campo senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }
    handleLogout();
  }, []);

  function onSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        console.log("Logado com sucesso");
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
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

        <button className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium">
          Acessar
        </button>
      </form>

      <Link href="/register">Ainda não possui uma conta? Cadastre-se</Link>
    </div>
  );
}
