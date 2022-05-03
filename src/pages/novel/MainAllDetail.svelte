<script>
	import { onMount } from "svelte";
	import { meta, router } from "tinro";
	import { paging, genres, mainAllDetail, novelStep1, novelStep2, novelStep3, novelStep4 } from "../../stores";
	import { Dates } from "../../utils/date";
	import PagingNoFunc from "../../components/PagingNoFunc.svelte";
	const route = meta();
	let _id = route.params._id;

	let oStepClass = {
		step2: {
			title: "nav-link active",
			content: "tab-pane fade show active",
		},
		step3: {
			title: "nav-link",
			content: "tab-pane fade",
		},
		step4: {
			title: "nav-link",
			content: "tab-pane fade",
		},
	};
	function fnShowStepClass(step) {
		switch (step) {
			case 2:
				oStepClass.step2.title = "nav-link active";
				oStepClass.step2.content = "tab-pane show active";
				oStepClass.step3.title = "nav-link";
				oStepClass.step3.content = "tab-pane";
				oStepClass.step4.title = "nav-link";
				oStepClass.step4.content = "tab-pane";
				break;
			case 3:
				oStepClass.step2.title = "nav-link";
				oStepClass.step2.content = "tab-pane";
				oStepClass.step3.title = "nav-link active";
				oStepClass.step3.content = "tab-pane show active";
				oStepClass.step4.title = "nav-link";
				oStepClass.step4.content = "tab-pane";
				break;
			case 4:
				oStepClass.step2.title = "nav-link";
				oStepClass.step2.content = "tab-pane";
				oStepClass.step3.title = "nav-link";
				oStepClass.step3.content = "tab-pane";
				oStepClass.step4.title = "nav-link active";
				oStepClass.step4.content = "tab-pane show active";
				break;
		}
	}
	let nowDate = Dates.getYYYYMMTZ();
	let pageSize = 10;
	let totalCount = 0;
	let oSearchStep1 = {
		SeqKeyword: _id,
		SeqGenre: "0",
		Sort: "CreatedAtDESC",
		Search: "",
	};
	let oSearchStep2 = {
		Sort: "CreatedAtDESC",
		SeqNovelStep1: "0",
		Search: "",
	};
	let oSearchStep3 = {
		Sort: "CreatedAtDESC",
		SeqNovelStep1: "0",
		Search: "",
	};
	let oSearchStep4 = {
		Sort: "CreatedAtDESC",
		SeqNovelStep1: "0",
		Search: "",
	};
	onMount(async () => {
		await genres.fetchGenres(true, "", 1000, 1);
		await novelStep1.fetch(oSearchStep1, $paging.pageSize, $paging.nowPage);
	});

	function fnInitStep1() {
		oSearchStep1.SeqGenre = "0";
		oSearchStep1.Sort = "CreatedAtDESC";
		oSearchStep1.Search = "";
	}
	async function fnSearchStep1() {
		await novelStep1.fetch(oSearchStep1, $paging.pageSize, $paging.nowPage);
	}
	async function fnSearchStep2() {
		await novelStep2.fetch(oSearchStep2, $paging.pageSize, $paging.nowPage);
		console.log($novelStep2);
	}
	async function fnSearchStep3() {
		await novelStep3.fetch(oSearchStep3, $paging.pageSize, $paging.nowPage);
	}
	async function fnSearchStep4() {
		await novelStep4.fetch(oSearchStep4, $paging.pageSize, $paging.nowPage);
	}

	let oStep1Content = {
		CntLike: "",
		Content: "",
		CreatedAt: "",
		Genre: "",
		NickName: "",
		SeqGenre: "",
		SeqMember: "",
		SeqNovelStep1: "",
		Title: "",
	};

	$: {
		if ($novelStep1.Data.TotalCount > 0) {
			console.log($novelStep1);
			totalCount = $novelStep1.Data.TotalCount;
		}
	}
</script>

<div class="row">
	<div class="col-xl-5">
		<div class="card mb-4">
			<table class="table">
				<tbody class="table-border-bottom-0">
					<tr>
						<td width="50" style="text-align: right; padding: 10px">장르</td>
						<td style="padding: 10px">
							<select class="form-select form-select-sm" bind:value={oSearchStep1.SeqGenre}>
								<option value="0" selected>전체</option>
								{#each $genres.Data.List as o}
									<option value={o.SeqGenre}>{o.Genre}</option>
								{/each}
							</select>
						</td>
						<td style="text-align: right; padding: 10px">제목/내용/작가</td>
						<td style="padding: 10px">
							<div class="input-group">
								<input type="text" class="form-control form-control-sm" placeholder="제목/내용/작가" bind:value={oSearchStep1.Search} />
								<button class="btn btn-sm btn-outline-primary" type="button" on:click={fnInitStep1}>초기화</button>
								<button class="btn btn-sm btn-primary" type="button" on:click={fnSearchStep1}>검색</button>
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
								<option value="CreatedAtDESC" selected>등록일 순</option>
								<option value="LikeDESC">좋아요 많은 순</option>
							</select>
						</th>
						<th colspan="2" style="text-align:right; padding: 10px">Total : {$paging.totalCount} , Now: {$paging.nowPage}, pages: {$paging.totalPage}</th>
					</tr>
					<tr style="text-align:center">
						<th width="50">No</th>
						<th width="*">제목</th>
						<th width="150">장르</th>
						<th width="150">작가</th>
					</tr>
				</thead>
				<tbody class="table-border-bottom-0">
					{#each $novelStep1.Data.List as o, index}
						<tr
							style="text-align:center; cursor:pointer"
							on:click={async () => {
								oStep1Content = o;

								// step 2,3,4 데이터 가져오기
								oSearchStep2.SeqNovelStep1 = o.SeqNovelStep1;
								oSearchStep3.SeqNovelStep1 = o.SeqNovelStep1;
								oSearchStep4.SeqNovelStep1 = o.SeqNovelStep1;

								await fnSearchStep2();
							}}
						>
							<td>{o.SeqNovelStep1}</td>
							<td>{o.Title}</td>
							<td>{o.Genre}</td>
							<td>{o.NickName}</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<PagingNoFunc {fnSearchStep1} {pageSize} {totalCount} />
			<button
				type="button"
				class="btn btn-sm btn-info"
				style="width:100px"
				on:click={() => {
					router.goto("/novel/main/all");
				}}>목록</button
			>
		</div>
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
						<td>
							{#if nowDate < $mainAllDetail.StartDate}
								예정
							{:else if nowDate < $mainAllDetail.EndDate}
								진행
							{:else}
								종료
							{/if}
						</td>
						<td>{Dates.defaultConvert($mainAllDetail.StartDate)}</td>
						<td>{Dates.defaultConvert($mainAllDetail.EndDate)}</td>
						<td>{$mainAllDetail.Keyword}</td>
						<td>{$mainAllDetail.CntLike}</td>
						<td>{$mainAllDetail.CntTotal}</td>
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
							<td>{oStep1Content.Title}</td>
							<td>{oStep1Content.Genre}</td>
							<td>{oStep1Content.NickName}</td>
							<td>{oStep1Content.CntLike}</td>
							<td>{Dates.defaultConvertFull(oStep1Content.CreatedAt)}</td>
							<td><button class="btn btn-sm btn-info" type="button">삭제</button></td>
						{:else}
							<td colspan="6">-</td>
						{/if}
					</tr>
					<tr>
						<td colspan="6">{oStep1Content.Content}</td>
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
			<div class="tab-content">
				<div class={oStepClass.step2.content}>
					<table class="table">
						<tbody class="table-border-bottom-0">
							<tr>
								<td width="110" style="text-align: right;">내용/작가</td>
								<td width="*" colspan="5">
									<div class="input-group">
										<input type="text" class="form-control form-control-sm" placeholder="내용/작가" />
										<button class="btn btn-sm btn-outline-primary" type="button">초기화</button>
										<button class="btn btn-sm btn-primary" type="button">검색</button>
									</div>
								</td>
							</tr>
							<tr style="text-align:center">
								<th width="50">No</th>
								<th width="*">작가</th>
								<th width="150">좋아요 수</th>
								<th width="170">등록일</th>
								<th width="90">내용</th>
								<th width="90">삭제</th>
							</tr>
							{#each $novelStep2.Data.List as o, index}
								<tr style="text-align:center">
									<td>{o.SeqNovelStep2}</td>
									<td>{o.NickName}</td>
									<td>{o.CntLike}</td>
									<td>{Dates.defaultConvertFull(o.CreatedAt)}</td>
									<td>보기</td>
									<td><button class="btn btn-sm btn-info" type="button">삭제</button></td>
								</tr>
							{/each}
						</tbody>
					</table>
					<!-- <PagingNoFunc {fnSearchStep1} {pageSize} {totalCount} /> -->
				</div>
				<div class={oStepClass.step3.content}>
					<p>Donut dragée jelly pie halvah. Danish gingerbread bonbon cookie wafer candy oat cake ice cream. Gummies halvah tootsie roll muffin biscuit icing dessert gingerbread. Pastry ice cream cheesecake fruitcake.</p>
					<p class="mb-0">Jelly-o jelly beans icing pastry cake cake lemon drops. Muffin muffin pie tiramisu halvah cotton candy liquorice caramels.</p>
				</div>
				<div class={oStepClass.step4.content}>
					<p>Oat cake chupa chups dragée donut toffee. Sweet cotton candy jelly beans macaroon gummies cupcake gummi bears cake chocolate.</p>
					<p class="mb-0">Cake chocolate bar cotton candy apple pie tootsie roll ice cream apple pie brownie cake. Sweet roll icing sesame snaps caramels danish toffee. Brownie biscuit dessert dessert. Pudding jelly jelly-o tart brownie jelly.</p>
				</div>
			</div>
		</div>
	</div>
</div>
