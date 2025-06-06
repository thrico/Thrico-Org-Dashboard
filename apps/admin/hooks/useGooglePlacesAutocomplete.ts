// Hook to extract Google Place details
export const useGooglePlacesAutocomplete = (
  setLocation: (data: any) => void
) => {
  const handlePlaceChanged = (
    autocomplete: google.maps.places.Autocomplete
  ) => {
    const place = autocomplete.getPlace();
    if (!place || !place.geometry) return;

    const locationData = {
      name: place.name || place.formatted_address,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
      address: place.formatted_address,
    };

    setLocation(locationData);
  };

  return {
    handlePlaceChanged,
  };
};
