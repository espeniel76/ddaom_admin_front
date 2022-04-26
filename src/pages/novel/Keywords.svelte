<script>
	import { onMount } from "svelte";
	import { keywords, paging } from "../../stores";
	import { Dates } from "../../utils/date";
	import Paging from "../../components/Paging.svelte";

	let oSearch = {
		ActiveYn: "All",
		Keyword: "",
	};
	let pageSize = 10;
	let totalCount = 0;

	onMount(() => {
		fnSearch();
	});

	async function fnSearch() {
		await keywords.fetchKeywords(oSearch.ActiveYn, oSearch.Keyword, $paging.pageSize, $paging.nowPage);
	}

	function fnInit() {
		oSearch.ActiveYn = "All";
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
					<td width="100" style="text-align: right;"><h5 class="mb-0">진행여부</h5></td>
					<td width="200" style="vertical-align: middle;text-align:center">
						<select class="form-select" id="exampleFormControlSelect1" aria-label="Default select example" bind:value={oSearch.ActiveYn}>
							<option value="All" selected>전체</option>
							<option value="Y">사용</option>
							<option value="N">미사용</option>
						</select>
					</td>
					<td width="100" style="text-align: right;"><h5 class="mb-0">사용기간</h5></td>
					<td width="100" style="vertical-align: middle;text-align:center">
						<input class="form-control" type="date" value="2021-06-18" id="html5-date-input" />
					</td>
					<td width="100" style="vertical-align: middle;text-align:center; padding-left:0">
						<input class="form-control" type="date" value="2021-06-18" id="html5-date-input" />
					</td>
				</tr>
				<tr>
					<td width="100" style="text-align: right;"><h5 class="mb-0">주제어</h5></td>
					<td width="*" colspan="3">
						<div class="input-group">
							<input type="text" class="form-control" placeholder="주제어" aria-label="Recipient's username with two button addons" bind:value={oSearch.Keyword} />
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
						<td><input class="form-check-input" type="checkbox" value="" id="defaultCheck3" checked="" /></td>
						<td>{o.SeqKeyword}</td>
						<td>{o.Keyword}</td>
						<td>{o.ActiveYn ? "사용" : "미사용"}</td>
						<td>예정</td>
						<td>{Dates.defaultConvert(o.StartDate)}~{Dates.defaultConvert(o.EndDate)}</td>
						<td>{o.CreatedAt ? Dates.defaultConvert(o.CreatedAt) : ""}</td>
						<td>{o.UpdatedAt ? Dates.defaultConvert(o.UpdatedAt) : ""}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<Paging {fnSearch} {pageSize} {totalCount} />
	</div>
</div>
