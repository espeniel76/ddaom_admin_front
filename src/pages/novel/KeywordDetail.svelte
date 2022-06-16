<script>
	import { beforeUpdate, onMount } from "svelte";

	import { meta, router } from "tinro";
	import { keywords , checkedList , check } from "../../stores";
	import { Dates } from "../../utils/date";
	import DetailCommonBottom from "../../components/DetailCommonBottom.svelte";
	import DetailCommonYn from "../../components/DetailCommonYn.svelte";
	import DetailCommonPeriod from "../../components/DetailCommonPeriod.svelte";
	import DetailCommonBottomBtns from "../../components/DetailCommonBottomBtns.svelte";
	const route = meta();
	let _id = route.params._id;

	let oSave = {
		oActiveYnTrue: null,
		oActiveYnFalse: null,
		ProcessYn: "",
		oStartDate: "",
		oEndDate: "",
		oKeyword: "",
		CntTotal: 0,
		CreatedAt: "",
		Creator: "",
		UpdatedAt: "",
		Updator: "",
	};
	let Data;
	let nowDate = Dates.getYYYYMMTZ();
	let urlList = "/novel/keywords";

	onMount(async () => {
		if (_id !== "new") {
			let retVal = await keywords.getKeyword(_id);
			
			if (retVal.ResultCode === "OK") {
				Data = retVal.Data;
			} else {
				alert(retVal.ErrorDesc);
			}
		}
		console.log('a',_id);
		
		console.log('a2',Data);
		
	}
	);



	//체크 초기화 
	function fnPageNavSet() {
		$checkedList=[];	
		$check=false;
		}

	//생성 
	async function fnSave() {
		let isActive = false;
		if (oSave.oActiveYnTrue.checked) {
			isActive = true;
			fnPageNavSet();
			console.log("등록");
		} else if (oSave.oActiveYnFalse.checked) {
			isActive = false;
			
		}
		// 사용기간 체크
		if (oSave.oStartDate.value.length < 1) {
			alert("사용기간 시작일을 선택 하세요.");
			oSave.oStartDate.focus();
			return false;
		}
		if (oSave.oEndDate.value.length < 1) {
			alert("사용기간 종료일을 선택 하세요.");
			oSave.oEndDate.focus();
			return false;
		}
		if (oSave.oEndDate.value < oSave.oStartDate.value) {
			alert("시작일이 종료일보다 큽니다.");
			oSave.oStartDate.focus();
			return false;
		}
		if (oSave.oKeyword.value.length < 1) {
			alert("주제어를 입력 하세요.");
			oSave.oKeyword.focus();
			return false;
		}


		//수정 
		let retVal;
		if (_id === "new") {
			retVal = await keywords.saveKeyword(oSave.oKeyword.value, isActive, oSave.oStartDate.value, oSave.oEndDate.value);
			if (retVal.ResultCode === "OK") {
				router.goto("/novel/keywords");
			} else {
				alert(retVal.ErrorDesc);
			}
		} else {
			retVal = await keywords.editKeyword(
				_id,
				oSave.oKeyword.value,
				isActive,
				oSave.oStartDate.value,
				oSave.oEndDate.value
			);
			if (retVal.ResultCode === "OK") {
				alert("정상적으로 수정 되었습니다");
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
			oSave.oStartDate.value = Dates.defaultConvertFullT(Data.StartDate);
			oSave.oEndDate.value = Dates.defaultConvertFullT(Data.EndDate);
			oSave.oKeyword.value = Data.Keyword;
			if (nowDate < Data.StartDate) {
				oSave.ProcessYn = "예정";
			} else if (nowDate < Data.EndDate) {
				oSave.ProcessYn = "진행";
			} else {
				oSave.ProcessYn = "종료";
			}
			oSave.CntTotal = Data.CntTotal;
			oSave.CreatedAt = Data.CreatedAt;
			oSave.UpdatedAt = Data.UpdatedAt;
			oSave.Creator = Data.Creator;
			oSave.Updator = Data.Updator;
		}
	}
</script>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<tbody class="table-border-bottom-0">
				<DetailCommonYn {oSave} />
				<DetailCommonPeriod {oSave} />
				{#if _id !== "new"}
					<tr>
						<td style="text-align: right;"><h5 class="mb-0">진행여부</h5></td>
						<td width="*" style="vertical-align: middle;" colspan="3">{oSave.ProcessYn}</td>
					</tr>
				{/if}
				<tr>
					<td style="text-align: right;"><h5 class="mb-0">주제어*</h5></td>
					<td width="*" style="vertical-align: middle" height="55" colspan="3">
						<textarea
							type="text"
							rows="2"
							style="resize:none"
							wrap="hard"
							class="form-control form-control-sm"
							placeholder="주제어"
							aria-label="Recipient's username with two button addons"
							bind:this={oSave.oKeyword}
						/>
					</td>
				</tr>
				<tr>
					<td style="text-align: right;"><h5 class="mb-0">연재 소설 수</h5></td>
					<td width="*" style="vertical-align: middle;" colspan="3">{oSave.CntTotal}</td>
				</tr>
				{#if _id !== "new"}
					<DetailCommonBottom {oSave} />
				{/if}
			</tbody>
		</table>
		<DetailCommonBottomBtns {urlList} {fnSave} {_id} />
	</div>
</div>
