<script>
	import { onMount } from "svelte";

	import { meta, router } from "tinro";
	import { colors, checkedList , check } from "../../stores";
	import DetailCommonBottom from "../../components/DetailCommonBottom.svelte";
	import DetailCommonYn from "../../components/DetailCommonYn.svelte";
	import DetailCommonBottomBtns from "../../components/DetailCommonBottomBtns.svelte";
	const route = meta();
	let _id = route.params._id;

	let oSave = {
		oActiveYnTrue: null,
		oActiveYnFalse: null,
		Color: "",
		oName: "",
		CreatedAt: "",
		Creator: "",
		UpdatedAt: "",
		Updator: "",
	};
	let Data;
	let urlList = "/novel/cover/background";
	const regex = /[\s\uFEFF\xA0]+$/gi;
	// .replace(regex, '')

	function fnPageNavSet() {
		$checkedList=[];	
		$check=false;
		}
		

	onMount(async () => {
		if (_id !== "new") {
			let retVal = await colors.get(_id);
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
			fnPageNavSet();
		} else if (oSave.oActiveYnFalse.checked) {
			isActive = false;
		}
		if (oSave.oName.value.length < 1) {
			alert("컬러명을 입력 하세요.");
			oSave.oName.focus();
			return false;
		}
		if (oSave.Color.length < 1) {
			alert("컬러코드를 입력 하세요.");
			oSave.Color.focus();
			return false;
		}

		let retVal;
		if (_id === "new") {
			retVal = await colors.save(oSave.oName.value.replace(regex, ''), oSave.Color, isActive);
			if (retVal.ResultCode === "OK") {
				router.goto(urlList);
			} else {
				alert(retVal.ErrorDesc);
			}
		} else {
			retVal = await colors.edit(_id, oSave.oName.value.replace(regex, ''), oSave.Color, isActive);
			if (retVal.ResultCode === "OK") {
				alert("정상적으로 수정 되었습니다");
			} else {
				alert(retVal.ErrorDesc);
			}
		}
	}

	$: {
		if (Data && oSave.Color === "") {
			if (Data.ActiveYn) {
				oSave.oActiveYnTrue.checked = true;
				oSave.oActiveYnFalse.checked = false;
			} else {
				oSave.oActiveYnTrue.checked = false;
				oSave.oActiveYnFalse.checked = true;
			}
			oSave.oName.value = Data.Name;
			oSave.Color = Data.Color;
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
				<DetailCommonYn {oSave} title="사용여부" Y="사용" N="미사용"/>
				<tr>
					<td style="text-align: right;"><h5 class="mb-0">컬러명*</h5></td>
					<td width="*" style="vertical-align: middle" height="55" colspan="4">
						<input type="text" class="form-control form-control-sm" placeholder="컬러명" bind:this={oSave.oName}
						 />
					</td>
				</tr>
				<tr>
					<td style="text-align: right;"><h5 class="mb-0">코드*</h5></td>
					<td width="200" style="vertical-align: middle">
						<input type="text" class="form-control form-control-sm" placeholder="코드"  bind:value={oSave.Color} 
						oninput="this.value = this.value.replace(/[^A-Za-z0-9#{1,1}]/ig, '')" minlength=7 maxlength=7/>
					</td>
					<td width="100" style="vertical-align: middle; background-color: {oSave.Color}" />
					<td width="200" style="vertical-align: middle;">
						<input type="color" class="form-control" placeholder="코드" bind:value={oSave.Color} />
					</td>
					<td width="*" />
				</tr>
				{#if _id !== "new"}
					<DetailCommonBottom {oSave} />
				{/if}
			</tbody>
		</table>
		<DetailCommonBottomBtns {urlList} {fnSave} {_id} />
	</div>
</div>
