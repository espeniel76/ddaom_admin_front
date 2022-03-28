import React, { useRef, useContext } from "react";
import Button from "reactstrap/lib/Button";
import FormGroup from "reactstrap/lib/FormGroup";
import Label from "reactstrap/lib/Label";
import Form from "reactstrap/lib/Form";
import { useHistory } from "react-router-dom";

const ListSummary = (props) => {
	let info = props.pageInfo.pageInfos;
	const refPageSize = useRef(null);
	const history = useHistory();

	function fnSearch(e) {
		if (e) e.preventDefault();
		props.search();
	}

	let options = [];
	for (let i = 5; i <= 30; i += 5) {
		options.push(i);
	}

	info.nowPage = info.nowPage === 0 ? 1 : info.nowPage;
	info.totalPage = Math.ceil(info.totalCount / info.pageSize);
	let myRound = Math.floor(info.nowPage / info.pageSize);
	info.startPage = myRound * info.pageSize;
	info.endPage = info.startPage + info.pageListSize - 1;

	return (
		<Form inline>
			<FormGroup>
				{props.registUrl && (
					<Button
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
				<Label>
					건수: {info.totalCount}건 | 총 페이지: {info.totalPage} | 현재 페이지: {info.nowPage}
				</Label>
				&nbsp; &nbsp; &nbsp;
				<select
					type="select"
					name="PageSize"
					id="PageSize"
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
			</FormGroup>
		</Form>
	);
};

export default ListSummary;
