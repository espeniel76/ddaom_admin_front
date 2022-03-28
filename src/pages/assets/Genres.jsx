import React, { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "../../store/users";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import define from "../../define/define";
import { Dates } from "../../utils/date";
import { Ajax } from "../../utils/ajax";
import Paging from "../../components/Card/Paging";
import oStyle from "../../define/styles";
import { HttpMethod } from "../../models/consts";
import TdRadioBoolNoTitle from "../../components/Card/TdRadioBoolNoTitle";
import TdRadioBoolNoTitleNative from "../../components/Card/TdRadioBoolNoTitleNative";
import results from "../../define/define";
import { Tools } from "../../utils/tools";
import useFetchCommonStudy from "../../hooks/useFetchCommonStudy";
import ListSummarySentence from "../../components/Card/ListSummarySentence";

const Sentence = (props) => {
	const ctx = useContext(UserContext);
	let oPage = ctx.pageList.genre;

	const listUrl = "assets/genres";
	const refRadioView = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
	const refCtrlBtn1 = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
	const refCtrlBtn2 = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
	const refSentelceListKorea = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
	const refSentenceKorea = useRef(null);
	const refRadioViewCreate = [useRef(null), useRef(null)];
	const [list, setList] = useState([]);
	const [paging, setPaging] = useState([]);
	const [isViewSentence, setIsViewSentence] = useState(false);
	let result;
	let num = 0;
	let numButton = 0;

	result = useFetchCommonStudy(`${listUrl}/sentence/admin`, oPage.searchParams, oPage.pageInfos, props.chapterInfo.SeqChapter);
	useEffect(() => {
		if (result.ResultCode === define.OK) {
			setList(result.Data.List);
			setTimeout(() => {
				setView();
			}, 200);
			oPage.pageInfos.totalCount = result.Data.TotalCount;
			setPaging(<Paging search={fnSearch} pageInfo={oPage} />);
		}
	}, [result]);
	async function fnSearch() {
		result = await Ajax.runListCommonStudy(`${listUrl}/sentence/admin`, oPage.searchParams, oPage.pageInfos, props.chapterInfo.SeqChapter);
		if (result.ResultCode === define.OK) {
			setList(result.Data.List);
			setTimeout(() => {
				setView();
			}, 200);
			oPage.pageInfos.totalCount = result.Data.TotalCount;
			setPaging(<Paging search={fnSearch} pageInfo={oPage} />);
		}
	}
	async function fnSave() {
		if (refSentenceKorea.current) {
			const korea = refSentenceKorea.current;
			if (korea.value.length < 1) {
				alert("한국어 문장을 입력 하세요.");
				korea.focus();
				return false;
			}
			let result = await Ajax.run({
				url: "study/chapters/sentence/admin",
				method: HttpMethod.POST,
				data: {
					Korea: korea.value,
					ActiveYn: isViewSentence,
					SeqChapter: props.chapterInfo.SeqChapter,
				},
			});
			switch (result.ResultCode) {
				case results.OK:
					korea.value = "";
					english.value = "";
					fnClickViewNew(false);
					fnSearch();
					korea.focus();
					break;
				case results.ER_DUP_ENTRY:
					alert("이미 존재하는 문장 입니다.");
					break;
				default:
					alert(result.ResultCode);
					break;
			}
		}
	}
	function setView() {
		if (result.Data && refRadioView[0].current) {
			let idx = 0;
			result.Data.List.forEach((element) => {
				let o1 = refRadioView[idx++].current.classList;
				let o2 = refRadioView[idx++].current.classList;
				if (element.ActiveYn) {
					o1.add("active");
					o2.remove("active");
				} else {
					o1.remove("active");
					o2.add("active");
				}
			});
		}
	}
	function fnClickViewNew(isBool) {
		Tools.SetActive(refRadioViewCreate, setIsViewSentence, isBool);
	}
	function fnClickView(numTrue, numFalse, isBool) {
		refRadioView[numTrue].current.classList.add("active");
		refRadioView[numFalse].current.classList.remove("active");
		setIsViewSentence(isBool);
	}
	async function fnChangeButtonMode1(num, SeqSentence) {
		let oBtn1 = refCtrlBtn1[num].current;
		let oBtn2 = refCtrlBtn2[num].current;
		const korea = refSentelceListKorea[num].current;
		const english = refSentelceListEnglish[num].current;
		if (oBtn1.innerText === "Save") {
			if (window.confirm("정말로 저장 하시겠습니까?")) {
				if (korea.value.length < 1) {
					alert("한국어 문장을 입력 하세요.");
					korea.focus();
					return false;
				}
				if (english.value.length < 1) {
					alert("영어 문장을 입력 하세요.");
					korea.focus();
					return false;
				}
				let result = await Ajax.run({
					url: `study/chapters/sentence/admin/${SeqSentence}`,
					method: HttpMethod.PUT,
					data: {
						Korea: korea.value,
						English: english.value,
						ActiveYn: isViewSentence,
						SeqSentence: SeqSentence,
					},
				});
				switch (result.ResultCode) {
					case results.OK:
						fnSearch();
						oBtn1.innerText = "Edit";
						oBtn2.innerText = "Del";
						korea.style.backgroundColor = "#FFFFFF";
						english.style.backgroundColor = "#FFFFFF";
						break;
					case results.ER_DUP_ENTRY:
						alert("이미 존재하는 문장 입니다.");
						break;
					default:
						alert(result.ResultCode);
						break;
				}
			}
		} else {
			oBtn1.innerText = "Save";
			oBtn2.innerText = "Cancel";
			korea.style.backgroundColor = "#EAEAEA";
			english.style.backgroundColor = "#EAEAEA";
			korea.focus();
		}
	}
	async function fnChangeButtonMode2(num, SeqSentence) {
		let oBtn1 = refCtrlBtn1[num].current;
		let oBtn2 = refCtrlBtn2[num].current;
		const korea = refSentelceListKorea[num].current;
		const english = refSentelceListEnglish[num].current;
		if (oBtn2.innerText === "Cancel") {
			oBtn1.innerText = "Edit";
			oBtn2.innerText = "Del";
			korea.style.backgroundColor = "#FFFFFF";
			english.style.backgroundColor = "#FFFFFF";
		} else {
			if (window.confirm("정말로 삭제 하시겠습니까?")) {
				let result = await Ajax.run({
					url: `study/chapters/sentence/admin/${SeqSentence}/${props.chapterInfo.SeqChapter}`,
					method: HttpMethod.DELETE,
				});
				switch (result.ResultCode) {
					case results.OK:
						fnSearch();
						break;
					default:
						alert(result.ResultCode);
						break;
				}
			}
		}
	}

	return (
		<div>
			<h5 style={{ textAlign: "left" }}>
				<span>
					등록 예문: <b>{props.chapterInfo.Name}</b> - {props.chapterInfo.NameEnglish}
				</span>
				<div style={{ height: "5px" }} />
				<span style={{ color: "blue" }}>{props.chapterInfo.Description}</span>
			</h5>
			<Row>
				<Col>
					<Card className="mb-3" style={{ align: "center" }}>
						<CardHeader style={{ align: "right" }}>
							<ListSummarySentence
								search={() => {
									fnSearch();
								}}
								pageInfo={oPage}
							/>
						</CardHeader>
						<CardBody style={{ textAlign: "center" }}>
							<Table size="sm">
								<colgroup>
									<col width="50" />
									<col width="*" />
									<col width="50" />
									<col width="80" />
								</colgroup>

								<tbody>
									<tr>
										<th scope="row" style={oStyle.sentenceStyleTitle}>
											신규
										</th>
										<td>
											<input ref={refSentenceKorea} type="text" placeholder="한글 문장을 입력 하세요." style={oStyle.sentenceStyleInput} className="form-control-sm form-control" />
										</td>
										<td
											style={{
												textAlign: "center",
												verticalAlign: "middle",
											}}
										>
											<TdRadioBoolNoTitleNative click={fnClickViewNew} referer={refRadioViewCreate} />
										</td>
										<td style={oStyle.sentenceStyleViewLike}>
											<button
												type="button"
												className="btn btn-success btn-sm"
												onClick={() => {
													fnSave();
												}}
												style={oStyle.sentenceStyleBtn}
											>
												<b>Save</b>
											</button>
										</td>
									</tr>
								</tbody>
							</Table>

							<Table size="sm">
								<colgroup>
									<col width="50" />
									<col width="*" />
									<col width="100" />
									<col width="60" />
									<col width="50" />
									<col width="130" />
									<col width="80" />
								</colgroup>
								<thead>
									<tr style={oStyle.sentenceStyleTitle}>
										<th>No</th>
										<th>한국어/영어</th>
										<th>작성자</th>
										<th>View/Like</th>
										<th>활성화</th>
										<th>등록일/수정일</th>
										<th>편집</th>
									</tr>
								</thead>
								<tbody>
									{list.map((o) => {
										num = num + 2;
										let numBtn = numButton++;
										return (
											<tr key={o.SeqSentence}>
												<th scope="row" style={oStyle.sentenceStyleTitle}>
													{o.SeqSentence}
												</th>
												<td>
													<input type="text" placeholder="한글 문장을 입력 하세요." ref={refSentelceListKorea[numBtn]} style={oStyle.sentenceStyleInput} className="form-control-sm form-control" defaultValue={o.Korea} />
													<div style={{ height: "2pt" }}></div>
													<input type="text" placeholder="영문 문장을 입력 하세요." ref={refSentelceListEnglish[numBtn]} style={oStyle.sentenceStyleInput} className="form-control-sm form-control" defaultValue={o.English} />
												</td>
												<td style={oStyle.sentenceStyleViewLike}>
													{o.BasicYn ? "관리자" : "사용자"}
													{!o.BasicYn ? o.SeqMember : ""}
												</td>
												<td style={oStyle.sentenceStyleViewLike}>
													{o.CntRead} / {o.CntLike}
												</td>
												<td
													style={{
														textAlign: "center",
														verticalAlign: "middle",
													}}
												>
													<TdRadioBoolNoTitle click={fnClickView} referer={refRadioView} number={num} />
												</td>
												<td style={oStyle.sentenceStyleViewLike}>
													{Dates.defaultConvertYYYYMMDDHHIISS(o.CreatedAt)}
													<br />
													{Dates.defaultConvertYYYYMMDDHHIISS(o.UpdatedAt)}
												</td>
												<td style={oStyle.sentenceStyleViewLike}>
													<div role="group" className="btn-group">
														<button
															type="button"
															className="btn btn-primary btn-sm"
															onClick={() => {
																fnChangeButtonMode1(numBtn, o.SeqSentence);
															}}
															style={oStyle.sentenceStyleBtn}
															ref={refCtrlBtn1[numBtn]}
														>
															Edit
														</button>
														<button
															type="button"
															className="btn btn-danger btn-sm"
															onClick={() => {
																fnChangeButtonMode2(numBtn, o.SeqSentence);
															}}
															style={oStyle.sentenceStyleBtn}
															ref={refCtrlBtn2[numBtn]}
														>
															Del
														</button>
													</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
							{paging}
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Sentence;
