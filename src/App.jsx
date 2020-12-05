import React from 'react';
import AddUserComponent from './AddUserComponent.jsx'
import Constants from './constants.js'


// TODO: Detected problems with library installations. Code may work well on my machine but not compile on another. Advice using an IDE to include all the necessary libraries.
// TODO: Moving to the cloud will help in scaling up the application as well as enabling remote clients (outside localhost) to send requests.
// TODO: Add graphical design to the components.
// TODO: Add ability to sort by clicking the headers. Add functionality for sorting to the API.


class App extends React.Component {
	constructor() {
		super();
		
		this.state = {
		    usersData: [],
		    viewAddUserComponent: false
		};
		
		this.setViewAddUserComponent = this.setViewAddUserComponent.bind(this);
		this.refresh = this.refresh.bind(this);
		this.updateUsersData = this.updateUsersData.bind(this);
		this.delete = this.delete.bind(this);
		
		this.refresh();
    }
  
    render() {
		const list = this.state.usersData.map((userData, index) => {
			return (
				<tr key={index}>
				  <td>{userData.id}</td>
				  <td>{userData.name}</td>
				  <td>{userData.age}</td>
				  <td>{userData.jobTitle}</td>
				  <td>
				    <button onClick={() => this.delete(userData.id)}>DELETE</button>
				  </td>
				</tr>
			)
		});
		
        return (
			<div>
			  <div>
				{this.state.viewAddUserComponent ? 
				  <AddUserComponent hasUser={(id) => this.hasUser(id)} finish={() => this.addUserComponent_finish()} close={() => this.addUserComponent_close()} /> : 
				  <button onClick={() => this.setViewAddUserComponent(true)}>Add New User</button>}
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
	
	addUserComponent_finish() {
		this.addUserComponent_close();
		this.refresh();
	}
	
	addUserComponent_close() {
		this.setViewAddUserComponent(false);
	}
  
    setViewAddUserComponent(isVisible) {
	    this.setState({ viewAddUserComponent: isVisible });
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
	
	delete(id) {
		var requestOptions = {
		    method: 'DELETE',
		    headers: { 'Content-Type': 'application/json' }
		};
		fetch(`http://localhost:27017/user/${id}`, requestOptions)
			.then(this.refresh())
		    .catch(console.log);
		this.refresh();
	}
	
	hasUser(id) {
		return this.state.usersData.find(user => user['id'] === id) !== undefined;
	}
}
export default App;