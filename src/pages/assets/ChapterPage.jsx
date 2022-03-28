import Page from "components/Page";
import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../../store/users";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import useFetchCommon from "../../hooks/useFetchCommon";
import define from "../../define/define";
import { Dates } from "../../utils/date";
import { Ajax } from "../../utils/ajax";
import { useHistory } from "react-router-dom";
import Search from "../../components/Card/Search";
import ListSummary from "../../components/Card/ListSummary";
import Button from "reactstrap/lib/Button";
import { Route, Redirect } from "react-router-dom";
import Paging from "../../components/Card/Paging";
import oStyle from "../../define/styles";
import Sentence from "./Sentence";

const ChapterPage = () => {
	if (!sessionStorage.getItem("AccessToken")) {
		return <Route render={() => <Redirect to={{ pathname: "/login" }} />} />;
	}
	const history = useHistory();
	const ctx = useContext(UserContext);
	let oPageChapter = ctx.pageList.chapter;
	const pageName = "study/chapters";
	const registUrl = "/study/chapters/new";

	const [list, setList] = useState([]);
	const [paging, setPaging] = useState([]);
	const [sentences, setSentences] = useState(null);
	const refSorts = useRef([]);

	let result = useFetchCommon(pageName, oPageChapter.searchParams, oPageChapter.pageInfos);
	useEffect(() => {
		if (result.ResultCode === define.OK) {
			setList(result.Data.List);
			oPageChapter.pageInfos.totalCount = result.Data.TotalCount;
			setPaging(<Paging search={fnSearch} pageInfo={oPageChapter} />);
		}
	}, [result]);
	const fnSearch = async () => {
		result = await Ajax.runListCommon(pageName, oPageChapter.searchParams, oPageChapter.pageInfos);
		setList(result.Data.List);
		oPageChapter.pageInfos.totalCount = result.Data.TotalCount;
		setPaging(<Paging search={fnSearch} pageInfo={oPageChapter} />);
	};

	const fnSortSave = () => {};

	return (
		<Page title="문장 챕터 관리" breadcrumbs={[{ name: "Chapters", active: true }]} className="ChapterPage">
			<Search search={fnSearch} />
			<Row>
				<Col>
					<Card className="mb-3" style={{ align: "center" }}>
						<CardHeader style={{ align: "right" }}>
							<ListSummary search={fnSearch} registUrl={registUrl} pageInfo={oPageChapter} />
						</CardHeader>
						<CardBody style={{ textAlign: "center" }}>
							<Table size="sm">
								<colgroup>
									<col width="80" />
									<col width="100" />
									<col width="*" />
									<col width="90" />
									<col width="80" />
									<col width="80" />
									<col width="130" />
									<col width="130" />
								</colgroup>
								<thead>
									<tr style={oStyle.sentenceStyleTitle}>
										<th>No</th>
										<th>
											<Button color="warning" style={oStyle.sentenceStyleBtn} size="sm" onClick={fnSortSave}>
												회차저장
											</Button>
										</th>
										<th>챕터</th>
										<th>활성여부</th>
										<th>조회수</th>
										<th>좋아요</th>
										<th>수정일</th>
										<th>등록일</th>
									</tr>
								</thead>
								<tbody>
									{list.map((o) => (
										<tr key={o.SeqChapter} style={{ textAlign: "center" }}>
											<th
												scope="row"
												style={{ fontWeight: "bold", fontFamily: "맑은고딕", cursor: "pointer", fontSize: "10pt" }}
												onClick={() => {
													history.push(`/${pageName}/${o.SeqChapter}`);
												}}
											>
												<button type="button" className="btn btn-primary btn-sm">
													{o.SeqChapter}
												</button>
											</th>
											<td>
												<input id={"sort_" + o.SeqChapter} type="number" style={oStyle.sentenceStyleInput} className="form-control-sm form-control" defaultValue={o.Turn} name="sort" ref={(ref) => refSorts.current.push(ref)} />
											</td>
											<td
												onClick={() => {
													setSentences(null);
													setTimeout(() => {
														setSentences(<Sentence chapterInfo={o} />);
													}, 200);
												}}
												style={{ fontFamily: "맑은고딕", cursor: "pointer", fontSize: "9pt", textAlign: "left" }}
											>
												<span style={{ fontWeight: "bold" }}>{o.Name}</span>
												&nbsp;-&nbsp;{o.NameEnglish}
												<br />
												<span style={{ color: "blue" }}>{o.Description}</span>
											</td>
											<td style={oStyle.sentenceStyleViewLike}>{o.ActiveYn ? "Active" : "In Active"}</td>
											<td style={oStyle.sentenceStyleViewLike}>{o.CntRead}</td>
											<td style={oStyle.sentenceStyleViewLike}>{o.CntLike}</td>
											<td style={oStyle.sentenceStyleViewLike}>{Dates.defaultConvertYYYYMMDDHHIISS(o.UpdatedAt)}</td>
											<td style={oStyle.sentenceStyleViewLike}>{Dates.defaultConvertYYYYMMDDHHIISS(o.CreatedAt)}</td>
										</tr>
									))}
								</tbody>
							</Table>
							{paging}
						</CardBody>
					</Card>
				</Col>
			</Row>
			{sentences}
		</Page>
	);
};

export default ChapterPage;
