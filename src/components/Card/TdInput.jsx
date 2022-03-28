import React from "react";

const TdInput = (props) => {
	return (
		<>
			<th scope="row" className="table-active" style={{ textAlign: "center", verticalAlign: "middle" }}>
				{props.title}
			</th>
			<td colSpan={props.colSpan ? props.colSpan : "1"} className="table-light">
				<input
					type={props.inputType}
					placeholder={props.placeholder}
					className="form-control-sm form-control"
					ref={props.referer}
					defaultValue={props.defaultValue}
					disabled={props.disabled}
					readOnly={props.readOnly}
				/>
			</td>
		</>
	);
};

export default TdInput;
