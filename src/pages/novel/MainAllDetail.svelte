<script>
	let oSearch = {
		Sort: "EndDateDESC",
		ProcessYn: "All",
		StartDate: "",
		EndDate: "",
		Keyword: "",
	};
	async function fnSearch() {
		// await mainAll.fetch(oSearch, $paging.pageSize, $paging.nowPage);
	}

	let oStepClass = {
		step2: {
			title: "nav-link active",
			content: "tab-pane fade show active",
		},
		step3: {
			title: "nav-link",
			content: "tab-pane fade",
		},
		step4: {
			title: "nav-link",
			content: "tab-pane fade",
		},
	};

	function fnShowStepClass(step) {
		switch (step) {
			case 2:
				oStepClass.step2.title = "nav-link active";
				oStepClass.step2.content = "tab-pane show active";
				oStepClass.step3.title = "nav-link";
				oStepClass.step3.content = "tab-pane";
				oStepClass.step4.title = "nav-link";
				oStepClass.step4.content = "tab-pane";
				break;
			case 3:
				oStepClass.step2.title = "nav-link";
				oStepClass.step2.content = "tab-pane";
				oStepClass.step3.title = "nav-link active";
				oStepClass.step3.content = "tab-pane show active";
				oStepClass.step4.title = "nav-link";
				oStepClass.step4.content = "tab-pane";
				break;
			case 4:
				oStepClass.step2.title = "nav-link";
				oStepClass.step2.content = "tab-pane";
				oStepClass.step3.title = "nav-link";
				oStepClass.step3.content = "tab-pane";
				oStepClass.step4.title = "nav-link active";
				oStepClass.step4.content = "tab-pane show active";
				break;
		}
	}

	function fnInit() {
		fnSearch();
	}
</script>

<div class="row">
	<div class="col-xl">
		<div class="card mb-4">
			<table class="table">
				<tbody class="table-border-bottom-0">
					<tr>
						<td width="100" style="text-align: right;">장르</td>
						<td>
							<select class="form-select form-select-sm" bind:value={oSearch.ProcessYn}>
								<option value="All" selected>전체</option>
								<option value="Y">진행</option>
								<option value="N">종료</option>
							</select>
						</td>
						<td style="text-align: right;">제목/내용/작가</td>
						<td>
							<div class="input-group">
								<input type="text" class="form-control form-control-sm" placeholder="주제어" bind:value={oSearch.Keyword} />
								<button class="btn btn-sm btn-outline-primary" type="button" on:click={fnInit}>초기화</button>
								<button class="btn btn-sm btn-primary" type="button" on:click={fnSearch}>검색</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<table class="table">
				<thead>
					<tr>
						<th colspan="2">
							<select
								class="form-select form-select-sm"
								bind:value={oSearch.Sort}
								style="width:200px"
								on:change={() => {
									fnSearch();
								}}
							>
								<option value="EndDateDESC" selected>종료일 늦은 순</option>
								<option value="EndDateASC">종료일 임박 순</option>
								<option value="LikeDESC">좋아요 많은 순</option>
								<option value="NovelDESC">연재 많은 순</option>
							</select>
						</th>
						<th colspan="2" style="text-align:right">Total : 10 , Now: 1 , pages: 1</th>
					</tr>
					<tr style="text-align:center">
						<th width="50">No</th>
						<th width="*">제목</th>
						<th width="150">장르</th>
						<th width="150">작가</th>
					</tr>
				</thead>
				<tbody class="table-border-bottom-0" />
			</table>
		</div>
	</div>
	<div class="col-xl">
		<h6>좌측 리스트에서 Step1 제목을 선택해주세요.</h6>
		<div class="card mb-4">
			<table class="table">
				<thead>
					<tr style="text-align:center">
						<th width="110">진행여부</th>
						<th>시작일</th>
						<th>종료일</th>
						<th>주제어</th>
						<th>좋아요 수</th>
						<th width="120">소설 등록 수</th>
					</tr>
					<tr style="text-align:center">
						<td>진행</td>
						<td>2022-02-01</td>
						<td>2022-02-28</td>
						<td>너와 나</td>
						<td>1,350</td>
						<td>54</td>
					</tr>
				</thead>
				<tbody class="table-border-bottom-0" />
			</table>
		</div>

		<h6>Step1</h6>
		<div class="card mb-4">
			<table class="table">
				<thead>
					<tr style="text-align:center">
						<th width="110">제목</th>
						<th width="100">장르</th>
						<th>작가</th>
						<th width="100">좋아요 수</th>
						<th width="170">등록일</th>
						<th width="90">삭제</th>
					</tr>
					<tr style="text-align:center">
						<td>너의 밤엔</td>
						<td>공포</td>
						<td>핑크어파치</td>
						<td>56</td>
						<td>2022-02-05 08:10</td>
						<td><button class="btn btn-sm btn-info" type="button">삭제</button></td>
					</tr>
					<tr>
						<td colspan="6">내용</td>
					</tr>
				</thead>
				<tbody class="table-border-bottom-0" />
			</table>
		</div>

		<div class="nav-align-top mb-4">
			<ul class="nav nav-tabs" role="tablist">
				<li class="nav-item">
					<button
						type="button"
						class={oStepClass.step2.title}
						on:click={() => {
							fnShowStepClass(2);
						}}>Step2</button
					>
				</li>
				<li class="nav-item">
					<button
						type="button"
						class={oStepClass.step3.title}
						on:click={() => {
							fnShowStepClass(3);
						}}>Step3</button
					>
				</li>
				<li class="nav-item">
					<button
						type="button"
						class={oStepClass.step4.title}
						on:click={() => {
							fnShowStepClass(4);
						}}>Step4</button
					>
				</li>
			</ul>
			<div class="tab-content">
				<div class={oStepClass.step2.content}>
					<p>Icing pastry pudding oat cake. Lemon drops cotton candy caramels cake caramels sesame snaps powder. Bear claw candy topping.</p>
					<p class="mb-0">Tootsie roll fruitcake cookie. Dessert topping pie. Jujubes wafer carrot cake jelly. Bonbon jelly-o jelly-o ice cream jelly beans candy canes cake bonbon. Cookie jelly beans marshmallow jujubes sweet.</p>
				</div>
				<div class={oStepClass.step3.content}>
					<p>Donut dragée jelly pie halvah. Danish gingerbread bonbon cookie wafer candy oat cake ice cream. Gummies halvah tootsie roll muffin biscuit icing dessert gingerbread. Pastry ice cream cheesecake fruitcake.</p>
					<p class="mb-0">Jelly-o jelly beans icing pastry cake cake lemon drops. Muffin muffin pie tiramisu halvah cotton candy liquorice caramels.</p>
				</div>
				<div class={oStepClass.step4.content}>
					<p>Oat cake chupa chups dragée donut toffee. Sweet cotton candy jelly beans macaroon gummies cupcake gummi bears cake chocolate.</p>
					<p class="mb-0">Cake chocolate bar cotton candy apple pie tootsie roll ice cream apple pie brownie cake. Sweet roll icing sesame snaps caramels danish toffee. Brownie biscuit dessert dessert. Pudding jelly jelly-o tart brownie jelly.</p>
				</div>
			</div>
		</div>
	</div>
</div>
