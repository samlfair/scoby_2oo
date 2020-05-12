import React, { Component } from "react";

export default class ProfileItem extends Component {
  render() {
    const {
      name,
      image,
      address,
      category,
      description,
      location,
      quantity,
      _id,
    } = this.props.item;
    const { handleDelete, handleEdit } = this.props;
    return (
      <div className="item">
        {image && (
          <div className="round-image">
            <img src={image} alt="item" />
          </div>
        )}
        <div className="description">
          <h2>{name}</h2>
          <h4>Quantity: {quantity} </h4>
          <p>{description}</p>
          <div className="buttons">
            <span>
              <button
                onClick={() => handleDelete(_id)}
                className="btn-secondary"
              >
                Delete
              </button>
            </span>
            <span>
              <button onClick={() => handleEdit(_id)} className="btn-primary">
                Edit
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
