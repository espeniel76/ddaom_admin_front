import React from "react";
import consts from "../../define/consts";

const TdImageItem = (props) => {
	if (props.name === "bid") {
		return (
			<tr>
				<th scope="row" className="table-active" colSpan="3">
					상품이미지&nbsp;
				</th>
				<td className="table-light" colSpan="3">
					<div className="flex-row card">
						<img
							className="card-img-left card-img"
							style={{ width: "auto", height: "100px" }}
							src={props.url && consts.urls.IMAGE_SERVER + props.url}
							id={props.id + "addImage"}
						/>
						<div className="card-body">
							<small
								className="form-text text-muted"
								id={props.id + "addImage" + "Txt"}
							></small>
							<input
								type="file"
								className="form-control-file form-control-sm"
								onChange={(e) => {
									props.imageLoad(e.target, props.id + "addImage");
								}}
								id={props.id + "_file"}
								ref={(ref) => props.refList.current.push(ref)}
							/>
						</div>
					</div>
				</td>
			</tr>
		);
	}
	return (
		<tr>
			<th
				scope="row"
				className="table-active"
				style={{ textAlign: "center", verticalAlign: "middle" }}
			>
				이미지 등록&nbsp;
				<button
					className="btn btn-outline-secondary btn-sm"
					onClick={() => {
						props.fnSubImage(props.id, props.name);
					}}
				>
					-
				</button>
			</th>
			<td className="table-light" colSpan="3">
				<div className="flex-row card">
					<img
						className="card-img-left card-img"
						style={{ width: "auto", height: "100px" }}
						src={props.url && consts.urls.IMAGE_SERVER + props.url}
						id={props.id + "addImage"}
					/>
					<div className="card-body">
						<small
							className="form-text text-muted"
							id={props.id + "addImage" + "Txt"}
						>
							{props.name}
						</small>
						<input
							type="file"
							className="form-control-file form-control-sm"
							onChange={(e) => {
								props.imageLoad(e.target, props.id + "addImage");
							}}
							id={props.id + "_file"}
							ref={(ref) => props.refList.current.push(ref)}
						/>
					</div>
				</div>
			</td>
		</tr>
	);
};

export default TdImageItem;
