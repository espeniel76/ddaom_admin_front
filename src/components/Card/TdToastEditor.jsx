import React, { useEffect } from "react";

const TdToastEditor = (props) => {
	return (
		<tr>
			<th scope="row" className="table-active" style={{ textAlign: "center", verticalAlign: "middle" }}>
				{props.title}
			</th>
			<td colSpan="3">
				<textarea rows={4} className="form-control-sm form-control" ref={props.referer} defaultValue={props.description} />
			</td>
		</tr>
	);
};

export default TdToastEditor;
