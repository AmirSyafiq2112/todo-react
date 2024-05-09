import { useState } from "react";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

const Todo = ({
	// user,
	todos,
	// setTodos,
	handleAddTodo,
	handleDeleteTodo,
	// handleGetUser,
	// handleLogout,
	toggleComplete,
}) => {
	const [show, setShow] = useState(false);

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	return (
		<div className="todo">
			<div className="todos-header">
				{/* <h2>Hi {user.email}</h2> */}
				<button className="todos-modal" onClick={handleShow}>
					Add Task
				</button>
				<AddTodo
					show={show}
					handleClose={handleClose}
					handleAddTodo={handleAddTodo}
				/>
			</div>
			<div className="todos-body">
				{todos &&
					todos.map((todo) => {
						return (
							<TodoItem
								key={todo.id}
								todo={todo}
								handleDeleteTodo={handleDeleteTodo}
								toggleComplete={toggleComplete}
							/>
						);
					})}
			</div>

			{/* <button onClick={handleLogout}>Logout</button> */}
		</div>
	);
};

export default Todo;
