// import library code
import React, {Component} from 'react';

class AddTask extends Component {

	render() {
		return (
			<div className="lane">
				<form onSubmit={(e) => {this.props.newSubmission(e)}}>
					<label>
						Title:
						<input type="text"
									 onChange={(e) => {this.props.updateTask(e)}}
									 value={this.props.newTitle} />
					</label>
					<br/>
					<label>
						Description:
						<input type="text"
									 onChange={(e) => {this.props.updateDescription(e)}}
									 value={this.props.newDescription} />
					</label>
					<input type="submit" value="Submit"  />
				</form>
			</div>
		)
	}

};

export default AddTask;
