import React from "react";

const TdRadioBoolNoTitle = (props) => {
	let idxFirst = props.number - 2;
	let idxSecond = props.number - 1;
	return (
		<div role="group" className="btn-group">
			<button
				type="button"
				className="btn btn-primary btn-sm"
				onClick={() => {
					props.click(idxFirst, idxSecond, true);
				}}
				style={{ fontFamily: "gulim", fontSize: "9pt", fontWeight: "bold" }}
				ref={props.referer[idxFirst]}
			>
				Y
			</button>
			<button
				type="button"
				className="btn btn-primary btn-sm"
				onClick={() => {
					props.click(idxSecond, idxFirst, false);
				}}
				style={{ fontFamily: "gulim", fontSize: "9pt", fontWeight: "bold" }}
				ref={props.referer[idxSecond]}
			>
				N
			</button>
		</div>
	);
};

export default TdRadioBoolNoTitle;
