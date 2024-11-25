export type NewsResultType = {
  id: number;
  title: string;
  image: string;
  link: string;
  bookmarked: boolean;
  image_url_from_feed: string;
  published_date: string;
  summary: string;
  source_detail: {
    id: number;
    default_image: string;
    outlet_detail: {
      name: string;
      id: number;
      logo: string;
    };
  };
};

export type BookmarkResultType = {
  id: number;
  user: number;
  news: number;
  timestamp: string;
  news_detail: NewsResultType;
};

export type GenericListApiResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  nextOffset: number;
  previousOffset: number;
  results: T[];
};

export type CategoryType = {
  id: number;
  name: string;
  display_priority: number;
  image: string;
};
export type SocialType = {
  id: number;
  name: string;
};

export type SocialLoginBodyType = {
  client_id: string;
  grant_type: string;
  client_secret?: string;
  backend: string;
  token: string;
};

export type RefreshTokenBodyType = {
  client_id: string;
  grant_type: string;
  client_secret?: string;
  refresh_token: string;
};

export type UserInfoType = {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  picture: string | null;
};

export type UpdatePreferencesBodyType = {
  languages?: number[];
  locations?: number[];
  categories?: number[];
  sources?: number[];
};
export type UpdateUserBodyType = {
  id: number;
  photo: string;
};
