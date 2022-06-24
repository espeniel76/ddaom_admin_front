<script>
	export let oSave;
	export let title;
	export let Y;
	export let N;
</script>

<tr>
	<td width="150" style="text-align: right;"><h5 class="mb-0">{title}*</h5></td>
	<td width="*" style="vertical-align: middle" height="55" colspan="3">
		<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="3" bind:this={oSave.oActiveYnTrue} checked />
		<label class="form-check-label" for="inlineRadio1">{Y}</label>
		&nbsp;
		<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" bind:this={oSave.oActiveYnFalse} />
		<label class="form-check-label" for="inlineRadio2">{N}</label>
	</td>
</tr>
