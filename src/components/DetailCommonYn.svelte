<script>
	export let oSave;
</script>

<tr>
	<td width="150" style="text-align: right;"><h5 class="mb-0">사용여부*</h5></td>
	<td width="*" style="vertical-align: middle" height="55" colspan="3">
		<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" bind:this={oSave.oActiveYnTrue} checked />
		<label class="form-check-label" for="inlineRadio1">사용</label>
		&nbsp;
		<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" bind:this={oSave.oActiveYnFalse} />
		<label class="form-check-label" for="inlineRadio2">미사용</label>
	</td>
</tr>
