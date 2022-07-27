<script>
	import { onMount } from 'svelte';
	import {
		mainAll,
		mainAllFinish,
		paging,
		mainAllDetail,
	} from '../../stores';
	import { Dates } from '../../utils/date';
	import Paging from '../../components/Paging.svelte';
	import { Maths } from '../../utils/math';

	let oSearch = {
		Sort: 'EndDateDESC',
		ProcessYn: 'All',
		StartDate: '',
		EndDate: '',
		Keyword: '',
	};
	let pageSize = 10;
	let totalCount = 0;
	let registUrl = '';
	let nowUnixtime = Dates.getUnixtime();
	let fnDelete = '';

	// 검색어 엔터
	const onKeyPress = (e) => {
		if (e.charCode === 13) fnSearch();
	};

	onMount(() => {
		fnSearch();
	});

	async function fnSearch() {
		await mainAll.fetch(oSearch, $paging.pageSize, $paging.nowPage);
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
	function fnInit() {
		oSearch.Sort = 'EndDateDESC';
		oSearch.ProcessYn = 'All';
		oSearch.StartDate = '';
		oSearch.EndDate = '';
		oSearch.Keyword = '';

		fnSearch();
		let o = $paging;
		o.nowPage = 1;
		paging.update((paging) => o);
	}

	let oModal = {
		class: 'modal fade',
		style: 'display: none',
		item: {},
	};
	function fnInitModal() {
		oModal.class = 'modal fade';
		oModal.style = 'display: none';
		oModal.item = {};
	}

	async function fnShowModal(seqKeyword) {
		oModal.class = 'modal fade show';
		oModal.style = 'display: block';
		await mainAllFinish.fetch(seqKeyword);
	}

	$: {
		if ($mainAll.Data.TotalCount > 0) {
			totalCount = $mainAll.Data.TotalCount;
		}

		if ($mainAllFinish.Data.totalCount > 0) {
			console.log('ㅇㅇ?', $mainAllFinish.Data);
		}
	}
</script>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<tbody class="table-border-bottom-0">
				<tr>
					<td width="100" style="text-align: right;"
						><h5 class="mb-0">진행여부</h5></td
					>
					<td
						width="200"
						style="vertical-align: middle;text-align:center"
					>
						<select
							class="form-select form-select-sm"
							bind:value={oSearch.ProcessYn}
						>
							<option value="All" selected>전체</option>
							<option value="Y">진행</option>
							<option value="N">종료</option>
						</select>
					</td>
					<td width="100" style="text-align: right;"
						><h5 class="mb-0">사용기간</h5></td
					>
					<td
						width="100"
						style="vertical-align: middle;text-align:center"
					>
						<input
							class="form-control form-control-sm"
							type="date"
							bind:value={oSearch.StartDate}
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
						/>
					</td>
				</tr>
				<tr>
					<td width="100" style="text-align: right;"
						><h5 class="mb-0">주제어</h5></td
					>
					<td width="*" colspan="12">
						<div class="input-group">
							<input
								type="text"
								class="form-control form-control-sm"
								placeholder="주제어"
								on:keypress={onKeyPress}
								bind:value={oSearch.Keyword}
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
					<th colspan="4">
						<select
							class="form-select form-select-sm"
							bind:value={oSearch.Sort}
							style="width:200px"
							on:change={() => {
								fnSearch();
							}}
						>
							<option value="EndDateDESC" selected
								>종료일 늦은 순</option
							>
							<option value="EndDateASC">종료일 임박 순</option>
							<option value="LikeDESC">좋아요 많은 순</option>
							<option value="NovelDESC">연재 많은 순</option>
						</select>
					</th>
					<th colspan="5" style="text-align:right">
						Total data: {$paging.totalCount}
						, Now page: {$paging.nowPage}
						, TOTAL page: {$paging.totalPage}
					</th>
				</tr>
				<tr style="text-align:center">
					<th width="50"
						><input class="form-check-input" type="hidden" />
					</th>
					<th width="50">No</th>
					<th width="100">진행여부</th>
					<th width="100">시작일</th>
					<th width="100">종료일</th>
					<th width="*">주제어</th>
					<th width="100">좋아요 수</th>
					<th width="100">소설 등록 수</th>
					<th
						width="100"
						style="background-color: #2F5597;color:white">완결</th
					>
				</tr>
			</thead>
			<tbody class="table-border-bottom-0">
				{#each $mainAll.Data.List as o, index}
					<tr style="text-align:center" id={o.SeqKeyword}>
						<td><input class="form-check-input" type="hidden" /></td
						>
						<!-- <td>{startNumber - index}</td> -->
						<td>{Maths.startNumber($paging) - index}</td>
						<td>
							{#if nowUnixtime < Dates.setUnixtime(o.StartDate)}
								예정
							{:else if nowUnixtime < Dates.setUnixtime(o.EndDate)}
								진행
							{:else}
								종료
							{/if}
						</td>
						<td>{Dates.defaultConvert(o.StartDate)}</td>
						<td>{Dates.defaultConvert(o.EndDate)}</td>
						<td
							on:click={() => {
								mainAllDetail.update((mainAllDetail) => o);
							}}
							><a href="/novel/main/all/{o.SeqKeyword}"
								>{o.Keyword}</a
							></td
						>
						<td>{o.CntLike}</td>
						<td>{o.CntTotal}</td>
						{#if o.CntFinish > 0}
							<td
								on:click={fnShowModal(o.SeqKeyword)}
								style="cursor:pointer"><b>보기</b></td
							>
						{:else}
							<td>-</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>

		<Paging {fnSearch} {pageSize} {totalCount} {fnDelete} {registUrl} />
	</div>
</div>

<!--
	active_yn: 1
	cnt_bookmark: "0"
	cnt_like: "8"
	cnt_like_step1: "2"
	cnt_like_step2: "2"
	cnt_like_step3: "2"
	cnt_like_step4: "2"
	cnt_view: "2"
	content1: "d"
	content2: "zlzl코코"
	content3: "아아아아"
	content4: "쿠쿠쿠"
	created_at: "2022-05-23T01:18:02.000Z"
	nick_name_step1: "볶음밥"
	nick_name_step2: "볶음밥"
	nick_name_step3: "물벼주"
	nick_name_step4: "물벼주"
	seq_color: "6"
	seq_genre: "4"
	seq_image: "12"
	seq_keyword: "23"
	seq_member_step1: "8"
	seq_member_step2: "8"
	seq_member_step3: "10"
	seq_member_step4: "10"
	seq_novel_finish: "1"
	seq_novel_step1: "57"
	seq_novel_step2: "86"
	seq_novel_step3: "69"
	seq_novel_step4: "54"
	title: "bbbbbb-1"
	updated_at: "2022-05-23T01:18:02.000Z"
	updated_at_step1: "2022-05-18T03:50:15.112Z"
	updated_at_step2: "2022-05-18T03:50:15.112Z"
	updated_at_step3: "2022-05-18T03:50:15.112Z"
	updated_at_step4: "2022-05-18T03:50:15.112Z"
-->
<div class={oModal.class} tabindex="-1" style={oModal.style}>
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">완결 소설</h5>
				<button
					type="button"
					class="btn-close"
					data-bs-dismiss="modal"
					aria-label="Close"
					on:click={() => {
						fnInitModal();
					}}
				/>
			</div>
			<div class="modal-body">
				<table class="table table-bordered">
					<tbody>
						{#each $mainAllFinish.Data.List as o}
							<tr>
								<td width="100" style="text-aligh: right"
									>제목</td
								>
								<td width="*">{o.title}</td>
								<td width="50"
									><i
										class="menu-icon tf-icons bx bx-box"
									/></td
								>
							</tr>
							<tr>
								<td colspan="3">
									<table class="table table-bordered">
										<thead>
											<tr>
												<th>Step</th>
												<th>작가</th>
												<th>좋아요 수</th>
												<th>등록일</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Step1</td>
												<td>{o.nick_name_step1}</td>
												<td>{o.cnt_like_step1}</td>
												<td
													>{Dates.defaultConvertFull(
														o.updated_at_step1
													)}</td
												>
											</tr>
											<tr>
												<td>Step1</td>
												<td>{o.nick_name_step2}</td>
												<td>{o.cnt_like_step2}</td>
												<td
													>{Dates.defaultConvertFull(
														o.updated_at_step2
													)}</td
												>
											</tr>
											<tr>
												<td>Step1</td>
												<td>{o.nick_name_step3}</td>
												<td>{o.cnt_like_step3}</td>
												<td
													>{Dates.defaultConvertFull(
														o.updated_at_step3
													)}</td
												>
											</tr>
											<tr>
												<td>Step1</td>
												<td>{o.nick_name_step4}</td>
												<td>{o.cnt_like_step4}</td>
												<td
													>{Dates.defaultConvertFull(
														o.updated_at_step4
													)}</td
												>
											</tr>
										</tbody>
									</table>
									Step 1
									<textarea
										class="form-control form-control-sm"
										rows="4">{o.content1}</textarea
									>
									Step 2
									<textarea
										class="form-control form-control-sm"
										rows="4">{o.content2}</textarea
									>
									Step 3
									<textarea
										class="form-control form-control-sm"
										rows="4">{o.content3}</textarea
									>
									Step 4
									<textarea
										class="form-control form-control-sm"
										rows="4">{o.content4}</textarea
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
