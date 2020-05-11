import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { withUser } from "../components/Auth/withUser";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const Home = (props) => {
  // Implement react map box here.
  console.log(props);
  return (
    <div>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <Layer
          type="symbol"
          id="marker"
          layout={{
            "icon-image": "marker-15",
          }}
        >
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Map>
      ; <p> On home / </p> }
    </div>
  );
};

export default withUser(Home);
