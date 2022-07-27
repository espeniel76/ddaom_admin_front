<script>
	import { onMount } from 'svelte';

	import { meta, router } from 'tinro';
	import { images } from '../../stores';
	import DetailCommonBottom from '../../components/DetailCommonBottom.svelte';
	import DetailCommonYn from '../../components/DetailCommonYn.svelte';
	import DetailCommonBottomBtns from '../../components/DetailCommonBottomBtns.svelte';
	import consts from '../../define/consts';
	const route = meta();
	let _id = route.params._id;

	let oSave = {
		oActiveYnTrue: null,
		oActiveYnFalse: null,
		Image: '',
		oFile: '',
		oName: '',
		CreatedAt: '',
		Creator: '',
		UpdatedAt: '',
		Updator: '',
	};
	let Data;
	let urlList = '/novel/cover/image';
	let oImage = null;
	const blank_pattern = /^\s+|\s+$/g;
	const regex = /[\s\uFEFF\xA0]+$/gi;
	// .replace(regex, '')

	onMount(async () => {
		if (_id !== 'new') {
			let retVal = await images.get(_id);
			console.log(retVal);
			if (retVal.ResultCode === 'OK') {
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
			alert('이미지명을 입력 하세요.');
			oSave.oName.focus();
			return false;
		}

		if (oSave.oName.value.replace(blank_pattern, '') == '') {
			alert('내용 공백만 입력되었습니다.');
			return false;
		}
		if (oSave.oFile.value == '') {
			alert('이미지 파일을 등록 하세요.');
			return false;
		}
		// let fileCheck = document.getElementById('bfile');
		// console.log(fileCheck);
		// if (!fileCheck) {
		// 	alert('파일을 첨부해 주세요');
		// 	return false;
		// }

		let retVal;
		if (_id === 'new') {
			retVal = await images.save(
				oSave.oName.value.replace(regex, ''),
				oSave.oFile,
				isActive
			);
			if (retVal.ResultCode === 'OK') {
				router.goto(urlList);
			} else {
				alert(retVal.ErrorDesc);
			}
		} else {
			retVal = await images.edit(
				_id,
				oSave.oName.value.replace(regex, ''),
				oSave.oFile,
				isActive
			);
			if (retVal.ResultCode === 'OK') {
				alert('정상적으로 수정 되었습니다');
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
		console.log(oSave.Image);
		if (Data && oSave.Image === '') {
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
			oImage.src = `${consts.urls.IMAGE_SERVER}${Data.Image}`;
		}
	}
	function validateFileType(e) {
		const fileName = document.getElementById('fileName').value;
		const idxDot = fileName.lastIndexOf('.') + 1;
		const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
		if (extFile == 'png') {
			//TO DO
		} else {
			e.target.value = '';
			alert('png 확장자 파일만 등록 가능합니다.');
			return false;
		}
	}
</script>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<tbody class="table-border-bottom-0">
				<DetailCommonYn {oSave} title="사용여부" Y="사용" N="미사용" />
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
							bind:this={oSave.oName}
						/>
					</td>
				</tr>
				<tr>
					<td style="text-align: right;"
						><h5 class="mb-0">이미지*</h5></td
					>
					<td width="*" style="vertical-align: middle" colspan="3">
						<input
							id="fileName"
							type="file"
							class="form-control form-control-sm"
							placeholder="코드"
							accept="image/png"
							on:change={(e) => {
								validateFileType(e);
								imageLoad(e.target);
							}}
							bind:this={oSave.oFile}
						/>
						<div style="color:chocolate">
							*배경이 투명인 png 파일을 첨부해주세요. (카카오톡
							공유 시 오류 이슈)
						</div>
					</td>
				</tr>
				<tr>
					<td
						width="*"
						style="vertical-align: middle"
						colspan="4"
						id="bfile"
					>
						<img alt={oSave.Image} bind:this={oImage} />
					</td>
				</tr>
				{#if _id !== 'new'}
					<DetailCommonBottom {oSave} />
				{/if}
			</tbody>
		</table>
		<DetailCommonBottomBtns {urlList} {fnSave} {_id} />
	</div>
</div>
