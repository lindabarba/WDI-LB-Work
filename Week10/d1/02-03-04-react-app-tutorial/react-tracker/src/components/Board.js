import React, {Component} from 'react';
import initialData from './../initialData';
import Lane from './Lane';
import AddTask from './AddTask';

class Board extends Component {
  constructor() {
    super();
    this.state = initialData;
  }

  handleNewTaskSubmission = (e) => {
    e.preventDefault();

    let newTask = {
      id: this.state.currentID++,
      title: this.state.newTaskTitle,
      description: this.state.newTaskDescription,
      progressLevel: "backlog"
    }

    this.setState((currentState) => {
      return {
        task: [...currentState.task, newTask],
        newTaskTitle: "",
        newTaskDescription: "",
        currentID: this.state.currentID++
      }
    })
  };

  handleTitleUpdate = (e) => {
    e.preventDefault();
    this.setState({
      newTaskTitle: e.target.value
    })
  };

  handleDescriptionUpdate = (e) => {
    e.preventDefault();
    this.setState({
      newTaskDescription: e.target.value
    })
  };

  handleTaskPromotion = (taskID, currentState) => {
    let possibleStates = ["backlog", "in-progress", "complete"];
    let taskArrayClone = this.state.task.slice();
    let updateTask = {
      id: taskID,
      title: taskArrayClone[taskID].title,
      description: taskArrayClone[taskID].description,
      progressLevel: taskArrayClone[taskID].progressLevel = possibleStates[possibleStates.indexOf(currentState) +1]
    }
    taskArrayClone[taskID] = updateTask;
    this.setState({tasks: taskArrayClone});
  }

  render() {
    return (
        <div className="board">
          <AddTask
            newDescription={this.state.newTaskDescription}
            handleNewTaskSubmission={this.handleNewTaskSubmission}
            newTitle={this.state.newTaskTitle}
            updateDescription={this.handleDescriptionUpdate}
            updateTitle={this.handleTitleUpdate}
            handleTaskPromotion={this.state.handleTaskPromotion}
             />
          <Lane tasks={this.state.task} laneProgressLevel="backlog" updateState={this.handleTaskPromotion} />
          <Lane tasks={this.state.task} laneProgressLevel="in-progress" updateState={this.handleTaskPromotion} />
          <Lane tasks={this.state.task} laneProgressLevel="complete" updateState={this.handleTaskPromotion} />
        </div>
    )
  }
};

export default Board;
