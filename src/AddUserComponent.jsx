import React from 'react';
import ReactDOM from 'react-dom';


class AddUserComponent extends React.Component {
    constructor() {
	    super();
	
		this.add = this.add.bind(this);
    }
  
    render() {
		return (
		// TODO: This div should be a form that validates the input fields. If not all fields have been entered, the request should fail.
		// TODO: If the ID entered already exists in the database, an error message should be displayed
			<div>
			  <input ref='id' type='text' placeholder='ID' />
			  <br />
			  <input ref='name' type='text' placeholder='Name' />
			  <br />
			  <input ref='age' type='text' placeholder='Age' />
			  <br />
			  <input ref='jobTitle' type='text' placeholder='Job Title' />
			  <br />
			  <button onClick={this.add}>Add</button>
		    </div>
		);
    }
  
    add() {
		var id = ReactDOM.findDOMNode(this.refs.id).value;
		var name = ReactDOM.findDOMNode(this.refs.name).value;
		var age = ReactDOM.findDOMNode(this.refs.age).value;
		var jobTitle = ReactDOM.findDOMNode(this.refs.jobTitle).value;
		var requestOptions = {
		    method: 'POST',
		    headers: { 'Content-Type': 'application/json' },
		    body: JSON.stringify({'id': id, 'Name': name, 'Age': age, 'JobTitle': jobTitle})
		};
		fetch(`http://localhost:27017/user`, requestOptions)
		    .catch(console.log);
		
		// TODO: Bug - when returning to the previous screen, the list does not get refreshed until F5 is pressed
		this.props.finish();
    }
}
export default AddUserComponent;