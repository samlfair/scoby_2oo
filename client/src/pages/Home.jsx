import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import { withUser } from "../components/Auth/withUser";
import CardItem from "../components/CardItem";
import axios from "axios";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Home extends Component {
  state = {
    isClicked: false,
    items: undefined,
    name: "",
    quantity: undefined,
    category: "",
    address: "",
    image: ",",
    user_firstName: undefined,
    user_lastName: undefined,
  };

  // first, add all of the items in an array to the state with axios
  // then, iterate through those item to generate a component for each one
  handleClick = (item, e) => {
    this.setState({ isClicked: !this.state.isClicked });
    this.setState({
      image: item.image,
      name: item.name,
      category: item.category,
      address: item.address,
      quantity: item.quantity,
      user_firstName: item.user_firstName,
      user_lastName: item.user_lastName,
    });
    console.log(this.state);
    console.log(item);
  };

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/items")
      .then((apiResponse) => {
        this.setState({ items: apiResponse.data });
        console.log(this.state.items);
      })
      .catch((apiErr) => console.log(apiErr));
  }

  render() {
    return (
      <div>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
          center={[2.3361, 48.8601]}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{
              "icon-image": "garden-15",
            }}
          >
            {this.state.items &&
              this.state.items.map((item) => {
                return (
                  <Feature
                    key={item._id}
                    coordinates={item.location}
                    onClick={() => this.handleClick(item)}
                  />
                );
              })}
          </Layer>
          {this.state.isClicked && (
            <CardItem
              name={this.state.name}
              category={this.state.category}
              address={this.state.address}
              quantity={this.state.quantity}
              image={this.state.image}
              firstName={this.state.user_firstName}
              lastName={this.state.user_lastName}
            />
          )}
        </Map>
      </div>
    );
  }
}

export default withUser(Home);
