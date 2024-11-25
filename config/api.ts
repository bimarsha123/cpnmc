import {
  createBookmarkBodyType,
  createLogBodyType,
} from "@/components/NewsCard";
import {
  RefreshTokenBodyType,
  SocialLoginBodyType,
  UpdatePreferencesBodyType,
  UpdateUserBodyType,
} from "./types";
import env from "./env";
import axios from "axios";

export const base_url = env.BASE_URL;
export const api_url = `${base_url}/api/v1/`;
export const api_auth_url = `${base_url}/auth/`;
export const LIMIT = 10;
export const client_id = env.CLIENT_ID;
export function objToQueryParams(obj: Record<string, string>): string {
  const params = Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
  return "?" + params;
}

export async function getCategories() {
  try {
    const res = await axios.get(api_url + "news/categories", {
      params: { limit: 100 },
    });
    return res.data;
  } catch (e) {
    return console.log({ e });
  }
}

export async function getSocial() {
  try {
    const res = await axios.get(api_url + "post/post/source", {
      params: { limit: 100 },
    });
    return res.data;
  } catch (e) {
    return console.log({ e });
  }
}

export async function getOrganizations() {
  try {
    const res = await axios.get(api_url + "organization/organization/all", {
      params: { limit: 100 },
    });
    return res.data;

  } catch (e) {
    return console.log({ e });
  }
}

export async function getNotice() {
  try {
    const res = await axios.get(api_url + "organization/notice/all", {
      params: { limit: 100 },
    });
    return res.data;

  } catch (e) {
    return console.log({ e });
  }
}

export async function getNewsOutlets(filters: any) {
  const fetchUrl = filters
    ? api_url + "news/newsoutlets" + objToQueryParams(filters)
    : api_url + "news/newsoutlets";
  try {
    const res = await axios.get(fetchUrl);
    return res.data;
  } catch (e) {
    return console.log({ e });
  }
}

export async function getSources(filters: any) {
  const fetchUrl = filters
    ? api_url + "news/sources" + objToQueryParams(filters)
    : api_url + "news/sources";
  try {
    const res = await axios.get(fetchUrl);
    return res.data;
  } catch (e) {
    return console.log({ e });
  }
}

export async function getOutlet(id: number) {
  try {
    const res = await axios.get(api_url + "news/newsoutlets/detail/" + id);
    return res.data;
  } catch (e) {
    return console.log({ e });
  }
}

export async function getCategory(id: number) {
  try {
    const res = await axios.get(api_url + "news/categories/detail/" + id);
    return res.data;
  } catch (e) {
    return console.log({ e });
  }
}

export async function getNews(filters: any) {
  const fetchUrl = filters
    ? api_url + "news/news" + objToQueryParams(filters)
    : api_url + "news/news";
  try {
    const res = await axios.get(fetchUrl);
    return res.data;
  } catch (e) {
    return console.log({ e });
  }
}

export async function getPosts() {
  const fetchUrl = api_url + "post/post/all";
  try {
    const res = await axios.get(fetchUrl);
    return res.data;
  } catch (e) {
    return console.log({ e });
  }
}

export async function getTrendingNews(filters: any) {
  const fetchUrl = filters
    ? api_url + "news/news/trending" + objToQueryParams(filters)
    : api_url + "news/news/trending";
  try {
    const res = await axios.get(fetchUrl);
    return res.data;
  } catch (e) {
    return console.log({ e });
  }
}

export async function getForyouFeed(filters: any) {
  const fetchUrl = filters
    ? api_url + "news/news/foryou" + objToQueryParams(filters)
    : api_url + "news/news/foryou";
  try {
    const res = await axios.get(fetchUrl);
    return res.data;
  } catch (e) {
    return console.log({ e });
  }
}

export async function getTrendingTopics(filters: any) {
  const fetchUrl = filters
    ? api_url + "news/tags/trending" + objToQueryParams(filters)
    : api_url + "news/tags/trending";
  try {
    const res = await axios.get(fetchUrl);
    return res.data;
  } catch (e) {
    return console.log({ e });
  }
}

export async function socialLogin(body: SocialLoginBodyType) {
  const fetchUrl = api_auth_url + "convert-token";
  try {
    const res = await axios.post(fetchUrl, body);
    return res.data;
  } catch (e) {
    console.log("error catch", e);
    throw new Error(JSON.stringify(e, null, 2));
  }
}

export async function getCategoryNewsFeed(params: any) {
  const fetchUrl =
    api_url +
    `news/categories/${params.selectedCategory}/news` +
    objToQueryParams(params.filters);
  try {
    const res = await axios.get(fetchUrl);
    return res.data;
  } catch (e) {
    throw new Error();
  }
}

export async function getFollowingNewsFeed(params: any) {
  const fetchUrl =
    api_url +
    `news/following/feed/${params.filterType}/${params.filterId}` +
    objToQueryParams(params.extraFilters);
  try {
    const res = await axios.get(fetchUrl);
    return res.data;
  } catch (e) {
    throw new Error();
  }
}

export async function createLog(body: createLogBodyType) {
  const fetchUrl = api_url + "logs/logs";
  try {
    const res = await axios.post(fetchUrl, body);
    return res.data;
  } catch (e) {
    throw new Error(JSON.stringify(e, null, 2));
  }
}

export async function createBookmark(body: createBookmarkBodyType) {
  const fetchUrl = api_url + "account/bookmarks";
  try {
    const res = await axios.post(fetchUrl, body);
    return res.data;
  } catch (e) {
    throw new Error(JSON.stringify(e, null, 2));
  }
}

export async function refreshToken(body: RefreshTokenBodyType) {
  const fetchUrl = api_auth_url + "token";
  try {
    const res = await axios.post(fetchUrl, body);
    return res.data;
  } catch (e) {
    console.log("error catch", e);
    throw new Error(JSON.stringify(e, null, 2));
  }
}

export async function getMyBookmarks(params: any) {
  const fetchUrl =
    api_url + "account/bookmarks" + objToQueryParams(params.filters);
  try {
    const res = await axios.get(fetchUrl);
    return res.data;
  } catch (e) {
    throw new Error(JSON.stringify(e, null, 2));
  }
}

export async function getUserInfo() {
  const fetchUrl = api_url + "account/me";
  try {
    const res = await axios.get(fetchUrl);
    return res.data;
  } catch (e) {
    throw new Error(JSON.stringify(e, null, 2));
  }
}

export async function getUserPreferences() {
  const fetchUrl = api_url + "account/preferences/detail";
  try {
    const res = await axios.get(fetchUrl);
    return res.data;
  } catch (e) {
    throw new Error(JSON.stringify(e, null, 2));
  }
}

export async function updateUserPreferences(body: UpdatePreferencesBodyType) {
  const fetchUrl = api_url + "account/preferences/detail";
  try {
    const res = await axios.put(fetchUrl, body);
    return res.data;
  } catch (e) {
    throw new Error(JSON.stringify(e, null, 2));
  }
}
export async function updateUser(body: UpdateUserBodyType) {
  const fetchUrl = api_url + "account/users/detail/" + body.id;
  try {
    const res = await axios.put(fetchUrl, body);
    return res.data;
  } catch (e) {
    throw new Error(JSON.stringify(e, null, 2));
  }
}

export async function deleteUserPreferences(body: UpdatePreferencesBodyType) {
  const fetchUrl = api_url + "account/preferences/delete";
  try {
    const res = await axios.patch(fetchUrl, body);
    return res.data;
  } catch (e) {
    throw new Error(JSON.stringify(e, null, 2));
  }
}
