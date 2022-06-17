<script>
	import { beforeUpdate, onMount } from "svelte";

	import { meta, router } from "tinro";
	import { keywords ,notice, checkedList , check } from "../../stores";
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
	};
	
	let Data;
	let urlList = "/novel/notice";

	onMount(async () => {
		if (_id !== "new") {
			let retVal = await notice.getNotice(_id);
			if (retVal.ResultCode === "OK") {
				Data = retVal.Data;
			} else {
				alert(retVal.ErrorDesc);
			}
		}
		console.log('notice',Data);
		console.log('notice',_id);
		
		
		
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
			fnPageNavSet();
			isActive = false;
			
		}
	


		//수정 
		let retVal;
		if (_id === "new") {
			retVal = await notice.saveNotice(oSave.oTitle.value, oSave.oContent.value, isActive, oSave.oStartDate.value, oSave.oEndDate.value);

			if (retVal.ResultCode === "OK") {
				router.goto("/novel/notice");

			} else {
				alert(retVal.ErrorDesc);
			}
		} else {
			retVal = await notice.editNotice(
				_id,
				oSave.oTitle.value,
				oSave.oContent.value,
				isActive,
				oSave.oStartDate.value,
				oSave.oEndDate.value
			);
			if (retVal.ResultCode === "OK") {
				alert("정상적으로 수정 되었습니다");
			} else {
				alert(retVal.ErrorDesc);
				alert("여기에런가");
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
			oSave.oTitle.value = Data.Title;
			oSave.oContent.value = Data.Content;
		
		
			oSave.CreatedAt = Data.CreatedAt;
			oSave.UpdatedAt = Data.UpdatedAt;
			oSave.Creator = Data.Creator;
			oSave.Updator = Data.Updator;
		}
		console.log("a",Data);
	
	}
</script>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<tbody class="table-border-bottom-0">
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
