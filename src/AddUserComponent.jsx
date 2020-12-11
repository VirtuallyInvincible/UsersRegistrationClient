import React from 'react';
import ReactDOM from 'react-dom';
import './AddUserComponent.css';


// TODO: The user should not be able to press Add before all mandatory fields have been filled


class AddUserComponent extends React.Component {
    constructor() {
	    super();
		
		this.add = this.add.bind(this);
    }
  
    render() {
		return (
			<div className='popup'>
			  <div className='popup_inner'>
			    <div className='popup_element'>
				  <input ref='id' type='text' placeholder='ID' />
				</div>
				<div className='popup_element'>
				  <input ref='name' type='text' placeholder='Name' />
				</div>
				<div className='popup_element'>
				  <input ref='age' type='text' placeholder='Age' />
				</div>
				<div className='popup_element'>
				  <input ref='jobTitle' type='text' placeholder='Job Title' />
				</div>
				<div className='popup_element'>
				  <button onClick={this.add}>Add</button>
				  <button onClick={this.props.close}>Close</button>
			    </div>
			  </div>
			</div>
		);
    }
  
    add() {
		var id = ReactDOM.findDOMNode(this.refs.id).value;
		if (this.props.hasUser(id) == true) {
			alert("A user with this ID already exists.")
			return;
		}
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
		
		this.props.finish();
    }
}
export default AddUserComponent;