<script>
	import { onMount } from "svelte";
	import { colors, paging, checkedList, check } from "../../stores";
	import { Dates } from "../../utils/date";
	import Paging from "../../components/Paging.svelte";
	import { Maths } from "../../utils/math";

	let oSearch = {
		ActiveYn: "All",
		Color: "",
	};
	let pageSize = 10;
	let totalCount = 0;
	let registUrl = "/novel/cover/background/new";
	const onKeyPress = (e) => {
		if (e.charCode === 13) fnSearch();
	};
	onMount(() => {
		fnSearch();
	});

	function fnPageNavSet() {
		$checkedList = [];
		$check = false;
	}

	async function fnSearch() {
		await colors.fetch(oSearch, $paging.pageSize, $paging.nowPage);
	}

	async function fnDelete() {
		await colors.delColors($checkedList);
		console.log("삭제클릭");
		fnPageNavSet();
		fnSearch();
	}
	function checkedAllchange(e) {
		const checked = e.target.checked;
		$check = checked;
	}

	function fnInit() {
		oSearch.ActiveYn = "All";
		oSearch.Color = "";

		fnSearch();
		let o = $paging;
		o.nowPage = 1;
		paging.update((paging) => o);
	}

	$: {
		if ($colors.Data.TotalCount > 0) {
			totalCount = $colors.Data.TotalCount;
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
					<td width="100" style="text-align: right;"><h5 class="mb-0">컬러명/코드</h5></td>
					<td width="*" colspan="3">
						<div class="input-group">
							<input
								type="text"
								class="form-control form-control-sm"
								placeholder="컬러명/코드"
								aria-label="Recipient's username with two button addons"
								on:keypress={onKeyPress}
								bind:value={oSearch.Color}
							/>
							<button style="margin-left:5px;" class="btn btn-sm btn-outline-primary" type="button" on:click={fnInit}
								>초기화</button
							>
							<button style="margin-left:5px;" class="btn btn-sm btn-primary" type="button" on:click={fnSearch}
								>검색</button
							>
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
					<th width="*">컬러명</th>
					<th width="50">색상</th>
					<th width="100">코드</th>
					<th width="100">사용여부</th>
					<th width="100">등록일</th>
					<th width="100">수정일</th>
				</tr>
			</thead>
			<tbody class="table-border-bottom-0">
				{#each $colors.Data.List as o, index}
					<tr style="text-align:center" id={o.SeqColor}>
						<td
							><input
								class="form-check-input"
								type="checkbox"
								id="defaultCheck3"
								bind:group={$checkedList}
								value={o.SeqColor}
								checked={$check}
							/></td
						>
						<td>{Maths.startNumber($paging) - index}</td>
						<td><a href="/novel/cover/background/{o.SeqColor}">{o.Name}</a></td>
						<td style="background-color: {o.Color}" />
						<td>{o.Color}</td>
						<td>{o.ActiveYn ? "사용" : "미사용"}</td>
						<td>{o.CreatedAt ? Dates.defaultConvert(o.CreatedAt) : ""}</td>
						<td>{o.UpdatedAt ? Dates.defaultConvert(o.UpdatedAt) : ""}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<Paging {fnSearch} {pageSize} {totalCount} {fnDelete} {registUrl} />
	</div>
</div>
