<script>
	import { onMount } from "svelte";
	import { keywords, paging, checkedList, check } from "../../stores";
	import { Dates } from "../../utils/date";
	import Paging from "../../components/Paging.svelte";
	import { Maths } from "../../utils/math";

	let oSearch = {
		Sort: "startDateDESC",
		ActiveYn: "All",
		ProcessYn: "All",
		StartDate: "",
		EndDate: "",
		Keyword: "",
		CntNowPageTotal: 0,
		CntPageTotal: 0,
	};
	let pageSize = 10;
	let totalCount = 0;
	let registUrl = "/novel/keywords/new";
	let nowUnixtime = Dates.getUnixtime();

	// 검색어 엔터
	//on:keypress={onKeyPress}
	const onKeyPress = (e) => {
		if (e.charCode === 13) fnSearch();
	};

	onMount(() => {
		fnSearch();
	});

	// 체크 초기화
	async function fnPageNavSet() {
		$checkedList = [];
		$check = false;
	}

	// 게시글 페이지 1번으로
	async function fnSearch() {
		await keywords.fetchKeywords(oSearch, $paging.pageSize, $paging.nowPage);
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
	async function fnDelete() {
		await keywords.delKeyword($checkedList);
		console.log("삭제클릭");
		fnPageNavSet();
		fnSearch();
	}
	async function checkedAllchange(e) {
		const checked = e.target.checked;
		$check = checked;
	}
	async function fnInit() {
		oSearch.Sort = "startDateDESC";
		oSearch.ActiveYn = "All";
		oSearch.ProcessYn = "All";
		oSearch.StartDate = "";
		oSearch.EndDate = "";
		oSearch.Keyword = "";
		oSearch.CntTotal = 0;

		let o = $paging;
		o.nowPage = 1;
		paging.update((paging) => o);
		fnSearch();
	}

	$: {
		if ($keywords.Data.TotalCount > 0) {
			totalCount = $keywords.Data.TotalCount;
		} else {
			totalCount = 0;
		}
	}
</script>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<tbody class="table-border-bottom-0">
				<tr>
					<td width="100" style="text-align: right;"><h5 class="mb-0">사용여부</h5></td>
					<td width="200" style="vertical-align: middle;text-align:center">
						<select
							class="form-select form-select-sm"
							id="exampleFormControlSelect1"
							aria-label="Default select example"
							bind:value={oSearch.ActiveYn}
						>
							<option value="All" selected>전체</option>
							<option value="Y">사용</option>
							<option value="N">미사용</option>
						</select>
					</td>
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
					<td width="100" style="text-align: right;"><h5 class="mb-0">사용기간</h5></td>
					<td width="100" style="vertical-align: middle;text-align:center">
						<input
							class="form-control form-control-sm"
							type="date"
							bind:value={oSearch.StartDate}
							id="html5-date-input"
						/>
					</td>
					<td width="100" style="vertical-align: middle;text-align:center; padding-left:0">
						<input
							class="form-control form-control-sm"
							type="date"
							bind:value={oSearch.EndDate}
							id="html5-date-input"
						/>
					</td>
				</tr>
				<tr>
					<td width="100" style="text-align: right;"><h5 class="mb-0">주제어</h5></td>
					<td width="*" colspan="12">
						<div class="input-group">
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
								style="margin-left:5px;"
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
					<th colspan="6">
						<select
							class="form-select form-select-sm"
							bind:value={oSearch.Sort}
							style="width:200px"
							on:change={() => {
								fnSearch();
							}}
						>
							<option value="startDateDESC" selected>등록일 순</option>
							<option value="NovelDESC">연재 많은 순</option>
							<option value="EndDateASC">종료일 임박 순</option>
							<option value="EndDateDESC">종료일 늦은 순</option>
						</select>
					</th>
					<th colspan="6">
						Total data: {$paging.totalCount}
						, Now page: {$paging.nowPage}
						, TOTAL page: {$paging.totalPage}
					</th>
				</tr>
				<tr style="text-align:center">
					<th width="50"
						><input
							class="form-check-input"
							type="checkbox"
							id="defaultCheck3"
							bind:group={$checkedList}
							on:click={checkedAllchange}
						/></th
					>
					<th width="50">No</th>
					<th width="*">주제어</th>
					<th width="100">사용여부</th>
					<th width="100">진행여부</th>
					<th width="100">사용기간</th>
					<th width="100">등록일</th>
					<th width="100">수정일</th>
				</tr>
			</thead>
			<tbody class="table-border-bottom-0">
				{#each $keywords.Data.List as o, index}
					<tr style="text-align:center" id={o.SeqKeyword}>
						<td
							><input
								class="form-check-input"
								type="checkbox"
								id="defaultCheck3"
								bind:group={$checkedList}
								value={o.SeqKeyword}
								checked={$check}
							/></td
						>
						<td>{Maths.startNumber($paging) - index}</td>

						<td><a href="/novel/keywords/{o.SeqKeyword}">{o.Keyword}({o.CntTotal})</a></td>
						<td>{o.ActiveYn ? "사용" : "미사용"}</td>
						<td>
							{#if nowUnixtime < Dates.setUnixtime(o.StartDate)}
								예정
							{:else if nowUnixtime < Dates.setUnixtime(o.EndDate)}
								진행
							{:else}
								종료
							{/if}
						</td>
						<td>{Dates.defaultConvert(o.StartDate)} ~ {Dates.defaultConvert(o.EndDate)}</td>
						<td>{o.CreatedAt ? Dates.defaultConvert(o.CreatedAt) : ""}</td>
						<td>{o.UpdatedAt ? Dates.defaultConvert(o.UpdatedAt) : ""}</td>
					</tr><tr />
				{/each}
			</tbody>
		</table>

		<Paging {fnSearch} {pageSize} {totalCount} {fnDelete} {registUrl} />
	</div>
</div>
