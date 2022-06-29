<script>
	import { beforeUpdate, onMount } from "svelte";

	import { meta, router } from "tinro";
	import { memberDetails ,memberDetailsPage ,memberInformation} from "../../stores";
	import { Dates } from "../../utils/date";
	import Paging from "../../components/Paging.svelte";
	import DetailCommonBlockedYn  from "../../components/DetailCommonBlockedYn .svelte";
	import DetailCommonInquirieBottomBtns from "../../components/DetailCommonInquirieBottomBtns.svelte";
	import DetailCommonTr from "../../components/DetailCommonTr.svelte";

	const route = meta();
	let _id = route.params._id;

	let oSave = {
		oBlockedYnTrue: null,
		oBlockedYnFalse: null,
		oBlockedYn: "",
		oDeletedAt:"",
		oDeletedYn: "",
		oStartDate: "",
		oEndDate: "",
		CreatedAt: "",
		UpdatedAt: "",
		oEmail:"",
		oStartEmail:"",
		oSnsType:"",
		oCntSubscribe:'',
		oNickName: "",
		oBlockedReason:"",
	};

	let oSearch = {
			BlockedYn: "All",
			StartDate: "",
			EndDate: "",
			NickName:"",
			CntLike:"",
		
            
        };
		let pageSize = 5;
		let totalCount = 0;
	let MembersDetail;
	let Members;
	let urlList = "/novel/memberInformation";

	onMount(async () => {
		if (_id !== "new") {
			let retVal = await memberInformation.getMemberInformation(_id);
			let retVal2 = await memberInformation.getMemberInformationReadMembers(_id);
			if (retVal.ResultCode === "OK",retVal.ResultCode === "OK") {
				MembersDetail = retVal.Data;
				Members = retVal2.Data;
				
				
			} else {
				alert(retVal.ErrorDesc);
				alert(retVal2.ErrorDesc);
			}
		}

	



		

		fnSearch();		
	}
	
	);

	async function fnSearch() { 
		await memberDetails.fetchMemberDetails()
		await memberInformation.fetchMemberInformation(oSearch, $memberDetailsPage.pageSize, $memberDetailsPage.nowPage)
	;

		 
	
	}
	

	//생성 
	async function fnSave() {
		let isBlocked = false;
		if (oSave.oBlockedYnTrue.checked) {
			isBlocked = true;
			// fnPageNavSet();
			console.log("등록");
		} else if (oSave.oBlockedYnFalse.checked) {
			isBlocked = false;
			
		}
		
	
			// 사용기간 체크
		
	
		// if (oSave.oTitle.value.length < 1) {
		// 	alert("제목을 입력 하세요.");
		// 	oSave.oTitle.focus();
		// 	return false;
		// }


		// if (oSave.oContent.value.length < 1) {
		// 	alert("내용을 입력 하세요.");
		// 	oSave.oContent.focus();
		// 	return false;
		// }

		//수정 
		let retVal;
		if (_id === "new") {
		

		} else {
			retVal = await memberInformation.editMemberInformation(
				_id,
				isBlocked,
				oSave.oBlockedReason.value,
				oSave.oStartDate.value,
				oSave.oEndDate.value
			);
		
			if (retVal.ResultCode === "OK") {
				alert("정상적으로 수정 되었습니다");
				router.goto("/novel/memberInformation");
			} else {
				alert(retVal.ErrorDesc);
			}
		}
	}
	
	$: {
	
		if (MembersDetail,Members) {
			if (Members.BlockedYn) {
				oSave.oBlockedYnTrue.checked = true;
				oSave.oBlockedYnFalse.checked = false;
				oSave.oBlockedYn = Members.BlockedYn

			} else {
				oSave.oBlockedYnTrue.checked = false;
				oSave.oBlockedYnFalse.checked = true;
				oSave.oBlockedYn = Members.BlockedYn
			}
			
			
			
			
			
			oSave.oTitle = MembersDetail.Title;
			oSave.CreatedAt = MembersDetail.CreatedAt;
			oSave.UpdatedAt = MembersDetail.UpdatedAt;
			oSave.Creator = MembersDetail.Creator;
			oSave.Updator = MembersDetail.Updator;
			oSave.oNickName = MembersDetail.NickName;
			oSave.oEmail = MembersDetail.Email;
			oSave.oCntSubscribe = MembersDetail.CntSubscribe;
			oSave.oDeletedYn = MembersDetail.DeletedYn;
			oSave.oDeletedAt = MembersDetail.DeletedAt;
			
			oSave.oStartEmail = Members.Email;
			oSave.oSnsType = Members.SnsType;
			
			console.log('oSave',oSave);
			console.log('MembersDetail',MembersDetail);
			console.log('Members',Members);
		}
	
		
		
		// 현재 페이지 게시물 갯수 TOTAL DATA
		if ($memberInformation.Data.TotalCount > 0) {
			totalCount = $memberInformation.Data.TotalCount;
            }
    
		
	}
	
</script>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<br>
		<table class="table">
			<thead><h5>회원 정보</thead>
			<tbody class="table-border-bottom-0">
				<DetailCommonTr {oSave}/>
			</tbody>
			
		</table>
		<br>
			<table class="table">
				<thead>
					<th colspan="9">
						Total data: {$memberDetailsPage.totalCount}
						, Now page: {$memberDetailsPage.nowPage}
						, TOTAL page: {$memberDetailsPage.totalPage}
					</th>
					<tr style="text-align:center">
						<th width="50"><input class="form-check-input"
							 type="hidden"
							   id="defaultCheck3"
								 /></th>
						<th width="50">No</th>
						<th width="50">상태</th>
						<th width="50">진행여부</th>
						<th width="50">주제어</th>
						<th width="50">장르</th>
						<th width="50">제목</th>
						<th width="50">step</th>
						<th width="50">좋아요 수</th>
						<th width="50">등록일</th>
						<th width="50">내용</th>
					</tr>
				</thead>
				<tbody class="table-border-bottom-0">
					{#each $memberInformation.Data.List as o, index}
						<tr style="text-align:center">
							<td><input class="form-check-input" type="hidden" /></td>
							<td>{o.SeqMemberDetail}</td> 
							<!-- <td><a href="/novel/faq/{o.SeqFaq}">{o.Title}</a></td> -->
							<td>삭제or등록</td>	 
							<td>진행or종료</td> 
							<td>주제어</td>
							<td>장르</td>
							<td>제목</td>
							<td>스텝</td>
							<td>{o.CntLike}</td>
							<td>{o.CreatedAt ? Dates.defaultConvert(o.CreatedAt) : ""}</td>
							<td><a href="/novel/memberInformation/{o.SeqMemberDetail}">보기</a></td>
						  
							
						</tr>
						{/each}
					</tbody>
				</table>
				<Paging {fnSearch} {pageSize} {totalCount}  />
				
				
				<table class="table">
					<thead>블랙리스트 설정</thead>
				<tbody class="table-border-bottom-0">
					<DetailCommonBlockedYn  {oSave} title="블랙리스트 여부" Y="등록" N="미등록"/>
				<tr>
					<td style="text-align: right;"><h5 class="mb-0">블랙리스트 사유*</h5></td>
					<td width="*" style="vertical-align: middle" height="55" colspan="12">
						<textarea
							type="text"
							rows="5"
							style="resize:none"
							wrap="hard"
							class="form-control form-control-sm"
							placeholder="블랙리스트 등록 시 사유를 반드시 작성해주세요."
							aria-label="Recipient's username with two button addons"
							bind:this={oSave.oBlockedReason}
							/>
						</td>
					</tr>
				</tbody>
		</table>
				
		<DetailCommonInquirieBottomBtns {urlList} {fnSave} {_id} />
	</div>
</div>
