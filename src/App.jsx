import React from 'react';
import AddUserComponent from './AddUserComponent.jsx'


// TODO: Moving to the cloud will help in scaling up the application as well as enabling remote clients (outside localhost) to send requests.


class App extends React.Component {
    constructor() {
		super();
		
		this.state = {
		    data: 'No data available',	// TODO: Fetch data from database by calling the get all users API and displaying the results.
		    viewAddUserComponent: false
		};
		
		this.setViewAddUserComponent = this.setViewAddUserComponent.bind(this);
		this.refresh = this.refresh.bind(this);
		
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
		// TODO: Fetch data from server and refresh the component that displays the results
		// TODO: Should be a dynamic list populated by the users with a delete button for each record to enable deletion.
	}
}
export default App;