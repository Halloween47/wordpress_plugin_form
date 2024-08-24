import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDateTimePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer components={['DateTimePicker']}> */}
      {/* <DateTimePicker /> */}
      <DatePicker
        format="DD/MM/YYYY"
        defaultValue={dayjs("17-04-2024")}
        spacing={2}
      />
      {/* </DemoContainer> */}
    </LocalizationProvider>
  );
}
