import React, { useEffect, useRef } from "react";
import { Input } from "antd";
import { FormInstance } from "antd/es/form";

interface LocationAutocompleteProps {
  form: FormInstance;
  fieldName?: string;
  placeholder?: string;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  form,
  fieldName = "location",
  placeholder = "Enter a location",
}) => {
  const inputRef = useRef<any>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!window.google || !inputRef.current) return;

    autocompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current.input,
      {
        types: ["geocode"],
        componentRestrictions: { country: "us" }, // Optional
      }
    );

    const listener = autocompleteRef.current.addListener(
      "place_changed",
      () => {
        const place = autocompleteRef.current?.getPlace();
        if (!place || !place.geometry) return;

        const locationValue = {
          name: place.name || place.formatted_address,
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        form.setFieldsValue({ [fieldName]: locationValue.address });

        // Optional: store full place data in the form using a hidden field
        form.setFieldsValue({ [`${fieldName}_meta`]: locationValue });

        console.log("Selected location:", locationValue);
      }
    );

    return () => {
      listener?.remove?.();
    };
  }, [form, fieldName]);

  return (
    <>
      <Input ref={inputRef} placeholder={placeholder} />
      {/* Optional hidden field to store full meta info */}
      <input type="hidden" name={`${fieldName}_meta`} />
    </>
  );
};

export default LocationAutocomplete;
