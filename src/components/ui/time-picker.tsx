"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface TimePickerProps {
  value: string | undefined;
  setValue: (time: string | undefined) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ value, setValue }) => {
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [ampm, setAmPm] = useState("AM");

  useEffect(() => {
    if (value) {
      const [time, meridium] = value.split(' ');
      const [hr, min] = time.split(':');
      setHours(parseInt(hr));
      setMinutes(parseInt(min));
      setAmPm(meridium as "AM" | "PM");
    }
  }, [value]);

  const handleTimeChange = () => {
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    setValue(`${formattedHours}:${formattedMinutes} ${ampm}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {value ? value : "Pick a time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto" align="center" side="bottom">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2 items-center">
            <Label>Hours:</Label>
            <select
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                <option key={hour} value={hour}>
                  {String(hour).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2 items-center">
            <Label>Minutes:</Label>
            <select
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                <option key={minute} value={minute}>
                  {String(minute).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2 items-center">
            <Label>AM/PM:</Label>
            <select
              value={ampm}
              onChange={(e) => setAmPm(e.target.value as "AM" | "PM")}
              className="border rounded px-2 py-1"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <Button onClick={handleTimeChange}>Set Time</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
