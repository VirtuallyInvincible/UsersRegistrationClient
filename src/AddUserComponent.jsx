import React from 'react';
import './AddUserComponent.css';


// TODO: Change the layout to use a <form> element. Check if possible to set fields as required. This can help in rendering the add button disabled if a required filled is empty, and then the logic can be simplified.


const ID_FIELD_NAME = 'id';
const NAME_FIELD_NAME = 'Name';
const AGE_FIELD_NAME = 'Age';
const JOB_TITLE_FIELD_NAME = 'JobTitle';
	
	
class AddUserComponent extends React.Component {
	constructor() {
	    super();
		
		var initialFieldsToValues = {};
		initialFieldsToValues[ID_FIELD_NAME] = '';
		initialFieldsToValues[NAME_FIELD_NAME] = '';
		initialFieldsToValues[AGE_FIELD_NAME] = '';
		initialFieldsToValues[JOB_TITLE_FIELD_NAME] = '';
		this.state = {
			fieldsToValues: initialFieldsToValues
		}
		
		this.add = this.add.bind(this);
		this.valueChanged = this.valueChanged.bind(this);
    }
	
  
    render() {
		return (
			<div className='popup'>
			  <div className='popup_inner'>
			    <div className='popup_element'>
				  <input onChange={this.valueChanged} id={ID_FIELD_NAME} type='text' placeholder='ID' />
				</div>
				<div className='popup_element'>
				  <input onChange={this.valueChanged} id={NAME_FIELD_NAME} type='text' placeholder='Name' />
				</div>
				<div className='popup_element'>
				  <input onChange={this.valueChanged} id={AGE_FIELD_NAME} type='text' placeholder='Age' />
				</div>
				<div className='popup_element'>
				  <input onChange={this.valueChanged} id={JOB_TITLE_FIELD_NAME} type='text' placeholder='Job Title' />
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
		if (!this.validateData()) {
			return;
		}
		
		var requestOptions = {
		    method: 'POST',
		    headers: { 'Content-Type': 'application/json' },
		    body: JSON.stringify(this.state.fieldsToValues)
		};
		fetch(`http://localhost:27017/user`, requestOptions)
		    .catch(console.log);
		
		this.props.finish();
    }
	
	validateData() {
		var id = this.state.fieldsToValues[ID_FIELD_NAME];
		var hasId = id.length > 0;
		var hasName = this.state.fieldsToValues[NAME_FIELD_NAME].length > 0;
		var hasAge = this.state.fieldsToValues[AGE_FIELD_NAME].length > 0;
		var hasJobTitle = this.state.fieldsToValues[JOB_TITLE_FIELD_NAME].length > 0;
		var allFieldsFilled = hasId && hasName && hasAge && hasJobTitle;
		if (!allFieldsFilled) {
			alert("All fields are mandatory!");
			return false;
		}
		
		if (this.props.hasUser(id) === true) {
			alert("A user with this ID already exists.")
			return false;
		}
		
		// Other validation criteria go here...
		
		return true;
	}
	
	valueChanged(e) {
		var fieldsToValuesCopy = this.state.fieldsToValues;
		fieldsToValuesCopy[e.target.id] = e.target.value;
		this.setState({fieldsToValues: fieldsToValuesCopy});
	}
}
export default AddUserComponent;