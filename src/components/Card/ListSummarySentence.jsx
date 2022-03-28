import React, { useRef, useContext } from "react";
import Button from "reactstrap/lib/Button";
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import Form from "reactstrap/lib/Form";
import { useHistory } from "react-router-dom";
import oStyle from "../../define/styles";

const ListSummarySentence = (props) => {
	let info = props.pageInfo.pageInfos;
	info.nowPage = info.nowPage === 0 ? 1 : info.nowPage;
	info.totalPage = Math.ceil(info.totalCount / info.pageSize);
	let myRound = Math.floor(info.nowPage / info.pageSize);
	info.startPage = myRound * info.pageSize;
	info.endPage = info.startPage + info.pageListSize - 1;

	const refPageSize = useRef(null);
	const refBasic = useRef("All");
	const refActive = useRef("All");
	const history = useHistory();

	function fnSearch(e) {
		if (e) e.preventDefault();
		props.search();
	}

	let options = [];
	for (let i = 5; i <= 30; i += 5) {
		options.push(i);
	}

	return (
		<Form inline>
			<FormGroup style={oStyle.sentenceStyleSelect}>
				{props.registUrl && (
					<Button
						style={oStyle.sentenceStyleBtn}
						color="secondary"
						size="sm"
						onClick={() => {
							history.push(props.registUrl);
						}}
					>
						등록
					</Button>
				)}
				&nbsp;
				<Label style={oStyle.sentenceStyleInput}>
					건수: {info.totalCount}건 | 총 페이지: {info.totalPage} | 현재 페이지: {info.nowPage}
				</Label>
				&nbsp; &nbsp; 페이지당&nbsp;
				<select
					style={oStyle.sentenceStyleSelect}
					type="select"
					className="form-control-sm form-control"
					ref={refPageSize}
					defaultValue={info.pageSize}
					onChange={() => {
						info.pageSize = refPageSize.current.value;
						fnSearch();
					}}
				>
					{options.map((val) => (
						<option value={val} key={val}>
							{val} 개
						</option>
					))}
				</select>
				&nbsp; &nbsp; 활성여부&nbsp;
				<select
					style={oStyle.sentenceStyleSelect}
					type="select"
					ref={refActive}
					className="form-control-sm form-control"
					onChange={() => {
						props.pageInfo.searchParams.activeYn = refActive.current.value;
						fnSearch();
					}}
				>
					<option value="All">전체</option>
					<option value="Y">활성</option>
					<option value="N">비활성</option>
				</select>
				&nbsp; &nbsp; 작성자&nbsp;
				<select
					style={oStyle.sentenceStyleSelect}
					type="select"
					ref={refBasic}
					className="form-control-sm form-control"
					onChange={() => {
						props.pageInfo.searchParams.basicYn = refBasic.current.value;
						fnSearch();
					}}
				>
					<option value="All">전체</option>
					<option value="User">사용자</option>
					<option value="Admin">관리자</option>
				</select>
			</FormGroup>
		</Form>
	);
};

export default ListSummarySentence;
