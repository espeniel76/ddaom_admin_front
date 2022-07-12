<script>
	import { beforeUpdate, onMount } from "svelte";
	import { images, paging, checkedList, check } from "../../stores";
	import { Dates } from "../../utils/date";
	import Paging from "../../components/Paging.svelte";
	import consts from "../../define/consts";

	let oSearch = {
		ActiveYn: "All",
		Name: "",
	};
	let pageSize = 10;
	let totalCount = 0;
	let registUrl = "/novel/cover/image/new";

	onMount(() => {
		fnSearch();
	});



	async function fnSearch() {
		await images.fetch(oSearch, $paging.pageSize, $paging.nowPage);
	}

	function fnPageNavSet() {
		$checkedList = [];
		$check = false;
	}

	async function fnDelete() {
		await images.delImages($checkedList);
		console.log("삭제클릭");
		fnPageNavSet();
		fnSearch();
	}

	function fnInit() {
		oSearch.ActiveYn = "All";
		oSearch.Name = "";
		let o = $paging;
		o.nowPage = 1;
		paging.update((paging) => o);
		fnSearch();
	}
	function checkedAllchange(e) {
		const checked = e.target.checked;
		$check = checked;
	}

	$: {
		if ($images.Data.TotalCount > 0) {
			totalCount = $images.Data.TotalCount;
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
					<td width="100" style="text-align: right;"><h5 class="mb-0">제목</h5></td>
					<td width="*" colspan="3">
						<div class="input-group">
							<input
								type="text"
								class="form-control form-control-sm"
								placeholder="제목"
								aria-label="Recipient's username with two button addons"
								bind:value={oSearch.Name}
							/>
							<button class="btn btn-sm btn-outline-primary" type="button" on:click={fnInit}>초기화</button>
							<button class="btn btn-sm btn-primary" type="button" on:click={fnSearch}>검색</button>
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
					<th width="*">제목</th>
					<th width="150">썸네일</th>
					<th width="100">사용여부</th>
					<th width="100">등록일</th>
					<th width="100">수정일</th>
				</tr>
			</thead>
			<tbody class="table-border-bottom-0">
				{#each $images.Data.List as o, index}
					<tr style="text-align:center" id={o.SeqImage}>
						<td
							><input
								class="form-check-input"
								type="checkbox"
								id="defaultCheck3"
								bind:group={$checkedList}
								value={o.SeqImage}
								checked={$check}
							/></td
						>
						<td>{o.SeqImage}</td>
						<td><a href="/novel/cover/image/{o.SeqImage}">{o.Name}</a></td>
						<td><img alt="" src="{consts.urls.IMAGE_SERVER}{o.Image}" width="100" height="70" /></td>
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
