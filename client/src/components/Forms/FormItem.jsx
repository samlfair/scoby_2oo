import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import "../../styles/form.css";
import axios from "axios";

class ItemForm extends Component {
  state = {
    name: "",
    description: "",
    image: "",
    category: "",
    quantity: 0,
    address: "",
    email: false,
    phone: false,
    type: undefined,
    coordinates: undefined,
    formattedAddress: undefined,
  };

  handleChange = (event) => {
    // console.log(event);
    if (
      event.target.name !== "email" &&
      event.target.name !== "phone" &&
      event.target.name !== "image"
    ) {
      this.setState({ [event.target.name]: event.target.value });
    } else if (event.target.name === "image") {
      this.setState({ image: event.target.closest("form").image.files[0] });
    } else {
      this.setState({ [event.target.name]: event.target.checked });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData();
    console.log(this.state.coordinates);
    const location = {
      // type: this.state.type,
      coordinates: this.state.coordinates,
      formattedAddress: this.state.formattedAddress,
    };
    console.log(this.state);
    form.append("name", this.state.name);
    form.append("description", this.state.description);
    form.append("image", this.state.image);
    form.append("category", this.state.category);
    form.append("quantity", this.state.quantity);
    form.append("address", this.state.address);
    form.append("location", this.state.coordinates);

    console.log(form);

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/items", form)
      .then((apiResponse) => console.log(apiResponse))
      .catch((apiErr) => console.log(apiErr));

    // In order to send back the data to the client, since there is an input type file you have to send the
    // data as formdata.
    // The object that you'll be sending will maybe be a nested object, in order to handle nested objects in our form data
    // Check out the stackoverflow solution below : )

    // Nested object into formData by user Raj Pawam Gumdal @stackoverflow : ) => https://stackoverflow.com/a/42241875/13374041
  };

  handlePlace = (place) => {
    // This handle is passed as a callback to the autocomplete component.
    // Take a look at the data and see what you can get from it.
    // Look at the item model to know what you should retrieve and set as state.
    console.log(place);
    this.setState({
      // type: place.geometry.type,
      coordinates: place.geometry.coordinates,
      formattedAddress: place.place_name,
      address: place.place_name,
    });
  };

  render() {
    return (
      <div className="ItemForm-container">
        <form className="form" onChange={this.handleChange}>
          <h2 className="title">Add Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              className="input"
              type="text"
              placeholder="What are you giving away ?"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select name="category" id="category" defaultValue="-1">
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input
              name="quantity"
              className="input"
              id="quantity"
              type="number"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete onSelect={this.handlePlace} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="text-area"
              placeholder="Tell us something about this item"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input name="image" className="input" id="image" type="file" />
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input name="email" type="radio" />
              user email
            </div>
            <input name="phone" type="radio" />
            contact phone number
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <button className="btn-submit" onClick={this.handleSubmit}>
            Add Item
          </button>
        </form>
      </div>
    );
  }
}

export default ItemForm;
