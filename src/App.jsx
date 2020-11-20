import React from 'react';
import AddUserComponent from './AddUserComponent.jsx'
import Constants from './constants.js'


// TODO: Moving to the cloud will help in scaling up the application as well as enabling remote clients (outside localhost) to send requests.


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
				</tr>
			)
		});
		
        return (
			<div>
			  <div>
				{this.state.viewAddUserComponent ? 
				  <AddUserComponent finish={() => this.setViewAddUserComponent(false)} /> : 
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
  
    setViewAddUserComponent(isVisible) {
	    this.setState({ viewAddUserComponent: isVisible });
	    if (!isVisible) {
		    this.refresh();
	    }
    }
	
	refresh() {
		fetch('http://localhost:27017/listUsers')
			.then(response => response.json())
			.then(data => this.updateUsersData(data.Data));
	}
	
	updateUsersData(newData) {
		console.log(newData);
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
}
export default App;