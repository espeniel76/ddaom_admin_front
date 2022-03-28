import React from "react";

const TdMovie = (props) => {
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
					<div className="flex-row card">
						<img
							src={props.imgSrc}
							className="card-img-left card-img"
							style={{ width: "auto", height: "100px" }}
						/>
						<div className="card-body">
							<small className="form-text text-muted">{props.MovieUrl}</small>
							<input
								type="text"
								className="form-control-sm form-control"
								placeholder="http://youtube.com/donuts/enter/0000001a"
								ref={props.referer}
								defaultValue={props.MovieUrl}
							/>
						</div>
					</div>
				</td>
			</tr>
		</>
	);
};

export default TdMovie;
