import React from "react";

const TdTextArea = (props) => {
	return (
		<>
			<tr>
				<th
					scope="row"
					className="table-active"
					style={{ textAlign: "center", verticalAlign: "middle" }}
				>
					{props.title}
				</th>
				<td className="table-light" colSpan="3">
					<textarea
						placeholder={props.placeholder}
						className="form-control-sm form-control"
						style={{ width: "100%", height: "100px" }}
						ref={props.referer}
						defaultValue={props.defaultValue}
						readOnly={props.readOnly}
					></textarea>
				</td>
			</tr>
		</>
	);
};

export default TdTextArea;
