import React, { ChangeEvent, useEffect, useState } from "react";
  import {  formatServerDate } from "../utils/general.utils";
  
  export default function DateTimePicker({
    onValueChange,
    initialValue,
    dateTimeInputContainerClassName,
    labelClassName,
    dateTimeInputLabel,
    dateTimeInputRequired,
  }: {
    onValueChange: Function;
    initialValue: { date: string; time: string };
    dateTimeInputContainerClassName?: string;
    labelClassName?: string;
    dateTimeInputLabel?: string;
    dateTimeInputRequired?: boolean;
  }) {
    const [dateTime, setDateTime] = useState(initialValue);
  
    function onChange(event: ChangeEvent<HTMLInputElement>) {
      setDateTime({ ...dateTime, [event.target.name]: event.target.value });
    }
    useEffect(() => {
      const { date, time } = dateTime;
      onValueChange(formatServerDate(`${date} ${time}`));
    }, [dateTime]);
  
    return (
      <div className={dateTimeInputContainerClassName}>
        <label className={`w-full text-white ${labelClassName || ""}`}>
          {dateTimeInputLabel || ""}
          {dateTimeInputRequired ? "*" : ""}
        </label>
        <div className="w-full">
        <input
          value={dateTime.date}
          onChange={onChange}
          name="date"
          className="w-1/2 border-b border-[#A3BEAE] outline-none bg-[#5B8B6C] text-white placeholder-[#A3BEAE]"
          type="date"
        />
        <input
          value={dateTime.time}
          onChange={onChange}
          name="time"
          className="w-1/2 border-b border-[#A3BEAE] outline-none bg-[#5B8B6C] text-white placeholder-[#A3BEAE]"
          type="time"
        />
        </div>
       
      </div>
    );
  }
  
