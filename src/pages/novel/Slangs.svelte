<script>
	import { onMount } from "svelte";
	import { slangs, menu } from "../../stores";
	import { Dates } from "../../utils/date";
	import Paging from "../../components/Paging.svelte";

	let oEdit = {
		SeqSlang: 0,
		oSlang: null,
		oActiveYn: null,
	};

	onMount(() => {
		slangs.fetchSlangs("All", "", 10, 1);
	});

	function handleChangeEditMode(SeqSlang) {
		oEdit.SeqSlang = SeqSlang;
	}

	function handleChangeSaveMode() {
		let SeqSlang = oEdit.SeqSlang;
		let Slang = oEdit.oSlang.value;
		let ActiveYn = oEdit.oActiveYn.checked;
		if (Slang.length < 1) {
			alert("금칙어를 입력 하세요.");
			oEdit.oSlang.focus();
			return false;
		}
		slangs.editSlang(SeqSlang, Slang, ActiveYn);
		closeEditMode();
		slangs.fetchSlangs("All", "", 10, 1);
	}

	function closeEditMode() {
		oEdit = {
			SeqSlang: 0,
			oSlang: null,
			oActiveYn: null,
		};
	}

	$: {
		if (oEdit.oSlang) {
			oEdit.oSlang.select();
			oEdit.oSlang.focus();
		}
	}
</script>

<div class="card mb-4">
	<table class="table">
		<tbody class="table-border-bottom-0">
			<tr>
				<td width="150" style="text-align: right;"><h5 class="mb-0">사용여부</h5></td>
				<td width="250">
					<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked />
					<label class="form-check-label" for="inlineRadio1">사용</label>
					&nbsp;
					<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
					<label class="form-check-label" for="inlineRadio2">미사용</label>
				</td>
				<td width="150" style="text-align: right;"><h5 class="mb-0">금칙어</h5></td>
				<td width="*">
					<div class="input-group">
						<input type="text" class="form-control" placeholder="금칙어" aria-label="Recipient's username with two button addons" />
						<button class="btn btn-primary" type="button">등록</button>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<tbody class="table-border-bottom-0">
				<tr>
					<td width="150" style="text-align: right;"><h5 class="mb-0">사용여부</h5></td>
					<td width="250" style="vertical-align: middle;text-align:center">
						<select class="form-select" id="exampleFormControlSelect1" aria-label="Default select example">
							<option selected="">전체</option>
							<option value="1">사용</option>
							<option value="2">미사용</option>
						</select>
					</td>
					<td width="150" style="text-align: right;"><h5 class="mb-0">금칙어</h5></td>
					<td width="*">
						<div class="input-group">
							<input type="text" class="form-control" placeholder="금칙어" aria-label="Recipient's username with two button addons" />
							<button class="btn btn-outline-primary" type="button">초기화</button>
							<button class="btn btn-primary" type="button">검색</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<table class="table">
			<thead>
				<tr style="text-align:center">
					<th width="50"><input class="form-check-input" type="checkbox" value="" id="defaultCheck3" checked="" /></th>
					<th width="50">No</th>
					<th width="*">금칙어</th>
					<th width="130">사용여부</th>
					<th width="100">등록일</th>
					<th width="100">등록자</th>
					<th width="100">수정일</th>
					<th width="100">수정자</th>
					<th width="50">관리</th>
				</tr>
			</thead>
			<tbody class="table-border-bottom-0">
				{#each $slangs.Data.List as o, index}
					<tr style="text-align:center" id={o.SeqSlang}>
						<td><input class="form-check-input" type="checkbox" value="" id="defaultCheck3" checked="" /></td>
						<td>{o.SeqSlang}</td>
						<td>
							{#if oEdit.SeqSlang === o.SeqSlang}
								<input type="text" class="form-control" bind:this={oEdit.oSlang} value={o.Slang} style="text-align:center" placeholder="금칙어" />
							{:else}
								{o.Slang}
							{/if}
						</td>
						<td>
							{#if oEdit.SeqSlang === o.SeqSlang}
								<div class="form-check form-switch mb-2">
									{#if o.ActiveYn}
										<input class="form-check-input" bind:this={oEdit.oActiveYn} type="checkbox" id="flexSwitchCheckChecked" checked />
										<label class="form-check-label" for="flexSwitchCheckChecked">사용</label>
									{:else}
										<input class="form-check-input" bind:this={oEdit.oActiveYn} type="checkbox" id="flexSwitchCheckChecked" />
										<label class="form-check-label" for="flexSwitchCheckChecked">미사용</label>
									{/if}
								</div>
							{:else}
								{o.ActiveYn ? "사용" : "미사용"}
							{/if}
						</td>
						<td>{Dates.defaultConvert(o.CreatedAt)}</td>
						<td>{o.Creator ? o.Creator : ""}</td>
						<td>{Dates.defaultConvert(o.UpdatedAt)}</td>
						<td>{o.Updator ? o.Updator : ""}</td>
						<td>
							{#if oEdit.SeqSlang === o.SeqSlang}
								<button type="button" class="btn btn-sm btn-primary" on:click={handleChangeSaveMode}>저장</button>
							{:else}
								<button type="button" class="btn btn-sm btn-info" on:click={handleChangeEditMode(o.SeqSlang)}>편집</button>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<Paging />
	</div>
</div>
