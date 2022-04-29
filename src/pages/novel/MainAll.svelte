<script>
	import { onMount } from "svelte";
	import { keywords, paging } from "../../stores";
	import { Dates } from "../../utils/date";
	import Paging from "../../components/Paging.svelte";

	let oSearch = {
		Sort: "EndDateDESC",
		ProcessYn: "All",
		StartDate: "",
		EndDate: "",
		Keyword: "",
	};
	let pageSize = 10;
	let totalCount = 0;
	let registUrl = "";
	let nowDate = Dates.getYYYYMMTZ();

	onMount(() => {
		fnSearch();
	});

	async function fnSearch() {
		await keywords.fetchKeywords(oSearch, $paging.pageSize, $paging.nowPage);
	}

	function fnDelete() {}

	function fnInit() {
		oSearch.Sort = "EndDateDESC";
		oSearch.ProcessYn = "All";
		oSearch.StartDate = "";
		oSearch.EndDate = "";
		oSearch.Keyword = "";

		let o = $paging;
		o.nowPage = 1;
		paging.update((paging) => o);
		fnSearch();
	}

	$: {
		if ($keywords.Data.TotalCount > 0) {
			totalCount = $keywords.Data.TotalCount;
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
						<select class="form-select" bind:value={oSearch.ProcessYn}>
							<option value="All" selected>전체</option>
							<option value="Y">진행</option>
							<option value="N">종료</option>
						</select>
					</td>
					<td width="100" style="text-align: right;"><h5 class="mb-0">사용기간</h5></td>
					<td width="100" style="vertical-align: middle;text-align:center">
						<input class="form-control" type="date" bind:value={oSearch.StartDate} />
					</td>
					<td width="100" style="vertical-align: middle;text-align:center; padding-left:0">
						<input class="form-control" type="date" bind:value={oSearch.EndDate} />
					</td>
				</tr>
				<tr>
					<td width="100" style="text-align: right;"><h5 class="mb-0">주제어</h5></td>
					<td width="*" colspan="3">
						<div class="input-group">
							<input type="text" class="form-control" placeholder="주제어" bind:value={oSearch.Keyword} />
							<button class="btn btn-outline-primary" type="button" on:click={fnInit}>초기화</button>
							<button class="btn btn-primary" type="button" on:click={fnSearch}>검색</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<table class="table">
			<thead>
				<tr>
					<th colspan="4">
						<select class="form-select" bind:value={oSearch.Sort} style="width:200px">
							<option value="EndDateDESC" selected>종료일 늦은 순</option>
							<option value="EndDateASC">종료일 임박 순</option>
							<option value="LikeDESC">좋아요 많은 순</option>
							<option value="NovelDESC">연재 많은 순</option>
						</select>
					</th>
					<th colspan="4" style="text-align:right">
						Total data: {$paging.totalCount}
						, Now page: {$paging.nowPage}
						, TOTAL page: {$paging.totalPage}
					</th>
				</tr>
				<tr style="text-align:center">
					<th width="50"><input class="form-check-input" type="checkbox" value="" checked="" /></th>
					<th width="50">No</th>
					<th width="*">주제어</th>
					<th width="100">사용여부</th>
					<th width="100">진행여부</th>
					<th width="200">사용기간</th>
					<th width="100">등록일</th>
					<th width="100">수정일</th>
				</tr>
			</thead>
			<tbody class="table-border-bottom-0">
				{#each $keywords.Data.List as o, index}
					<tr style="text-align:center" id={o.SeqKeyword}>
						<td><input class="form-check-input" type="checkbox" value="" checked="" /></td>
						<td>{o.SeqKeyword}</td>
						<td><a href="/novel/keywords/{o.SeqKeyword}">{o.Keyword}</a></td>
						<td>{o.ActiveYn ? "사용" : "미사용"}</td>
						<td>
							{#if nowDate < o.StartDate}
								예정
							{:else if nowDate < o.EndDate}
								진행
							{:else}
								종료
							{/if}
						</td>
						<td>{Dates.defaultConvert(o.StartDate)} ~ {Dates.defaultConvert(o.EndDate)}</td>
						<td>{o.CreatedAt ? Dates.defaultConvert(o.CreatedAt) : ""}</td>
						<td>{o.UpdatedAt ? Dates.defaultConvert(o.UpdatedAt) : ""}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<Paging {fnSearch} {pageSize} {totalCount} {fnDelete} {registUrl} />
	</div>
</div>
