<script>
	import { onMount } from "svelte";
	import { notice, paging, checkedList, check } from "../../stores";
	import { Dates } from "../../utils/date";

	import Paging from "../../components/Paging.svelte";
	import { Maths } from "../../utils/math";

	let oSearch = {
		ActiveYn: "All",
		StartDate: "",
		EndDate: "",
		Notice: "",
	};
	let pageSize = 10;
	let totalCount = 0;
	let registUrl = "/cs/notice/new";
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
		await notice.fetchNotice(oSearch, $paging.pageSize, $paging.nowPage);
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
		await notice.delNotice($checkedList);
		console.log("삭제클릭");
		fnPageNavSet();
		fnSearch();
	}
	async function fnInit() {
		oSearch.ActiveYn = "All";
		oSearch.StartDate = "";
		oSearch.EndDate = "";
		oSearch.Notice = "";

		fnSearch();
		let o = $paging;
		o.nowPage = 1;
		paging.update((paging) => o);
	}

	async function checkedAllchange(e) {
		const checked = e.target.checked;
		$check = checked;
	}

	$: {
		// 현재 페이지 게시물 갯수 TOTAL DATA
		if ($notice.Data.TotalCount > 0) {
			totalCount = $notice.Data.TotalCount;
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
					<td width="100" style="text-align: left;"><h5 class="mb-0">노출여부</h5></td>
					<td width="100" style="vertical-align: middle;text-align:center">
						<select
							class="form-select form-select-sm"
							id="exampleFormControlSelect1"
							aria-label="Default select example"
							bind:value={oSearch.ActiveYn}
						>
							<option value="All" selected>전체</option>
							<option value="Y">노출</option>
							<option value="N">미노출</option>
						</select>
					</td>

					<td width="100" style="text-align: left;"><h5 class="mb-0">등록일/수정일</h5></td>
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
					<td width="100" style="text-align: left;"><h5 class="mb-0">제목/내용</h5></td>
					<td width="*" colspan="4">
						<div class="input-group">
							<input
								type="text"
								class="form-control form-control-sm"
								placeholder="제목/내용"
								aria-label="Recipient's username with two button addons"
								on:keypress={onKeyPress}
								bind:value={oSearch.Notice}
							/>
							<button class="btn btn-sm btn-outline-primary" type="button" on:click={fnInit}>초기화</button>
							<button class="btn btn-sm btn-primary" type="button" on:click={fnSearching(oSearch)}>검색</button>
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
					<th width="100">노출여부</th>
					<th width="100">등록일</th>
					<th width="200">수정일</th>
				</tr>
			</thead>
			<tbody class="table-border-bottom-0">
				{#each $notice.Data.List as o, index}
					<tr style="text-align:center" id={o.SeqNotice}>
						<td
							><input
								class="form-check-input"
								type="checkbox"
								id="defaultCheck3"
								bind:group={$checkedList}
								value={o.SeqNotice}
								checked={$check}
							/></td
						>
						<td>{Maths.startNumber($paging) - index}</td>
						<td><a href="/cs/notice/{o.SeqNotice}">{o.Title}</a></td>
						<td>{o.ActiveYn ? "노출" : "미노출"}</td>

						<td>{o.CreatedAt ? Dates.defaultConvert(o.CreatedAt) : ""}</td>
						<td>{o.UpdatedAt ? Dates.defaultConvert(o.UpdatedAt) : ""}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<Paging {fnSearch} {pageSize} {totalCount} {fnDelete} {registUrl} />
	</div>
</div>
