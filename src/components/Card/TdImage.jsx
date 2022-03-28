import React from "react";
import consts from "../../define/consts";

const TdImage = (props) => {
	return (
		<tr>
			<th scope="row" className="table-active" style={{ textAlign: "center", verticalAlign: "middle" }}>
				{props.title}
			</th>
			<td className="table-light" colSpan="3">
				<div className="flex-row card">
					<img alt="" className="card-img-left card-img" style={{ width: "auto", height: "100px" }} id={props.id} src={props.filename && consts.urls.IMAGE_SERVER + props.filename} />
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
			</td>
		</tr>
	);
};

export default TdImage;
