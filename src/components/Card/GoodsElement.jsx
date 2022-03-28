import React, { useRef, useState } from "react";
import consts from "../../define/consts";
import {
	Button,
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Col,
} from "reactstrap";

const GoodsElement = (props) => {
	const refButton = useRef();
	const [isSelect, setIsSelect] = useState(true);
	function fnClick() {
		setIsSelect(!isSelect);
		if (isSelect) {
			refButton.current.classList.remove("btn-outline-secondary");
			refButton.current.classList.add("btn-secondary");
		} else {
			refButton.current.classList.remove("btn-secondary");
			refButton.current.classList.add("btn-outline-secondary");
		}
	}
	return (
		<Col md={6} sm={6} xs={12} className="mb-3">
			<Card className="flex-row">
				<CardImg
					className="card-img-left"
					style={{ width: "auto", height: 100 }}
					src={consts.urls.IMAGE_SERVER + props.imageUrl}
				/>
				<CardBody>
					<CardTitle>{props.name}</CardTitle>
					<CardText>
						시작가: {props.price}원 &nbsp;
						<button
							className="btn btn-outline-secondary btn-sm"
							ref={refButton}
							size="sm"
							onClick={fnClick}
						>
							Choice
						</button>
					</CardText>
				</CardBody>
			</Card>
		</Col>
	);
};

export default GoodsElement;
