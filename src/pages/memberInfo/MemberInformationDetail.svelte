<script>
	import { onMount } from 'svelte';

	import { meta, router } from 'tinro';
	import {
		paging,
		pagingLog,
		memberInformation,
		memberInformationList,
		novelFetch,
		novelLog,
	} from '../../stores';
	import { Dates } from '../../utils/date';
	import Paging from '../../components/Paging.svelte';
	import PagingLog from '../../components/PagingLog.svelte';

	import DetailCommonBlockedYn from '../../components/DetailCommonBlockedYn .svelte';
	import DetailCommonInquirieBottomBtns from '../../components/DetailCommonInquirieBottomBtns.svelte';
	import DetailCommonTr from '../../components/DetailCommonTr.svelte';
	import { Maths } from '../../utils/math';
	let oModal = {
		class: 'modal fade',
		style: 'display: none',
		item: {},
	};
	function fnInitModal() {
		oModal.class = 'modal fade';
		oModal.style = 'display: none';
		oModal.item = {};
	}
	async function fnShowModal(SeqMember, novelStep, step) {
		oModal.class = 'modal fade show';
		oModal.style = 'display: block';
		await novelFetch.fetch(SeqMember, novelStep, step);
		oModal.item = $novelFetch.Data.List[0].content;
	}

	const route = meta();
	let _id = route.params._id;
	let allocatedDb = route.params.allocatedDb;

	let pageSize = 10;
	let totalCount = 0;
	let pagingLogPageSize = 10;
	let logTotalCount = 0;
	let registUrl = '';

	let oSave = {
		oBlockedYnTrue: null,
		oBlockedYnFalse: null,
		oDeletedYn: '',
		oBlockedYn: '',
		oNickName: '',
		oEmail: '',
		CreatedAt: '',
		oDeletedAt: '',
		UpdatedAt: '',
		oCntSubscribe: '',
		//보낸구독수
		oFollowing: '',
		//소설등록수
		oCntTotal: '',
		//소설완결수
		oCntFinish: '',
		oStartEmail: '',
		oSnsType: '',
		oReason: '',
		oStartDate: '',
		oBlockedReason: '',
		oEndDate: '',
	};

	let Data;
	let LogData;

	const blank_pattern = /^\s+|\s+$/g;
	let urlList = '/memberInfo/memberInformation';

	onMount(async () => {
		$paging.nowPage = 1;
		$pagingLog.nowPage = 1;
		fnSearch();

		if (_id !== 'new') {
			let retVal = await memberInformation.getMemberInformation(
				_id,
				allocatedDb
			);
			if (retVal.ResultCode === 'OK') {
				Data = retVal.Data.List[0];
			} else {
				alert(retVal.ErrorDesc);
			}
		}
	});

	async function fnSearch() {
		await memberInformationList.setMemberInformationList(
			_id,
			$paging.pageSize,
			$paging.nowPage
		);
		await novelLog.fetchLog(_id, $pagingLog.pageSize, $pagingLog.nowPage);
	}

	function type(e, contents) {
		//e =회원의status log
		switch (e) {
			case 8:
				return '블랙 리스트 미등록 (수동)';
			case 7:
				return '블랙 리스트 미등록 (자동)';
			case 6:
				return `블랙 리스트 (등록) \n 사유 : ${contents}`;
			case 5:
				return '회원 상태 변경 (탈퇴)';
			case 4:
				return '회원 상태 변경 (휴면)';
			case 3:
				return '회원 상태 변경 (정상)';
			case 2:
				return '로그인/접속';
			case 1:
				return '회원가입/접속';
			default:
				break;
		}

		//if switch 등 문법에서는 구문

		return a;
	}

	async function fnSave() {
		let isBlocked = false;
		let YN = oSave.oBlockedYnTrue.checked;
		console.log(oSave.oBlockedYn);

		if (oSave.oBlockedYnTrue.checked && oSave.oBlockedReason.value < 1) {
			alert('사유을 입력 하세요.');
			return false;
		} else if (oSave.oBlockedYnTrue.checked) {
			if (oSave.oBlockedYn == YN) {
				alert('등록 상태');
				return false;
			}
			isBlocked = true;
		} else if (oSave.oBlockedYnFalse.checked) {
			if (oSave.oBlockedYn == YN) {
				alert(' 미등록 상태');
				return false;
			}
			isBlocked = false;
		}

		// if (oSave.oBlockedYnTrue.value.replace(blank_pattern, '') == '') {
		// 	alert('내용 공백만 입력되었습니다.');
		// 	return false;
		// }

		//수정
		let retVal;
		if (_id === 'new') {
		} else {
			retVal = await memberInformation.editMemberInformation(
				_id,
				isBlocked,
				oSave.oBlockedReason.value,
				oSave.oStartDate.value
			);

			if (retVal) {
				alert('정상적으로 수정 되었습니다');

				router.goto('/memberInfo/memberInformation');
			} else {
				alert(retVal);
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
			oSave.oBlockedYn = Data.blocked_yn; //블랙여부
			oSave.oNickName = Data.nick_name; //닉네임
			oSave.oEmail = Data.email; //이메일
			oSave.CreatedAt = Data.created_at; //가입일
			oSave.oDeletedAt = Data.deleted_at; //탈퇴일
			oSave.UpdatedAt = Data.updated_at; //최근접속일
			oSave.oCntSubscribe = Data.cnt_subscribe; //받은구독수
			oSave.oFollowing = Data.following; //보낸구독수
			oSave.oCntTotal = Data.cnt_total; //소설등록수
			oSave.oCntFinish = Data.cnt_finish; //소설완결수

			oSave.oStartEmail = Data.startEmail; //가입이메일
			oSave.oSnsType = Data.sns_type; // 가입경로
			oSave.oReason = Data.reason; //탈퇴사유
		}

		// 현재 페이지 게시물 갯수 TOTAL DATA
		if ($memberInformationList.Data.TotalCount > 0) {
			totalCount = $memberInformationList.Data.TotalCount;
		} else {
			totalCount = 0;
		}
		if ($novelLog.Data.TotalCount > 0) {
			logTotalCount = $novelLog.Data.TotalCount;
		} else {
			logTotalCount = 0;
		}
	}
</script>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<br />
		<th style="padding-left:30px">회원정보</th>
		<table class="table">
			<tbody class="table-border-bottom-0">
				<DetailCommonTr {oSave} />
			</tbody>
		</table>
		<br /> <br />
		<th
			colspan="12"
			style="float:right; margin-right: 20px;font-size: 12px;"
		>
			TOTAL DATA: {$paging.totalCount}
			,NOW PAGE: {$paging.nowPage}
			,TOTAL PAGE: {$paging.totalPage}
		</th>
		<th style="padding-left:30px">소설목록</th>
		<br />
		<table class="table">
			<thead>
				<tr style="text-align:center">
					<th width="50">No</th>
					<th width="50">상태</th>
					<th width="*">진행여부</th>
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
				{#each $memberInformationList.Data.List as o, index}
					<tr style="text-align:center">
						<td>{Maths.startNumber($paging) - index}</td>
						<td>{o.deleted_yn == 1 ? '삭제' : '등록'}</td>
						<td>{o.active_yn == 1 ? '진행' : '종료'}</td>
						<td>{o.keyword}</td>
						<td>{o.genres}</td>
						<td>{o.title}</td>
						<td>{o.step}</td>
						<td>{o.deleted_yn == 1 ? '-' : o.cnt_like}</td>
						<td>{Dates.defaultConvert(o.created_at)}</td>
						<td
							on:click={fnShowModal(
								o.seq_member,
								o.novel_step,
								o.step
							)}
							style="cursor:pointer"><b>보기</b></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
		<Paging
			{fnSearch}
			{pageSize}
			{totalCount}
			fnDelete={undefined}
			registUrl={undefined}
		/>
		<th style="padding-left:30px">블랙리스트 설정</th>
		<table class="table">
			<tbody class="table-border-bottom-0">
				<DetailCommonBlockedYn
					{oSave}
					title="블랙리스트 여부"
					Y="등록"
					N="미등록"
				/>
				<tr>
					<td style="text-align: right;"
						><h5 class="mb-0">블랙리스트 사유*</h5></td
					>
					<td
						width="*"
						style="vertical-align: middle"
						height="55"
						colspan="12"
					>
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
		<br /> <br />
		<!-- 등록버튼 -->
		<DetailCommonInquirieBottomBtns {fnSave} {_id} />
		<br />
		<!-- 로그 -->
		<th
			colspan="12"
			style="float:right; margin-right: 20px;font-size: 12px;"
		>
			TOTAL DATA: {$pagingLog.totalCount}
			, NOW PAGE: {$pagingLog.nowPage}
			, TOTAL PAGE: {$pagingLog.totalPage}
		</th>
		<th style="padding-left:30px">접속/변경내역</th>
		<br />
		<table class="table">
			<thead>
				<tr style="text-align:center ">
					<th width="50">No</th>
					<th width="50">일시</th>
					<th width="*">내용</th>
				</tr>
			</thead>

			<!-- $inquiries.Data.queryList  -->
			<tbody class="table-border-bottom-0">
				{#each $novelLog.Data.List as o, index}
					<tr style="text-align:center">
						<td>{Maths.startNumber($pagingLog) - index}</td>
						<td>{Dates.defaultConvertFull(o.created_at)}</td>
						<td>{type(o.type, o.contents)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<PagingLog
			{fnSearch}
			pageSize={pagingLogPageSize}
			totalCount={logTotalCount}
			fnDelete={undefined}
			registUrl={undefined}
		/>
		<br /> <br />
		<!-- 목록버튼 -->
		<DetailCommonInquirieBottomBtns {urlList} />
	</div>
</div>

<!-- 모달 부분 -->
<div class={oModal.class} tabindex="-1" style={oModal.style}>
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">내용 상세</h5>
				<button
					type="button"
					class="btn-close"
					data-bs-dismiss="modal"
					aria-label="Close"
					on:click={() => {
						fnInitModal();
					}}
				/>
			</div>
			<div class="modal-body">
				<textarea class="form-control form-control-sm" rows="10"
					>{oModal.item}</textarea
				>
			</div>
		</div>
	</div>
</div>
