import React, { useRef, useState } from "react";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import ModalHeader from "reactstrap/lib/ModalHeader";
import { Card, CardBody, Col, Row } from "reactstrap";
import Button from "reactstrap/lib/Button";
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import Form from "reactstrap/lib/Form";

import consts from "../../define/consts";
import GoodsElement from "./../Card/GoodsElement";
import { Ajax } from "../../utils/ajax";
import { HttpMethod } from "../../models/consts";

const SelectGoods = (props) => {
	const [list, setList] = useState([]);

	const refCategory = useRef();
	const refName = useRef();

	async function fnSearch() {
		let Category = refCategory.current;
		let Name = refName.current;

		// 검색어에 따른 검색 결과 조회
		let result = await Ajax.runGet({
			url: `goodsAll?SeqCategory=${Category.value}&Search=${Name.value}`,
			method: HttpMethod.GET,
		});
		setList(result.Data);
	}

	function fnSelect() {
		// 선택로직 담기
		props.setGoodsList(list);

		props.toggle();
	}
	return (
		<Modal
			isOpen={props.isModal}
			toggle={props.toggle}
			backdrop={props.backdrop}
			centered
			size="lg"
			style={{ maxWidth: "1200px", width: "100%" }}
		>
			<ModalHeader toggle={props.toggle}>애장품 선택</ModalHeader>
			<ModalBody>
				<Row>
					<Col>
						<Card>
							<CardBody>
								<Form inline>
									<FormGroup>
										<Label for="periodType">기간검색</Label>&nbsp;
										<select
											className="form-control-sm form-control"
											ref={refCategory}
										>
											<option value="0">전체</option>
											{props.categoryList.map((item) => (
												<option value={item.SeqCategory} key={item.SeqCategory}>
													{item.Name}
												</option>
											))}
										</select>
										&nbsp;
										<input
											type="text"
											placeholder="검색어를 입력하세요."
											className="form-control-sm form-control"
											ref={refName}
										/>
										&nbsp;
										<Button color="success" size="sm" onClick={fnSearch}>
											조회
										</Button>
									</FormGroup>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<div style={{ height: "10px" }}></div>
				<Row>
					{list.map((item) => (
						<GoodsElement
							imageUrl={item.Thumbnail}
							name={item.Name}
							price={item.AuctionStartPrice}
							key={item.SeqGood}
						/>
					))}
				</Row>
			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={fnSelect}>
					선택
				</Button>{" "}
				<Button color="secondary" onClick={props.toggle}>
					취소
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default SelectGoods;
