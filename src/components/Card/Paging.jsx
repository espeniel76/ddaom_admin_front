import React, { useContext } from "react";
import ButtonGroup from "reactstrap/lib/ButtonGroup";
import ButtonToolbar from "reactstrap/lib/ButtonToolbar";

const Paging = (props) => {
	let info = props.pageInfo.pageInfos;
	info.nowPage = info.nowPage === 0 ? 1 : info.nowPage;
	info.totalPage = Math.ceil(info.totalCount / info.pageSize);
	let myRound = Math.floor(info.nowPage / info.pageSize);
	info.startPage = myRound * info.pageSize;
	info.endPage = info.startPage + info.pageListSize - 1;

	let domList = [];
	if (info.startPage > 1) {
		domList.push(
			<button
				type="button"
				className="btn btn-primary btn-sm"
				key="start"
				onClick={() => {
					info.endPage = info.startPage - 1;
					info.startPage = info.endPage - (info.pageListSize - 1);
					info.nowPage = info.endPage;
					fnSearch();
				}}
			>
				←
			</button>
		);
	}
	let end = info.endPage <= info.totalPage ? info.endPage : info.totalPage;
	for (let i = info.startPage; i <= end; i++) {
		if (i > 0) {
			if (i === info.nowPage) {
				domList.push(
					<button type="button" className="btn btn-primary btn-sm active" key={i}>
						{i}
					</button>
				);
			} else {
				domList.push(
					<button
						type="button"
						className="btn btn-primary btn-sm"
						onClick={() => {
							info.nowPage = i;
							fnSearch();
						}}
						key={i}
					>
						{i}
					</button>
				);
			}
		}
	}
	if (info.endPage < info.totalPage) {
		domList.push(
			<button
				type="button"
				className="btn btn-primary btn-sm"
				key="end"
				onClick={() => {
					info.startPage = info.endPage + 1;
					info.nowPage = info.startPage;
					fnSearch();
				}}
			>
				→
			</button>
		);
	}

	function fnSearch(e) {
		if (e) e.preventDefault();
		props.search();
	}

	return (
		<ButtonToolbar>
			<ButtonGroup className="mr-2" size="sm">
				{domList.map((item) => item)}
			</ButtonGroup>
		</ButtonToolbar>
	);
};

export default Paging;
