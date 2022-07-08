<script>
	import { beforeUpdate, onMount } from "svelte";

	import { meta, router } from "tinro";
	import {  paging ,memberInformation,memberInformationList} from "../../stores";
	import { Dates } from "../../utils/date";
	import Paging from "../../components/Paging.svelte";
	import DetailCommonBlockedYn  from "../../components/DetailCommonBlockedYn .svelte";
	import DetailCommonInquirieBottomBtns from "../../components/DetailCommonInquirieBottomBtns.svelte";
	import DetailCommonTr from "../../components/DetailCommonTr.svelte";
	import DetailCommonNovelViewLayer from "../../components/DetailCommonNovelViewLayer.svelte";
	let oModal = {
		class: "modal fade",
		style: "display: none",
		item: {},
	};
	function fnInitModal() {
		oModal.class = "modal fade";
		oModal.style = "display: none";
		oModal.item = {};
	}

	
	const route = meta();
	let _id = route.params._id;
	let allocatedDb = route.params.allocatedDb;
	console.log(_id);
	console.log(route.params._id2);
	let pageSize = 10;
	let totalCount = 0;
	let registUrl = "";

	let NonData = [
		'a','b','c'
	]; 
	console.log(NonData);

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
		oFollowing:'',
		//소설등록수
		oCntTotal:'',
		//소설완결수
		oCntFinish:'',
		oStartEmail:"",
		oSnsType:"",
		//탈퇴사유
		oStartDate: "",
		oBlockedReason:"",
		oEndDate: "",
	};



	
	let Data;


	let urlList = "/novel/memberInformation";

	onMount(async () => {
		$paging.nowPage = 1;
		fnSearch()
		if (_id !== "new") {
			let retVal = await memberInformation.getMemberInformation(_id,allocatedDb);
			if (retVal.ResultCode === "OK") {
				Data = retVal.Data.List[0];
			} else {
				alert(retVal.ErrorDesc);
			}
		}	
	}
	
	);

	async function fnSearch() { 
		await memberInformationList.setMemberInformationList(_id,$paging.pageSize,$paging.nowPage);
	}
	

	//등록
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
			oSave.oBlockedYn = Data.blocked_yn;//블랙여부
			oSave.oNickName = Data.nick_name;	//닉네임
			oSave.oEmail = Data.email;			//이메일
			oSave.CreatedAt = Data.created_at;	//가입일
			oSave.oDeletedAt = Data.DeletedAt;  //탈퇴일
			oSave.UpdatedAt = Data.updated_at;	//최근접속일
			oSave.oCntSubscribe = Data.cnt_subscribe; //받은구독수
			oSave.oFollowing = Data.following;	//보낸구독수
			oSave.oCntTotal = Data.cnt_total;		//소설등록수
			oSave.oCntFinish = Data.cnt_finish;	//소설완결수

			oSave.oStartEmail = Data.startEmail; //가입이메일
			oSave.oSnsType = Data.sns_type; // 가입경로 
			//탈퇴사유

			 
			
			console.log(Data);
		
		
			
			
			
		
		}
	
		
		
		// 현재 페이지 게시물 갯수 TOTAL DATA
		if ($memberInformationList.Data.TotalCount > 0) {
			totalCount = $memberInformationList.Data.TotalCount;
		}
    
		
	}
	
</script>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<br>
		<table class="table">
			<thead><tr style="font-weight: bold; font-size:large;">회원정보</tr></thead>
			<tbody class="table-border-bottom-0">
				<DetailCommonTr {oSave}/>
			</tbody>
			
		</table>
		<br>
		<table class="table">
			<thead>
				<tr>
                    <th colspan="9">
                        Total data: {$paging.totalCount}
                        , Now page: {$paging.nowPage}
                        , TOTAL page: {$paging.totalPage}
                    </th>
                </tr>
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
				{#each  $memberInformationList.Data.List as o, index}
				<tr style="text-align:center" >
					<td>{o.deleted_yn == 1 ? "삭제":"등록"}</td>
					<td>{o.active_yn == 1 ? "진행":"종료"}</td>
					<td>{o.keyword}</td>
					<td>{o.genres}</td>
					<td>{o.title}</td>
					<td>{o.step}</td>
					<td>{o.deleted_yn == 1 ? "-": o.cnt_like }</td>
					<td>{ Dates.defaultConvert(o.created_at)}</td> 
					<td>보기</td>
				</tr>
				{/each}
			</tbody>
		</table>
		<Paging {fnSearch} {pageSize} {totalCount} />
		
				<table class="table">
					<thead><tr style="font-weight: bold; font-size:large;">블랙리스트 설정</tr></thead>
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
		<DetailCommonInquirieBottomBtns {fnSave} {_id} />
		<br>
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
				{#each NonData as o, index}
				<tr style="text-align:center" >
					<td>{o}</td>
					<td>{o}</td>
					<td>{o}</td>
				</tr>
				{/each}
				
			</tbody>
		</table>

		<br>	<br>
		<DetailCommonInquirieBottomBtns {urlList}  />
	
	</div>
</div>
