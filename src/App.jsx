import React from 'react';
import AddUserComponent from './AddUserComponent.jsx'
import Constants from './constants.js'


// TODO: Moving to the cloud will help in scaling up the application as well as enabling remote clients (outside localhost) to send requests.


class App extends React.Component {
	constructor() {
		super();
		
		this.state = {
		    data: Constants.NO_DATA_TEXT,
		    viewAddUserComponent: false
		};
		
		this.setViewAddUserComponent = this.setViewAddUserComponent.bind(this);
		this.refresh = this.refresh.bind(this);
		this.updateUsersData = this.updateUsersData.bind(this);
		
		this.refresh();
    }
  
    render() {
        return (
			<div>
			  <div>
				{this.state.viewAddUserComponent ? 
				  <AddUserComponent finish={() => this.setViewAddUserComponent(false)} /> : 
				  <button onClick={() => this.setViewAddUserComponent(true)}>Add New User</button>}
			  </div>
			  <div>
				<label>{this.state.data}</label>
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
		this.setState({ data: newData.length == 0 ? Constants.NO_DATA_TEXT : newData });
		// TODO: Should be a dynamic list populated by the users with a delete button for each record to enable deletion.
	}
}
export default App;