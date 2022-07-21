<script>
	export let fnSearch;
	export let oPage;
	export let oPageStore;

	let nowPage = 0;
	let totalPage = 0;
	let myRound = 0;
	let startPage = 0;
	let endPage = 0;
	let end = 0;
	let pages = [];
	$: {
		if (oPage.totalCount > 0) {
			pages = [];
			nowPage = $oPageStore.nowPage === 0 ? 1 : $oPageStore.nowPage;
			totalPage = Math.ceil(oPage.totalCount / oPage.pageSize);
			myRound = Math.floor(nowPage / oPage.pageSize);
			startPage = myRound * oPage.pageSize;
			endPage = startPage + $oPageStore.pageListSize - 1;
			end = endPage <= totalPage ? endPage : totalPage;
			let o = $oPageStore;
			o.nowPage = nowPage;
			o.totalCount = oPage.totalCount;
			o.totalPage = totalPage;
			o.pageSize = oPage.pageSize;
			o.startPage = startPage;
			o.endPage = endPage;
			console.log(o);
			oPageStore.update((oPageStore) => o);
			for (let i = startPage; i <= end; i++) {
				pages = [...pages, i];
			}
		}
	}
</script>

<table class="table">
	<tr>
		<td width="*">
			<nav aria-label="Page navigation">
				<ul class="pagination justify-content-center">
					{#if startPage > 1}
						<li class="page-item prev">
							<span
								class="page-link"
								on:click={() => {
									$oPageStore.endPage = $oPageStore.startPage - 1;
									$oPageStore.startPage = $oPageStore.endPage - ($oPageStore.pageListSize - 1);
									$oPageStore.nowPage = $oPageStore.endPage;
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
											let o = $oPageStore;
											o.nowPage = page;
											oPageStore.update((oPageStore) => o);
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
									$oPageStore.startPage = $oPageStore.endPage + 1;
									$oPageStore.nowPage = $oPageStore.startPage;
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
	</tr>
</table>
