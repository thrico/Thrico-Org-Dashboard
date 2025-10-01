"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import { EnvironmentOutlined, LoadingOutlined } from "@ant-design/icons";

interface LocationData {
  address: string;
  lat: number;
  lng: number;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

interface GooglePlacesAutoCompleteProps {
  onLocationSelect: (location: LocationData) => void;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

declare global {
  interface Window {
    google: any;
    initGooglePlaces: () => void;
  }
}

export function GooglePlacesAutoComplete({
  onLocationSelect,
  placeholder = "Search for a location...",
  value,
  onChange,
}: GooglePlacesAutoCompleteProps) {
  const [inputValue, setInputValue] = useState(value || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const inputRef = useRef<any>(null);
  const autocompleteRef = useRef<any>(null);

  useEffect(() => {
    // Load Google Places API
    const loadGooglePlacesAPI = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsGoogleLoaded(true);
        initializeAutocomplete();
        return;
      }

      // Check if script is already loading
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        // Script is already loading, wait for it
        window.initGooglePlaces = () => {
          setIsGoogleLoaded(true);
          initializeAutocomplete();
        };
        return;
      }

      // Load the script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGooglePlaces`;
      script.async = true;
      script.defer = true;

      window.initGooglePlaces = () => {
        setIsGoogleLoaded(true);
        initializeAutocomplete();
      };

      document.head.appendChild(script);
    };

    const initializeAutocomplete = () => {
      if (!inputRef.current?.input || !window.google) return;

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current.input,
        {
          types: ["geocode", "establishment"],
          fields: [
            "place_id",
            "geometry",
            "name",
            "formatted_address",
            "address_components",
          ],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          console.log("No details available for input: '" + place.name + "'");
          return;
        }

        const locationData: LocationData = {
          address: place.formatted_address || place.name || "",
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        // Extract additional location details
        if (place.address_components) {
          place.address_components.forEach((component: any) => {
            const types = component.types;

            if (types.includes("locality")) {
              locationData.city = component.long_name;
            } else if (types.includes("administrative_area_level_1")) {
              locationData.state = component.long_name;
            } else if (types.includes("country")) {
              locationData.country = component.long_name;
            } else if (types.includes("postal_code")) {
              locationData.postalCode = component.long_name;
            }
          });
        }

        setInputValue(locationData.address);
        onLocationSelect(locationData);
      });

      autocompleteRef.current = autocomplete;
    };

    loadGooglePlacesAPI();

    return () => {
      // Cleanup
      if (autocompleteRef.current && window.google) {
        window.google.maps.event.clearInstanceListeners(
          autocompleteRef.current
        );
      }
    };
  }, [onLocationSelect]);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const handleFocus = () => {
    setIsLoading(true);
    // Simulate loading state briefly
    setTimeout(() => setIsLoading(false), 500);
  };

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <Input
        placeholder="Google Maps API key not configured"
        disabled
        prefix={<EnvironmentOutlined />}
      />
    );
  }

  return (
    <Input
      ref={inputRef}
      value={inputValue}
      onChange={handleInputChange}
      onFocus={handleFocus}
      placeholder={placeholder}
      prefix={isLoading ? <LoadingOutlined spin /> : <EnvironmentOutlined />}
      suffix={
        !isGoogleLoaded && (
          <span style={{ fontSize: 12, color: "#999" }}>Loading...</span>
        )
      }
    />
  );
}
