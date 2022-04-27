<script>
	import { paging } from "../stores";
	export let fnSearch;
	export let pageSize;
	export let totalCount;
	export let fnDelete;
	export let registUrl;
	let nowPage = 0;
	let totalPage = 0;
	let myRound = 0;
	let startPage = 0;
	let endPage = 0;
	let end = 0;
	let pages = [];
	$: {
		if (totalCount > 0) {
			pages = [];
			nowPage = $paging.nowPage === 0 ? 1 : $paging.nowPage;
			totalPage = Math.ceil(totalCount / pageSize);
			myRound = Math.floor(nowPage / pageSize);
			startPage = myRound * pageSize;
			endPage = startPage + $paging.pageListSize - 1;
			end = endPage <= totalPage ? endPage : totalPage;
			let o = $paging;
			o.nowPage = nowPage;
			o.totalCount = totalCount;
			o.totalPage = totalPage;
			o.pageSize = pageSize;
			o.startPage = startPage;
			o.endPage = endPage;
			paging.update((paging) => o);
			for (let i = startPage; i <= end; i++) {
				pages = [...pages, i];
			}
		}
	}
</script>

<table class="table">
	<tr>
		<td width="100">
			<div class="demo-inline-spacing">
				<button type="button" class="btn btn-danger" on:click={fnDelete}>삭제</button>
			</div>
		</td>
		<td width="*">
			<nav aria-label="Page navigation">
				<ul class="pagination justify-content-center">
					{#if startPage > 1}
						<li class="page-item prev">
							<span
								class="page-link"
								on:click={() => {
									$paging.endPage = $paging.startPage - 1;
									$paging.startPage = $paging.endPage - ($paging.pageListSize - 1);
									$paging.nowPage = $paging.endPage;
									fnSearch();
								}}
							>
								<i class="tf-icon bx bx-chevrons-left" />
							</span>
						</li>
					{/if}

					{#each pages as page}
						{#if page > 0}
							{#if nowPage === page}
								<li class="page-item active">
									<span class="page-link">{page}</span>
								</li>
							{:else}
								<li class="page-item">
									<span
										class="page-link"
										on:click={() => {
											let o = $paging;
											o.nowPage = page;
											paging.update((paging) => o);
											fnSearch();
										}}
										style="cursor:pointer"
									>
										{page}
									</span>
								</li>
							{/if}
						{/if}
					{/each}

					{#if endPage < totalPage}
						<li class="page-item next">
							<span
								class="page-link"
								on:click={() => {
									$paging.startPage = $paging.endPage + 1;
									$paging.nowPage = $paging.startPage;
									fnSearch();
								}}
							>
								<i class="tf-icon bx bx-chevrons-right" />
							</span>
						</li>
					{/if}
				</ul>
			</nav>
		</td>
		<td width="100">
			{#if registUrl}
				<div class="demo-inline-spacing">
					<a href={registUrl}>
						<button type="button" class="btn btn-primary">등록</button>
					</a>
				</div>
			{/if}
		</td>
	</tr>
</table>
