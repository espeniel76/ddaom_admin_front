<script>
	import { onMount } from 'svelte';
	import { meta, router } from 'tinro';
	import {
		pagingStep1,
		pagingStep2,
		pagingStep3,
		pagingStep4,
		genres,
		mainAllDetail,
		novelStep1,
		novelStep2,
		novelStep3,
		novelStep4,
		deleteNovel,
	} from '../../stores';
	import { Dates } from '../../utils/date';
	import DetailCommonStepList from '../../components/DetailCommonStepList.svelte';
	import PagingCommon from '../../components/PagingCommon.svelte';

	const onKeyPress = (e) => {
		if (e.charCode === 13) fnSearchStep1();
	};

	const route = meta();
	let _id = route.params._id;
	let startNumber = 0;
	let startNumber2 = 0;
	let startNumber3 = 0;
	let startNumber4 = 0;

	let oStepClass = {
		step2: {
			title: 'nav-link active',
			content: 'tab-pane fade show active',
		},
		step3: {
			title: 'nav-link',
			content: 'tab-pane fade',
		},
		step4: {
			title: 'nav-link',
			content: 'tab-pane fade',
		},
	};
	function fnShowStepClass(step) {
		switch (step) {
			case 2:
				oStepClass.step2.title = 'nav-link active';
				oStepClass.step2.content = 'tab-pane show active';
				oStepClass.step3.title = 'nav-link';
				oStepClass.step3.content = 'tab-pane';
				oStepClass.step4.title = 'nav-link';
				oStepClass.step4.content = 'tab-pane';
				break;
			case 3:
				oStepClass.step2.title = 'nav-link';
				oStepClass.step2.content = 'tab-pane';
				oStepClass.step3.title = 'nav-link active';
				oStepClass.step3.content = 'tab-pane show active';
				oStepClass.step4.title = 'nav-link';
				oStepClass.step4.content = 'tab-pane';
				break;
			case 4:
				oStepClass.step2.title = 'nav-link';
				oStepClass.step2.content = 'tab-pane';
				oStepClass.step3.title = 'nav-link';
				oStepClass.step3.content = 'tab-pane';
				oStepClass.step4.title = 'nav-link active';
				oStepClass.step4.content = 'tab-pane show active';
				break;
		}
	}
	let nowUnixtime = Dates.getUnixtime();

	let oPageStep1 = {
		pageSize: 10,
		totalCount: 0,
	};
	let oPageStep2 = {
		pageSize: 10,
		totalCount: 0,
	};
	let oPageStep3 = {
		pageSize: 10,
		totalCount: 0,
	};
	let oPageStep4 = {
		pageSize: 10,
		totalCount: 0,
	};

	let oSearchStep1 = {
		SeqKeyword: _id,
		SeqGenre: '0',
		Sort: 'CreatedAtDESC',
		Search: '',
	};
	let oSearchStep2 = {
		Sort: 'CreatedAtDESC',
		SeqNovelStep1: '0',
		Search: '',
	};
	let oSearchStep3 = {
		Sort: 'CreatedAtDESC',
		SeqNovelStep1: '0',
		Search: '',
	};
	let oSearchStep4 = {
		Sort: 'CreatedAtDESC',
		SeqNovelStep1: '0',
		Search: '',
	};
	onMount(async () => {
		await genres.fetchGenres(true, '', 1000, 1);
		await novelStep1.fetch(
			oSearchStep1,
			$pagingStep1.pageSize,
			$pagingStep1.nowPage
		);
	});

	function fnInitStep1() {
		oSearchStep1.SeqGenre = '0';
		oSearchStep1.Sort = 'CreatedAtDESC';
		oSearchStep1.Search = '';
		fnSearchStep1();
	}
	function fnInitStep2() {
		oSearchStep2.Sort = 'CreatedAtDESC';
		oSearchStep2.Search = '';
		fnSearchStep2();
	}
	function fnInitStep3() {
		oSearchStep3.Sort = 'CreatedAtDESC';
		oSearchStep3.Search = '';
		fnSearchStep3();
	}
	function fnInitStep4() {
		oSearchStep4.Sort = 'CreatedAtDESC';
		oSearchStep4.Search = '';
		fnSearchStep4();
	}
	async function fnSearchStep1() {
		await novelStep1.fetch(
			oSearchStep1,
			$pagingStep1.pageSize,
			$pagingStep1.nowPage
		);
	}
	async function fnSearchStep2() {
		await novelStep2.fetch(
			oSearchStep2,
			$pagingStep2.pageSize,
			$pagingStep2.nowPage
		);
	}
	async function fnSearchStep3() {
		await novelStep3.fetch(
			oSearchStep3,
			$pagingStep3.pageSize,
			$pagingStep3.nowPage
		);
	}
	async function fnSearchStep4() {
		await novelStep4.fetch(
			oSearchStep4,
			$pagingStep4.pageSize,
			$pagingStep4.nowPage
		);
	}

	let oStep1Content = {
		CntLike: '',
		Content: '',
		CreatedAt: '',
		Genre: '',
		NickName: '',
		SeqGenre: '',
		SeqMember: '',
		SeqNovelStep1: '',
		Title: '',
	};

	$: {
		console.log($pagingStep1);
		if ($novelStep1.Data.TotalCount > 0) {
			oPageStep1.totalCount = Number($novelStep1.Data.TotalCount);
		}
		if ($novelStep2.Data.TotalCount > 0) {
			oPageStep2.totalCount = Number($novelStep2.Data.TotalCount);
		}
		if ($novelStep3.Data.TotalCount > 0) {
			oPageStep3.totalCount = Number($novelStep3.Data.TotalCount);
		}
		if ($novelStep4.Data.TotalCount > 0) {
			oPageStep4.totalCount = Number($novelStep4.Data.TotalCount);
		}
	}

	async function fnDelete() {
		console.log(oModal);
		if (oModal.reasonDelete.value.length < 1) {
			alert('삭제 사유를 입력하세요.');
			return false;
		}
		let oReason = {
			step: 1,
			seqNovel: 0,
			typeDelete: Number(oModal.typeDelete.value),
			reasonDelete: oModal.reasonDelete.value,
		};
		if (oModal.item.hasOwnProperty('SeqNovelStep1')) {
			oReason.step = 1;
			oReason.seqNovel = Number(oModal.item.SeqNovelStep1);
		} else if (oModal.item.hasOwnProperty('SeqNovelStep2')) {
			oReason.step = 2;
			oReason.seqNovel = Number(oModal.item.SeqNovelStep2);
		} else if (oModal.item.hasOwnProperty('SeqNovelStep3')) {
			oReason.step = 3;
			oReason.seqNovel = Number(oModal.item.SeqNovelStep3);
		} else if (oModal.item.hasOwnProperty('SeqNovelStep4')) {
			oReason.step = 4;
			oReason.seqNovel = Number(oModal.item.SeqNovelStep4);
		}

		if (confirm('삭제하시겠습니까?')) {
			let retVal = await deleteNovel.saveStep1(oReason);
			switch (retVal.ResultCode) {
				case 'OK':
					// alert("정상적으로 삭제 처리 되었습니다.");
					// 1. 레이어 닫기
					fnInitModal();
					// 2. 리프레쉬
					await fnSearchStep1();
					await fnSearchStep2();
					await fnSearchStep3();
					await fnSearchStep4();
					oStep1Content = {
						CntLike: '',
						Content: '',
						CreatedAt: '',
						Genre: '',
						NickName: '',
						SeqGenre: '',
						SeqMember: '',
						SeqNovelStep1: '',
						Title: '',
					};
					break;
				default:
					alert(retVal.ErrorDesc);
					break;
			}
		}
	}

	let isDelete = false;
	let oModal = {
		class: 'modal fade',
		style: 'display: none',
		typeDelete: null,
		reasonDelete: null,
		item: {},
	};
	function fnInitModal() {
		oModal.class = 'modal fade';
		oModal.style = 'display: none';
		oModal.item = {};
		oModal.typeDelete.value = '1';
		oModal.reasonDelete.value = '';
	}
	function fnShowModal(o, isDel) {
		isDelete = isDel;
		oModal.class = 'modal fade show';
		oModal.style = 'display: block';
		oModal.item = o;
	}
</script>

<div class="row">
	<div class="col-xl-5">
		<div class="card mb-4">
			<table class="table">
				<tbody class="table-border-bottom-0">
					<tr>
						<td width="50" style="text-align: right; padding: 10px"
							>장르</td
						>
						<td style="padding: 10px">
							<select
								class="form-select form-select-sm"
								bind:value={oSearchStep1.SeqGenre}
							>
								<option value="0" selected>전체</option>
								{#each $genres.Data.List as o}
									<option value={o.SeqGenre}>{o.Genre}</option
									>
								{/each}
							</select>
						</td>
						<td style="padding: 10px" colspan="2">
							<div class="input-group">
								<input
									type="text"
									class="form-control form-control-sm"
									placeholder="제목/내용/작가"
									on:keypress={onKeyPress}
									bind:value={oSearchStep1.Search}
								/>
								<button
									class="btn btn-sm btn-outline-primary"
									type="button"
									on:click={fnInitStep1}>초기화</button
								>
								<button
									class="btn btn-sm btn-primary"
									type="button"
									on:click={fnSearchStep1}>검색</button
								>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<table class="table">
				<thead>
					<tr>
						<th colspan="2" style="padding: 10px">
							<select
								class="form-select form-select-sm"
								bind:value={oSearchStep1.Sort}
								style="width:150px"
								on:change={() => {
									fnSearchStep1();
								}}
							>
								<option value="CreatedAtDESC" selected
									>등록일 순</option
								>
								<option value="LikeDESC">좋아요 많은 순</option>
							</select>
						</th>
						<th colspan="2" style="text-align:right; padding: 10px">
							Total: {$pagingStep1.totalCount} , Now: {$pagingStep1.nowPage},
							pages: {$pagingStep1.totalPage}
						</th>
					</tr>
					<tr style="text-align:center">
						<th width="50">No</th>
						<th width="*">제목</th>
						<th width="150">장르</th>
						<th width="150">작가</th>
					</tr>
				</thead>
				<tbody class="table-border-bottom-0">
					{#if $novelStep1.Data.List.length > 0}
						{#each $novelStep1.Data.List as o, index}
							<tr
								style="text-align:center; cursor:pointer"
								on:click={async () => {
									oStep1Content = o;

									// step 2,3,4 데이터 가져오기
									oSearchStep2.SeqNovelStep1 =
										o.SeqNovelStep1;
									oSearchStep3.SeqNovelStep1 =
										o.SeqNovelStep1;
									oSearchStep4.SeqNovelStep1 =
										o.SeqNovelStep1;

									await fnSearchStep2();
									await fnSearchStep3();
									await fnSearchStep4();
								}}
							>
								<td>{startNumber - index}</td>
								<td>{o.Title}</td>
								<td>{o.Genre}</td>
								<td>{o.NickName}</td>
							</tr>
						{/each}
					{:else}
						<tr style="text-align:center">
							<td colspan="4">-</td>
						</tr>
					{/if}
				</tbody>
			</table>
			<PagingCommon
				fnSearch={fnSearchStep1}
				oPage={oPageStep1}
				oPageStore={pagingStep1}
			/>
		</div>
		<button
			type="button"
			class="btn btn-sm btn-primary"
			style="width:100px"
			on:click={() => {
				router.goto('/novel/main/all');
			}}>메인으로이동</button
		>
	</div>
	<div class="col-xl">
		<h6>좌측 리스트에서 Step1 제목을 선택해주세요.</h6>
		<div class="card mb-4">
			<table class="table">
				<thead>
					<tr style="text-align:center">
						<th width="110">진행여부</th>
						<th>시작일</th>
						<th>종료일</th>
						<th>주제어</th>
						<th>좋아요 수</th>
						<th width="120">소설 등록 수</th>
					</tr>
					<tr style="text-align:center">
						{#if $mainAllDetail.StartDate}
							<td>
								{#if nowUnixtime < Dates.setUnixtime($mainAllDetail.StartDate)}
									예정
								{:else if nowUnixtime < Dates.setUnixtime($mainAllDetail.EndDate)}
									진행
								{:else}
									종료
								{/if}
							</td>
							<td
								>{Dates.defaultConvert(
									$mainAllDetail.StartDate
								)}</td
							>
							<td
								>{Dates.defaultConvert(
									$mainAllDetail.EndDate
								)}</td
							>
							<td>{$mainAllDetail.Keyword}</td>
							<td>{$mainAllDetail.CntLike}</td>
							<td>{$mainAllDetail.CntTotal}</td>
						{:else}
							<td colspan="6">-</td>
						{/if}
					</tr>
				</thead>
				<tbody class="table-border-bottom-0" />
			</table>
		</div>

		<h6>Step1</h6>
		<div class="card mb-4">
			<table class="table">
				<thead>
					<tr style="text-align:center">
						<th width="*">제목</th>
						<th width="100">장르</th>
						<th width="150">작가</th>
						<th width="100">좋아요 수</th>
						<th width="170">등록일</th>
						<th width="90">삭제</th>
					</tr>
					<tr style="text-align:center">
						{#if oStep1Content.SeqNovelStep1}
							<td>{oStep1Content.Title && oStep1Content.Title}</td
							>
							<td>{oStep1Content.Genre}</td>
							<td>{oStep1Content.NickName}</td>
							<td>{oStep1Content.CntLike}</td>
							<td
								>{Dates.defaultConvertFull(
									oStep1Content.CreatedAt
								)}</td
							>
							<td
								><button
									class="btn btn-sm btn-info"
									type="button"
									on:click={() => {
										fnShowModal(oStep1Content, true);
									}}>삭제</button
								></td
							>
						{:else}
							<td colspan="6">-</td>
						{/if}
					</tr>
					<tr>
						<td colspan="6"
							><textarea
								class="form-control form-control-sm"
								rows="5">{oStep1Content.Content}</textarea
							></td
						>
					</tr>
				</thead>
				<tbody class="table-border-bottom-0" />
			</table>
		</div>

		<div class="nav-align-top mb-4">
			<ul class="nav nav-tabs" role="tablist">
				<li class="nav-item">
					<button
						type="button"
						class={oStepClass.step2.title}
						on:click={() => {
							fnShowStepClass(2);
						}}>Step2</button
					>
				</li>
				<li class="nav-item">
					<button
						type="button"
						class={oStepClass.step3.title}
						on:click={() => {
							fnShowStepClass(3);
						}}>Step3</button
					>
				</li>
				<li class="nav-item">
					<button
						type="button"
						class={oStepClass.step4.title}
						on:click={() => {
							fnShowStepClass(4);
						}}>Step4</button
					>
				</li>
			</ul>
			<div class="tab-content" style="padding:5px">
				<div class={oStepClass.step2.content}>
					<DetailCommonStepList
						oSearchStep={oSearchStep2}
						fnInitStep={fnInitStep2}
						fnSearch={fnSearchStep2}
						oPage={oPageStep2}
						oPageStore={pagingStep2}
						oList={$novelStep2.Data.List}
						{fnShowModal}
						viewType="1"
					/>
				</div>
				<div class={oStepClass.step3.content}>
					<DetailCommonStepList
						oSearchStep={oSearchStep3}
						fnInitStep={fnInitStep3}
						fnSearch={fnSearchStep3}
						oPage={oPageStep3}
						oPageStore={pagingStep3}
						oList={$novelStep3.Data.List}
						{fnShowModal}
						viewType="1"
					/>
				</div>
				<div class={oStepClass.step4.content}>
					<DetailCommonStepList
						oSearchStep={oSearchStep4}
						fnInitStep={fnInitStep4}
						fnSearch={fnSearchStep4}
						oPage={oPageStep4}
						oPageStore={pagingStep4}
						oList={$novelStep4.Data.List}
						{fnShowModal}
						viewType="1"
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<div class={oModal.class} tabindex="-1" style={oModal.style}>
	{#if isDelete}
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">삭제</h5>
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
					<table class="table">
						<thead>
							<tr
								style="text-align:center; background-color:#F2F2F2"
							>
								<th>제목</th>
								<th>작가</th>
								<th>종아요수</th>
								<th>등록일</th>
							</tr>
							<tr style="text-align:center">
								<th>{oStep1Content.Title}</th>
								<th>{oModal.item.NickName}</th>
								<th>{oModal.item.CntLike}</th>
								<th
									>{Dates.getYYYYMMT(
										oModal.item.CreatedAt
									)}</th
								>
							</tr>
							<tr
								style="text-align:center; vertical-align: middle;"
							>
								<th>유형</th>
								<th colspan="3">
									<select
										class="form-select form-select-sm"
										bind:this={oModal.typeDelete}
									>
										<option value="1" selected
											>작가요청</option
										>
										<option value="2">운영검수</option>
										<option value="3">기타</option>
									</select>
								</th>
							</tr>
							<tr
								style="text-align:center; vertical-align: middle;"
							>
								<th>사유 입력</th>
								<th colspan="3" style="text-align: left;">
									<textarea
										class="form-control form-control-sm"
										rows="10"
										bind:this={oModal.reasonDelete}
									/>
									<span style="color:red"
										>*삭제 시 복구가 불가하므로 신중히
										검토하시기 바랍니다.</span
									>
								</th>
							</tr>
						</thead>
					</table>
				</div>
				<div class="modal-footer">
					<button
						class="btn btn-primary"
						data-bs-target="#modalToggle2"
						data-bs-toggle="modal"
						data-bs-dismiss="modal"
						on:click={() => {
							fnDelete();
						}}
					>
						확인
					</button>
				</div>
			</div>
		</div>
	{:else}
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">내용 상세</h5>
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
					<textarea class="form-control form-control-sm" rows="10"
						>{oModal.item.Content}</textarea
					>
				</div>
			</div>
		</div>
	{/if}
</div>
