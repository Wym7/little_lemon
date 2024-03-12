"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  INTERVAL,
  RESTAURANT_CLOSING_TIME,
  RESTAURANT_OPENING_TIME,
} from "@/constants/config";
import { add, format } from "date-fns";
import { useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}
const Booking = () => {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  const getTimes = () => {
    if (!date.justDate) return;
    const { justDate } = date;

    const openTime = add(justDate, { hours: RESTAURANT_OPENING_TIME });
    const closeTime = add(justDate, { hours: RESTAURANT_CLOSING_TIME });
    const interval = INTERVAL;

    const times = [];
    for (let i = openTime; i <= closeTime; i = add(i, { minutes: interval })) {
      times.push(i);
    }
    return times;
  };

  const times = getTimes();

  return (
    <section>
      <div className="grid-cols-1 grid">
        <div className="bg-[#1e1e1e] p-10 text-5xl flex-col text-white flex items-center justify-center">
          Table Reservation
        </div>
        <div className="text-black flex items-center justify-center mt-20">
          {date.justDate ? (
            <div className="flex gap-4">
              {times?.map((time, i) => (
                <div key={`time-${i}`} className="rounded-sm bg-gray-100 p-2">
                  <Button
                    type="button"
                    onClick={() =>
                      setDate((prev) => ({ ...prev, dateTime: time }))
                    }
                  >
                    {format(time, "kk:mm")}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <Calendar
              className=" rounded-lg border-2"
              onDayClick={(date) =>
                setDate((prev) => ({ ...prev, justDate: date }))
              }
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Booking;
