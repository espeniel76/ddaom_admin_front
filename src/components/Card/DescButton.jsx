import React from "react";

const DescButton = (props) => {
	let isSort;
	let toSort;

	function descSort() {
		switch (props.name) {
			case "created_at":
				isSort = props.list.sort(function (a, b) {
					a = new Date(a.CreatedAt);
					b = new Date(b.CreatedAt);

					return a < b ? -1 : a > b ? 1 : 0;
				});
				toSort = JSON.stringify(isSort);
				props.descSort(toSort);
				break;
			case "type":
				isSort = props.list.sort(function (a, b) {
					return a.Type > b.Type ? -1 : a.Type < b.Type ? 1 : 0;
				});
				toSort = JSON.stringify(isSort);
				props.descSort(toSort);
				break;
			case "seqCategory":
				isSort = props.list.sort(function (a, b) {
					return a.SeqCategory > b.SeqCategory ? -1 : a.SeqCategory < b.SeqCategory ? 1 : 0;
				});
				toSort = JSON.stringify(isSort);
				props.descSort(toSort);
				break;
			case "producerName":
				isSort = props.list.sort(function (a, b) {
					return b.ProducerName < a.ProducerName ? -1 : b.ProducerName === a.ProducerName ? 0 : 1;
				});
				toSort = JSON.stringify(isSort);
				props.descSort(toSort);
				break;
			case "programName":
				isSort = props.list.sort(function (a, b) {
					return b.ProgramName < a.ProgramName ? -1 : b.ProgramName === a.ProgramName ? 0 : 1;
				});
				toSort = JSON.stringify(isSort);
				props.descSort(toSort);
				break;
			case "updated_at":
				isSort = props.list.sort(function (a, b) {
					a = new Date(a.UpdatedAt);
					b = new Date(b.UpdatedAt);

					return a < b ? -1 : a > b ? 1 : 0;
				});
				toSort = JSON.stringify(isSort);
				props.descSort(toSort);
				break;
			case "notice_type":
				isSort = props.list.sort(function (a, b) {
					return a.NoticeType > b.NoticeType ? -1 : a.NoticeType < b.NoticeType ? 1 : 0;
				});
				toSort = JSON.stringify(isSort);
				props.descSort(toSort);
				break;
			case "activeYn":
				isSort = props.list.sort(function (a, b) {
					return b.ActiveYn - a.ActiveYn;
				});
				toSort = JSON.stringify(isSort);
				props.descSort(toSort);
				break;
			case "activeEnterYn":
				isSort = props.list.sort(function (a, b) {
					return b.ActiveEnterYn - a.ActiveEnterYn;
				});
				toSort = JSON.stringify(isSort);
				props.descSort(toSort);
				break;
			case "activeGoodYn":
				isSort = props.list.sort(function (a, b) {
					return b.ActiveGoodYn - a.ActiveGoodYn;
				});
				toSort = JSON.stringify(isSort);
				props.descSort(toSort);
				break;
			case "activeMainYn":
				isSort = props.list.sort(function (a, b) {
					return b.ActiveMainYn - a.ActiveMainYn;
				});
				toSort = JSON.stringify(isSort);
				props.descSort(toSort);
				break;
			case "detailType":
				isSort = props.list.sort(function (a, b) {
					return b.DetailType - a.DetailType;
				});
				toSort = JSON.stringify(isSort);
				props.descSort(toSort);
				break;
			case "answerState":
				isSort = props.list.sort(function (a, b) {
					return b.AnswerState - a.AnswerState;
				});
				toSort = JSON.stringify(isSort);
				props.descSort(toSort);
				break;
			default:
				props.descSort(props.list);
		}
	}

	return (
		<button className="btn btn-sm" onClick={descSort}>
			▼{/* ↓ */}
		</button>
	);
};

export default DescButton;
