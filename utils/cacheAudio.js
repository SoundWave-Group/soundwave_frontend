import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_FOLDER = `${FileSystem.cacheDirectory}audio_cache/`;
const DOWNLOAD_KEY_PREFIX = "download_";

export const cacheAudio = async (url, filename, title, artist, albumArt) => {
  try {
    await FileSystem.makeDirectoryAsync(CACHE_FOLDER, { intermediates: true });
    const fileUri = `${CACHE_FOLDER}${filename}`;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (!fileInfo.exists) {
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        fileUri,
        {},
        (downloadProgress) => {
          const progress =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite;
          // You can use this progress value to update a progress bar if needed
        }
      );

      const { uri } = await downloadResumable.downloadAsync();
      console.log("Finished downloading to ", uri);

      // Store the mapping of URL to local URI and metadata
      const downloadKey = `${DOWNLOAD_KEY_PREFIX}${url}`;
      await AsyncStorage.setItem(
        downloadKey,
        JSON.stringify({ uri, title, artist, albumArt })
      );

      return uri;
    } else {
      console.log("File already cached");
      return fileUri;
    }
  } catch (e) {
    console.error("Error caching audio:", e);
    return null;
  }
};

export const getAudioUri = async (url) => {
  try {
    const downloadKey = `${DOWNLOAD_KEY_PREFIX}${url}`;
    const cachedInfo = await AsyncStorage.getItem(downloadKey);
    if (cachedInfo) {
      const { uri } = JSON.parse(cachedInfo);
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.exists) {
        return uri;
      }
    }
    // If not cached or file doesn't exist, return null (don't auto-download)
    return null;
  } catch (e) {
    console.error("Error getting audio URI:", e);
    return null;
  }
};

export const getCachedSongs = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const downloadKeys = keys.filter((key) =>
      key.startsWith(DOWNLOAD_KEY_PREFIX)
    );

    const cachedSongs = await Promise.all(
      downloadKeys.map(async (key) => {
        try {
          const cachedInfo = await AsyncStorage.getItem(key);
          if (cachedInfo) {
            const { uri, title, artist, albumArt } = JSON.parse(cachedInfo);
            const fileInfo = await FileSystem.getInfoAsync(uri);
            if (fileInfo.exists) {
              return {
                id: key.replace(DOWNLOAD_KEY_PREFIX, ""),
                title,
                artist,
                uri,
                albumArt,
              };
            }
          }
        } catch (parseError) {
          console.error(
            `Error parsing cached info for key ${key}:`,
            parseError
          );
          // Remove the invalid entry
          await AsyncStorage.removeItem(key);
        }
        return null;
      })
    );

    return cachedSongs.filter((song) => song !== null);
  } catch (e) {
    console.error("Error getting cached songs:", e);
    return [];
  }
};

export const clearCache = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const downloadKeys = keys.filter((key) =>
      key.startsWith(DOWNLOAD_KEY_PREFIX)
    );
    await AsyncStorage.multiRemove(downloadKeys);
    await FileSystem.deleteAsync(CACHE_FOLDER, { idempotent: true });
    console.log("Cache cleared successfully");
  } catch (e) {
    console.error("Error clearing cache:", e);
  }
};
