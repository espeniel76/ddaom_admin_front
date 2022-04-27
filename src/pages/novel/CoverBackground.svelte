<script>
	import { onMount } from "svelte";
	import { keywords, paging } from "../../stores";
	import { Dates } from "../../utils/date";
	import Paging from "../../components/Paging.svelte";

	let oSearch = {
		ActiveYn: "All",
		ProcessYn: "All",
		StartDate: "",
		EndDate: "",
		Keyword: "",
	};
	let pageSize = 10;
	let totalCount = 0;
	let registUrl = "/novel/keywords/new";
	let nowDate = Dates.getYYYYMMTZ();

	onMount(() => {
		fnSearch();
	});

	async function fnSearch() {
		await keywords.fetchKeywords(oSearch, $paging.pageSize, $paging.nowPage);
	}

	function fnDelete() {}

	function fnInit() {
		oSearch.ActiveYn = "All";
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
					<td width="100" style="text-align: right;"><h5 class="mb-0">사용여부</h5></td>
					<td width="200" style="vertical-align: middle;text-align:center">
						<select class="form-select" id="exampleFormControlSelect1" aria-label="Default select example" bind:value={oSearch.ActiveYn}>
							<option value="All" selected>전체</option>
							<option value="Y">사용</option>
							<option value="N">미사용</option>
						</select>
					</td>
					<td width="100" style="text-align: right;"><h5 class="mb-0">컬러명/코드</h5></td>
					<td width="*" colspan="3">
						<div class="input-group">
							<input type="text" class="form-control" placeholder="컬러명/코드" aria-label="Recipient's username with two button addons" bind:value={oSearch.Keyword} />
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
					<th colspan="9">
						Total data: {$paging.totalCount}
						, Now page: {$paging.nowPage}
						, TOTAL page: {$paging.totalPage}
					</th>
				</tr>
				<tr style="text-align:center">
					<th width="50"><input class="form-check-input" type="checkbox" value="" id="defaultCheck3" checked="" /></th>
					<th width="50">No</th>
					<th width="*">컬러명</th>
					<th width="100">코드</th>
					<th width="100">진행여부</th>
					<th width="200">사용기간</th>
					<th width="100">등록일</th>
					<th width="100">수정일</th>
				</tr>
			</thead>
			<tbody class="table-border-bottom-0">
				{#each $keywords.Data.List as o, index}
					<tr style="text-align:center" id={o.SeqKeyword}>
						<td><input class="form-check-input" type="checkbox" value="" id="defaultCheck3" checked="" /></td>
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
