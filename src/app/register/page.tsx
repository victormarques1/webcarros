"use client";

import { useEffect, useContext } from "react";
import Image from "next/image";
import logoImg from "../../assets/logo.svg";
import Link from "next/link";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório"),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .nonempty("O campo senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const { handleInfoUser } = useContext(AuthContext);
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

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name,
        });

        handleInfoUser({
          name: data.name, 
          email: data.email,
          uid: user.user.uid
        })
        
        console.log("Cadastrado");
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar esse usuário");
        console.log(error);
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
            type="text"
            placeholder="Digite seu nome completo..."
            name="name"
            error={errors.name?.message}
            register={register}
          />
        </div>

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
          Cadastrar
        </button>
      </form>

      <Link href="/login">Já possui uma conta? Faça o login</Link>
    </div>
  );
}
