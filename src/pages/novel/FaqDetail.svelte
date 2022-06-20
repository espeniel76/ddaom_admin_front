<script>
	import { beforeUpdate, onMount } from "svelte";

	import { meta, router } from "tinro";
	import { faq , checkedList , check } from "../../stores";
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
		oStartDate: "",
		oEndDate: "",
		CreatedAt: "",
		Creator: "",
		UpdatedAt: "",
		Updator: "",
		oTitle:"",
		oContent:"",
		ocategory:null,
	};
	
	let Data;
	let urlList = "/novel/faq";

	onMount(async () => {
		if (_id !== "new") {
			let retVal = await faq.getFaq(_id);
			if (retVal.ResultCode === "OK") {
				Data = retVal.Data;
			} else {
				alert(retVal.ErrorDesc);
			}
		}
		console.log('faqData',Data);
	
		
		
		
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
		} else if (oSave.oActiveYnFalse.checked) {
			
			isActive = false;
			
		}
	
			// 사용기간 체크
			
	
		if (oSave.oTitle.value.length < 1) {
			alert("제목을 입력 하세요.");
			oSave.oTitle.focus();
			return false;
		}

		if (oSave.oContent.value.length < 1) {
			alert("내용을 입력 하세요.");
			oSave.oContent.focus();
			return false;
		}

		//수정 
		let retVal;
		if (_id === "new") {
			retVal = await faq.saveFaq(oSave.oTitle.value, oSave.oContent.value, isActive, oSave.oStartDate.value, oSave.oEndDate.value);

			if (retVal.ResultCode === "OK") {
				router.goto("/novel/faq");

			} else {
				alert(retVal.ErrorDesc);
			}
		} else {
			retVal = await faq.editFaq(
				_id,
				oSave.oTitle.value,
				oSave.oContent.value,
				isActive,
				oSave.oStartDate.value,
				oSave.oEndDate.value
			);
			if (retVal.ResultCode === "OK") {
				alert("정상적으로 수정 되었습니다");
				router.goto("/novel/faq");
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
		
			oSave.oTitle.value = Data.Title;
			oSave.oContent.value = Data.Content;
		
		
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
				<tr>
					<td style="text-align: right;"><h5 class="mb-0">카테고리*</h5></td>
					<td style="text-align: right;"><h5 class="mb-0">
						<select
						class="form-select form-select-sm"
						id="exampleFormControlSelect1"
						aria-label="Default select example"
						
						>
							<option value="All" selected>전체</option>
							<option value="Y">분류1</option>
							<option value="N">분류2</option>
							<option value="N">분류3</option>
							<option value="N">분류4</option>
							<option value="N">분류5</option>
						</select>
					</td>
				</tr>
				<DetailCommonYn {oSave} />
					<tr>
						<td style="text-align: right;"><h5 class="mb-0">제목*</h5></td>
					<td width="*" style="vertical-align: middle" height="55" colspan="3">
						<input type="text" class="form-control form-control-sm" placeholder="제목" bind:this={oSave.oTitle} />
					</td>
					</tr>
				
				<tr>
					<td style="text-align: right;"><h5 class="mb-0">내용*</h5></td>
					<td width="*" style="vertical-align: middle" height="55" colspan="3">
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
				<tr>
				</tr>
				{#if _id !== "new"}
					<DetailCommonBottom {oSave} />
				{/if}
			</tbody>
		</table>
		<DetailCommonBottomBtns {urlList} {fnSave} {_id} />
	</div>
</div>
