import { Badge } from "react-bootstrap";

const Priority = ({ priority }) => {
	if (priority === "High") {
		return (
			<div className="priority">
				<Badge bg="danger">{priority}</Badge>
			</div>
		);
	} else if (priority === "Medium") {
		return (
			<div className="priority">
				<Badge bg="warning">{priority}</Badge>
			</div>
		);
	} else {
		return (
			<div className="priority">
				<Badge bg="success">{priority}</Badge>
			</div>
		);
	}
};

export default Priority;
