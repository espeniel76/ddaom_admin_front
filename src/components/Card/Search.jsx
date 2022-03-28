import React, { useRef, useContext } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { UserContext } from "../../store/users";
import Button from "reactstrap/lib/Button";
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import Form from "reactstrap/lib/Form";
import consts from "../../define/consts";

const Search = (props) => {
	const ctx = useContext(UserContext);

	const refPeriodType = useRef(null);
	const refStartDate = useRef(null);
	const refEndDate = useRef(null);
	const refActiveYn = useRef(null);
	const refSearch = useRef(null);

	function fnInit(e) {
		if (e) e.preventDefault();

		refPeriodType.current.value = "All";
		refStartDate.current.value = null;
		refEndDate.current.value = null;
		refSearch.current.value = "";
		refActiveYn.current.value = "All";

		ctx.pageInfos.nowPage = consts.init.NOW_PAGE;
		ctx.pageInfos.pageSize = consts.init.PAGE_SIZE;
		ctx.pageInfos.pageListSize = consts.init.PAGE_LIST_SIZE;
		fnSearch();
	}

	function fnSearch(e) {
		if (e) e.preventDefault();
		let periodType;
		let startDate;
		let endDate;
		let activeYn;
		let search;

		periodType = refPeriodType.current;
		startDate = refStartDate.current;
		endDate = refEndDate.current;
		activeYn = refActiveYn.current;
		search = refSearch.current;

		ctx.searchParams.periodType = periodType.value;
		ctx.searchParams.startDate = startDate.value;
		ctx.searchParams.endDate = endDate.value;
		ctx.searchParams.activeYn = activeYn.value;
		ctx.searchParams.search = search.value;

		if (periodType.value !== "All") {
			if (startDate.value.length < 1) {
				alert("시작 날짜를 선택하세요");
				startDate.focus();
				return false;
			}
			if (endDate.value.length < 1) {
				alert("종료 날짜를 선택하세요");
				endDate.focus();
				return false;
			}
		}
		props.search();
	}

	function fnCommonElements() {
		return (
			<>
				<Label for="periodType">기간검색</Label>&nbsp;
				<select ref={refPeriodType} className="form-control-sm form-control" defaultValue={ctx.searchParams.periodType ? ctx.searchParams.periodType : null}>
					<option value="All">전체</option>
					<option value="created_at">등록일</option>
					<option value="updated_at">수정일</option>
				</select>
				&nbsp;
				<input type="date" placeholder="date placeholder" ref={refStartDate} className="form-control-sm form-control" defaultValue={ctx.searchParams.startDate} />
				&nbsp;
				<input type="date" placeholder="date placeholder" className="form-control-sm form-control" ref={refEndDate} defaultValue={ctx.searchParams.endDate} />
			</>
		);
	}

	return (
		<Row>
			<Col>
				<Card>
					<CardBody>
						<Form inline>
							<FormGroup>
								{fnCommonElements()}
								&nbsp;&nbsp;&nbsp;
								<Label for="ActiveYn">노출여부</Label>&nbsp;
								<select type="select" className="form-control-sm form-control" ref={refActiveYn} defaultValue={ctx.searchParams.activeYn}>
									<option value="All">전체</option>
									<option value="Y">Y</option>
									<option value="N">N</option>
								</select>
								&nbsp;&nbsp;&nbsp;
								<Label for="Search">검색</Label>&nbsp;
								<input type="text" placeholder="검색어를 입력 하세요." className="form-control-sm form-control" ref={refSearch} defaultValue={ctx.searchParams.search} />
							</FormGroup>
						</Form>
						<div style={{ height: 10 }}></div>
						<Form inline>
							<FormGroup>
								<Button color="success" size="sm" onClick={fnInit}>
									초기화
								</Button>
								&nbsp;
								<Button color="primary" size="sm" onClick={fnSearch}>
									검색
								</Button>
							</FormGroup>
						</Form>
					</CardBody>
				</Card>
			</Col>
		</Row>
	);
};

export default Search;
