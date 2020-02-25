import dayjs from "dayjs";

export const DateTime = {
    fmt: (str, fmt = "DD/MM/YYYY HH:mm") => dayjs(str).format(fmt)
}
