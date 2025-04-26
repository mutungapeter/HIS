
import dayjs from "dayjs";

  export const CustomDate = (
    date: Date | string | null,
    formatString: string = "MMM D, YYYY"
  ): string => {
    if (!date) return "";
    const formatted = dayjs(date).format(formatString);
    return formatted.replace("AM", "a.m.").replace("PM", "p.m.");
  };
  
  export const formatDateForInput = (date?: Date | string | null) => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toISOString().split("T")[0];
  };
  
