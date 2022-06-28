<script>
	import { beforeUpdate, onMount } from "svelte";

	import { meta, router } from "tinro";
	import { inquiries, memberDetails ,memberDetailsPage ,memberInformation} from "../../stores";
	import { Dates } from "../../utils/date";
	import Paging from "../../components/Paging.svelte";
	import DetailCommonYn from "../../components/DetailCommonYn.svelte";
	import DetailCommonInquirieBottomBtns from "../../components/DetailCommonInquirieBottomBtns.svelte";
	import DetailCommonTr from "../../components/DetailCommonTr.svelte";

	const route = meta();
	let _id = route.params._id;

	let oSave = {
		oActiveYnTrue: null,
		oActiveYnFalse: null,
		oStartDate: "",
		oEndDate: "",
		CreatedAt: "",
		UpdatedAt: "",
		oEmail:"",
		oStartEmail:"",
		oSnsType:"",
		oBlockedYn:'',
		oCntSubscribe:'',
	
		
		
		
		oNickName: "",
	

	};

	let oSearch = {
		ActiveYn: "All",
			StartDate: "",
			EndDate: "",
			NickName:"",
			CntLike:"",
		
            
        };
		let pageSize = 5;
		let totalCount = 0;
	let Data;
	let Data2;
	let urlList = "/novel/inquiry";

	onMount(async () => {
		if (_id !== "new") {
			let retVal = await memberInformation.getMemberInformation(_id);
			if (retVal.ResultCode === "OK") {
				Data = retVal.Data;
				
				
			} else {
				alert(retVal.ErrorDesc);
			}
		}

		if (_id !== "new") {
			let retVal2 = await memberInformation.getMemberInformationReadMembers(_id);
			if (retVal2.ResultCode === "OK") {
				Data2 = retVal2.Data;
				
				
			} else {
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
		let isActive = false;
		if (oSave.oActiveYnTrue.checked) {
			isActive = true;
			oSave.oStatus = 3;
			// fnPageNavSet();
			console.log("등록");
		} else if (oSave.oActiveYnFalse.checked) {
			isActive = false;
			oSave.oStatus = 2;
			
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
			retVal = await inquiries.editInquiries(
				_id,
				oSave.oStatus,
				oSave.oAnswer.value,
				oSave.oStartDate.value,
				oSave.oEndDate.value
			);
		
			if (retVal.ResultCode === "OK") {
				alert("정상적으로 수정 되었습니다");
				router.goto("/novel/inquiry");
			} else {
				alert(retVal.ErrorDesc);
			}
		}
	}
	
	$: {
	
		if (Data,Data2) {
			if (Data.Status == 3) {
				oSave.oActiveYnTrue.checked = true;
				oSave.oActiveYnFalse.checked = false;
			} else if(Data.Status == 2) {
				oSave.oActiveYnTrue.checked = false;
				oSave.oActiveYnFalse.checked = true;
			}else if(Data.Status == 1) {
				oSave.oActiveYnTrue.checked = false;
				oSave.oActiveYnFalse.checked = true;
			}
			
			oSave.oTitle = Data.Title;
			
			
			
			
			oSave.CreatedAt = Data.CreatedAt;
			oSave.UpdatedAt = Data.UpdatedAt;
			oSave.Creator = Data.Creator;
			oSave.Updator = Data.Updator;
			oSave.oNickName = Data.NickName;
			oSave.oEmail = Data.Email;
			oSave.oStartEmail = Data2.Email;
			oSave.oBlockedYn = Data2.BlockedYn;
			oSave.oSnsType = Data2.SnsType;
			oSave.oCntSubscribe = Data.CntSubscribe;
			
			console.log('asd',Data);
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
							<td>{o.ActiveYn ? "노출" : "미노출"}</td> 
							<td>{o.CntLike}</td>
							<td>{o.CntLike}</td>
							<td>{o.CntLike}</td>
							<td>{o.NickName}</td>
							<td>{o.UpdatedAt ? Dates.defaultConvert(o.UpdatedAt) : ""}</td>
							<td>{o.CreatedAt ? Dates.defaultConvert(o.CreatedAt) : ""}</td>
							<td>{o.DeletedAt ? Dates.defaultConvert(o.DeletedAt) : ""}</td>
							<td><a href="/novel/memberInformation/{o.SeqMemberDetail}">보기</a></td>
						  
							
						</tr>
						{/each}
					</tbody>
				</table>
				<Paging {fnSearch} {pageSize} {totalCount}  />
				
				
				<table class="table">
					<thead>블랙리스트 설정</thead>
				<tbody class="table-border-bottom-0">
					<DetailCommonYn {oSave} title="블랙리스트 여부" Y="등록" N="미등록"/>
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
							
							/>
						</td>
					</tr>
				</tbody>
		</table>
				
		<DetailCommonInquirieBottomBtns {urlList} {fnSave} {_id} />
	</div>
</div>
