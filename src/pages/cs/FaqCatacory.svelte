<script>
	import { onMount } from "svelte";
	import { categoryList, paging, checkedList, check } from "../../stores";
	import { Dates } from "../../utils/date";
	import Paging from "../../components/Paging.svelte";
	import { Maths } from "../../utils/math";

	let oSave = {
		oActiveYnTrue: null,
		oActiveYnFalse: null,
		oCategory: null,
	};
	let oEdit = {
		SeqCategoryFaqs: 0,
		oCategory: null,
		oActiveYn: null,
	};
	let oSearch = {
		ActiveYn: "All",
		Category: "",
	};
	let pageSize = 10;
	let totalCount = 0;

	const blank_pattern = /^\s+|\s+$/g;
	const regex = /[\s\uFEFF\xA0]+$/gi;

	const onKeyPress = (e) => {
		if (e.charCode === 13) fnSearch();
	};
	onMount(() => {
		fnSearch();
	});

	function checkedAllchange(e) {
		const checked = e.target.checked;
		$check = checked;
	}

	function handleChangeEditMode(SeqCategoryFaqs) {
		oEdit.SeqCategoryFaqs = SeqCategoryFaqs;
	}

	function handleChangeSaveMode() {
		let SeqCategoryFaqs = oEdit.SeqCategoryFaqs;
		let Category = oEdit.oCategory.value;
		let ActiveYn = oEdit.oActiveYn.checked;
		if (Category.length < 1) {
			alert("카테고리 를 입력 하세요.");
			oEdit.oCategory.focus();
			return false;
		}
		categoryList.editCategoryList(SeqCategoryFaqs, Category, ActiveYn);
		closeEditMode();
		fnSearch();
	}

	function closeEditMode() {
		fnSearch();
		oEdit = {
			SeqCategoryFaqs: 0,
			oCategory: null,
			oActiveYn: null,
		};
	}

	async function fnSave() {
		let isActive = false;
		if (oSave.oActiveYnTrue.checked) {
			isActive = true;
		} else if (oSave.oActiveYnFalse.checked) {
			isActive = false;
		}
		if (oSave.oCategory.value.length < 1) {
			alert("카테고리 를 입력 하세요.");
			oSave.oCategory.focus();
			return false;
		}
		if (oSave.oCategory.value.replace(blank_pattern, "") == "") {
			alert("카테고리 공백만 입력되었습니다.");
			return false;
		}

		await categoryList.saveCategoryList(oSave.oCategory.value, isActive);
		oSave.oCategory.value = "";
		await fnSearch();
	}

	async function fnSearch() {
		await categoryList.fetchCategoryList(
			oSearch.ActiveYn,
			oSearch.Category, //category_faq
			$paging.pageSize,
			$paging.nowPage
		);
	}

	function fnInit() {
		oSearch.ActiveYn = "All";
		oSearch.Category = "";
		let o = $paging;
		fnSearch();
		o.nowPage = 1;
		paging.update((paging) => o);
	}

	async function fnDelete() {
		await categoryList.delsaveCategoryList($checkedList);
		console.log("삭제클릭");
		fnPageNavSet();
		fnSearch();
	}
	// 체크 초기화
	async function fnPageNavSet() {
		$checkedList = [];
		$check = false;
	}

	$: {
		if (oEdit.oCategory) {
			oEdit.oCategory.select();
			oEdit.oCategory.focus();
		}
		if ($categoryList.Data.TotalCount > 0) {
			totalCount = $categoryList.Data.TotalCount;
		} else {
			totalCount = 0;
		}
	}
</script>

<div class="card mb-4">
	<table class="table">
		<tbody class="table-border-bottom-0">
			<tr>
				<td width="150" style="text-align: right;"><h5 class="mb-0">사용여부</h5></td>
				<td width="250">
					<input
						class="form-check-input"
						type="radio"
						name="inlineRadioOptions"
						id="inlineRadio1"
						value="option1"
						bind:this={oSave.oActiveYnTrue}
						checked
					/>
					<label class="form-check-label" for="inlineRadio1">사용</label>
					&nbsp;
					<input
						class="form-check-input"
						type="radio"
						name="inlineRadioOptions"
						id="inlineRadio2"
						value="option2"
						bind:this={oSave.oActiveYnFalse}
					/>
					<label class="form-check-label" for="inlineRadio2">미사용</label>
				</td>
				<td width="150" style="text-align: right;"><h5 class="mb-0">카테고리</h5></td>
				<td width="*">
					<div class="input-group">
						<input
							type="text"
							class="form-control form-control-sm"
							placeholder="카테고리"
							aria-label="Recipient's username with two button addons"
							bind:this={oSave.oCategory}
						/>
						<button class="btn btn-sm btn-primary" type="button" on:click={fnSave}>등록</button>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<tbody class="table-border-bottom-0">
				<tr>
					<td width="150" style="text-align: right;"><h5 class="mb-0">사용여부</h5></td>
					<td width="250" style="vertical-align: middle;text-align:center">
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
					<td width="150" style="text-align: right;"><h5 class="mb-0">카테고리</h5></td>
					<td width="*" colspan="12">
						<div class="input-group">
							<input
								type="text"
								class="form-control form-control-sm"
								placeholder="카테고리"
								aria-label="Recipient's username with two button addons"
								on:keypress={onKeyPress}
								bind:value={oSearch.Category}
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
						/>
					</th>
					<th width="50">No</th>
					<th width="300">카테고리</th>
					<th width="130">사용여부</th>
					<th width="100">등록일</th>
					<th width="100">등록자</th>
					<th width="100">수정일</th>
					<th width="100">수정자</th>
					<th width="50">관리</th>
				</tr>
			</thead>
			<tbody class="table-border-bottom-0">
				{#each $categoryList.Data.List as o, index}
					<tr style="text-align:center" id={o.SeqCategoryFaqs}>
						<td
							><input
								class="form-check-input"
								type="checkbox"
								id="defaultCheck3"
								bind:group={$checkedList}
								value={o.SeqCategoryFaqs}
								checked={$check}
							/></td
						>
						<td>{Maths.startNumber($paging) - index}</td>
						<td>
							{#if oEdit.SeqCategoryFaqs === o.SeqCategoryFaqs}
								<input
									type="text"
									class="form-control"
									bind:this={oEdit.oCategory}
									value={o.CategoryFaq}
									style="text-align:center"
									placeholder="카테고리"
								/>
							{:else}
								{o.CategoryFaq}
							{/if}
						</td>
						<td>
							{#if oEdit.SeqCategoryFaqs === o.SeqCategoryFaqs}
								<div class="form-check form-switch mb-2">
									{#if o.ActiveYn}
										<input
											class="form-check-input"
											bind:this={oEdit.oActiveYn}
											type="checkbox"
											id="flexSwitchCheckChecked"
											checked
										/>
										<label class="form-check-label" for="flexSwitchCheckChecked">사용</label>
									{:else}
										<input
											class="form-check-input"
											bind:this={oEdit.oActiveYn}
											type="checkbox"
											id="flexSwitchCheckChecked"
										/>
										<label class="form-check-label" for="flexSwitchCheckChecked">미사용</label>
									{/if}
								</div>
							{:else}
								{o.ActiveYn ? "사용" : "미사용"}
							{/if}
						</td>
						<td>{Dates.defaultConvert(o.CreatedAt)}</td>
						<td>{o.Creator ? o.Creator : ""}</td>
						<td>{o.UpdatedAt ? Dates.defaultConvert(o.UpdatedAt) : ""}</td>
						<td>{o.Updator ? o.Updator : ""}</td>
						<td>
							{#if oEdit.SeqCategoryFaqs === o.SeqCategoryFaqs}
								<button type="button" class="btn btn-sm btn-primary" on:click={handleChangeSaveMode}>저장</button>
							{:else}
								<button type="button" class="btn btn-sm btn-info" on:click={handleChangeEditMode(o.SeqCategoryFaqs)}
									>편집</button
								>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<Paging {fnSearch} {pageSize} {totalCount} {fnDelete} />
	</div>
</div>
