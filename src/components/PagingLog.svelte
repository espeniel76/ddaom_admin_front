<script>
	import { pagingLog, checkedList, check, keywords } from "../stores";
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

	//체크 초기화
	function fnPageNavSet() {
		$checkedList = [];
		$check = false;
	}

	$: {
		// if (totalCount > 0) {
		pages = [];
		nowPage = $pagingLog.nowPage === 0 ? 1 : $pagingLog.nowPage;
		totalPage = Math.ceil(totalCount / pageSize);
		myRound = Math.floor(nowPage / pageSize);
		startPage = myRound * pageSize;
		endPage = startPage + $pagingLog.pageListSize - 1;
		end = endPage <= totalPage ? endPage : totalPage;
		let o = $pagingLog;
		o.nowPage = nowPage;
		o.totalCount = totalCount;
		o.totalPage = totalPage;
		o.pageSize = pageSize;
		o.startPage = startPage;
		o.endPage = endPage;
		pagingLog.update((pagingLog) => o);
		for (let i = startPage; i <= end; i++) {
			pages = [...pages, i];
		}
		// }
	}
</script>

<table class="table">
	<tr>
		<td width="100">
			{#if fnDelete}
				<div class="demo-inline-spacing">
					<button type="button" class="btn btn-sm btn-danger" on:click={fnDelete}>삭제</button>
				</div>
			{/if}
		</td>
		<td width="*">
			<nav aria-label="Page navigation">
				<ul class="pagination justify-content-center">
					{#if startPage > 1}
						<li class="page-item prev">
							<span
								class="page-link"
								on:click={() => {
									$pagingLog.endPage = $pagingLog.startPage - 1;
									$pagingLog.startPage = $pagingLog.endPage - ($pagingLog.pageListSize - 1);
									$pagingLog.nowPage = $pagingLog.endPage;
									fnSearch();
									fnPageNavSet();
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
											let o = $pagingLog;
											o.nowPage = page;
											pagingLog.update((pagingLog) => o);
											fnSearch();
											fnPageNavSet();
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
									$pagingLog.startPage = $pagingLog.endPage + 1;
									$pagingLog.nowPage = $pagingLog.startPage;
									fnSearch();
									fnPageNavSet();
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
						<button type="button" class="btn btn-sm btn-primary">등록</button>
					</a>
				</div>
			{/if}
		</td>
	</tr>
</table>
