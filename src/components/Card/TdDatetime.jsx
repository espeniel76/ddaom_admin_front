import React, { useEffect } from "react";
import Form from "reactstrap/lib/Form";
import FormGroup from "reactstrap/lib/FormGroup";

const TdDatetime = (props) => {
	return (
		<tr>
			<th
				scope="row"
				className="table-active"
				style={{ textAlign: "center", verticalAlign: "middle" }}
			>
				{props.title}
			</th>
			<td
				colSpan={props.colSpan ? props.colSpan : "1"}
				className="table-light"
				style={{ textAlign: "center", verticalAlign: "middle" }}
			>
				<Form inline>
					<FormGroup>
						<input
							type="datetime-local"
							placeholder="date placeholder"
							ref={props.refererStart}
							className="form-control-sm form-control"
						/>
						&nbsp; ~ &nbsp;
						<input
							type="datetime-local"
							placeholder="date placeholder"
							className="form-control-sm form-control"
							ref={props.refererEnd}
						/>
					</FormGroup>
				</Form>
			</td>
		</tr>
	);
};

export default TdDatetime;
