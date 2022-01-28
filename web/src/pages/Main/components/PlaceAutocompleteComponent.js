import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Input, Spin } from "antd";

function PlacesAutocompleteComponent(props) {
  const [address, setAddress] = React.useState(props.city ? props.city : "");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    props.setCoordinates(latLng.lat, latLng.lng);
    console.log(latLng.lat)
    console.log(latLng.lng)
    props.setAddress(value);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        style ={{ width: '180px' }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              style={{ borderRadius: '100px', width: '180px' }}
              {...getInputProps({ placeholder: props.placeholder })}
            />
            <div>
              {loading ? (
                <div>
                  <Spin />
                </div>
              ) : null}

              {suggestions.map((suggestion) => {
                const style = {
                  width: '180px',
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default PlacesAutocompleteComponent;