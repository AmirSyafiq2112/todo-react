import { useEffect, useState } from "react";
import Todo from "./Screen/Todo";
import Login from "./Authentication/Login";
import { LoginContext } from "./Context/LoginContext";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabase_url = process.env.REACT_APP_SUPABASE_URL;
const supabase_key = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabase_url, supabase_key);

const Home = () => {
	const navigate = useNavigate();

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState([]);
	const [todos, setTodos] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [priorityEnum, setPriorityEnum] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleLogin = (event) => {
		event.preventDefault();
		if (username === "" || password === "") {
			alert("Please fill in all fields");
			return;
		} else {
			supabase.auth
				.signInWithPassword({ email: username, password: password })
				.then((response) => {
					if (response.error) {
						alert(response.error.message);
					} else {
						setIsLoggedIn(true);
						handleGetUser();
					}
				});
		}
	};

	const handleGetUser = async () => {
		await supabase.auth.getUser().then((response) => {
			if (response.error) {
				alert(response.error.message);
			} else {
				setUser(response.data);
				setIsLoggedIn(true);
				return response.data;
			}
		});
	};

	const handleGetTodo = async (uuid) => {
		await supabase
			.from("todo_list")
			.select("*")
			.eq("user_uuid", "18b77e75-00d2-4930-9b56-9aecf955fe4d")
			.then((response) => {
				if (response.error) {
					console.log(response.error.message);
				} else {
					return response.data;
				}
			})
			.then((data) => {
				setTodos(data);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const handleAddTodo = async ({ uuid, task, date, priority }) => {
		setLoading(true);
		await supabase
			.from("todo_list")
			.insert([
				{
					user_uuid: "18b77e75-00d2-4930-9b56-9aecf955fe4d",
					task: task,
					due_date: date,
					priority: priority,
				},
			])
			.select()
			.then((response) => {
				if (response.error) {
					alert(response.error.message);
				} else {
					const newTodo = {
						id: response.data[0].id,
						task: task,
						date: date,
						priority: priority,
					};
					setTodos([...todos, newTodo]);
					return response.data;
				}
			});

		// console.log(data, error);
		// if (error) {
		// 	alert(error.message);
		// } else {
		// 	alert("Todo added successfully");
		// 	setLoading(false);
		// 	// const newTodo = { id: data[0].id, task: task, date: date, priority: priority };
		// 	// setTodos([...todos, newTodo]);
		// }
	};

	const handleDeleteTodo = async (id) => {
		await supabase
			.from("todo_list")
			.delete()
			.eq("id", id)
			.then((response) => {
				if (response.error) {
					alert(response.error.message);
				} else {
					const newTodos = todos.filter((todo) => todo.id !== id);
					setTodos(newTodos);
				}
			});
	};

	const handleLogout = async () => {
		// Perform logout logic here
		await supabase.auth.signOut();
		// Redirect or update state as needed
		setIsLoggedIn(false);
		navigate("/");
	};

	const toggleComplete = async (id, status) => {
		setLoading(true);
		await supabase
			.from("todo_list")
			.update({ completed: !status })
			.eq("id", id)
			.then((response) => {
				if (response.error) {
					alert(response.error.message);
				} else {
					alert("Task status updated successfully");
				}
				setLoading(false);
				todos.map((todo) => {
					if (todo.id === id) {
						todo.completed = !status;
					}
					return todo;
				});
			});
	};

	useEffect(() => {
		handleGetTodo();
	}, []);

	return (
		<div className="home">
			<LoginContext.Provider value={{ priorityEnum }}>
				<h1 className="header">TODO LIST</h1>
				{/* {isLoggedIn ? ( */}
				<Todo
					user={user}
					todos={todos}
					handleGetTodo={handleGetTodo}
					handleAddTodo={handleAddTodo}
					handleDeleteTodo={handleDeleteTodo}
					handleLogout={handleLogout}
					toggleComplete={toggleComplete}
				/>
				{/* ) : (
					<Login
						handleLogin={handleLogin}
						setUsername={setUsername}
						setPassword={setPassword}
					/>
				)} */}
			</LoginContext.Provider>
		</div>
	);
};

export default Home;
