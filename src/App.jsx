import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// TODO: Moving to the cloud will help in scaling up the application as well as enabling remote clients (outside localhost) to send requests.


class App extends React.Component {
  constructor() {
	super();
	
	this.state = {
	  data: 'No data available'	// TODO: Fetch data from database by calling the get all users API and displaying the results.
	};
	
	this.createNewUser = this.createNewUser.bind(this);
  }
  createNewUser() {
	// TODO : Pop up a form to enable the user to enter the details of the new user, then forward the input to the call.
	const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"id": 3, "Name": "Shai Mahfud", "Age": 34, "Job Title": "Software Engineer"})
    };
	fetch(`http://localhost:27017/user`, requestOptions)
	  .then(res => res.json())
	  .then((data) => {
	    this.setState({ data: data.Message });
	  })
	  .catch(console.log);
	// TODO: Update this.state to also show the new user by calling the get all users API and displaying the results.
	// TODO: Create a new record with the users details on the screen.
  }
  render() {
    return (
      <div>
		<button onClick={this.createNewUser}>Add New User</button>
		<br />
		<label>{this.state.data}</label>
      </div>
    );	// TODO: Should be a dynamic list populated by the users with a delete button for each record to enable deletion.
  }
}
export default App;