import React from 'react';
import AddUserComponent from './AddUserComponent.jsx';
import UsersListComponent from './UsersListComponent.jsx';
import './App.css';


// TODO: Detected problems with library installations. Code may work well on my machine but not compile on another. Advice using an IDE to include all the necessary libraries.
// TODO: Moving to the cloud will help in scaling up the application as well as enabling remote clients (outside localhost) to send requests.
// TODO: Add ability to sort by clicking the headers. Add functionality for sorting to the API.


class App extends React.Component {
	constructor() {
		super();
		
		this.state = {
		    viewAddUserComponent: false
		};
		
		this.setViewAddUserComponent = this.setViewAddUserComponent.bind(this);
    }
  
    render() {
		let content = <div>
					    <div>
						  <button onClick={() => this.setViewAddUserComponent(true)}>Add New User</button>
					    </div>
					    <UsersListComponent ref="usersList"
						 				    showAddUserComponent = {() => this.showAddUserComponent()}
										    />
					  </div>
		
		if (this.state.viewAddUserComponent) {
			return (
				<div>
				  {content}
				  <AddUserComponent hasUser = {(id) => this.hasUser(id)} 
					  			    getEditedUser = {() => this.getEditedUser()}
									finish = {() => this.addUserComponent_finish()} 
									close = {() => this.addUserComponent_close()}
									/>
				</div>
			);
		}
		return (
		    <div>
			  {content}
			</div>
		);
    }
	
	addUserComponent_finish() {
		this.addUserComponent_close();
		this.refs.usersList.refresh();
	}
	
	addUserComponent_close() {
		this.setViewAddUserComponent(false);
	}
    
    setViewAddUserComponent(isVisible) {
	    this.setState({ viewAddUserComponent: isVisible });
		if (isVisible === false) {
			this.refs.usersList.clearEditedUser();
		}
    }
	
	hasUser(id) {
		return this.refs.usersList.hasUser(id);
	}
	
	getEditedUser() {
		return this.refs.usersList.getEditedUser();
	}
	
	showAddUserComponent() {
		this.setViewAddUserComponent(true);
	}
}
export default App;