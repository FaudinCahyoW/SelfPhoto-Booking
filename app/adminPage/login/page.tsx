"use client";

import { InputComponent } from "@/components/booking-component/InputComponent";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/schemas/loginSchema"; 

export default function LoginAdmin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Login Success");
    router.push("/adminPage/dashboard");
  };

  return (
    <section>
      <form className="max-w-sm mx-auto border p-8 m-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 flex flex-col gap-4">
          
          {/* Input Email */}
          <div>
            <InputComponent
              label="Email"
              id="email"
              type="text"
              placeholder="admin@test.com"
              {...register("email")}/>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Input Password */}
          <div>
            <InputComponent
              label="Password"
              id="password"
              type="password"
              placeholder="admin123"
              {...register("password")} />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

        </div>

        <button
          type="submit"
          disabled={isSubmitting} 
          className="rounded-xl w-32 p-1.5 cursor-pointer bg-green-400 hover:bg-green-700 disabled:bg-gray-300 transition-all duration-300 hover:scale-105"
        >
          {isSubmitting ? "Loading..." : "Login"}
        </button>
      </form>
    </section>
  );
}
