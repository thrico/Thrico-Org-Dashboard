"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Input } from "antd";
import type { InputRef } from "antd";

// Declare google types
declare global {
  interface Window {
    google: typeof google;
  }
  namespace google {
    namespace maps {
      namespace places {
        class Autocomplete {
          constructor(inputField: HTMLInputElement, opts?: any);
          getPlace(): any;
          addListener(event: string, handler: () => void): void;
        }
      }
    }
  }
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

interface GooglePlacesInputProps {
  onChange: (location: Location) => void;
  initialValue?: Location | null;
}

export default function GooglePlacesInput({
  onChange,
  initialValue,
}: GooglePlacesInputProps) {
  const inputRef = useRef<InputRef>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [value, setValue] = useState(initialValue?.name || "");

  useEffect(() => {
    setValue(initialValue?.name || ""); // update input value when initialValue changes
  }, [initialValue]);

  useEffect(() => {
    const loadGoogleMaps = async () => {
      const loader = new Loader({
        apiKey: "AIzaSyCJ2V6iHaVtyMC0zl0cBF6mktw3sdJblX4", // Replace with your key
        version: "weekly",
        libraries: ["places"],
      });

      await loader.load();

      if (!inputRef.current?.input) return;

      const autocomplete = new google.maps.places.Autocomplete(
        inputRef.current.input,
        {
          fields: ["name", "formatted_address", "geometry"],
          types: ["geocode"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) return;

        const location: Location = {
          name: place.name || place.formatted_address || "",
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          address: place.formatted_address || "",
        };

        setValue(`${location.name}, ${location.address}`); // update visible value in input
        onChange(location);
      });

      autocompleteRef.current = autocomplete;
    };

    loadGoogleMaps();
  }, [onChange]);

  return (
    <Input
      type="text"
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)} // allow typing
      placeholder="Enter a location"
      className="w-full px-4 py-2 border rounded shadow"
    />
  );
}
