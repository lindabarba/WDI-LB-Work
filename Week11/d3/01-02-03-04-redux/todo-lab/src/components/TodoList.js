import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
        <Todo
          key={todo.id}
          /* Todo = ({ onClick, completed, text})
            this is what is being passed below from Todo*/
          { ...todo }
          onClick={() => onTodoClick(todo.id)}
        />
      )}
  </ul>
)

export default TodoList
