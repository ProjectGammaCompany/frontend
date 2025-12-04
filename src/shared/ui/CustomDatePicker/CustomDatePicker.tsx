import { DatePicker } from "antd";
import { Dayjs } from "dayjs";
import React from "react";

interface CustomDatePickerProps {
  value?: Dayjs | null;
  onChange?: ((date: Dayjs, dateString: string | string[]) => void) | undefined;
  showTime?: boolean;
}

const DATE_FORMAT = "DD.MM.YYYY";
const DATE_TIME_FORMAT = "DD.MM.YYYY HH:mm";

//TODO: сделать кастомный выбор дат (использовать customWindow)
const CustomDatePicker = ({
  ref,
  value,
  onChange,
  showTime,
  ...rest
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
}: CustomDatePickerProps & { ref?: React.RefObject<any | null> }) => {
  return (
    <DatePicker
      ref={ref}
      value={value}
      onChange={onChange}
      showTime={showTime}
      format={showTime ? DATE_TIME_FORMAT : DATE_FORMAT}
      {...rest}
    />
  );
};

export default CustomDatePicker;
