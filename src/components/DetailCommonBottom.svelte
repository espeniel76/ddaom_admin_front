<script>
	import { Dates } from "../utils/date";
	export let oSave;
</script>

<tr>
	<td style="text-align: right;"><h5 class="mb-0">등록일</h5></td>
	<td width="*" style="vertical-align: middle;">{Dates.defaultConvertFull(oSave.CreatedAt)}</td>
	<td style="text-align: right;"><h5 class="mb-0">수정일</h5></td>
	<td width="*" style="vertical-align: middle;"
		>{Dates.defaultConvertFull(oSave.UpdatedAt) ? Dates.defaultConvertFull(oSave.UpdatedAt) : "-"}</td
	>
</tr>
<tr>
	<td style="text-align: right;"><h5 class="mb-0">등록자</h5></td>
	<td width="*" style="vertical-align: middle;">{oSave.Creator}</td>
	<td style="text-align: right;"><h5 class="mb-0">수정자</h5></td>
	<td width="*" style="vertical-align: middle;">{oSave.Updator === null ? "-" : oSave.Updator}</td>
</tr>
