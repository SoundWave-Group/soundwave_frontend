import React, { useState, useEffect, useContext } from "react";
import { Audio } from "expo-av";

// Create a context for managing playback
const PlaybackContext = React.createContext();

// Create a provider component to manage the playback state and methods
export const PlaybackProvider = ({ children }) => {
  const [sound, setSound] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const response = await fetch(
          "https://soundwave-56af.onrender.com/api/tracks"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch song data");
        }
        const data = await response.json();
        setSongData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongData();
  }, []);

  useEffect(() => {
    const loadAudio = async () => {
      if (songData.length === 0) return; // Ensure songData is loaded before attempting to load audio
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: songData[songIndex].link },
          { shouldPlay: false }
        );
        setSound(newSound);
        const status = await newSound.getStatusAsync();
        setDuration(status.durationMillis / 1000); // Convert milliseconds to seconds
      } catch (err) {
        setError("Failed to load audio");
      }
    };

    loadAudio();
  }, [songData, songIndex]);

  useEffect(() => {
    let interval = null;

    const updatePosition = async () => {
      try {
        if (sound && isPlaying) {
          const status = await sound.getStatusAsync();
          setCurrentPosition(status.positionMillis / 1000);
        }
      } catch (err) {
        setError("Failed to update position");
      }
    };

    if (isPlaying) {
      interval = setInterval(updatePosition, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, sound]);

  const togglePlayPause = async () => {
    if (sound) {
      try {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
      } catch (err) {
        setError("Failed to toggle play/pause");
      }
    }
  };

  const handleNext = async () => {
    try {
      const nextIndex = (songIndex + 1) % songData.length;
      setSongIndex(nextIndex);
      if (sound) {
        await sound.unloadAsync();
      }
      setIsPlaying(false); // Stop playback before loading new audio
    } catch (err) {
      setError("Failed to load next song");
    }
  };

  const handlePrevious = async () => {
    try {
      const prevIndex = (songIndex - 1 + songData.length) % songData.length;
      setSongIndex(prevIndex);
      if (sound) {
        await sound.unloadAsync();
      }
      setIsPlaying(false); // Stop playback before loading new audio
    } catch (err) {
      setError("Failed to load previous song");
    }
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (!isShuffle) {
      const shuffledData = [...songData].sort(() => Math.random() - 0.5);
      setSongData(shuffledData);
      setSongIndex(0);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60).toFixed(0);
    const secs = (seconds % 60).toFixed(0);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <PlaybackContext.Provider
      value={{
        sound,
        currentPosition,
        duration,
        isPlaying,
        isShuffle,
        isRepeat,
        songIndex,
        songData,
        loading,
        error,
        togglePlayPause,
        handleNext,
        handlePrevious,
        toggleShuffle,
        formatTime,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};

export { PlaybackContext };
