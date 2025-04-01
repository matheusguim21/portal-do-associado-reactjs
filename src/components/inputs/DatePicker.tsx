

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ptBR } from "date-fns/locale"

type DatePickerProps = {
  value?: Date
  onChange?: (date: Date | undefined) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-50 justify-start gap-5 text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon size={20} className={cn(
            !value && "text-gray-400"
          )} />
          {value ? format(value, "PPP", { locale: ptBR }) : <span>dd/mm/aaaa</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          locale={ptBR}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}