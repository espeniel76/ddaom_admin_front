<script>
	import { onMount } from "svelte";

	import { meta, router } from "tinro";
	import { keywords } from "../../stores";
	import { Dates } from "../../utils/date";
	const route = meta();
	let SeqKeyword = route.params.SeqKeyword;
	console.log(SeqKeyword);

	let oSave = {
		oActiveYnTrue: null,
		oActiveYnFalse: null,
		oStartDate: "",
		oEndDate: "",
		oKeyword: "",
	};
	let Data;

	onMount(async () => {
		if (SeqKeyword !== "new") {
			let retVal = await keywords.getKeyword(SeqKeyword);
			console.log(retVal);
			if (retVal.ResultCode === "OK") {
				Data = retVal.Data;
			} else {
				alert(retVal.ErrorDesc);
			}
		}
	});

	async function fnSave() {
		let isActive = false;
		if (oSave.oActiveYnTrue.checked) {
			isActive = true;
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

		let retVal;
		if (SeqKeyword === "new") {
			retVal = await keywords.saveKeyword(oSave.oKeyword.value, isActive, oSave.oStartDate.value, oSave.oEndDate.value);
			if (retVal.ResultCode === "OK") {
				router.goto("/novel/keywords");
			} else {
				alert(retVal.ErrorDesc);
			}
		} else {
			retVal = await keywords.editKeyword(SeqKeyword, oSave.oKeyword.value, isActive, oSave.oStartDate.value, oSave.oEndDate.value);
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
			oSave.oStartDate.value = Dates.defaultConvert(Data.StartDate);
			oSave.oEndDate.value = Dates.defaultConvert(Data.EndDate);
			oSave.oKeyword.value = Data.Keyword;
		}
	}
</script>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<tbody class="table-border-bottom-0">
				<tr>
					<td width="100" style="text-align: right;"><h5 class="mb-0">사용여부*</h5></td>
					<td width="*" style="vertical-align: middle" height="55" colspan="3">
						<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" bind:this={oSave.oActiveYnTrue} checked />
						<label class="form-check-label" for="inlineRadio1">사용</label>
						&nbsp;
						<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" bind:this={oSave.oActiveYnFalse} />
						<label class="form-check-label" for="inlineRadio2">미사용</label>
					</td>
				</tr>
				<tr>
					<td style="text-align: right;"><h5 class="mb-0">사용기간*</h5></td>
					<td width="100" style="vertical-align: middle;text-align:center">
						<input class="form-control" type="date" id="html5-date-input" bind:this={oSave.oStartDate} />
					</td>
					<td width="100" style="vertical-align: middle;text-align:center; padding-left:0">
						<input class="form-control" type="date" id="html5-date-input" bind:this={oSave.oEndDate} />
					</td>
					<td width="*"> <span style="color:chocolate">* 종료일 자정이 지나면 진행여부가 ‘종료’로 자동 변경됩니다. </span></td>
				</tr>
				<tr>
					<td width="100" style="text-align: right;"><h5 class="mb-0">주제어*</h5></td>
					<td width="*" style="vertical-align: middle" height="55" colspan="3">
						<input type="text" class="form-control" placeholder="주제어" aria-label="Recipient's username with two button addons" bind:this={oSave.oKeyword} />
					</td>
				</tr>
			</tbody>
		</table>
		<table class="table">
			<tr>
				<td width="100">
					<div class="demo-inline-spacing">
						<a href="/novel/keywords">
							<button type="button" class="btn btn-info">목록</button>
						</a>
					</div>
				</td>
				<td width="*" />
				<td width="100">
					<div class="demo-inline-spacing">
						<button type="button" class="btn btn-primary" on:click={fnSave}>{SeqKeyword === "new" ? "등록" : "수정"}</button>
					</div>
				</td>
			</tr>
		</table>
	</div>
</div>
