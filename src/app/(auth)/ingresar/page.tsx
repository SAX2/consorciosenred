"use client"

import React, { useState, useTransition } from 'react'
import Header from '../components/Header';
import Input from '../components/Input';
import auth from '@/lib/contents/auth.json'
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { login } from '../actions';

const page = () => {
  const [formData, setFormData] = useState({ email: "", password: "", username: "username" });
  const [isPending, startTransition] = useTransition();

  const handleChange = (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [type]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.password || !formData.username) return;

    startTransition(() => {
      login({
        password: formData.password,
        username: formData.username,
      });
    })
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
          {auth.login.inputs.map((item, index) => {
            return (
              <Input
                key={item.label + index}
                label={item.label}
                placeholder={item.placeholder}
                onChange={handleChange(item.type)}
              />
            );
          })}
          <Input
            disabled={isPending}
            key={"submit"}
            type="submit"
            value="Ingresar"
            className="!border-0 bg-green text-white font-medium cursor-pointer"
          />
          <div className='flex gap-2 flex-wrap'>
            <span className='text-text-grey'>{auth.login.register.page.title}</span>
            <Link href={auth.login.register.page.path} className='underline font-medium'>
              {auth.login.register.page.button}
            </Link>
          </div>
        </form>
        <Separator className='max-md:my-4'/>
        <div className='flex flex-col gap-2'>
          {auth.login.links.map(route => {
            return (
              <div className="flex gap-2 flex-wrap" key={route.page.path}>
                <span className="text-text-grey">{route.page.title}</span>
                <Link href={route.page.path} className="underline font-medium">
                  {route.page.button}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default page