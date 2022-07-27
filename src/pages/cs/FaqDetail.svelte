<script>
	import { onMount } from 'svelte';

	import { meta, router } from 'tinro';
	import { faq, categoryFaq } from '../../stores';

	import DetailCommonBottom from '../../components/DetailCommonBottom.svelte';
	import DetailCommonYn from '../../components/DetailCommonYn.svelte';
	import DetailCommonBottomBtns from '../../components/DetailCommonBottomBtns.svelte';
	const route = meta();
	let _id = route.params._id;

	let oSave = {
		oActiveYnTrue: null,
		oActiveYnFalse: null,
		oStartDate: '',
		oEndDate: '',
		CreatedAt: '',
		Creator: '',
		UpdatedAt: '',
		Updator: '',
		oTitle: '',
		oContent: '',
		oCategory: 'Choice',
		oCategory2: '',
	};

	let Data;
	let urlList = '/cs/faq/';
	const blank_pattern = /^\s+|\s+$/g;
	const regex = /[\s\uFEFF\xA0]+$/gi;
	// .replace(regex, '')

	onMount(async () => {
		if (_id !== 'new') {
			let retVal = await faq.getFaq(_id);
			if (retVal.ResultCode === 'OK') {
				Data = retVal.Data.List[0];
				oSave.oCategory = Data.seq_category_faq;
			} else {
				alert(retVal.ErrorDesc);
			}
		}
		fnSearch();
	});

	async function fnSearch() {
		await categoryFaq.fetchCategoryFaq();
	}

	//생성
	async function fnSave() {
		let isActive = false;
		if (oSave.oActiveYnTrue.checked) {
			isActive = true;
		} else if (oSave.oActiveYnFalse.checked) {
			isActive = false;
		}

		// 사용기간 체크

		if (oSave.oCategory === 'Choice') {
			alert('카테고리를 선택 하세요 .');
			return false;
		}

		if (oSave.oTitle.value.length < 1) {
			alert('제목을 입력 하세요.');
			oSave.oTitle.focus();
			return false;
		}

		if (oSave.oTitle.value.replace(blank_pattern, '') == '') {
			alert('제목 공백만 입력되었습니다.');
			return false;
		}

		if (oSave.oContent.value.length < 1) {
			alert('내용을 입력 하세요.');
			oSave.oContent.focus();
			return false;
		}
		if (oSave.oContent.value.replace(blank_pattern, '') == '') {
			alert('내용 공백만 입력되었습니다.');
			return false;
		}

		//수정 생성
		let retVal;
		if (_id === 'new') {
			retVal = await faq.saveFaq(
				oSave.oCategory,
				oSave.oTitle.value.replace(regex, ''),
				oSave.oContent.value,
				isActive,
				oSave.oStartDate.value,
				oSave.oEndDate.value
			);

			if (retVal.ResultCode === 'OK') {
				router.goto('/cs/faq');
			} else {
				alert(retVal.ErrorDesc);
			}
		} else {
			retVal = await faq.editFaq(
				_id,
				oSave.oCategory,
				oSave.oTitle.value.replace(regex, ''),
				oSave.oContent.value,
				isActive,
				oSave.oStartDate.value,
				oSave.oEndDate.value
			);

			if (retVal.ResultCode === 'OK') {
				alert('정상적으로 수정 되었습니다');
				router.goto('/cs/faq');
			} else {
				alert(retVal.ErrorDesc);
			}
		}
	}

	let selected;
	$: {
		if (Data) {
			if (Data.active_yn) {
				oSave.oActiveYnTrue.checked = true;
				oSave.oActiveYnFalse.checked = false;
			} else {
				oSave.oActiveYnTrue.checked = false;
				oSave.oActiveYnFalse.checked = true;
			}

			oSave.oTitle.value = Data.title;
			oSave.oContent.value = Data.content;

			oSave.CreatedAt = Data.created_at;
			oSave.UpdatedAt = Data.updated_at;
			oSave.Creator = Data.creator;
			oSave.Updator = Data.updator;

			// oSave.oCategory = Data.seq_category_faq; //2
		}
	}
</script>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<tbody class="table-border-bottom-0">
				<tr>
					<td style="text-align: right;"
						><h5 class="mb-0">카테고리*</h5></td
					>
					<td style="text-align: right;"
						><h5 class="mb-0">
							<select
								class="form-select form-select-sm"
								id="exampleFormControlSelect1"
								aria-label="Default select example"
								bind:value={oSave.oCategory}
							>
								<option value="Choice">선택해주세요</option>
								{#each $categoryFaq.Data.List as o, index}
									<option
										value={o.SeqCategoryFaqs}
										style={o.ActiveYn ? '' : 'display:none'}
										>{o.CategoryFaq}</option
									>
								{/each}
							</select>
						</h5></td
					>
				</tr>
				<DetailCommonYn {oSave} title="노출여부" Y="노출" N="미노출" />
				<tr>
					<td style="text-align: right;"
						><h5 class="mb-0">제목*</h5></td
					>
					<td
						width="*"
						style="vertical-align: middle"
						height="55"
						colspan="3"
					>
						<input
							type="text"
							class="form-control form-control-sm"
							placeholder="제목"
							bind:this={oSave.oTitle}
						/>
					</td>
				</tr>

				<tr>
					<td style="text-align: right;"
						><h5 class="mb-0">내용*</h5></td
					>
					<td
						width="*"
						style="vertical-align: middle"
						height="55"
						colspan="3"
					>
						<textarea
							type="text"
							rows="10"
							style="resize:none"
							wrap="hard"
							class="form-control form-control-sm"
							placeholder=""
							aria-label="Recipient's username with two button addons"
							bind:this={oSave.oContent}
						/>
					</td>
				</tr>
				<tr />
				{#if _id !== 'new'}
					<DetailCommonBottom {oSave} />
				{/if}
			</tbody>
		</table>
		<DetailCommonBottomBtns {urlList} {fnSave} {_id} />
	</div>
</div>
