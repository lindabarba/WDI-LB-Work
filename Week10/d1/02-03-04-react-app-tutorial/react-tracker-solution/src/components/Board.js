// import library code
import React, {Component} from 'react';

// import custom components
import Lane from './Lane';
import AddTask from './AddTask';

class Board extends Component {

	constructor() {
		super();

    // We are initializing our state here
		this.state = {
			tasks: [
				{
					"id": 0,
					"title": "Learn React",
					"description": "Build a React application",
					"progressLevel": "backlog"
				},
				{
					"id": 1,
					"title": "Meditate Upon Vue.js",
					"description": "Really cool new framework",
					"progressLevel": "in-progress"
				},
				{
					"id": 2,
					"title": "Write Article About Angular 2",
					"description": "Angular 2 sucks!",
					"progressLevel": "complete"
				}
			],
			currentID: 3,
			newTaskTitle: "",
			newTaskDescription: ""
		};

	};

	// This function adds a new task to the tasks array with a progressLevel
	// of backlog
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
				tasks: [...currentState.tasks, newTask] ,
				newTaskTitle: "",
				newTaskDescription: "",
				currentID: this.state.currentID++
			}
		})

	};

	// This function updates the newTaskTitle property in state
	handleNewTaskUpdate = (e) => {
		e.preventDefault();
		this.setState({
			newTaskTitle: e.target.value
		})
	};

	// This function updates the newTaskDescription property in state
	handleNewTaskDescription = (e) => {
		e.preventDefault();
		this.setState({
			newTaskDescription: e.target.value
		})
	};

	handleTaskPromotion = (taskID, currentState) => {
		let possibleStates = ["backlog","in-progress", "complete", "archived"];
		let taskArrayClone = this.state.tasks.slice();
		let updatedTask = {
			id: taskID,
			title: taskArrayClone[taskID].title,
			description: taskArrayClone[taskID].description,
			progressLevel: taskArrayClone[taskID].progressLevel = possibleStates[possibleStates.indexOf(currentState) + 1]
		}
		taskArrayClone[taskID] = updatedTask;
		this.setState({tasks: taskArrayClone});
	};

	// Here we are rendering our 3 lanes
	render() {
		return (
			<div className="board">
				<AddTask updateTask={this.handleNewTaskUpdate}
								 updateDescription={this.handleNewTaskDescription}
								 newSubmission={this.handleNewTaskSubmission}
								 newTitle={this.state.newTaskTitle}
								 newDescription={this.state.newTaskDescription} />
				<Lane tasks={this.state.tasks}
							laneProgressLevel="backlog"
							updateState={this.handleTaskPromotion} />
				<Lane tasks={this.state.tasks}
							laneProgressLevel="in-progress"
							updateState={this.handleTaskPromotion} />
				<Lane tasks={this.state.tasks}
							laneProgressLevel="complete"
							updateState={this.handleTaskPromotion} />
			</div>
		)
	}

};

export default Board;
