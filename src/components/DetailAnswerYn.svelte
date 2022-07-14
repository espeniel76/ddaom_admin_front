<script>
  export let oSave;
  export let title;
  export let Y; //답변완료
  export let B; //답변중
</script>

<tr>
  <td width="150" style="text-align: right;"><h5 class="mb-0">{title}*</h5></td>
  <td width="*" style="vertical-align: middle" height="55" colspan="3">
    <input
      class="form-check-input"
      type="radio"
      name="inlineRadioOptions"
      id="inlineRadio1"
      bind:this={oSave.oActiveYnTrue}
    />
    <label class="form-check-label" for="inlineRadio1">{Y}</label>
    &nbsp;
    <input
      class="form-check-input"
      type="radio"
      name="inlineRadioOptions"
      id="inlineRadio2"
      bind:this={oSave.oActiveYnFalse}
      checked
    />
    <label class="form-check-label" for="inlineRadio2">{B}</label>
  </td>
</tr>
