import React from "react";
// import { propTypes } from "react-notification-system";

const AscButton = (props) => {
	let isSort;
	let toSort;

	function ascSort() {
		switch (props.name) {
			case "created_at":
				isSort = props.list.sort(function (a, b) {
					a = new Date(a.CreatedAt);
					b = new Date(b.CreatedAt);

					return a > b ? -1 : a < b ? 1 : 0;
				});
				toSort = JSON.stringify(isSort);
				props.ascSort(toSort);
				break;
			case "type":
				isSort = props.list.sort(function (a, b) {
					return a.Type < b.Type ? -1 : a.Type > b.Type ? 1 : 0;
				});
				toSort = JSON.stringify(isSort);
				props.ascSort(toSort);
				break;
			case "seqCategory":
				isSort = props.list.sort(function (a, b) {
					return a.SeqCategory < b.SeqCategory ? -1 : a.SeqCategory > b.SeqCategory ? 1 : 0;
				});
				toSort = JSON.stringify(isSort);
				props.ascSort(toSort);
				break;
			case "producerName":
				isSort = props.list.sort(function (a, b) {
					return a.ProducerName < b.ProducerName ? -1 : a.ProducerName === b.ProducerName ? 0 : 1;
				});
				toSort = JSON.stringify(isSort);
				props.ascSort(toSort);
				break;
			case "programName":
				isSort = props.list.sort(function (a, b) {
					return a.ProgramName < b.ProgramName ? -1 : a.ProgramName === b.ProgramName ? 0 : 1;
				});
				toSort = JSON.stringify(isSort);
				props.ascSort(toSort);
				break;
			case "updated_at":
				isSort = props.list.sort(function (a, b) {
					a = new Date(a.UpdatedAt);
					b = new Date(b.UpdatedAt);

					return a > b ? -1 : a < b ? 1 : 0;
				});
				toSort = JSON.stringify(isSort);
				props.ascSort(toSort);
				break;
			case "notice_type":
				isSort = props.list.sort(function (a, b) {
					return a.NoticeType < b.NoticeType ? -1 : a.NoticeType > b.NoticeType ? 1 : 0;
				});
				toSort = JSON.stringify(isSort);
				props.ascSort(toSort);
				break;
			case "activeYn":
				isSort = props.list.sort(function (a, b) {
					return a.ActiveYn - b.ActiveYn;
				});
				toSort = JSON.stringify(isSort);
				props.ascSort(toSort);
				break;
			case "activeEnterYn":
				isSort = props.list.sort(function (a, b) {
					return a.ActiveEnterYn - b.ActiveEnterYn;
				});
				toSort = JSON.stringify(isSort);
				props.ascSort(toSort);
				break;
			case "activeGoodYn":
				isSort = props.list.sort(function (a, b) {
					return a.ActiveGoodYn - b.ActiveGoodYn;
				});
				toSort = JSON.stringify(isSort);
				props.ascSort(toSort);
				break;
			case "activeMainYn":
				isSort = props.list.sort(function (a, b) {
					return a.ActiveMainYn - b.ActiveMainYn;
				});
				toSort = JSON.stringify(isSort);
				props.ascSort(toSort);
				break;
			case "detailType":
				isSort = props.list.sort(function (a, b) {
					return a.DetailType - b.DetailType;
				});
				toSort = JSON.stringify(isSort);
				props.ascSort(toSort);
				break;
			case "answerState":
				isSort = props.list.sort(function (a, b) {
					return a.AnswerState - b.AnswerState;
				});
				toSort = JSON.stringify(isSort);
				props.ascSort(toSort);
				break;
			default:
				props.ascSort(props.list);
		}
	}

	return (
		<button className="btn btn-sm" onClick={ascSort}>
			▲{/* 🔼 */}
		</button>
	);
};

export default AscButton;
