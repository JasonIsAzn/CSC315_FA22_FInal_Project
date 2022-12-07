import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import mapStyles from "./Mapstyles";
import { IconButton, Button } from "@chakra-ui/react";
import { FaLocationArrow } from "react-icons/fa";
import logo from "../assets/logo.png";

/**
 * Page where Google Maps functionality is found
 *
 */
export default function Locations() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/home");
  };

  const [map, setMap] = useState(/** @type google.maps.Map*/ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const locationRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  const libraries = ["places"];
  const mapContainerStyle = {
    width: "100vw",
    height: "88vh",
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDP0fvxENr66x2sO80Wj5ZDgGddGOJSsV8",
    libraries,
  });

  const center = {
    lat: 30.612478,
    lng: -96.341747,
  };

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  if (loadError) return "Error Loading maps";
  if (!isLoaded) return "Loading Maps";

  async function calculateRoute() {
    if (locationRef.current.value === "") {
      return;
    }
    console.log(locationRef.current.value);
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: locationRef.current.value,
      destination: "Spin 'N Stone",
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setTime(results.routes[0].legs[0].duration.text);
  }
  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setTime("");
    locationRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <div className="h-screen flex flex-col overflow-y-hidden">
      <div className="flex flex-row h-[5%] mt-[2%] mb-[1%]">
        <button
          className="bg-[#4FC3F7] hover:bg-white hover:text-[#4FC3F7] hover:border-[#4FC3F7] hover:border-2 text-white mx-6 p-2 rounded-lg text-2xl flex justify-center items-center"
          onClick={goBack}
        >
          <h1 className="">Back</h1>
        </button>
        <img src={logo} alt="Spin 'N Stone Logo" className="h-12" />
      </div>
      <div className="flex flex-row">
        <aside className="border mr-[1%] ml-[1%] w-1/5 rounded-lg flex flex-col py-[1%] h-screen">
          <div className="grid grid-cols-5">
            <div className="col-span-4">
              <Autocomplete>
                <input
                  type="text"
                  className=" h-10 border border-1 border-gray-300 hover:border-gray-500 focus:ring-0 focus:outline-none rounded-lg text-xl mb-[3%]"
                  placeholder="Your Location"
                  ref={locationRef}
                />
              </Autocomplete>
              {/* <Autocomplete>
                <input
                  type="text"
                  className=" h-10 border border-1 border-gray-300 hover:border-gray-500 focus:ring-0 focus:outline-none rounded-lg text-xl mb-[3%]"
                  placeholder=""
                  ref={destinationRef}
                />
              </Autocomplete> */}
            </div>

            <div className="flex items-center justify-center">
              <IconButton
                aria-label="center back"
                icon={<FaLocationArrow />}
                isRound
                onClick={() => {
                  map.panTo(center);
                  map.setZoom(14);
                }}
              />
            </div>
          </div>
          <Button
            className="bg-[#4FC3F7] w-1/5 mb-[3%] rounded-lg text-white font-bold flex justify-center items-center"
            type="submit"
            onClick={calculateRoute}
          >
            GO
          </Button>
          <div>
            <h1>Distance: {distance}</h1>
            <h2>Time: {time}</h2>
          </div>
        </aside>

        {/* Google Maps */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={14}
          options={options}
          onLoad={(map) => setMap(map)}
        >
          <Marker
            key={"Spin 'N Stone"}
            position={center}
            // icon={{
            //   url: "./marker.svg",
            //   scaledSize: new window.google.maps.Size(30, 30),
            //   origin: new window.google.maps.Point(0, 0),
            //   anchor: new window.google.maps.Point(15, 15),
            // }}
          />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
    </div>
  );
}
