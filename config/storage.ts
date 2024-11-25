import AsyncStorage from "@react-native-async-storage/async-storage";
export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("saving error:", e);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log("error:", e);
    return null;
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log("removing error:", e);
  }
};

export const removeDataMulty = async (keys: string[]) => {
  try {
    await AsyncStorage.multiRemove(keys);
    console.log("removed successfully", keys);
  } catch (e) {
    console.log("removing error:", e);
  }
};
