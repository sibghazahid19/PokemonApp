import AsyncStorage from '@react-native-async-storage/async-storage';

export const persistData = async (key: any, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save data to AsyncStorage', e);
  }
};

export const loadData = async (key: any) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data != null ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to load data from AsyncStorage', e);
    return null;
  }
};
