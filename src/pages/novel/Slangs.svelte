<script>
	//금칙어 관리
	import { onMount } from 'svelte';
	import { slangs, paging, checkedList, check } from '../../stores';
	import { Dates } from '../../utils/date';
	import Paging from '../../components/Paging.svelte';

	let oSave = {
		oActiveYnTrue: null,
		oActiveYnFalse: null,
		oSlang: null,
	};
	let oEdit = {
		SeqSlang: 0,
		oSlang: null,
		oActiveYn: null,
	};
	let oSearch = {
		ActiveYn: 'All',
		Slang: '',
	};
	const onKeyPress = (e) => {
		if (e.charCode === 13) fnSearch();
	};
	let pageSize = 10;
	let totalCount = 0;
	let startNumber = 0;

	onMount(() => {
		fnSearch();
	});

	function checkedAllchange(e) {
		const checked = e.target.checked;
		$check = checked;
	}

	function handleChangeEditMode(SeqSlang) {
		oEdit.SeqSlang = SeqSlang;
	}

	function handleChangeSaveMode() {
		let SeqSlang = oEdit.SeqSlang;
		let Slang = oEdit.oSlang.value;
		let ActiveYn = oEdit.oActiveYn.checked;
		if (Slang.length < 1) {
			alert('금칙어를 입력 하세요.');
			oEdit.oSlang.focus();
			return false;
		}
		slangs.editSlang(SeqSlang, Slang, ActiveYn);
		closeEditMode();
		fnSearch();
	}

	function closeEditMode() {
		fnSearch();
		oEdit = {
			SeqSlang: 0,
			oSlang: null,
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
		if (oSave.oSlang.value.length < 1) {
			alert('금칙어를 입력 하세요.');
			oSave.oSlang.focus();
			return flase;
		}
		await slangs.saveSlang(oSave.oSlang.value, isActive);
		oSave.oSlang.value = '';
		await fnSearch();
	}

	async function fnDelete() {
		await slangs.delSlang($checkedList);
		console.log('삭제클릭');
		fnPageNavSet();
		fnSearch();
	}
	// 체크 초기화
	async function fnPageNavSet() {
		$checkedList = [];
		$check = false;
	}
	async function fnSearch() {
		await slangs.fetchSlangs(
			oSearch.ActiveYn,
			oSearch.Slang,
			$paging.pageSize,
			$paging.nowPage
		);
	}

	function fnInit() {
		oSearch.ActiveYn = 'All';
		oSearch.Slang = '';
		let o = $paging;
		o.nowPage = 1;
		paging.update((paging) => o);
		fnSearch();
	}

	$: {
		if (oEdit.oSlang) {
			oEdit.oSlang.select();
			oEdit.oSlang.focus();
		}
		if ($slangs.Data.TotalCount > 0) {
			totalCount = $slangs.Data.TotalCount;
			startNumber = totalCount - $paging.pageSize * ($paging.nowPage - 1);
		} else {
			totalCount = 0;
		}
	}
</script>

<div class="card mb-4">
	<table class="table">
		<tbody class="table-border-bottom-0">
			<tr>
				<td width="150" style="text-align: right;"
					><h5 class="mb-0">사용여부</h5></td
				>
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
					<label class="form-check-label" for="inlineRadio1"
						>사용</label
					>
					&nbsp;
					<input
						class="form-check-input"
						type="radio"
						name="inlineRadioOptions"
						id="inlineRadio2"
						value="option2"
						bind:this={oSave.oActiveYnFalse}
					/>
					<label class="form-check-label" for="inlineRadio2"
						>미사용</label
					>
				</td>
				<td width="150" style="text-align: right;"
					><h5 class="mb-0">금칙어1</h5></td
				>
				<td width="*">
					<div class="input-group">
						<input
							type="text"
							class="form-control form-control-sm"
							placeholder="금칙어"
							aria-label="Recipient's username with two button addons"
							on:keypress={onKeyPress}
							bind:this={oSave.oSlang}
						/>
						<button
							class="btn btn-sm btn-primary"
							type="button"
							on:click={fnSave}>등록</button
						>
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
					<td width="150" style="text-align: right;"
						><h5 class="mb-0">사용여부</h5></td
					>
					<td
						width="250"
						style="vertical-align: middle;text-align:center"
					>
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
					<td width="150" style="text-align: right;"
						><h5 class="mb-0">금칙어</h5></td
					>
					<td width="*">
						<div class="input-group">
							<input
								type="text"
								class="form-control form-control-sm"
								placeholder="금칙어"
								aria-label="Recipient's username with two button addons"
								on:keypress={onKeyPress}
								bind:value={oSearch.Slang}
							/>
							<button
								class="btn btn-sm btn-outline-primary"
								type="button"
								on:click={fnInit}>초기화</button
							>
							<button
								class="btn btn-sm btn-primary"
								type="button"
								on:click={fnSearch}>검색</button
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
					<th width="*">금칙어</th>
					<th width="130">사용여부</th>
					<th width="100">등록일</th>
					<th width="100">등록자</th>
					<th width="100">수정일</th>
					<th width="100">수정자</th>
					<th width="50">관리</th>
				</tr>
			</thead>
			<tbody class="table-border-bottom-0">
				{#each $slangs.Data.List as o, index}
					<tr style="text-align:center" id={o.SeqSlang}>
						<td
							><input
								class="form-check-input"
								type="checkbox"
								id="defaultCheck3"
								bind:group={$checkedList}
								value={o.SeqSlang}
								checked={$check}
							/></td
						>
						<td>{startNumber - index}</td>
						<td>
							{#if oEdit.SeqSlang === o.SeqSlang}
								<input
									type="text"
									class="form-control form-control-sm"
									bind:this={oEdit.oSlang}
									value={o.Slang}
									style="text-align:center"
									placeholder="금칙어"
								/>
							{:else}
								{o.Slang}
							{/if}
						</td>
						<td>
							{#if oEdit.SeqSlang === o.SeqSlang}
								<div class="form-check form-switch mb-2">
									{#if o.ActiveYn}
										<input
											class="form-check-input"
											bind:this={oEdit.oActiveYn}
											type="checkbox"
											id="flexSwitchCheckChecked"
											checked
										/>
										<label
											class="form-check-label"
											for="flexSwitchCheckChecked"
											>사용</label
										>
									{:else}
										<input
											class="form-check-input"
											bind:this={oEdit.oActiveYn}
											type="checkbox"
											id="flexSwitchCheckChecked"
										/>
										<label
											class="form-check-label"
											for="flexSwitchCheckChecked"
											>미사용</label
										>
									{/if}
								</div>
							{:else}
								{o.ActiveYn ? '사용' : '미사용'}
							{/if}
						</td>
						<td>{Dates.defaultConvert(o.CreatedAt)}</td>
						<td>{o.Creator ? o.Creator : ''}</td>
						<td
							>{o.UpdatedAt
								? Dates.defaultConvert(o.UpdatedAt)
								: ''}</td
						>
						<td>{o.Updator ? o.Updator : ''}</td>
						<td>
							{#if oEdit.SeqSlang === o.SeqSlang}
								<button
									type="button"
									class="btn btn-sm btn-primary"
									on:click={handleChangeSaveMode}>저장</button
								>
							{:else}
								<button
									type="button"
									class="btn btn-sm btn-info"
									on:click={handleChangeEditMode(o.SeqSlang)}
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
