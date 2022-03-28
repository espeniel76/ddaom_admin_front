import React from "react";

const TdRadioBool = (props) => {
	if (props.thisPageName !== "" && props.thisPageName !== undefined) {
		return (
			<>
				<td colSpan={props.colSpan ? props.colSpan : "1"} className="table-light">
					<div role="group" className="btn-group">
						<button
							type="button"
							className="btn btn-primary btn-sm"
							id={props.defaultValue}
							onClick={() => {
								props.click(true, props.defaultValue);
							}}
							ref={props.referer[0]}
						>
							Yes
						</button>
						<button
							type="button"
							className="btn btn-primary btn-sm active"
							id={props.defaultValue}
							onClick={() => {
								props.click(false, props.defaultValue);
							}}
							ref={props.referer[1]}
						>
							No
						</button>
					</div>
				</td>
			</>
		);
	} else {
		return (
			<>
				<th scope="row" className="table-active" style={{ textAlign: "center", verticalAlign: "middle" }}>
					{props.title}
				</th>

				<td colSpan={props.colSpan ? props.colSpan : "1"} className="table-light">
					<div role="group" className="btn-group">
						<button
							type="button"
							className="btn btn-primary btn-sm"
							onClick={() => {
								props.click(true);
							}}
							ref={props.referer[0]}
						>
							Yes
						</button>
						<button
							type="button"
							className="btn btn-primary btn-sm active"
							onClick={() => {
								props.click(false);
							}}
							ref={props.referer[1]}
						>
							No
						</button>
					</div>
				</td>
			</>
		);
	}
};

export default TdRadioBool;
