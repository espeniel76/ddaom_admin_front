<script>
	import { Dates } from "../utils/date";
	import PagingCommon from "./PagingCommon.svelte";

	export let oSearchStep;
	export let fnInitStep;
	export let fnSearch;
	export let oPage;
	export let oPageStore;
	export let oList;
	export let fnShowModal;

	$: {
		// console.log(oList);
	}
</script>

<table class="table">
	<tbody class="table-border-bottom-0">
		<tr>
			<td width="110" style="text-align: right;">내용/작가</td>
			<td width="*" colspan="6">
				<div class="input-group">
					<input
						type="text"
						class="form-control form-control-sm"
						placeholder="내용/작가"
						bind:value={oSearchStep.Search}
					/>
					<button class="btn btn-sm btn-outline-primary" type="button" on:click={fnInitStep}>초기화</button>
					<button class="btn btn-sm btn-primary" type="button" on:click={fnSearch}>검색</button>
				</div>
			</td>
		</tr>
		<tr>
			<th colspan="2" style="padding: 10px">
				<select
					class="form-select form-select-sm"
					bind:value={oSearchStep.Sort}
					style="width:150px"
					on:change={() => {
						fnSearch();
					}}
				>
					<option value="CreatedAtDESC" selected>등록일 순</option>
					<option value="LikeDESC">좋아요 많은 순</option>
				</select>
			</th>
			<th colspan="4" style="text-align:right; padding: 10px">
				Total: {$oPageStore.totalCount} , Now: {$oPageStore.nowPage}, pages: {$oPageStore.totalPage}
			</th>
		</tr>
		<tr style="text-align:center">
			<th width="50">No</th>
			<th width="*">작가</th>
			<th width="150">좋아요 수</th>
			<th width="170">등록일</th>
			<th width="90">내용</th>
			<th width="90">삭제</th>
		</tr>
		{#if oList.length > 0}
			{#each oList as o, index}
				<tr style="text-align:center">
					<td>
						{#if o.SeqNovelStep2}
							{o.SeqNovelStep2}
						{:else if o.SeqNovelStep3}
							{o.SeqNovelStep3}
						{:else if o.SeqNovelStep4}
							{o.SeqNovelStep4}
						{/if}
					</td>
					<td>{o.NickName}</td>
					<td>{o.CntLike}</td>
					<td>{Dates.defaultConvertFull(o.CreatedAt)}</td>
					<td
						><button
							class="btn btn-sm btn-success"
							type="button"
							on:click={() => {
								fnShowModal(o, false);
							}}>보기</button
						></td
					>
					<td
						><button
							class="btn btn-sm btn-info"
							type="button"
							on:click={() => {
								fnShowModal(o, true);
							}}>삭제</button
						></td
					>
				</tr>
			{/each}
		{:else}
			<tr style="text-align:center">
				<td colspan="6">- </td>
			</tr>
		{/if}
	</tbody>
</table>

<PagingCommon {fnSearch} {oPage} {oPageStore} />
