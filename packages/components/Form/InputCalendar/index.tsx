import { Calendar } from 'app/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from 'app/components/ui/popover';
import { cn } from 'app/lib/utils';
import { format } from 'date-fns';
import { es } from "date-fns/locale"
import React, { FC } from 'react';
import { inputClassName } from '../Input';
import { IconCalendarFilled } from '@tabler/icons-react';
import { DayPickerProps } from 'react-day-picker';

interface InputCalendarProps {
  field: any;
  className?: string;
  calendarMode?: DayPickerProps["mode"];
}

const InputCalendar: FC<InputCalendarProps> = ({ field, className, calendarMode = "single" }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            inputClassName(className),
            "!text-start flex justify-between",
            !field.value && "text-text-grey/50"
          )}
        >
          {field.value ? (
            format(field.value, "PPP", { locale: es })
          ) : (
            <span>Elige una fecha</span>
          )}
          <span>
            <IconCalendarFilled className='text-text-grey' size={24}/>
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 dark:bg-black-app-bg dark:border-outline-dark border-outline bg-white"
        align="start"
      >
        <Calendar
          locale={es}
          initialFocus
          mode={calendarMode}
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date: Date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
      </PopoverContent>
    </Popover>
  );
};

export default InputCalendar;
