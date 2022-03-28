import React from "react";
import Label from "reactstrap/lib/Label";

const DivRadioBool = (props) => {
	return (
		<>
			<Label for="Search">{props.title}</Label>&nbsp;
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
		</>
	);
};

export default DivRadioBool;
