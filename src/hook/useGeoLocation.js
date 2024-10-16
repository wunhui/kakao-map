import { useState, useEffect } from "react";

export const useGeolocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prevState) => ({
        ...prevState,
        error: "Geolocation is not supported by your browser.",
      }));
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (pos) => {
      const crd = pos.coords;
      setLocation({
        latitude: crd.latitude,
        longitude: crd.longitude,
        accuracy: crd.accuracy,
        error: null,
      });
    };

    const error = (err) => {
      setLocation((prevState) => ({
        ...prevState,
        error: `ERROR(${err.code}): ${err.message}`,
      }));
    };

    const watcher = navigator.geolocation.getCurrentPosition(success, error, options);

    return () => {
      // Cleanup when component is unmounted
      if (watcher) {
        navigator.geolocation.clearWatch(watcher);
      }
    };
  }, []);

  return location;
};