<script>
	export let oSave;
</script>

<tr>
	<td style="text-align: right;"><h5 class="mb-0">사용기간*</h5></td>
	<td width="200" style="vertical-align: middle;text-align:center">
		<input
			class="form-control form-control-sm"
			type="datetime-local"
			id="html5-date-input"
			bind:this={oSave.oStartDate}
		/>
	</td>
	<td width="200" style="vertical-align: middle;text-align:center; padding-left:0">
		<input
			class="form-control form-control-sm"
			type="datetime-local"
			id="html5-date-input"
			bind:this={oSave.oEndDate}
		/>
	</td>
	<td width="*"> <span style="color:chocolate">* 종료일 자정이 지나면 진행여부가 ‘종료’로 자동 변경됩니다. </span></td>
</tr>
