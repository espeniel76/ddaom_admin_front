<script>
	import { onMount } from "svelte";
	import { mainDeletedAll, paging } from "../../stores";
	import { Dates } from "../../utils/date";
	import { Strings } from "../../utils/string";
	import Paging from "../../components/Paging.svelte";
	import { Maths } from "../../utils/math";

	let oSearch = {
		ProcessYn: "All",
		StartDate: "",
		EndDate: "",
		Step: "All",
		TypeDelete: "All",
		NickName: "",
		Keyword: "",
	};
	let pageSize = 10;
	let totalCount = 0;
	let registUrl = "";
	let fnDelete = false;

	const onKeyPress = (e) => {
		if (e.charCode === 13) fnSearch();
	};
	onMount(() => {
		fnSearch();
	});

	async function fnSearch() {
		await mainDeletedAll.fetch(oSearch, $paging.pageSize, $paging.nowPage);
	}
	function fnSearching(o) {
		Number(o);
		if (o.EndDate < o.StartDate) {
			alert("사용기간이 종료일보다 큽니다.");
			return false;
		} else {
			fnSearch();
		}
	}

	async function fnInit() {
		oSearch.ProcessYn = "All";
		oSearch.StartDate = "";
		oSearch.EndDate = "";
		oSearch.Step = "All";
		oSearch.TypeDelete = "All";
		oSearch.NickName = "";
		oSearch.Keyword = "";
		fnSearch();
		let o = $paging;
		o.nowPage = 1;
		paging.update((paging) => o);
	}

	$: {
		if ($mainDeletedAll.Data.TotalCount) {
			totalCount = $mainDeletedAll.Data.TotalCount;
		}
	}
</script>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<tbody class="table-border-bottom-0">
				<tr>
					<td width="100" style="text-align: right;"><h5 class="mb-0">진행여부</h5></td>
					<td width="200" style="vertical-align: middle;text-align:center">
						<select
							class="form-select form-select-sm"
							id="exampleFormControlSelect1"
							aria-label="Default select example"
							bind:value={oSearch.ProcessYn}
						>
							<option value="All" selected>전체</option>
							<option value="Y">진행</option>
							<option value="N">종료</option>
						</select>
					</td>
					<td width="100" style="text-align: right;"><h5 class="mb-0">삭제일</h5></td>
					<td width="200" style="vertical-align: middle;text-align:center">
						<div class="input-group">
							<input
								class="form-control form-control-sm"
								type="date"
								bind:value={oSearch.StartDate}
								id="html5-date-input"
							/>
							<input
								class="form-control form-control-sm"
								type="date"
								bind:value={oSearch.EndDate}
								id="html5-date-input"
							/>
						</div>
					</td>
					<td width="*" />
				</tr>
				<tr>
					<td width="100" style="text-align: right;"><h5 class="mb-0">Step</h5></td>
					<td width="300" style="vertical-align: middle;text-align:center">
						<select
							class="form-select form-select-sm"
							id="exampleFormControlSelect1"
							aria-label="Default select example"
							bind:value={oSearch.Step}
						>
							<option value="All" selected>전체</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</td>
					<td width="100" style="text-align: right;"><h5 class="mb-0">삭제유형</h5></td>
					<td width="300" style="vertical-align: middle;text-align:center">
						<select
							class="form-select form-select-sm"
							id="exampleFormControlSelect1"
							aria-label="Default select example"
							bind:value={oSearch.TypeDelete}
						>
							<option value="All" selected>전체</option>
							<option value="1">작가요청</option>
							<option value="2">운영검수</option>
							<option value="3">기타</option>
						</select>
					</td>
					<td width="*" />
				</tr>
				<tr>
					<td width="100" style="text-align: right;"><h5 class="mb-0">작가</h5></td>
					<td width="300">
						<div class="input-group">
							<input
								type="text"
								class="form-control form-control-sm"
								placeholder="작가"
								aria-label="Recipient's username with two button addons"
								bind:value={oSearch.NickName}
							/>
						</div>
					</td>
					<td width="100" style="text-align: right;"><h5 class="mb-0">주제어/제목</h5></td>
					<td width="*" colspan="2">
						<div class="input-group" style="width: 300px;">
							<input
								type="text"
								class="form-control form-control-sm"
								placeholder="주제어"
								aria-label="Recipient's username with two button addons"
								on:keypress={onKeyPress}
								bind:value={oSearch.Keyword}
							/>
							<button style="margin-left:5px;" class="btn btn-sm btn-outline-primary" type="button" on:click={fnInit}
								>초기화</button
							>
							<button
								style="margin-left:5px; "
								class="btn btn-sm btn-primary"
								type="button"
								on:click={fnSearching(oSearch)}>검색</button
							>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<table class="table">
			<thead>
				<tr>
					<th colspan="12">
						Total data: {$paging.totalCount}
						, Now page: {$paging.nowPage}
						, TOTAL page: {$paging.totalPage}
					</th>
				</tr>
				<!--
					CreatedAt: "2022-05-24T05:13:28.530Z"
					EndDate: "2022-05-18T00:20:00.000Z"
					Genre: "공포"
					Keyword: "완결 test) B"
					NickName: "볶음밥"
					SeqGenre: "3"
					SeqMember: "8"
					SeqNovelDelete: "51"
					StartDate: "2022-05-16T06:40:00.000Z"
					Step: 1
					Title: "b-1"
					TypeDelete: 1
					UpdatedAt: "2022-05-26T00:28:36.000Z"
				-->
				<tr style="text-align:center">
					<th width="50">No</th>
					<th width="60">진행여부</th>
					<th width="80">시작일</th>
					<th width="80">종료일</th>
					<th width="150">주제어</th>
					<th width="*">제목</th>
					<th width="80">장르</th>
					<th width="50">Step</th>
					<th width="150">작가</th>
					<th width="80">등록일</th>
					<th width="80">삭제일</th>
					<th width="80">삭제유형</th>
				</tr>
			</thead>

			<tbody class="table-border-bottom-0">
				{#each $mainDeletedAll.Data.List as o, index}
					<tr style="text-align:center" id={o.SeqKeyword}>
						<td>{Maths.startNumber($paging) - index}</td>

						<td>{Dates.getProcessText(o.StartDate, o.EndDate)}</td>
						<td>{Dates.defaultConvert(o.StartDate)}</td>
						<td>{Dates.defaultConvert(o.EndDate)}</td>
						<td>{o.Keyword}</td>
						<td><a href="/novel/main/deleted/{o.SeqNovelDelete}/{o.Step}">{o.Title}</a></td>
						<td>{o.Genre}</td>
						<td>{o.Step}</td>
						<td>{o.NickName}</td>
						<td>{o.CreatedAt ? Dates.defaultConvert(o.CreatedAt) : ""}</td>
						<td>{o.UpdatedAt ? Dates.defaultConvert(o.UpdatedAt) : ""}</td>
						<td>{Strings.getDeleteType(o.TypeDelete)}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<Paging {fnSearch} {pageSize} {totalCount} {fnDelete} {registUrl} />
	</div>
</div>
