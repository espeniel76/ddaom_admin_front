<script>
	import { onMount } from 'svelte';

	import { meta, router } from 'tinro';
	import { keywords, checkedList, check } from '../../stores';
	import { Dates } from '../../utils/date';
	import DetailCommonBottom from '../../components/DetailCommonBottom.svelte';
	import DetailCommonYn from '../../components/DetailCommonYn.svelte';
	import DetailCommonPeriod from '../../components/DetailCommonPeriod.svelte';
	import DetailCommonBottomBtns from '../../components/DetailCommonBottomBtns.svelte';
	const route = meta();
	let _id = route.params._id;

	let oSave = {
		oActiveYnTrue: null,
		oActiveYnFalse: null,
		ProcessYn: '',
		oStartDate: '',
		oEndDate: '',
		oKeyword: '',
		CntTotal: 0,
		CreatedAt: '',
		Creator: '',
		UpdatedAt: '',
		Updator: '',
		Textarea: '',
	};
	let Data;
	let nowDate = Dates.getYYYYMMTZ();
	let urlList = '/novel/keywords';
	const blank_pattern = /^\s+|\s+$/g;
	const regex = /[\s\uFEFF\xA0]+$/gi;
	// .replace(regex, '')

	onMount(async () => {
		if (_id !== 'new') {
			let retVal = await keywords.getKeyword(_id);

			if (retVal.ResultCode === 'OK') {
				Data = retVal.Data;
				oSave.oKeyword = Data.Keyword;
			} else {
				alert(retVal.ErrorDesc);
			}
		}
	});

	//체크 초기화
	async function fnPageNavSet() {
		$checkedList = [];
		$check = false;
	}

	//생성
	async function fnSave() {
		let isActive = false;
		if (oSave.oActiveYnTrue.checked) {
			isActive = true;
			fnPageNavSet();
			console.log('등록');
		} else if (oSave.oActiveYnFalse.checked) {
			isActive = false;
		}
		// 사용기간 체크
		if (oSave.oStartDate.value.length < 1) {
			alert('사용기간 시작일을 선택 하세요.');
			oSave.oStartDate.focus();
			return false;
		}
		if (oSave.oEndDate.value.length < 1) {
			alert('사용기간 종료일을 선택 하세요.');
			oSave.oEndDate.focus();
			return false;
		}
		if (oSave.oEndDate.value < oSave.oStartDate.value) {
			alert('시작일이 종료일보다 큽니다.');
			oSave.oStartDate.focus();
			return false;
		}
		if (oSave.oKeyword < 1) {
			alert('주제어를 입력 하세요.');
			oSave.oKeyword.focus();
			return false;
		}

		//수정
		let retVal;
		if (_id === 'new') {
			retVal = await keywords.saveKeyword(
				oSave.oKeyword.replace(regex, ''),
				isActive,
				oSave.oStartDate.value,
				oSave.oEndDate.value
			);
			if (retVal.ResultCode === 'OK') {
				router.goto('/novel/keywords');
			} else {
				alert(retVal.ErrorDesc);
			}
		} else {
			retVal = await keywords.editKeyword(
				_id,
				oSave.oKeyword.replace(regex, ''),
				isActive,
				oSave.oStartDate.value,
				oSave.oEndDate.value
			);
			if (retVal.ResultCode === 'OK') {
				alert('정상적으로 수정 되었습니다');
				router.goto('/novel/keywords');
			} else {
				alert(retVal.ErrorDesc);
			}
		}
	}

	$: {
		if (Data) {
			if (Data.ActiveYn) {
				oSave.oActiveYnTrue.checked = true;
				oSave.oActiveYnFalse.checked = false;
			} else {
				oSave.oActiveYnTrue.checked = false;
				oSave.oActiveYnFalse.checked = true;
			}
			if (nowDate < Data.StartDate) {
				oSave.ProcessYn = '예정';
			} else if (nowDate < Data.EndDate) {
				oSave.ProcessYn = '진행';
			} else {
				oSave.ProcessYn = '종료';
			}

			oSave.oStartDate.value = Dates.defaultConvertFullT(Data.StartDate);
			oSave.oEndDate.value = Dates.defaultConvertFullT(Data.EndDate);

			oSave.CntTotal = Data.CntTotal;
			oSave.CreatedAt = Data.CreatedAt;
			oSave.UpdatedAt = Data.UpdatedAt;
			oSave.Creator = Data.Creator;
			oSave.Updator = Data.Updator;
		}

		if (oSave.oKeyword.length > 20) {
			alert('공백 포함하여 20자까지 입력할 수 있습니다.');
		}
	}
</script>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<tbody class="table-border-bottom-0">
				<DetailCommonYn {oSave} title="사용여부" Y="사용" N="미사용" />
				<DetailCommonPeriod
					text="주제어 등록은 정시마다 1회 체크하여 오픈됩니다. (ex. 11:30 -> 12:00 오픈)"
					{oSave}
				/>
				{#if _id !== 'new'}
					<tr>
						<td style="text-align: right;"
							><h5 class="mb-0">진행여부</h5></td
						>
						<td
							width="*"
							style="vertical-align: middle;"
							colspan="3">{oSave.ProcessYn}</td
						>
					</tr>
				{/if}
				<tr>
					<td style="text-align: right;"
						><h5 class="mb-0">주제어*</h5></td
					>
					<td
						width="*"
						style="vertical-align: middle"
						height="55"
						colspan="3"
					>
						<textarea
							type="text"
							rows="2"
							style="resize:none"
							wrap="hard"
							class="form-control form-control-sm"
							placeholder="주제어"
							aria-label="Recipient's username with two button addons"
							maxlength={20}
							bind:value={oSave.oKeyword}
						/>
					</td>
				</tr>
				<tr>
					<td style="text-align: right;"
						><h5 class="mb-0">연재 소설 수</h5></td
					>
					<td width="*" style="vertical-align: middle;" colspan="3"
						>{oSave.CntTotal}</td
					>
				</tr>
				{#if _id !== 'new'}
					<DetailCommonBottom {oSave} />
				{/if}
			</tbody>
		</table>
		<DetailCommonBottomBtns {urlList} {fnSave} {_id} />
	</div>
</div>
