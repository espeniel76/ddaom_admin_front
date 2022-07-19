<script>
	import { onMount } from 'svelte';
	import { inquiries, paging, checkedList, check } from '../../stores';
	import { Dates } from '../../utils/date';
	import Paging from '../../components/Paging.svelte';

	let oSearch = {
		Status: 'All', //답변여부
		StartDate: '',
		EndDate: '',
		Inquiries: '', //제목
	};

	let pageSize = 10;
	let totalCount = 0;
	let registUrl = '';

	let quData = '';
	const onKeyPress = (e) => {
		if (e.charCode === 13) fnSearch();
	};
	onMount(() => {
		fnSearch();
	});

	async function fnSearch() {
		await inquiries.fetchInquiries(
			oSearch,
			$paging.pageSize,
			$paging.nowPage
		);
	}
	function fnSearching(o) {
		Number(o);
		if (o.EndDate < o.StartDate) {
			alert('사용기간이 종료일보다 큽니다.');
			return false;
		} else {
			fnSearch();
		}
	}
	async function fnInit() {
		oSearch.Status = 'All';
		oSearch.StartDate = '';
		oSearch.EndDate = '';
		oSearch.Inquiries = '';

		let o = $paging;
		o.nowPage = 1;
		paging.update((paging) => o);
		fnSearch();
	}

	async function checkedAllchange(e) {
		const checked = e.target.checked;
		$check = checked;
	}

	$: {
		// 현재 페이지 게시물 갯수 TOTAL DATA
		if ($inquiries.Data.TotalCount > 0) {
			totalCount = $inquiries.Data.TotalCount;
			quData = $inquiries.Data.queryList;
		} else {
			totalCount = 0;
			quData = [];
		}
	}
</script>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<tbody class="table-border-bottom-0">
				<tr>
					<td width="100" style="text-align: left;"
						><h5 class="mb-0">답변여부</h5></td
					>
					<td
						width="100"
						style="vertical-align: middle;text-align:center"
					>
						<select
							class="form-select form-select-sm"
							id="exampleFormControlSelect1"
							aria-label="Default select example"
							bind:value={oSearch.Status}
						>
							<option value="All" selected>전체</option>
							<option value="Y">답변완료</option>
							<option value="N">미답변</option>
							<option value="B">답변중</option>
						</select>
					</td>

					<td width="100" style="text-align: left;"
						><h5 class="mb-0">등록일/답변일</h5></td
					>
					<td
						width="100"
						style="vertical-align: middle;text-align:center"
					>
						<input
							class="form-control form-control-sm"
							type="date"
							bind:value={oSearch.StartDate}
							id="html5-date-input"
						/>
					</td>
					<td
						width="100"
						style="vertical-align: middle;text-align:center; padding-left:0"
					>
						<input
							class="form-control form-control-sm"
							type="date"
							bind:value={oSearch.EndDate}
							id="html5-date-input"
						/>
					</td>
				</tr>
				<tr>
					<td width="100" style="text-align: left;"
						><h5 class="mb-0">제목/내용/등록자</h5></td
					>
					<td width="*" colspan="4">
						<div class="input-group">
							<input
								type="text"
								class="form-control form-control-sm"
								placeholder="제목/내용/등록자"
								aria-label="Recipient's username with two button addons"
								on:keypress={onKeyPress}
								bind:value={oSearch.Inquiries}
							/>
							<button
								class="btn btn-sm btn-outline-primary"
								type="button"
								on:click={fnInit}>초기화</button
							>
							<button
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
					<th width="50">답변여부</th>
					<th width="*">제목</th>
					<th width="100">등록자</th>
					<th width="100">등록일</th>
					<th width="200">답변일</th>
				</tr>
			</thead>

			<!-- $inquiries.Data.queryList  -->
			<tbody class="table-border-bottom-0">
				{#each quData as o, index}
					<tr style="text-align:center" id={o.seq_service_inquiry}>
						<td
							><input
								class="form-check-input"
								type="checkbox"
								id="defaultCheck3"
								bind:group={$checkedList}
								value={o.seq_service_inquiry}
								checked={$check}
							/></td
						>
						<td>{o.seq_service_inquiry}</td>
						<td
							>{o.status == 3
								? '답변완료'
								: o.status == 2
								? '답변중'
								: '미답변'}</td
						>
						<td
							><a href="/cs/inquiry/{o.seq_service_inquiry}"
								>{o.title}</a
							></td
						>
						<td>{o.nick_name}</td>
						<td
							>{o.created_at
								? Dates.defaultConvert(o.created_at)
								: ''}</td
						>
						<td
							>{o.status == 3
								? Dates.defaultConvert(o.updated_at)
								: o.status == 2
								? '-'
								: '-'}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>

		<Paging
			{fnSearch}
			{pageSize}
			{totalCount}
			fnDelete={undefined}
			{registUrl}
		/>
	</div>
</div>
