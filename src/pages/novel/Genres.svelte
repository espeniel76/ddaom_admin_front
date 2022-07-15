<script>
	// 장르관리
	import { onMount } from 'svelte';
	import { genres, paging, checkedList, check } from '../../stores';
	import { Dates } from '../../utils/date';
	import Paging from '../../components/Paging.svelte';

	let oSave = {
		oActiveYnTrue: null,
		oActiveYnFalse: null,
		oGenre: null,
	};
	let oEdit = {
		SeqGenre: 0,
		oGenre: null,
		oActiveYn: null,
	};
	let oSearch = {
		ActiveYn: 'All',
		Genre: '',
	};
	let pageSize = 10;
	let totalCount = 0;
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

	function handleChangeEditMode(SeqGenre) {
		oEdit.SeqGenre = SeqGenre;
	}

	function handleChangeSaveMode() {
		let SeqGenre = oEdit.SeqGenre;
		let Genre = oEdit.oGenre.value;
		let ActiveYn = oEdit.oActiveYn.checked;
		if (Genre.length < 1) {
			alert('금칙어를 입력 하세요.');
			oEdit.oGenre.focus();
			return false;
		}
		genres.editGenre(SeqGenre, Genre, ActiveYn);
		closeEditMode();
		fnSearch();
	}

	function closeEditMode() {
		oEdit = {
			SeqGenre: 0,
			oGenre: null,
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
		if (oSave.oGenre.value.length < 1) {
			alert('금칙어를 입력 하세요.');
			oSave.oGenre.focus();
			return flase;
		}
		await genres.saveGenre(oSave.oGenre.value, isActive);
		oSave.oGenre.value = '';
		await fnSearch();
	}

	async function fnSearch() {
		await genres.fetchGenres(
			oSearch.ActiveYn,
			oSearch.Genre,
			$paging.pageSize,
			$paging.nowPage
		);
	}

	function fnInit() {
		oSearch.ActiveYn = 'All';
		oSearch.Genre = '';
		let o = $paging;
		fnSearch();
		o.nowPage = 1;
		paging.update((paging) => o);
	}

	$: {
		if (oEdit.oGenre) {
			oEdit.oGenre.select();
			oEdit.oGenre.focus();
		}
		if ($genres.Data.TotalCount > 0) {
			totalCount = $genres.Data.TotalCount;
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
					><h5 class="mb-0">장르</h5></td
				>
				<td width="*">
					<div class="input-group">
						<input
							type="text"
							class="form-control form-control-sm"
							placeholder="장르"
							aria-label="Recipient's username with two button addons"
							bind:this={oSave.oGenre}
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
						><h5 class="mb-0">장르</h5></td
					>
					<td width="*">
						<div class="input-group">
							<input
								type="text"
								class="form-control form-control-sm"
								placeholder="장르"
								aria-label="Recipient's username with two button addons"
								on:keypress={onKeyPress}
								bind:value={oSearch.Genre}
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
						/>
					</th>
					<th width="50">No</th>
					<th width="*">장르</th>
					<th width="130">사용여부</th>
					<th width="100">등록일</th>
					<th width="100">등록자</th>
					<th width="100">수정일</th>
					<th width="100">수정자</th>
					<th width="50">관리</th>
				</tr>
			</thead>
			<tbody class="table-border-bottom-0">
				{#each $genres.Data.List as o, index}
					<tr style="text-align:center" id={o.SeqGenre}>
						<td
							><input
								class="form-check-input"
								type="checkbox"
								id="defaultCheck3"
								bind:group={$checkedList}
								value={o.SeqGenre}
								checked={$check}
							/></td
						>
						<td>{o.SeqGenre}</td>
						<td>
							{#if oEdit.SeqGenre === o.SeqGenre}
								<input
									type="text"
									class="form-control"
									bind:this={oEdit.oGenre}
									value={o.Genre}
									style="text-align:center"
									placeholder="금칙어"
								/>
							{:else}
								{o.Genre}
							{/if}
						</td>
						<td>
							{#if oEdit.SeqGenre === o.SeqGenre}
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
							{#if oEdit.SeqGenre === o.SeqGenre}
								<button
									type="button"
									class="btn btn-sm btn-primary"
									on:click={handleChangeSaveMode}>저장</button
								>
							{:else}
								<button
									type="button"
									class="btn btn-sm btn-info"
									on:click={handleChangeEditMode(o.SeqGenre)}
									>편집</button
								>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<Paging {fnSearch} {pageSize} {totalCount} />
	</div>
</div>
