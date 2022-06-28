<script>
	 import { Dates } from "../utils/date";
	export let oSave;
	

</script>


	



<tr>
	<td style="text-align: left;"><h5 class="mb-0">상태</h5></td>
	<td width="*" style="vertical-align: middle" height="55" colspan="2">
		test
	</td>

	<td style="text-align: left;"><h5 class="mb-0">블랙리스트 여부</h5></td>
	<td width="*" style="vertical-align: middle" height="55" colspan="2">
		{oSave.oBlockedYn ? "등록":"미등록"}
	</td>
</tr>
<tr>
	<td style="text-align: left;"><h5 class="mb-0">닉네임</h5></td>
	<td width="*" style="vertical-align: middle" height="55" colspan="2">
	{oSave.oNickName}
	</td>

	<td style="text-align: left;"><h5 class="mb-0">이메일</h5></td>
	<td width="*" style="vertical-align: middle" height="55" colspan="2">
		{oSave.oEmail ? oSave.oEmail  : "-"}
	</td>
</tr>
<tr>
	<td style="text-align: left;"><h5 class="mb-0">가입일/탈퇴일</h5></td>
	<td width="*" style="vertical-align: middle" height="55" colspan="2">
		{Dates.defaultConvert(oSave.CreatedAt)} / 탈퇴일시 조건넣기
	</td>
	
	<td style="text-align: left;"><h5 class="mb-0">최근 접속일</h5></td>
	<td width="*" style="vertical-align: middle" height="55" colspan="2">
		{Dates.defaultConvert(oSave.UpdatedAt)}
		
	</td>
</tr>
<tr>
	<td style="text-align: left;"><h5 class="mb-0">받은 구독 수 (명)</h5></td>
	<td width="*" style="vertical-align: middle" height="55" colspan="2">
		{oSave.oCntSubscribe}
	</td>
	
	<td style="text-align: left;"><h5 class="mb-0">보낸 구독 수 (명)</h5></td>
	<td width="*" style="vertical-align: middle" height="55" colspan="2">
		test
	</td>
</tr>
<tr>
	<td style="text-align: left;"><h5 class="mb-0">소설 등록 수 (건)</h5></td>
	<td width="*" style="vertical-align: middle" height="55" colspan="2">
		test
	</td>
	
	<td style="text-align: left;"><h5 class="mb-0">소설 완결 수 (건)</h5></td>
	<td width="*" style="vertical-align: middle" height="55" colspan="2">
		test
	</td>
</tr>
<tr>
	<td style="text-align: left;"><h5 class="mb-0">가입 이메일</h5></td>
	<td width="*" style="vertical-align: middle" height="55" colspan="2">
		{oSave.oStartEmail ? oSave.oStartEmail  : "-"}
	</td>
	
	<td style="text-align: left;"><h5 class="mb-0">가입 경로</h5></td>
	<td width="*" style="vertical-align: middle" height="55" colspan="2">
		{oSave.oSnsType}
	</td>
</tr>
<tr>
	<td style="text-align: left;"><h5 class="mb-0">탈퇴 사유</h5></td>
	<td width="*" style="vertical-align: middle" height="55" colspan="12">
		test
	</td>
</tr>
<tr/>
