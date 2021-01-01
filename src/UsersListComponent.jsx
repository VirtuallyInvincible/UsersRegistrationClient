import React from 'react';
import './UsersListComponent.css';
import Constants from './constants.js';


class UsersListComponent extends React.Component {
	constructor() {
		super();
		
		this.state = {
		    usersData: [],
			editedUser: undefined
		};
		
		this.refresh = this.refresh.bind(this);
		this.updateUsersData = this.updateUsersData.bind(this);
		this.hasUser = this.hasUser.bind(this);
		this.delete = this.delete.bind(this);
		this.edit = this.edit.bind(this);
		
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
				  <td className='user-list-button'>
					<button onClick={() => this.edit(index)}>EDIT</button>
				  </td>
				  <td className='user-list-button'>
					<button onClick={() => this.delete(index, userData.id)}>DELETE</button>
				  </td>
				</tr>
			)
		});
		
		return (
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
		);
    }
	
	edit(index) {
		this.setState({ editedUser: this.state.usersData[index] });
		this.props.showAddUserComponent();
	}
	
	delete(index, id) {
		var requestOptions = {
		    method: 'DELETE',
		    headers: { 'Content-Type': 'application/json' }
		};
		fetch(`http://localhost:27017/user/${id}`, requestOptions)
			.then(data => {
				this.state.usersData.splice(index, 1);
				this.setState({ usersData: this.state.usersData });
			})
		    .catch(console.log);
	}
	
	refresh() {
		fetch('http://localhost:27017/listUsers')
			.then(response => response.json())
			.then(data => this.updateUsersData(data.Data));
	}
	
	getEditedUser() {
		return this.state.editedUser;
	}
	
	clearEditedUser() {
		this.setState({ editedUser: undefined });
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
	
	hasUser(id) {
		return this.state.usersData.find(user => user['id'] === id) !== undefined;
	}
}
export default UsersListComponent;