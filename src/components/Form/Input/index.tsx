"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { ChangeEvent, FC, InputHTMLAttributes, PropsWithChildren, useState } from 'react'
import { PatternFormat, PatternFormatProps, NumericFormatProps, NumericFormat } from 'react-number-format';

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
  classNameContainerInput?: string;
  patternProps?: PatternFormatProps;
  numericProps?: NumericFormatProps;
}

const inputClassName = (className?: string) => cn(
  "w-full p-2 px-3 rounded-lg placeholder:text-text-grey/50 text-black outline-none border border-outline dark:text-white dark:border-outline-dark outline-offset-0",
  className
);

export type InputType =  'text' | 'password' | 'textarea' | 'select' | 'number' | 'email' | 'tel' | 'date' | 'currency' | 'text-area' | 'pattern' | 'children';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: InputType
}

const InputNumeric = ({ props, error, numericProps }: { numericProps?: NumericFormatProps, error?: string; props: InputProps }) => {
  return (
    <NumericFormat
      {...numericProps}
      className={cn(inputClassName(props.className), error && "!border-red-700", "disabled:!ng-none")}
    />
  );
}

const InputPattern = ({ props, error, patternProps }: { patternProps?: PatternFormatProps, error?: string; props: InputProps }) => {
  return (
    <PatternFormat
      {...patternProps}
      format={patternProps?.format ?? ""}
      className={cn(inputClassName(props.className), error && "!border-red-700")}
    />
  );
}

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
  classNameContainerInput,
  patternProps,
  numericProps,
  ...props
}) => {
  const [enabled, setEnabled] = useState<boolean>(false);

  const onClickPassword = () => {
    setEnabled((prevState) => !prevState);
  };

  const noTextInput = ["select", "text-area", "children", "currency", "pattern", "number"]

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
      <div
        className={cn(
          "flex w-full rounded-md bg-black-sec items-center relative",
          classNameContainerInput
        )}
      >
        {icon && orientation === "icon-left" && (
          <div className="h-full flex items-center">
            <span className="pl-2 py-1">{icon}</span>
          </div>
        )}
        {props.type === "number" && (
          <InputNumeric
            props={props}
            error={error}
            numericProps={numericProps}
          />
        )}
        {props.type === "pattern" && (
          <InputPattern
            props={props}
            error={error}
            patternProps={patternProps}
          />
        )}
        {!noTextInput.includes(props.type ?? "select") && (
          <input
            {...props}
            type={props.type === "password" && enabled ? "text" : props.type}
            className={cn(
              inputClassName(props.className),
              error &&
                "outline-4 outline-red-600/15 dark:outline-red-600/30 border-red-600 dark:border-red-400"
            )}
          />
        )}
        {props.type === "text-area" && (
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              props.onChange && props.onChange(e as any)
            }
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
          <div className="h-full flex items-center">
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