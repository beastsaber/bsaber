const ONE_DAY = 24 * 60 * 60 * 1000;
const getDayOfYear = (inputDate: Date) => {
    const startOfYear = new Date(inputDate.getFullYear(), 0, 0);
    const diff = inputDate.getTime() - startOfYear.getTime();
    return Math.floor(diff / ONE_DAY);
}

export const DayOfWeek = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
}

export type DayOfWeekNumber = typeof DayOfWeek[keyof typeof DayOfWeek];

// ISO would be to use Sunday as the first day of the week
export const getWeekOfYear = (inputDate: Date, weekStart: DayOfWeekNumber) => {
    const dayOfYear = getDayOfYear(inputDate);
    const dayOfWeekJan1 = new Date(inputDate.getFullYear(), 0, 1).getDay();

    const daysInPartialWeekToCut = 7 - Math.abs(dayOfWeekJan1 - weekStart);
    const weekNumberAccordingToFullWeeksInThisYear = Math.floor((dayOfYear - daysInPartialWeekToCut) / 7);
    // + 1 for the potentially partial week - could also be full in the equal case, then 7 days are subtracted already either way
    return weekNumberAccordingToFullWeeksInThisYear + 1;
}