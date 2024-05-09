import Priority from "../Widget/Priority";
import { FaTrash } from "react-icons/fa";

const TodoItem = ({ todo, handleDeleteTodo, toggleComplete }) => {
	const handleChange = () => {
		toggleComplete(todo.id, todo.completed);
	};
	return (
		<div className="todo-item">
			<div className="task">
				<input
					type="checkbox"
					checked={todo.completed}
					onChange={handleChange}
				/>

				<div className="details">
					<p className="task">{todo.task.toUpperCase()}</p>
					<p className="due-date">Due Date: {todo.due_date}</p>
				</div>
			</div>
			<Priority priority={todo.priority} />

			<button onClick={() => handleDeleteTodo(todo.id)}>
				<FaTrash color="black" />
			</button>
		</div>
	);
};

export default TodoItem;
