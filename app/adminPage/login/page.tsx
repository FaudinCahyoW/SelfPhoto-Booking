"use client";

import { InputComponent } from "@/components/booking-component/InputComponent";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Login berhasil");

    router.push("/adminPage/dashboard");
  };

  return (
    <section>
      <form className="max-w-sm mx-auto border p-8 m-6" onSubmit={handleLogin}>
        <div className="mb-6">
          <InputComponent
            label="Email"
            id="email"
            type="text"
            name="email"
            placeholder="admin@test.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputComponent
            label="Password"
            id="password"
            type="password"
            name="password"
            placeholder="admin123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="rounded-xl w-32 p-1.5 cursor-pointer bg-green-400 hover:bg-green-700 transition-all duration-300 hover:scale-105"
        >
          Login
        </button>
      </form>
    </section>
  );
}
