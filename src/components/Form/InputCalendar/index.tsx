import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from "date-fns/locale"
import React from 'react';

const InputCalendar = ({ field }: { field: any }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "text-start w-full p-2 px-3 rounded-lg placeholder:text-text-grey/50 text-black outline-none dark:text-white dark:border-outline-dark outline-offset-0 flex items-center",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value ? (
            format(field.value, "PPP", { locale: es })
          ) : (
            <span>Elige una fecha</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 dark:bg-black-app-bg dark:border-outline-dark border-outline bg-white" align="start">
        <Calendar
          locale={es}
          initialFocus
          mode="single"
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
