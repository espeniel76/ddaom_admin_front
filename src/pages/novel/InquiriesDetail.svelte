<script>
	import { beforeUpdate, onMount } from "svelte";

	import { meta, router } from "tinro";
	import { inquiries  } from "../../stores";
	import { Dates } from "../../utils/date";
	import DetailCommonInquiriesBottom from "../../components/DetailCommonInquiriesBottom.svelte";
	import DetailCommonYn from "../../components/DetailCommonYn.svelte";
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
		oTitle:"",
		oContent:"",
		oEmail:"",
		oEmailYn:"",
		oStatus: "",
		oAnswer:"",
	

	};

	let Data;
	let urlList = "/novel/inquiry";

	onMount(async () => {
		if (_id !== "new") {
			let retVal = await inquiries.getInquiries(_id);
			if (retVal.ResultCode === "OK") {
				Data = retVal.Data.List[0];
			} else {
				alert(retVal.ErrorDesc);
			}
		}
		console.log('dd',Data);
		

	}
	);

	
	

	//생성 
	async function fnSave() {
		let isActive = false;
		if (oSave.oActiveYnTrue.checked) {
			isActive = true;
			oSave.oStatus = 3;
			// fnPageNavSet();
			console.log("등록");
		} else if (oSave.oActiveYnFalse.checked) {
			isActive = false;
			oSave.oStatus = 2;
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
		} else {
			retVal = await inquiries.editInquiries(_id, oSave.oStatus, oSave.oAnswer.value, oSave.oStartDate.value, oSave.oEndDate.value);

			if (retVal.ResultCode === "OK") {
				alert("정상적으로 수정 되었습니다");
				router.goto("/novel/inquiry");
			} else {
				alert(retVal.ErrorDesc);
			}
		}
	}

	$: {
		if (Data) {
			if (Data.status == 3) {
				oSave.oActiveYnTrue.checked = true;
				oSave.oActiveYnFalse.checked = false;
			} else if(Data.status == 2) {
				oSave.oActiveYnTrue.checked = false;
				oSave.oActiveYnFalse.checked = true;
			}else if(Data.status == 1) {
				oSave.oActiveYnTrue.checked = false;
				oSave.oActiveYnFalse.checked = true;
			}
			
			oSave.oTitle = Data.title;
			oSave.oContent.value = Data.content;
			oSave.oEmail = Data.email;
			oSave.oAnswer.value = Data.answer;
			
			
			oSave.CreatedAt = Data.created_at;
			oSave.UpdatedAt = Data.updated_at;
			oSave.Creator = Data.nick_name;
			oSave.Updator = Data.updator;
			oSave.oStatus = Data.status;
			
			// console.log(Data.List[0].title);
			
			
		}
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
						<textarea type="text" rows="10" style="resize:none" class="form-control-plaintext" aria-label="Recipient's username with two button addons" bind:this={oSave.oContent} />
					</td>
				</tr>
				<tr>
					<td style="text-align: right;"><h5 class="mb-0">이메일</h5></td>
					<td width="*" style="vertical-align: middle" height="55" colspan="3">
						{oSave.oEmail}		
					</td>
				</tr>
				<tr>
					<td style="text-align: right;"><h5 class="mb-0">이메일로 답변 받기</h5></td>
					<td width="*" style="vertical-align: middle" height="55" colspan="3">
						{oSave.oEmailYn=1  ? "Y" : "N"}
					</td>
				</tr>
				<DetailCommonYn {oSave} title="답변여부" Y="답변완료" N="답변중" />
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
				<tr />
				{#if _id !== "new"}
					<DetailCommonInquiriesBottom {oSave} />
				{/if}
			</tbody>
		</table>
		<DetailCommonInquirieBottomBtns {urlList} {fnSave} {_id} />
	</div>
</div>
