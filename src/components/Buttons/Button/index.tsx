import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps {
  title?: string;
  icon?: React.ReactElement;
  href?: string;
  classNameContainer?: string;
  classNameText?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  buttonType?: 'button' | 'icon';
  textSize?: 'text-base' | 'text-lg' | string;
  iconOrientation?: 'left' | 'right';
  buttonBackground?: string;
  buttonPadding?: string;
  buttonJustifyContent?: string;
  isDiv?: boolean;
}

export const classNameButton = 'flex flex-row items-center rounded-[8px] transition-colors gap-1';
export const classNameButtonText = 'text-center font-semibold';

const Button: React.FC<ButtonProps> = ({
  title,
  classNameContainer,
  href,
  icon,
  onClick,
  style,
  classNameText,
  buttonType = 'button',
  textSize = 'text-base',
  iconOrientation = 'left',
  buttonBackground = 'bg-grey',
  buttonPadding = 'p-2',
  buttonJustifyContent = 'justify-center',
  isDiv = false,
}) => {
  const content = (
    <>
      {icon && iconOrientation === 'left' && icon}
      {title && (
        <span
          className={cn(
            classNameText ?? 'text-black',
            icon && (iconOrientation === 'left' ? 'ml-1' : 'mr-1'),
            classNameButtonText,
            textSize
          )}
        >
          {title}
        </span>
      )}
      {icon && iconOrientation === 'right' && icon}
    </>
  );

  if (isDiv) {
    return (
      <div
        className={cn(
          classNameContainer,
          buttonBackground,
          buttonPadding,
          buttonJustifyContent,
          classNameButton
        )}
      >
        {content}
      </div>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          classNameContainer,
          buttonBackground,
          buttonPadding,
          buttonJustifyContent,
          classNameButton
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      style={style}
      className={cn(classNameContainer, buttonBackground, buttonPadding, buttonJustifyContent, classNameButton)}
    >
      {content}
    </button>
  );
};

export default Button;
