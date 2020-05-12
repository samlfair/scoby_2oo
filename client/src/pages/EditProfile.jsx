import React, { Component } from "react";
import "../styles/Profile.css";
import axios from "axios";
import { withUser } from "../components/Auth/withUser";

class EditProfile extends Component {

  state = {
    firstName:"",
    lastName:"",
    email:""
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value});
  }

  handleSubmit= (e) =>{
    e.preventDefault()
   axios.patch(process.env.REACT_APP_BACKEND_URL+"/api/users/" + this.props.authContext.user._id, this.state)
   .then(apiresponse => console.log(apiresponse))
   .catch(apierr => console.log(apierr))

  }

  componentDidMount=()=>{
    const {firstName,lastName,email} = this.props.authContext.user
    this.setState({firstName,lastName,email})
  }

  render() {
    
    return (
      <div className="Profile">
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <div className="form-group">
            <label className="label" htmlFor="firstName">
              First name
            </label>
            <input
              className="input"
              id="firstName"
              type="text"
              name="firstName"
              value={this.state.firstName}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input"
              id="lastName"
              type="text"
              name="lastName"
              value={this.state.lastName}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input className="input" id="email" type="email" name="email" value={this.state.email}/>
          </div>

          <div className="form-group">
            
          </div>

          <button className="btn-submit">Let's go!</button>
        </form>
      </div>
    );
  }
}
export default withUser(EditProfile)
