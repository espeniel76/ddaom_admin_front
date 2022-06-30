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

	let oSearch = {
			BlockedYn: "All",
			StartDate: "",
			EndDate: "",
			NickName:"",
			CntLike:"",
		
            
        };

	
	let Data;
	let urlList = "/novel/memberInformation";

	onMount(async () => {
		if (_id !== "new") {
			let retVal = await memberInformation.getMemberInformation(_id);
			if (retVal.ResultCode === "OK",retVal.ResultCode === "OK") {
				Data = retVal.Data;	
			} else {
				alert(retVal.ErrorDesc);
			
			}
		}	
		console.log('dd',Data);
	}
	
	);
	

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
	
		if (Data) {
			if (Data.BlockedYn) {
				oSave.oBlockedYnTrue.checked = true;
				oSave.oBlockedYnFalse.checked = false;
			

			} else {
				oSave.oBlockedYnTrue.checked = false;
				oSave.oBlockedYnFalse.checked = true;
				
			}
			
			
			
			
			oSave.oDeletedYn = Data.deleted_yn;
			oSave.oDeletedAt = Data.DeletedAt;
			oSave.oNickName = Data.nick_name;
			oSave.oEmail = Data.email;
			oSave.CreatedAt = Data.created_at;
			oSave.UpdatedAt = Data.UpdatedAt;
			
		
			oSave.Creator = Data.Creator;
			oSave.Updator = Data.Updator;
			oSave.oNickName = Data.NickName;
			oSave.oCntSubscribe = Data.CntSubscribe;
			
			oSave.oStartEmail = Data.Email;
			oSave.oSnsType = Data.SnsType;
			
		
		
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
		<!-- 메모장에있음 -->
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
