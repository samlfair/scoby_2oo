import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import "../styles/Profile.css";
import "../styles/CardItem.css";
import ProfileItem from "../components/ProfileItem";
import axios from "axios";

class Profile extends Component {
  state = {
    items: [],
    phoneNumber: false,
  };

  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/api/items/?user_id=" +
          this.props.authContext.user._id
      )
      .then((apiRes) => {
        this.setState({ items: apiRes.data });
        // apiRes.map(
        //   (doc) => (this.setState.items = { ...this.state.items }.push(doc))
        // );
      })
      .catch((err) => console.log(err));
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/api/users/" +
          this.props.authContext.user._id
      )
      .then((apiRes) => {
        if (apiRes.data.phoneNumber) {
          this.setState({ phoneNumber: apiRes.data.phoneNumber });
        }
      });
  }

  handleDelete = (id) => {
    axios
      .delete(process.env.REACT_APP_BACKEND_URL + "/api/items/" + id)
      .then((apiRes) => {
        const newItems = this.state.items.filter((item, index) => {
          return item._id !== id;
        });
        console.log(newItems);
        this.setState({ items: newItems });
        console.log("Deleted");
      })
      .catch((err) => console.log(err));
  };

  handlePhoneNumber = (e) => {
    e.preventDefault();
    console.log("Phone number");
    console.log(e.target.phoneNumber.value);
    axios
      .patch(
        process.env.REACT_APP_BACKEND_URL +
          "/api/users/" +
          this.props.authContext.user._id,
        {
          phoneNumber: e.target.phoneNumber.value,
        }
      )
      .then((apiRes) => {
        this.setState({ phoneNumber: apiRes.data.phoneNumber });
      });
  };

  handleEdit = (id) => {
    console.log("Edit");
    console.log(id);
  };

  render() {
    const { authContext } = this.props;
    const { user } = authContext;
    return (
      <div style={{ padding: "100px", fontSize: "1.25rem" }}>
        <section className="Profile">
          <div className="user-image round-image">
            <img src={user.profileImg} alt={user.firstName} />
          </div>
          <div className="user-presentation">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <Link className="link" to="/profile/settings">
              Edit profile
            </Link>
          </div>

          {!this.state.phoneNumber && (
            <div className="user-contact">
              <h4>Add a phone number</h4>

              <form className="form" onSubmit={this.handlePhoneNumber}>
                <div className="form-group">
                  <label className="label" htmlFor="phoneNumber">
                    Phone number
                  </label>
                  <input
                    className="input"
                    id="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    placeholder="Add phone number"
                  />
                </div>
                <button className="form__button">Add phone number</button>
              </form>
            </div>
          )}
          {!!this.state.phoneNumber && (
            <div className="user-contact">
              <p>Phone Number: {this.state.phoneNumber}</p>
            </div>
          )}

          {/* if no items */}
          {!this.state.items.length && (
            <div className="CardItem">
              <div className="item-empty">
                <div className="round-image">
                  <img src="/media/personal-page-empty-state.svg" alt="" />
                </div>
                <p>You don't have any items :(</p>
              </div>
            </div>
          )}

          {/* list of items */}
          {!!this.state.items.length && (
            <div className="CardItem">
              <h3>Your items</h3>
              {this.state.items.map((item, index) => {
                return (
                  <ProfileItem
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}
                    item={item}
                    key={index}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default withUser(Profile);
