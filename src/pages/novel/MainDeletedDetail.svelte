<script>
	import { onMount } from "svelte";

	import { meta, router } from "tinro";
	import {
		mainDeletedAll,
		pagingStep2,
		pagingStep3,
		pagingStep4,
		novelStep2,
		novelStep3,
		novelStep4,
	} from "../../stores";
	import { Dates } from "../../utils/date";
	import DetailCommonBottomBtns from "../../components/DetailCommonBottomBtns.svelte";
	import { Strings } from "../../utils/string";
	import DetailCommonStepList from "../../components/DetailCommonStepList.svelte";
	import DetailCommonNovelViewLayer from "../../components/DetailCommonNovelViewLayer.svelte";
	const route = meta();
	let _id = route.params._id;
	let _id2 = Number(route.params._id2);

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

	let Data;
	let o = {
		Content: "",
		CreatedAt: "",
		EndDate: "",
		Genre: "",
		Keyword: "",
		NickName: "",
		ReasonDelete: "",
		SeqGenre: "",
		SeqMember: "",
		SeqNovelDelete: "",
		StartDate: "",
		Step: 1,
		Title: "",
		TypeDelete: 1,
		UpdatedAt: "",
		SeqNovel: "",
	};
	let urlList = "/novel/main/deleted";
	let fnSave = false;

	onMount(async () => {
		if (_id !== "new") {
			let retVal = await mainDeletedAll.get(_id, _id2);
			if (retVal.ResultCode === "OK") {
				Data = retVal.Data;

				if (_id2 === 1) {
					oSearchStep2.SeqNovelStep1 = Data.SeqNovel;
					oSearchStep3.SeqNovelStep1 = Data.SeqNovel;
					oSearchStep4.SeqNovelStep1 = Data.SeqNovel;

					await fnSearchStep2();
					await fnSearchStep3();
					await fnSearchStep4();
				}
			} else {
				alert(retVal.ErrorDesc);
			}
		}
	});

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
	let oSearchStep2 = {
		Sort: "CreatedAtDESC",
		SeqNovelStep1: "0",
		Search: "",
		Deleted: "Y",
	};
	let oSearchStep3 = {
		Sort: "CreatedAtDESC",
		SeqNovelStep1: "0",
		Search: "",
		Deleted: "Y",
	};
	let oSearchStep4 = {
		Sort: "CreatedAtDESC",
		SeqNovelStep1: "0",
		Search: "",
		Deleted: "Y",
	};
	function fnInitStep2() {
		oSearchStep2.Sort = "CreatedAtDESC";
		oSearchStep2.Search = "";
	}
	function fnInitStep3() {
		oSearchStep3.Sort = "CreatedAtDESC";
		oSearchStep3.Search = "";
	}
	function fnInitStep4() {
		oSearchStep4.Sort = "CreatedAtDESC";
		oSearchStep4.Search = "";
	}
	async function fnSearchStep2() {
		await novelStep2.fetch(oSearchStep2, $pagingStep2.pageSize, $pagingStep2.nowPage);
	}
	async function fnSearchStep3() {
		await novelStep3.fetch(oSearchStep3, $pagingStep3.pageSize, $pagingStep3.nowPage);
	}
	async function fnSearchStep4() {
		await novelStep4.fetch(oSearchStep4, $pagingStep4.pageSize, $pagingStep4.nowPage);
	}

	let oModal = {
		class: "modal fade",
		style: "display: none",
		item: {},
	};
	function fnInitModal() {
		oModal.class = "modal fade";
		oModal.style = "display: none";
		oModal.item = {};
	}

	function fnShowModal(o, isDel) {
		oModal.class = "modal fade show";
		oModal.style = "display: block";
		oModal.item = o;
	}

	$: {
		if (Data) {
			o = Data;
		}
	}
</script>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<tbody class="table-border-bottom-0">
				<tr>
					<td width="100" style="text-align: right;"><h5 class="mb-0">진행여부</h5></td>
					<td width="200" style="vertical-align: middle;">{Dates.getProcessText(o.StartDate, o.EndDate)}</td>
					<td width="100" style="text-align: right;"><h5 class="mb-0">시작일</h5></td>
					<td width="200" style="vertical-align: middle;">{Dates.defaultConvertFull(o.StartDate)}</td>
					<td width="100" style="text-align: right;"><h5 class="mb-0">종료일</h5></td>
					<td width="*" style="vertical-align: middle;">{Dates.defaultConvertFull(o.EndDate)}</td>
				</tr>
				<tr>
					<td width="100" style="text-align: right;"><h5 class="mb-0">주제어</h5></td>
					<td width="*" style="vertical-align: middle;" colspan="5">{o.Keyword}</td>
				</tr>
				<tr>
					<td width="100" style="text-align: right;"><h5 class="mb-0">제목</h5></td>
					<td width="*" style="vertical-align: middle;" colspan="5">{o.Title}</td>
				</tr>
				<tr>
					<td width="100" style="text-align: right;"><h5 class="mb-0">장르</h5></td>
					<td width="200" style="vertical-align: middle;">{o.Genre}</td>
					<td width="100" style="text-align: right;"><h5 class="mb-0">Step</h5></td>
					<td width="200" style="vertical-align: middle;">{o.Step}</td>
					<td width="100" style="text-align: right;"><h5 class="mb-0">등록일</h5></td>
					<td width="*" style="vertical-align: middle;">{Dates.defaultConvertFull(o.CreatedAt)}</td>
				</tr>
				<tr>
					<td width="100" style="text-align: right;"><h5 class="mb-0">내용</h5></td>
					<td width="*" style="vertical-align: middle;" colspan="5">
						<textarea class="form-control form-control-sm" rows="5">{o.Content}</textarea>
					</td>
				</tr>
				<tr>
					<td width="100" style="text-align: right;"><h5 class="mb-0">작가</h5></td>
					<td width="200" style="vertical-align: middle;">{o.NickName}</td>
					<td width="100" style="text-align: right;"><h5 class="mb-0">삭제일</h5></td>
					<td width="200" style="vertical-align: middle;">{Dates.defaultConvertFull(o.UpdatedAt)}</td>
					<td width="100" style="text-align: right;"><h5 class="mb-0">삭제유형</h5></td>
					<td width="*" style="vertical-align: middle;">{Strings.getDeleteType(o.TypeDelete)}</td>
				</tr>
				<tr>
					<td width="100" style="text-align: right;"><h5 class="mb-0">삭제사유</h5></td>
					<td width="*" style="vertical-align: middle;" colspan="5">
						<textarea class="form-control form-control-sm" rows="3">{o.ReasonDelete}</textarea>
					</td>
				</tr>
			</tbody>
		</table>
		{#if _id2 == 1}
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

				<div class="tab-content" style="padding:5px; box-shadow: none;">
					<div class={oStepClass.step2.content}>
						<DetailCommonStepList
							oSearchStep={oSearchStep2}
							fnInitStep={fnInitStep2}
							fnSearch={fnSearchStep2}
							oPage={oPageStep2}
							oPageStore={pagingStep2}
							oList={$novelStep2.Data.List}
							{fnShowModal}
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
							viewType="2"
						/>
					</div>
				</div>
			</div>
		{/if}
		<DetailCommonBottomBtns {urlList} {fnSave} {_id} />
	</div>
</div>
<DetailCommonNovelViewLayer {oModal} {fnInitModal} />

