<script>
	import { beforeUpdate, onMount } from "svelte";

	import { meta, router } from "tinro";
	import { inquiries, checkedList , check } from "../../stores";
	import { Dates } from "../../utils/date";
	import DetailCommonInquiriesBottom from "../../components/DetailCommonInquiriesBottom.svelte";
	import DetailAnswerYn from "../../components/DetailAnswerYn.svelte";
	import DetailCommonInquirieBottomBtns from "../../components/DetailCommonInquirieBottomBtns.svelte";

	const route = meta();
	let _id = route.params._id;

	let oSave = {
		oActiveYnTrue: null,
		oActiveYnFalse: null,
		oStartDate: "",
		oEndDate: "",
		CreatedAt: "",
		Creator: "",
		UpdatedAt: "",
		Updator: "",
		oContent:"",
		oAnswer:"",
		oTitle:"",
		oStatus: "",
	

	};
	
	let Data;
	let urlList = "/novel/inquiry";

	onMount(async () => {
		if (_id !== "new") {
			let retVal = await inquiries.getInquiries(_id);
			if (retVal.ResultCode === "OK") {
				Data = retVal.Data;
				
				
			} else {
				alert(retVal.ErrorDesc);
			}
		}
		
	
	
		
	}
	);

	async function fnSearch() { 
	
		 
	
	}

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
		} else if (oSave.oActiveYnFalse.checked) {
			
			isActive = false;
			
		}
	
			// 사용기간 체크
		
	
		// if (oSave.oTitle.value.length < 1) {
		// 	alert("제목을 입력 하세요.");
		// 	oSave.oTitle.focus();
		// 	return false;
		// }


		// if (oSave.oContent.value.length < 1) {
		// 	alert("내용을 입력 하세요.");
		// 	oSave.oContent.focus();
		// 	return false;
		// }

		//수정 
		let retVal;
		if (_id === "new") {
			retVal = await inquiries.saveInquiries(oSave.oAdContent.value, isActive, oSave.oStartDate.value, oSave.oEndDate.value);
			if (retVal.ResultCode === "OK") {
				router.goto("/novel/keywords");
			} else {
				alert(retVal.ErrorDesc);
			}
		} else {
			retVal = await inquiries.editinquiries(
				_id,
				oSave.oAnswer.value,
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
			if (Data.EmailYn) {
				oSave.oActiveYnTrue.checked = true;
				oSave.oActiveYnFalse.checked = false;
			} else {
				oSave.oActiveYnTrue.checked = false;
				oSave.oActiveYnFalse.checked = true;
			}
			
			oSave.oTitle = Data.Title;
			oSave.oContent.value = Data.Content;
			oSave.EmailYn = Data.EmailYn;
			oSave.oAnswer.value = Data.Answer;
			oSave.oStatus = Data.Status


			oSave.CreatedAt = Data.CreatedAt;
			oSave.UpdatedAt = Data.UpdatedAt;
			oSave.Creator = Data.Creator;
			oSave.Updator = Data.Updator;
			
			
			
		}
		console.log(Data);
	
	}
</script>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<tbody class="table-border-bottom-0">
				
				<tr>
					<td style="text-align: right;"><h5 class="mb-0">제목*</h5></td>
					<td width="*" style="vertical-align: middle" height="55" colspan="3">
						{oSave.oTitle}
					</td>
				</tr>
				
				<tr>
					<td style="text-align: right;"><h5 class="mb-0">문의내용*</h5></td>
					<td width="*" style="vertical-align: middle" height="55" colspan="3">
						<textarea
							type="text"
							rows="10"
							style="resize:none"
							class="form-control-plaintext"
							aria-label="Recipient's username with two button addons"
							bind:this={oSave.oContent}
						/>
					</td>
				</tr>
				<tr>
					<td style="text-align: right;"><h5 class="mb-0">이메일</h5></td>
					<td width="*" style="vertical-align: middle" height="55" colspan="3">
						{oSave.EmailYn}		
					</td>
				</tr>
				<tr>
					<td style="text-align: right;"><h5 class="mb-0">이메일로 답변 받기</h5></td>
					<td width="*" style="vertical-align: middle" height="55" colspan="3">
						{oSave.EmailYn  ? "Y" : "N"}
					</td>
				</tr>
				<DetailAnswerYn {oSave} title="답변여부" Y="답변완료" B="답변중"/>
				<tr>
					<td style="text-align: right;"><h5 class="mb-0">답변내용*</h5></td>
					<td width="*" style="vertical-align: middle" height="55" colspan="3">
						<textarea
							type="text"
							rows="10"
							style="resize:none"
							wrap="hard"
							class="form-control form-control-sm"
							placeholder=""
							aria-label="Recipient's username with two button addons"
							bind:this={oSave.oAnswer}
							/>
					</td>
				</tr>
				<tr>
				</tr>
				{#if _id !== "new"}
				<DetailCommonInquiriesBottom {oSave} />
				{/if}
			</tbody>
		</table>
		<DetailCommonInquirieBottomBtns {urlList} {fnSave} {_id} />
	</div>
</div>
