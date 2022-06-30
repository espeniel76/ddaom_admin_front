<script>
    import { beforeUpdate, onMount } from "svelte";
        import {memberInformation, paging ,checkedList , check } from "../../stores";
        import { Dates } from "../../utils/date";
        import Paging from "../../components/Paging.svelte";
    
        let oSearch = {
			StartDate: "",
			EndDate: "",
			NickName:"",
			CntLike:"",
		
            
        };
        let pageSize = 10;
        let totalCount = 0;
        let registUrl = "/novel/faq/new";
        let nowUnixtime = Dates.getUnixtime();
        let quData = "";

    
        onMount(() => {
            fnSearch(); 
        });
    
    
        
    
    
        // 체크 초기화 
        function fnPageNavSet() {
            $checkedList=[];	
            $check=false;
            }
    
            // 게시글 페이지 1번으로 
        async function fnSearch() { 
            await memberInformation.fetchMemberInformation(oSearch, $paging.pageSize, $paging.nowPage);
        }
    
        async function fnDelete() {
            // await memberInformation.delMemberInformation($checkedList);
            // console.log("삭제클릭");
            // fnPageNavSet();
            // fnSearch();
        }
    
    
        $: {
            // 현재 페이지 게시물 갯수 TOTAL DATA
            if ($memberInformation.Data.TotalCount > 0) {
                totalCount = $memberInformation.Data.TotalCount;
                quData = $memberInformation.Data.queryList;
				
				
            }
    
            
            
        }
    
    
    
        function fnInit() {
            oSearch.ActiveYn = "All";
            oSearch.StartDate = "";
            oSearch.EndDate = "";
            oSearch.NickName = "";
            oSearch.oCategory = "Choice"; 
        
        
    
            let o = $paging;
            o.nowPage = 1;
            paging.update((paging) => o);
            fnSearch();
        }
    
        
        
    
        
            
    
        function checkedAllchange(e) {
            const checked = e.target.checked;
            $check = checked}
            
            
    
    
    </script>
    <div class="card mb-4">
        <div class="table-responsive text-nowrap">
            <table class="table">
                <tbody class="table-border-bottom-0">
                    <tr>
						<td width="100" style="text-align: right;"><h5 class="mb-0">상태</h5></td>
						<td width="200" style="vertical-align: middle;text-align:center">
							<select
								class="form-select form-select-sm"
								id="exampleFormControlSelect1"
								aria-label="Default select example"
								bind:value={oSearch.ActiveYn}
							>
								<option value="All" selected>전체</option>
								<option value="Y">정상</option>
								<option value="N">탈퇴</option>
								<option value="B">휴면</option>
							</select>
						</td>
						
                    
                        <td width="100" style="text-align: left;"><h5 class="mb-0">등록일/수정일</h5></td>
                        <td width="100" style="vertical-align: middle;text-align:center">
                            <input
                                class="form-control form-control-sm"
                                type="date"
                                bind:value={oSearch.StartDate}
                                id="html5-date-input"
                            />
                        </td>
                        <td width="100" style="vertical-align: middle;text-align:center; padding-left:0">
                            <input
                                class="form-control form-control-sm"
                                type="date"
                                bind:value={oSearch.EndDate}
                                id="html5-date-input"
                            />
                        </td>
                    </tr>
                    <tr>
						<td width="100" style="text-align: right;"><h5 class="mb-0">블랙리스트 여부</h5></td>
						<td width="200" style="vertical-align: middle;text-align:center">
							<select
								class="form-select form-select-sm"
								id="exampleFormControlSelect1"
								aria-label="Default select example"
								bind:value={oSearch.ActiveYn}
							>
								<option value="All" selected>전체</option>
								<option value="Y">등록</option>
								<option value="N">미등록</option>
								
							</select>
						</td>

                        <td width="100" style="text-align: left;"><h5 class="mb-0">제목/내용</h5></td>
                        <td width="*" colspan="4">
                            <div class="input-group">
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    placeholder="주제어"
                                    aria-label="Recipient's username with two button addons"
                                   
                                />
                                <button class="btn btn-sm btn-outline-primary" type="button" on:click={fnInit}>초기화</button>
                                <button class="btn btn-sm btn-primary" type="button"  on:click={fnSearch}>검색</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            
        </table>
        <table class="table">
            <thead>
                <th colspan="9">
                    Total data: {$paging.totalCount}
                    , Now page: {$paging.nowPage}
                    , TOTAL page: {$paging.totalPage}
                </th>
                <tr style="text-align:center">
                    <th width="50"><input class="form-check-input"
                         type="hidden"
                           id="defaultCheck3"
                             /></th>
                    <th width="50">No</th>
                    <th width="50">상태</th>
                    <th width="50">블랙리스트 여부</th>
                    <th width="50">받은 구독 수</th>
                    <th width="50">소설 등록 수</th>
                    <th width="50">소설 완결 수</th>
                    <th width="50">닉네임</th>
                    <th width="50">최종 접속일</th>
                    <th width="50">가입일</th>
                    <th width="50">탈퇴일</th>
                </tr>
            </thead>
            <tbody class="table-border-bottom-0">
                {#each quData as o, index}
                    <tr style="text-align:center">
                        <td><input class="form-check-input" type="hidden" /></td>
                        <td>{o.seq_member_detail}</td> 
                        <!-- <td><a href="/novel/faq/{o.SeqFaq}">{o.Title}</a></td> -->
                        <td>{o.deleted_yn==1 ? "탈퇴":"정상"}</td> 
                        <td>{o.blocked_yn==1 ? "등록" : "미등록"}</td> 
                        <td>{o.cnt_subscribe}</td>
                        <td>소설등록수</td>
                        <td>소설완결수</td>
                        <td><a href="/novel/memberInformation/{o.seq_member}">{o.nick_name}</a></td>
                        <td>{o.updated_at ? Dates.defaultConvert(o.updated_at) : ""}</td>
                        <td>{o.created_at ? Dates.defaultConvert(o.created_at) : ""}</td>
                        <td>{o.deleted_at ? Dates.defaultConvert(o.deleted_at) : ""}</td>
                      
                        
                    </tr>
                    {/each}
            </tbody>
        </table>
    
        <Paging {fnSearch} {pageSize} {totalCount} />
        </div>
    </div>
