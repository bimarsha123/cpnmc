import { base_url } from "./api";
import { NewsResultType, UserInfoType } from "./types";

export const hourGreetingMapper: Record<number, string> = {
  0: "शुभ रात्रि",
  1: "शुभ रात्रि",
  2: "शुभ रात्रि",
  3: "शुभ रात्रि",
  4: "शुभ प्रभात",
  5: "शुभ प्रभात",
  6: "शुभ प्रभात",
  7: "शुभ प्रभात",
  8: "शुभ प्रभात",
  9: "शुभ प्रभात",
  10: "शुभ प्रभात",
  11: "शुभ प्रभात",
  12: "शुभ दिन",
  13: "शुभ दिन",
  14: "शुभ दिन",
  15: "शुभ दिन",
  16: "शुभ दिन",
  17: "शुभ साँझ",
  18: "शुभ साँझ",
  19: "शुभ साँझ",
  20: "शुभ साँझ",
  21: "शुभ साँझ",
  22: "शुभ रात्रि",
  23: "शुभ रात्रि",
};

export function getGreeting(name?: string) {
  const currentHour = new Date().getHours();
  return name
    ? `${hourGreetingMapper[currentHour]}, ${name}`
    : hourGreetingMapper[currentHour];
}

export const getImageUrl = (news: NewsResultType) => {
  if (news.image_url_from_feed) {
    return news.image_url_from_feed;
  } else if (news.image) {
    return base_url + news.image;
  }
  return news.source_detail.default_image;
};

export const getFullName = (user: UserInfoType) => {
  return `${user.first_name} ${user.last_name}`;
};
