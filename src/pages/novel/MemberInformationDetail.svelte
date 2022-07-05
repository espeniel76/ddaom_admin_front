<script>
	import { beforeUpdate, onMount } from "svelte";

	import { meta, router } from "tinro";
	import {  paging ,memberInformation} from "../../stores";
	import { Dates } from "../../utils/date";
	import Paging from "../../components/Paging.svelte";
	import DetailCommonBlockedYn  from "../../components/DetailCommonBlockedYn .svelte";
	import DetailCommonInquirieBottomBtns from "../../components/DetailCommonInquirieBottomBtns.svelte";
	import DetailCommonTr from "../../components/DetailCommonTr.svelte";

	const route = meta();
	let _id = route.params._id;
	let pageSize = 10;
	let totalCount = 0;
	let registUrl = "";

	let oSave = {
		oBlockedYnTrue: null,
		oBlockedYnFalse: null,
		oDeletedYn: "",
		oBlockedYn: "",
		oNickName: "",
		oEmail:"",
		CreatedAt: "",
		oDeletedAt:"",
		UpdatedAt: "",
		oCntSubscribe:'',
		//보낸구독수
		//소설등록수
		//소설완결수
		oStartEmail:"",
		oSnsType:"",
		//탈퇴사유
		oStartDate: "",
		oBlockedReason:"",
		oEndDate: "",
	};



	
	let Data;
	let listData="";

	let urlList = "/novel/memberInformation";

	onMount(async () => {
		fnSearch()
		if (_id !== "new") {
			let retVal = await memberInformation.getMemberInformation(_id);
			let retVal2 = await memberInformation.getMemberInformationList(_id);
			if (retVal.ResultCode === "OK",retVal2.ResultCode === "OK") {
				Data = retVal.Data.List[0];
				listData = retVal2.Data.List;
			} else {
				alert(retVal.ErrorDesc);
			}
			


		}	
	}
	
	);

	async function fnSearch() { 
		
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

		// if(isBlocked = true)
		// {
		// 	if (oSave.oBlockedReason.value.length < 1) {
		// 	alert("블랙리스트 사유 를 입력 하세요.");
		// 	return false;
		// }
		// alert("블랙여부 x ");
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
			
			);
		console.log("수정",retVal);
			if (retVal.ResultCode === "OK") {
				alert("정상적으로 수정 되었습니다");
				// router.goto("/novel/memberInformation");
			} else {
				alert(retVal.ErrorDesc);
			}
		}
	}
	
	$: {
	
		if (Data) {
			if (Data.blocked_yn) {
				oSave.oBlockedYnTrue.checked = true;
				oSave.oBlockedYnFalse.checked = false;
				oSave.oBlockedReason.value = Data.member_blocks;

			} else {
				oSave.oBlockedYnTrue.checked = false;
				oSave.oBlockedYnFalse.checked = true;
				
			}
			
			
			
			
			oSave.oDeletedYn = Data.deleted_yn; //상태
			oSave.oBlockedYn = Data.blocked_yn;
			//블랙여부
			oSave.oDeletedAt = Data.DeletedAt;  //탈퇴일
			oSave.oNickName = Data.nick_name;	//닉네임
			oSave.oEmail = Data.email;			//이메일
			oSave.CreatedAt = Data.created_at;	//가입일
			//탈퇴일
			oSave.UpdatedAt = Data.updated_at;	//최근접속일
			oSave.oCntSubscribe = Data.cnt_subscribe; //받은구독수
			//보낸구독수
			//소설등록수
			//소설완결수
			oSave.oStartEmail = Data.startEmail; //가입이메일
			oSave.oSnsType = Data.sns_type; // 가입경로 
			//탈퇴사유

			 
			

			
		
		
		
		
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
					Total data: {$paging.totalCount}
					, Now page: {$paging.nowPage}
					, TOTAL page: {$paging.totalPage}
				</th>
				<tr style="text-align:center">
				
					<th width="50">No</th>
					<th width="50">상태</th>
					<th width="*">주제어</th>
					<th width="100">장르</th>
					<th width="100">제목</th>
					<th width="200">step</th>
					<th width="200">좋아요수</th>
					<th width="200">등록일</th>
					<th width="200">내용</th>
				</tr>
			</thead>
			
			<!-- $inquiries.Data.queryList  -->
			<tbody class="table-border-bottom-0">
				{#each listData as o, index}
				<tr style="text-align:center" >
					<td>{o.deleted_yn == 1 ? "삭제":"등록"}</td>
					<td>{o.active_yn == 1 ? "진행":"종료"}</td>
					<td>{o.keyword}</td>
					<td>{o.genres}</td>
					<td>{o.title}</td>
					<td>{o.step}</td>
					<td>{o.cnt_like}</td>
					<td>{ Dates.defaultConvert(o.created_at)}</td> 
					<td>보기</td>
				</tr>
				{/each}
			</tbody>
		</table>
		<Paging {pageSize} {totalCount} />
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
