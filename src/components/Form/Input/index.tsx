"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { Dispatch, FC, InputHTMLAttributes, PropsWithChildren, useState } from 'react'
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

export const inputClassName = (className?: string) => cn(
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
      className={cn(
        inputClassName(props.className),
        error && "!border-red-700",
        "disabled:!bg-none"
      )}
    />
  );
}

const InputPattern = ({ props, error, patternProps }: { patternProps?: PatternFormatProps, error?: string; props: InputProps }) => {
  return (
    <PatternFormat
      {...patternProps}
      format={patternProps?.format ?? ""}
      className={cn(
        inputClassName(props.className),
        error &&
          "!outline-4 !outline-red/5 dark:!outline-red-dark/20 !border-red dark:!border-red-dark"
      )}
    />
  );
}

const InputGeneric =  ({ props, error, enabled }: { enabled: boolean; error?: string; props: InputProps }) => {
  return (
    <input
      {...props}
      type={props.type === "password" && enabled ? "text" : props.type}
      className={cn(
        inputClassName(props.className),
        error &&
          "!outline-4 !outline-red/5 dark:!outline-red-dark/20 !border-red dark:!border-red-dark"
      )}
    />
  );
}

export const ButtonPassword = ({ onClickPassword, enabled }: { onClickPassword: Dispatch<React.SetStateAction<boolean>>; enabled: boolean }) => {
  return (
    <button
      onClick={() => onClickPassword(!enabled)}
      type="button"
      className="absolute right-0 h-full flex items-center"
    >
      <span className="pr-2 py-1 text-text-grey">
        {enabled ? <IconEye /> : <IconEyeOff />}
      </span>
    </button>
  );
}

export const Label = ({ label, children, classNameLabel, classname, error }: PropsWithChildren & { label: string, classNameLabel?: string, classname?: string, error?: string }) => {
  return (
    <div className={cn(classname)}>
      {label && (
        <label className={cn(classNameLabel, "text-text-grey mb-1 text-sm font-medium")}>
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-red dark:text-red-dark font-medium mt-1">{error}</p>}
    </div>
  );
}

export const InputTextArea = ({ error, ...props }: InputProps) => {
  return (
    <textarea
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
        props.onChange && props.onChange(e as any)
      }
      placeholder={props.placeholder}
      name={props.name}
      className={cn(
        inputClassName(props.className),
        "resize-none",
        error &&
          "!outline-4 !outline-red/5 dark:!outline-red-dark/20 !border-red dark:!border-red-dark"
      )}
    />
  );
};

export const InputSelect = ({
  error,
  selectOnChange,
  selectDefaultValue,
  selectValues,
  ...props
}: InputProps) => {
  return (
    <Select onValueChange={selectOnChange} defaultValue={selectDefaultValue}>
      <SelectTrigger
        className={cn(
          inputClassName(props.className),
          "bg-white dark:bg-black-app-bg border-outline dark:border-outline-dark"
        )}
      >
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-black-app-bg border-outline dark:border-outline-dark">
        {selectValues?.map((group, index) => {
          return (
            <SelectGroup key={index + (group.label ?? "undf")}>
              {group?.label && <SelectLabel className='text-black'/>}
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
  );
};

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

  const renderInput = () => {
    if (props.type === "pattern") return <InputPattern props={props} error={error} patternProps={patternProps} />
    if (props.type === "number") return <InputNumeric props={props} error={error} numericProps={numericProps} />
    if (props.type === "text-area" || props.type === 'textarea') return <InputTextArea {...props} error={error} />
    if (props.type === "select")
      return (
        <InputSelect
          {...props} selectOnChange={selectOnChange} selectDefaultValue={selectDefaultValue} selectValues={selectValues}
        />
      );
    return <InputGeneric props={props} error={error} enabled={enabled} />
  }

  const renderIcon = ({ classNameSpan }: {classNameSpan: string}) => {
    return (
      <div className="h-full flex items-center">
        <span className={cn(classNameSpan, "py-1")}>{icon}</span>
      </div>
    );
  }

  return (
    <Label
      classname={cn("flex flex-col gap-1 w-full", props.classNameContainer)}
      label={label ?? ""}
      error={error}
    >
      <div
        className={cn(
          "flex w-full rounded-md bg-black-sec items-center relative",
          classNameContainerInput
        )}
      >
        {icon &&
          orientation === "icon-left" &&
          renderIcon({ classNameSpan: "pl-2" })}
        {renderInput()}
        {props.type === "children" && children}
        {icon &&
          orientation === "icon-right" &&
          renderIcon({ classNameSpan: "pr-2" })}
        {props.type === "password" && (
          <ButtonPassword enabled={enabled} onClickPassword={onClickPassword} />
        )}
      </div>
    </Label>
  );
};

export default Input