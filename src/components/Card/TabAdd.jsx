import React, { useRef, useContext } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { UserContext } from "../../store/users";
import Button from "reactstrap/lib/Button";
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import Form from "reactstrap/lib/Form";
import consts from "../../define/consts";

const TabAdd = (props) => {
	const ctx = useContext(UserContext);
	const refTabName = useRef(null);

	function fnInit(e) {
		if (e) e.preventDefault();
		refTabName.current.value = "";
	}

	function fnSearch(e) {
		if (e) e.preventDefault();
		let tabName = refTabName.current;
		ctx.search = tabName.value;
		props.search();
		refTabName.current.value ="";
	}

	return (
		<Row>
			<Col>
				<Card>
					<CardBody>
						<Form inline>
							<FormGroup>
								<Label for="Search">Tab 이름</Label>&nbsp;
								<input
									type="text"
									placeholder="Tab 이름을 입력 하세요."
									className="form-control-sm form-control"
									ref={refTabName}
									defaultValue={ctx.searchParams.search}
								/>
								&nbsp;&nbsp;
								<Button color="success" size="sm" onClick={fnInit}>
									초기화
								</Button>
								&nbsp;&nbsp;
								<Button color="primary" size="sm" onClick={fnSearch}>
									등록
								</Button>
							</FormGroup>
						</Form>
						{/* <div style={{ height: 10 }}></div>
						<Form inline>
							<FormGroup>
								
							</FormGroup>
						</Form> */}
					</CardBody>
				</Card>
			</Col>
		</Row>
	);
};

export default TabAdd;
