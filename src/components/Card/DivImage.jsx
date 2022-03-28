import React from "react";
import consts from "../../define/consts";

const DivImage = (props) => {
	return (
		<div>
			<div scope="row" className="table-active">
				{props.title}
			</div>
			<div className="table-light" colSpan="3">
				<div className="flex-row card">
					<img
						className="card-img-left card-img"
						style={{ width: "auto", height: "100px" }}
						id={props.id}
						src={props.filename && consts.urls.IMAGE_SERVER + props.filename}
					/>
					<div className="card-body">
						<small className="form-text text-muted" id={props.id + "Txt"}>
							{props.filename}
						</small>
						<input
							type="file"
							className="form-control-file form-control-sm"
							ref={props.referer}
							onChange={(e) => {
								props.imageLoad(e.target, props.id);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DivImage;
