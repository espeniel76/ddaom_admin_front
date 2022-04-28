<script>
	import { onMount } from "svelte";

	import { meta, router } from "tinro";
	import { images } from "../../stores";
	import DetailCommonBottom from "../../components/DetailCommonBottom.svelte";
	import DetailCommonYn from "../../components/DetailCommonYn.svelte";
	import DetailCommonBottomBtns from "../../components/DetailCommonBottomBtns.svelte";
	import consts from "../../define/consts";
	const route = meta();
	let _id = route.params._id;

	let oSave = {
		oActiveYnTrue: null,
		oActiveYnFalse: null,
		Image: "",
		oName: "",
		CreatedAt: "",
		Creator: "",
		UpdatedAt: "",
		Updator: "",
	};
	let Data;
	let urlList = "/novel/cover/image";
	let oImage = null;

	onMount(async () => {
		if (_id !== "new") {
			let retVal = await images.get(_id);
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
		if (oSave.oName.value.length < 1) {
			alert("이미지명을 입력 하세요.");
			oSave.oName.focus();
			return false;
		}

		let retVal;
		if (_id === "new") {
			retVal = await images.save(oSave.oName.value, oSave.Image, isActive);
			if (retVal.ResultCode === "OK") {
				router.goto(urlList);
			} else {
				alert(retVal.ErrorDesc);
			}
		} else {
			retVal = await colors.edit(_id, oSave.oName.value, oSave.Image, isActive);
			if (retVal.ResultCode === "OK") {
				alert("정상적으로 수정 되었습니다");
			} else {
				alert(retVal.ErrorDesc);
			}
		}
	}

	function imageLoad(input) {
		if (input.files && input.files[0]) {
			const reader = new FileReader();
			reader.onload = (e) => {
				oImage.src = e.target.result;
			};
			reader.readAsDataURL(input.files[0]);
		}
	}

	$: {
		if (Data && oSave.Image === "") {
			if (Data.ActiveYn) {
				oSave.oActiveYnTrue.checked = true;
				oSave.oActiveYnFalse.checked = false;
			} else {
				oSave.oActiveYnTrue.checked = false;
				oSave.oActiveYnFalse.checked = true;
			}
			oSave.oName.value = Data.Name;
			oSave.Image = Data.Image;
			oSave.CreatedAt = Data.CreatedAt;
			oSave.UpdatedAt = Data.UpdatedAt;
			oSave.Creator = Data.Creator;
			oSave.Updator = Data.Updator;
			oImage.src = `${consts.urls.IMAGE_SERVER}/${Data.Image}`;
		}
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
						<input type="text" class="form-control" placeholder="제목" bind:this={oSave.oName} />
					</td>
				</tr>
				<tr>
					<td style="text-align: right;"><h5 class="mb-0">이미지*</h5></td>
					<td width="*" style="vertical-align: middle" colspan="3">
						<input
							type="file"
							class="form-control"
							placeholder="코드"
							on:change={(e) => {
								imageLoad(e.target);
							}}
						/>
					</td>
				</tr>
				<tr>
					<td width="*" style="vertical-align: middle" colspan="4">
						<img alt={oSave.Image} width="500" bind:this={oImage} />
					</td>
				</tr>
				{#if _id !== "new"}
					<DetailCommonBottom {oSave} />
				{/if}
			</tbody>
		</table>
		<DetailCommonBottomBtns {urlList} {fnSave} {_id} />
	</div>
</div>
