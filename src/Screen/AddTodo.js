import { Button, Modal, Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../Context/LoginContext";

const AddTodo = ({ show, handleClose, handleAddTodo, uuid }) => {
	const [task, setTask] = useState("");
	const [date, setDate] = useState("");
	const [priority, setPriority] = useState("");

	const priorityEnum = ["Low", "Medium", "High"];

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add Todo</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Task</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Task"
							onChange={(event) => setTask(event.target.value)}
						/>
						<Form.Group controlId="formBasicDate">
							<Form.Label>Due Date</Form.Label>
							<Form.Control
								type="date"
								placeholder="Enter Date"
								onChange={(event) => setDate(event.target.value)}
							/>
						</Form.Group>
						{true && (
							<Form.Group controlId="formBasicPriority">
								<Form.Label>Priority</Form.Label>
								<Form.Control
									as="select"
									onChange={(event) => setPriority(event.target.value)}
								>
									<option value="">Select Priority</option>
									{priorityEnum.map((priority) => (
										<option key={priority} value={priority}>
											{priority}
										</option>
									))}
								</Form.Control>
							</Form.Group>
						)}
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="primary"
					type="submit"
					onClick={() => {
						handleAddTodo({
							uuid: uuid,
							task: task,
							date: date,
							priority: priority,
						});
						handleClose();
					}}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddTodo;
