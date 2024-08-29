"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { ChangeEvent, FC, InputHTMLAttributes, PropsWithChildren, useState } from 'react'

interface InputProps extends PropsWithChildren {
  icon?: React.ReactElement;
  label?: string;
  orientation?: "icon-left" | "icon-right";
  cardInput?: boolean;
  selectDefaultValue?: string;
  selectValues?: {
    label?: string;
    arr: string[];
  }[];
  selectOnChange?: (value?: any) => void;
  error?: string;
  classNameContainer?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({
  cardInput = false,
  children,
  orientation,
  icon,
  label,
  selectDefaultValue,
  selectValues,
  error,
  selectOnChange,
  ...props
}) => {
  const [enabled, setEnabled] = useState<boolean>(false);

  const [cardNumber, setCardNumber] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ""); // Elimina caracteres no numéricos
    input = input.substring(0, 20); // Limita a 16 dígitos

    const formattedInput = input.match(/.{1,4}/g)?.join(" ") || ""; // Agrupa en bloques de 4
    setCardNumber(formattedInput);
  };

  const onClickPassword = () => {
    setEnabled((prevState) => !prevState);
  };

  const inputClassName = cn(
    "w-full p-2 px-3 rounded-lg placeholder:text-text-grey/50 text-black outline-none border border-outline dark:text-white dark:border-outline-dark outline-offset-0",
    props.className,
    icon && orientation === "icon-left" && "pl-8"
  );

  return (
    <div className={cn("flex flex-col gap-1 w-full", props.classNameContainer)}>
      {label && (
        <label
          className={cn(
            "text-sm font-medium text-black/75 px-2 dark:text-white/75",
            error && "text-red-600 dark:text-red-400"
          )}
        >
          {error ? error : label}
        </label>
      )}
      <div className="flex w-full rounded-md bg-black-sec items-center relative">
        {icon && orientation === "icon-left" && (
          <div className="absolute h-full flex items-center">
            <span className="pl-2 py-1">{icon}</span>
          </div>
        )}
        {cardInput && (
          <input
            {...props} // Extiende las props al input
            type="text"
            value={cardNumber}
            onChange={handleInputChange}
            placeholder="0000 0000 0000 0000 0000"
            maxLength={24} // Permite espacio entre los grupos
            className={cn(inputClassName, error && "!border-red-700")}
          />
        )}
        {!cardInput &&
          props.type != "select" &&
          props.type !== "text-area" &&
          props.type !== "children" &&
          props.type !== "currency" && (
            <input
              {...props}
              type={props.type === "password" && enabled ? "text" : props.type}
              className={cn(
                inputClassName,
                error &&
                  "outline-4 outline-red-600/15 dark:outline-red-600/30 border-red-600 dark:border-red-400"
              )}
            />
          )}
        {props.type === "text-area" && (
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange && props.onChange(e as any)}
            placeholder={props.placeholder}
            name={props.name}
            id=""
            className={cn(
              inputClassName,
              "max-h-[150px] h-auto resize-none",
              error &&
                "outline-4 outline-red-600/15 dark:outline-red-600/30 border-red-600 dark:border-red-400"
            )}
          ></textarea>
        )}
        {props.type === "select" && (
          <Select
            onValueChange={selectOnChange}
            defaultValue={selectDefaultValue}
          >
            <SelectTrigger
              className={cn(
                inputClassName,
                props.className,
                "bg-white dark:bg-black-app-bg border-outline dark:border-outline-dark"
              )}
            >
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-black-app-bg border-outline dark:border-outline-dark">
              {selectValues?.map((group, index) => {
                return (
                  <SelectGroup key={index + (group.label ?? "undf")}>
                    {group?.label && <SelectLabel />}
                    {group?.arr.map((item) => {
                      return (
                        <SelectItem
                          className="!hover:bg-grey"
                          key={item}
                          value={item}
                        >
                          {item}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                );
              })}
            </SelectContent>
          </Select>
        )}
        {props.type === "children" && children}
        {icon && orientation === "icon-right" && (
          <div className="absolute right-0 h-full flex items-center">
            <span className="pr-2 py-1">{icon}</span>
          </div>
        )}
        {props.type === "password" && (
          <button
            onClick={onClickPassword}
            type="button"
            className="absolute right-0 h-full flex items-center"
          >
            <span className="pr-2 py-1 text-text-grey">
              {enabled ? <IconEye /> : <IconEyeOff />}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Input