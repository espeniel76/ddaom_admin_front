<script>
	export let urlList;
	export let fnSave;
	export let _id;
</script>

<table class="table">
	<tr>
		{#if urlList}
		<td width="100">
			<div class="demo-inline-spacing">
				<a href={urlList}>
					<button type="button" class="btn btn-sm btn-info">목록</button>
				</a>
			</div>
		</td>
		{/if}
		<td width="*" />
		{#if fnSave}
			<td width="100">
				<div class="demo-inline-spacing">
					<button type="button" class="btn btn-sm btn-primary" on:click={fnSave}
						>{_id === "new" ? "등록" : "등록"}</button
					>
				</div>
			</td>
		{/if}
	</tr>
</table>
