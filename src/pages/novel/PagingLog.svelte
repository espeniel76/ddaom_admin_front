<script>
import { beforeUpdate, onMount } from "svelte";
import { meta, router } from "tinro";
import {  pagingLog ,memberInformation,memberInformationList,novelFetch} from "../../stores";
import { Dates } from "../../utils/date";
import Paging from "../../components/Paging.svelte";
import DetailCommonBlockedYn  from "../../components/DetailCommonBlockedYn .svelte";
import DetailCommonInquirieBottomBtns from "../../components/DetailCommonInquirieBottomBtns.svelte";
import DetailCommonTr from "../../components/DetailCommonTr.svelte";
export let id;

	let pageSize = 10;
	let totalCount = 0;
	let registUrl = "";
	let NonData = [
		'a','b','c'
	]; 
onMount(async () => {
		$pagingLog.nowPage = 1;
		fnSearch()
	}
	
	);
	async function fnSearch() { 
		await novelFetch.fetchLog(id,$pagingLog.pageSize,$pagingLog.nowPage);
	}


	function test(e,contents) {
		switch (e) {
			case 8:
				return "블랙 리스트 미등록 (수동)"
				break;
			case 7:
				return "블랙 리스트 미등록 (자동)"
				break;
			case 6:
				return "블랙 리스트 (등록)\n[사유]\n" + (contents)
				break;
			case 5:
				return "회원 상태 변경 (탈퇴)"
				break;
			case 4:
				return "회원 상태 변경 (휴면)"
				break;
			case 3:
				return "회원 상태 변경 (정상)"
				break;
			case 2:
				return "로그인/접속"
				break;
			case 1:
				return "회원가입/접속"
				break;
			
		}
	}

$:{
	if ($novelFetch.Data.TotalCount > 0) {
			totalCount = $novelFetch.Data.TotalCount;
			console.log(totalCount);
		}
    
}


</script>


<table class="table">
	<thead>
		<tr style="font-weight: bold; font-size:large;">
		   접속/변경 내역
		</tr>
		<tr style="text-align:center">
		
			<th width="50">No</th>
			<th width="50">일시</th>
			<th width="*">내용</th>
			
		</tr>
	</thead>
	
	<!-- $inquiries.Data.queryList  -->
	<tbody class="table-border-bottom-0">
		{#each $novelFetch.Data.List as o, index}
		<tr style="text-align:center" >
			<td>{o.seq_member_log}</td>
			<td>{Dates.defaultConvertFull(o.created_at)}</td>
			<td>{test(o.type,o.contents)}</td>
		</tr>
		{/each}
		
	</tbody>
</table>
<!-- <Paging {fnSearch} {pageSize} {totalCount} fnDelete={undefined} registUrl={undefined}/> -->