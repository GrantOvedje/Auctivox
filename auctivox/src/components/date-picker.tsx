"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export function DatePickerDemo({ name }: { name: string }) {
    const [date, setDate] = React.useState<Date>();

  return (
    <>
       {/* hidden field for form submission */}
      <input type="hidden" name={name} value={date ? date.toISOString() : ""} />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!date}
            className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar 
            mode="single" 
            selected={date} 
            onSelect={setDate}
            disabled={(d) => d < new Date()} 
          />
        </PopoverContent>
      </Popover>
    </>
  )
}

// {
//     date,
//     setDate,
// }:{
//     date: Date;
//     setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
// }