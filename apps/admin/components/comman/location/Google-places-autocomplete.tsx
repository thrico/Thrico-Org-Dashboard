"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Input } from "antd";
import type { InputRef } from "antd";

// Declare Google Maps types
declare global {
  interface Window {
    google: any;
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
  placeholder?: string;
}

export default function GooglePlacesInput({
  onChange,
  initialValue,
  placeholder = "Enter a location",
}: GooglePlacesInputProps) {
  const inputRef = useRef<InputRef>(null);
  const autocompleteRef = useRef<any>(null);
  const [value, setValue] = useState(initialValue?.name || "");

  useEffect(() => {
    setValue(initialValue?.name || ""); // update input value when initialValue changes
  }, [initialValue]);

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        const loader = new Loader({
          apiKey:
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
            "AIzaSyCJ2V6iHaVtyMC0zl0cBF6mktw3sdJblX4",
          version: "weekly",
          libraries: ["places"],
        });

        await loader.load();

        if (!inputRef.current?.input) {
          console.warn("Input ref not available");
          return;
        }

        // Destroy existing autocomplete instance if it exists
        if (autocompleteRef.current && window.google?.maps?.event) {
          window.google.maps.event.clearInstanceListeners(
            autocompleteRef.current
          );
        }

        const autocomplete = new window.google.maps.places.Autocomplete(
          inputRef.current.input,
          {
            fields: ["name", "formatted_address", "geometry", "place_id"],
            types: ["geocode"],
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();

          if (!place.geometry?.location) {
            console.warn("No geometry data available for place");
            return;
          }

          const location: Location = {
            name: place.name || place.formatted_address || "",
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            address: place.formatted_address || "",
          };

          setValue(place.formatted_address || place.name || "");
          onChange(location);
        });

        autocompleteRef.current = autocomplete;
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    loadGoogleMaps();

    // Cleanup function
    return () => {
      if (autocompleteRef.current && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(
          autocompleteRef.current
        );
      }
    };
  }, [onChange]);

  return (
    <Input
      type="text"
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)} // allow typing
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded shadow"
    />
  );
}
