<script>
	import axios from "axios";

	async function getData() {
		try {
			const response = await axios.get("http://192.168.0.17:3013/api/assets/slangs?ActiveYn=All&Search=&PageSize=10&Page=1");
			// const response = await axios.post("http://192.168.0.17:3013/api/auth/login", { UserId: "espeniel", Password: "anjgkrp" });
			console.log(response);
		} catch (e) {
			console.log(e);
		}
	}
	getData();
</script>

<div class="card mb-4">
	<table class="table">
		<tbody class="table-border-bottom-0">
			<tr>
				<td width="150" style="text-align: right;"><h5 class="mb-0">사용여부</h5></td>
				<td width="250">
					<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked />
					<label class="form-check-label" for="inlineRadio1">사용</label>
					&nbsp;
					<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
					<label class="form-check-label" for="inlineRadio2">미사용</label>
				</td>
				<td width="150" style="text-align: right;"><h5 class="mb-0">금칙어</h5></td>
				<td width="*">
					<div class="input-group">
						<input type="text" class="form-control" placeholder="금칙어" aria-label="Recipient's username with two button addons" />
						<button class="btn btn-primary" type="button">등록</button>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<div class="card mb-4">
	<table class="table">
		<tbody class="table-border-bottom-0">
			<tr>
				<td width="150" style="text-align: right;"><h5 class="mb-0">사용여부</h5></td>
				<td width="250" style="vertical-align: middle;text-align:center">
					<select class="form-select" id="exampleFormControlSelect1" aria-label="Default select example">
						<option selected="">전체</option>
						<option value="1">사용</option>
						<option value="2">미사용</option>
					</select>
				</td>
				<td width="150" style="text-align: right;"><h5 class="mb-0">금칙어</h5></td>
				<td width="*">
					<div class="input-group">
						<input type="text" class="form-control" placeholder="금칙어" aria-label="Recipient's username with two button addons" />
						<button class="btn btn-outline-primary" type="button">초기화</button>
						<button class="btn btn-primary" type="button">검색</button>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<div class="card mb-4">
	<div class="table-responsive text-nowrap">
		<table class="table">
			<thead>
				<tr style="text-align:center">
					<th width="50"><input class="form-check-input" type="checkbox" value="" id="defaultCheck3" checked="" /></th>
					<th width="50">No</th>
					<th width="*">금칙어</th>
					<th width="100">사용여부</th>
					<th width="100">등록일</th>
					<th width="100">등록자</th>
					<th width="100">수정일</th>
					<th width="100">수정자</th>
					<th width="50">관리</th>
				</tr>
			</thead>
			<tbody class="table-border-bottom-0">
				<tr style="text-align:center">
					<td><input class="form-check-input" type="checkbox" value="" id="defaultCheck3" checked="" /></td>
					<td>1</td>
					<td>히로뽕</td>
					<td>
						<div class="form-check form-switch mb-2">
							<input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked />
							<label class="form-check-label" for="flexSwitchCheckChecked">사용</label>
						</div>
					</td>
					<td>2022-03-10</td>
					<td>Admin</td>
					<td>2022-03-11</td>
					<td>dabin</td>
					<td><button type="button" class="btn btn-sm btn-primary">편집</button></td>
				</tr>
				<tr style="text-align:center">
					<td><input class="form-check-input" type="checkbox" value="" id="defaultCheck3" checked="" /></td>
					<td>1</td>
					<td>히로뽕</td>
					<td>사용</td>
					<td>2022-03-10</td>
					<td>Admin</td>
					<td>2022-03-11</td>
					<td>dabin</td>
					<td><button type="button" class="btn btn-sm btn-primary">편집</button></td>
				</tr>
				<tr style="text-align:center">
					<td><input class="form-check-input" type="checkbox" value="" id="defaultCheck3" checked="" /></td>
					<td>1</td>
					<td>히로뽕</td>
					<td>사용</td>
					<td>2022-03-10</td>
					<td>Admin</td>
					<td>2022-03-11</td>
					<td>dabin</td>
					<td><button type="button" class="btn btn-sm btn-primary">편집</button></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
