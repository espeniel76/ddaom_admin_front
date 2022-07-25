<script>
	export let oSave;
	export let title;
	export let Y;
	export let N;
</script>

<tr>
	<td width="150" style="text-align: right;"
		><h5 class="mb-0">{title}*</h5></td
	>

	<td width="*" style="vertical-align: middle" height="55" colspan="3">
		<input
			class="form-check-input"
			type="radio"
			name="inlineRadioOptions"
			id="inlineRadio1"
			bind:this={oSave.oBlockedYnTrue}
		/>
		<label class="form-check-label" for="inlineRadio1">{Y}</label>
		&nbsp;
		<!-- 미등록 -->
		<input
			class="form-check-input"
			type="radio"
			name="inlineRadioOptions"
			id="inlineRadio2"
			bind:this={oSave.oBlockedYnFalse}
			checked
		/>
		<label class="form-check-label" for="inlineRadio2">{N}</label>
	</td>
</tr>
