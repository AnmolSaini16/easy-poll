import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nextWeek(): Date {
  const currentDate = new Date();
  const nextWeekDate = new Date();
  nextWeekDate.setDate(currentDate.getDate() + 7);
  return nextWeekDate;
}

export function isEmpty(value: any): boolean {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}

export function isPollActive(endDate: string): boolean {
  return new Date(endDate) > new Date();
}

export function getHighestOptions(
  options: {
    count: number;
    created_at: string;
    id: string;
    option: string;
    poll_id: string;
  }[]
) {
  let highestCount = 0;
  let highestOptions: string[] = [];

  options.forEach((option) => {
    if (option.count > highestCount) {
      highestCount = option.count;
      highestOptions = [option.option];
    } else if (option.count === highestCount) {
      highestOptions.push(option.option);
    }
  });

  return highestOptions;
}
