import React, {Component} from 'react';

class AddTask extends Component {
  render() {
    return (
        <div className="lane">
          <form onSubmit={(e) => {this.props.handleNewTaskSubmission(e)}}>
            <label>
              Title:
              <input type="text"
                onChange={(e) => {this.props.updateTitle(e)}}
                value={this.props.newTitles} />
            </label>
            <br/>
            <label>
              Description:
              <input type="text"
                  onChange={(e) => {this.props.updateDescription(e)}}
                  value={this.props.newDescription} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
  }
};

export default AddTask;
