import React from 'react';
import AddUserComponent from './AddUserComponent.jsx';
import Constants from './constants.js';
import './App.css';


// TODO: Detected problems with library installations. Code may work well on my machine but not compile on another. Advice using an IDE to include all the necessary libraries.
// TODO: Moving to the cloud will help in scaling up the application as well as enabling remote clients (outside localhost) to send requests.
// TODO: Add ability to sort by clicking the headers. Add functionality for sorting to the API.
// TODO: Consider defining the users list as a separate component on its own.
// TODO: Add an edit button on the left of the delete button. Add a new API for editing. This will complete the CRUD operations for the user registration.


class App extends React.Component {
	constructor() {
		super();
		
		this.state = {
		    usersData: [],
		    viewAddUserComponent: false,
			editedUser: undefined
		};
		
		this.setViewAddUserComponent = this.setViewAddUserComponent.bind(this);
		this.refresh = this.refresh.bind(this);
		this.updateUsersData = this.updateUsersData.bind(this);
		this.delete = this.delete.bind(this);
		this.edit = this.edit.bind(this);
		
		this.refresh();
    }
  
    render() {
		if (this.state.viewAddUserComponent) {
			return (
				<div>
					<AddUserComponent hasUser = {(id) => this.hasUser(id)} 
									  getEditedUser = {() => this.getEditedUser()}
									  finish = {() => this.addUserComponent_finish()} 
									  close = {() => this.addUserComponent_close()} />
				</div>
			)
		} else {
			const list = this.state.usersData.map((userData, index) => {
				return (
					<tr key={index}>
					  <td>{userData.id}</td>
					  <td>{userData.name}</td>
					  <td>{userData.age}</td>
					  <td>{userData.jobTitle}</td>
					  <td className='user-list-button'>
						<button onClick={() => this.edit(index)}>EDIT</button>
					  </td>
					  <td className='user-list-button'>
						<button onClick={() => this.delete(userData.id)}>DELETE</button>
					  </td>
					</tr>
				)
			});
			
			return (
				<div>
				  <div>
					<button onClick={() => this.setViewAddUserComponent(true)}>Add New User</button>
				  </div>
				  <div>
					<table>
					  <thead>
						<tr>
						  <th>
							ID
						  </th>
						  <th>
							Name
						  </th>
						  <th>
							Age
						  </th>
						  <th>
							Job Title
						  </th>
						  <th>
						  </th>
						</tr>
					  </thead>
					  <tbody>
						{list}
					  </tbody>
					</table>
					<label>{Constants.NO_DATA_TEXT}</label>
				  </div>
				</div>
			);
		}
    }
	
	addUserComponent_finish() {
		this.addUserComponent_close();
		this.refresh();
	}
	
	addUserComponent_close() {
		this.setViewAddUserComponent(false);
	}
  
    setViewAddUserComponent(isVisible) {
	    this.setState({ viewAddUserComponent: isVisible });
		if (isVisible === false) {
			this.setState({ editedUser: undefined });
		}
    }
	
	refresh() {
		fetch('http://localhost:27017/listUsers')
			.then(response => response.json())
			.then(data => this.updateUsersData(data.Data));
	}
	
	updateUsersData(newData) {
		let users = [];
		newData.forEach(user => {
                users.push({
					id: user.id,
					name: user.Name,
					age: user.Age,
					jobTitle: user.JobTitle
				});
            });
		this.setState({ usersData: users });
	}
	
	edit(index) {
		this.state.editedUser = this.state.usersData[index];
		this.setViewAddUserComponent(true);
	}
	
	delete(id) {
		var requestOptions = {
		    method: 'DELETE',
		    headers: { 'Content-Type': 'application/json' }
		};
		fetch(`http://localhost:27017/user/${id}`, requestOptions)
			.then(this.refresh())
		    .catch(console.log);
	}
	
	hasUser(id) {
		return this.state.usersData.find(user => user['id'] === id) !== undefined;
	}
	
	getEditedUser() {
		return this.state.editedUser;
	}
}
export default App;