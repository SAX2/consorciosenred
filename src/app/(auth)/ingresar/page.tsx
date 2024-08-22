"use client";

import React, { useState, useTransition } from 'react';
import Header from '../components/Header';
import auth from '@/lib/contents/auth.json';
import Link from 'next/link';
import Input from '@/components/Form/Input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { loginHandler } from '@/actions/auth';
import { z, ZodFormattedError } from 'zod';

// Definición del esquema con Zod
const LoginSchema = z.object({
  password: z.string().min(1, { message: "La contraseña no puede estar vacía." }),
  username: z.string().min(1, { message: "El nombre de usuario no puede estar vacío." }),
  saveData: z.boolean().default(false)
});

type FetchError = { fetchError: {
  _errors: string[];
} | undefined; }
type LoginFormValues = z.infer<typeof LoginSchema>;
type LoginFormErrors = ZodFormattedError<LoginFormValues>;

const Page = () => {
  const [formData, setFormData] = useState<LoginFormValues>({ password: "", username: "", saveData: false, });
  const [errors, setErrors] = useState<Partial<LoginFormErrors & FetchError>>({});
  const [isPending, startTransition] = useTransition();

  const handleChange = (type: keyof LoginFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [type]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = LoginSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
      console.log(formattedErrors);
      return;
    }

    startTransition(async () => {
      await loginHandler({
        password: formData.password,
        username: formData.username,
        save: formData.saveData,
      })
        .then((res) => {
          if (res.error) {
            throw new Error(res.error);
          }
        })
        .catch((error) => {
          setErrors({ fetchError: { _errors: error.message } })
        });
    });
  };

  return (
    <main className="w-full h-dvh p-8 max-md:p-4 flex max-md:flex-col gap-8 bg-white items-center justify-center">
      <div className="max-w-[500px] w-full p-8 max-md:p-0 flex flex-col gap-8 max-md:gap-4">
        <Header>
          <h1 className="font-semibold text-lg font-geist">
            {auth.login.title}
          </h1>
        </Header>
        <form
          action=""
          className="w-full flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          {auth.login.inputs.map((item, index) => (
            <Input
              type={item.type}
              key={item.label + index}
              label={item.label}
              placeholder={item.placeholder}
              onChange={handleChange(item.type as keyof LoginFormValues)}
              error={errors?.[item.type as keyof LoginFormValues]?._errors?.[0]}
            />
          ))}
          <Input
            disabled={isPending}
            key={"submit"}
            type="submit"
            value="Ingresar"
            className="!border-0 bg-green text-white font-medium cursor-pointer"
          />
          {errors.fetchError && (
            <label
              className={"text-sm font-medium text-red-600 dark:text-white/75"}>
              {errors.fetchError._errors}
            </label>
          )}
          <div className="flex items-center gap-2">
            <span className="text-text-grey">Guardar mis datos</span>
            <Switch
              checked={formData.saveData}
              onCheckedChange={() => setFormData((prev) => ({ ...prev, saveData: !prev.saveData }))}
              className="data-[state=checked]:bg-blue"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="text-text-grey">
              {auth.login.register.page.title}
            </span>
            <Link
              href={auth.login.register.page.path}
              className="underline font-medium"
            >
              {auth.login.register.page.button}
            </Link>
          </div>
        </form>
        <Separator className="max-md:my-4" />
        <div className="flex flex-col gap-2">
          {auth.login.links.map((route) => (
            <div className="flex gap-2 flex-wrap" key={route.page.path}>
              <span className="text-text-grey">{route.page.title}</span>
              <Link href={route.page.path} className="underline font-medium">
                {route.page.button}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
