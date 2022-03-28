import React from "react";

const TdSelect = (props) => {
	return (
		<>
			<th scope="row" className="table-active">
				{props.title}
			</th>
			<td className="table-light">
				<select
					className="form-control-sm form-control"
					ref={props.referer}
					defaultValue={props.defaultValue}
				>
					{props.list.map((o) => (
						<option
							value={eval("o." + props.optionKey)}
							key={eval("o." + props.optionKey)}
						>
							{eval("o." + props.optionValue)}
						</option>
					))}
				</select>
			</td>
		</>
	);
};

export default TdSelect;
