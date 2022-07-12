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
            BlackedYn:"All",
            ActiveYn:"All",
            DateSelect:"All",
            Value:"",
            
		
            
        };
        let pageSize = 10;
        let totalCount = 0;
       
        let nowUnixtime = Dates.getUnixtime();
        let quData = "";
        

    
        onMount(() => {
            fnSearch();  
        });
    
    

    
    
      
    
            // 게시글 페이지 1번으로 
            async function fnSearch() { 
                await memberInformation.fetchMemberInformation(oSearch, $paging.pageSize, $paging.nowPage);
            }
        
            
    
        $: {
            // 현재 페이지 게시물 갯수 TOTAL DATA
            if ($memberInformation.Data.TotalCount > 0) {
                totalCount = $memberInformation.Data.TotalCount;
                quData = $memberInformation.Data.queryList;
               
              
              
        
            }
            
        	
         
            
            
        }
       
        function fnButton(e) {
           const data = e.target.value
           switch (data) {
            case "SubscribeDESC":
            oSearch.Value = "SubscribeDESC"
                break;
            case "SubscribeASC":
            oSearch.Value = "SubscribeASC"
                break;
            case "CntNovelDESC":
            oSearch.Value = "CntNovelDESC"
                break;
            case "CntNovelASC":
            oSearch.Value = "CntNovelASC"
                break;
            case "FinishNovelDESC":
            oSearch.Value = "FinishNovelDESC"
                break;
            case "FinishNovelASC":
            oSearch.Value = "FinishNovelASC"
                break;
                //
            case "LastDayDESC":
            oSearch.Value = "LastDayDESC"
                break;
            case "LastDayASC":
            oSearch.Value = "LastDayASC"
                break;
            case "CreatedDESC":
            oSearch.Value = "CreatedDESC"
                break;
            case "CreatedASC":
            oSearch.Value = "CreatedASC"
                break;
            case "DeletedDESC":
            oSearch.Value = "DeletedDESC"
                break;
            case "DeletedASC":
            oSearch.Value = "DeletedASC"
                break;
          
        
            }
            
            fnSearch()
           
         
            };
     


    
        function fnInit() {
            oSearch.StartDate = "";
            oSearch.EndDate = "";
            oSearch.NickName = "";
            oSearch.ActiveYn = "All";
            oSearch.BlackedYn = "All";
            oSearch.DateSelect = "All";
            oSearch.Value="";
        
        
    
            let o = $paging;
            o.nowPage = 1;
            paging.update((paging) => o);
            fnSearch();
        }


        

        function checkedAllchange(e) {
            const checked = e.target.checked;
            $check = checked
        
        }
            
            
    
    
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
						
                        
						<td width="200" style="vertical-align: middle;text-align:center">
							<select
								class="form-select form-select-sm"
								id="exampleFormControlSelect1"
								aria-label="Default select example"
								bind:value={oSearch.DateSelect}
							>
								<option value="All" selected>최종접속일</option>
								<option value="LastDay" >최종접속일</option>
								<option value="CreateDay">가입일</option>
								<option value="DelectDay">탈퇴일</option>
							
							</select>
						</td>
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
								bind:value={oSearch.BlackedYn}
							>
								<option value="All" selected>전체</option>
								<option value="Y">등록</option>
								<option value="N">미등록</option>
								
							</select>
						</td>

                        <td width="100" style="text-align: left; "><h5 class="mb-0">닉네임</h5></td>
                        <td width="*" colspan="4">
                            <div class="input-group">
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    bind:value={oSearch.NickName}
                                    placeholder="닉네임 검색"
                                    aria-label="Recipient's username with two button addons"
                                   
                                />
                                <button class="btn btn-sm btn-outline-primary" type="button" on:click={fnInit}>초기화</button>
                                <button class="btn btn-sm btn-primary" type="button"  on:click={fnSearch}>검색</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            
        </table>
        <table class="table" style="">
            <thead>
                <tr>
                    <th colspan="12">
                        Total data: {$paging.totalCount}
                        , Now page: {$paging.nowPage}
                        , TOTAL page: {$paging.totalPage}
                    </th>
                </tr>
                <tr style="text-align:center; ">
                    <th width="50"><input class="form-check-input"
                         type="hidden"
                           id="defaultCheck3"
                             /></th>
                    <th width="50" style="">No</th>
                    <th width="50">상태</th>
                    <th width="50">블랙리스트 여부</th>
                    <th width="50" style="">받은 구독 수<button type="button" class="btn btn-sm" value="SubscribeDESC" on:click={fnButton}>▲</button>
                        <button class="btn btn-sm" value="SubscribeASC"on:click={fnButton}>▼</button></th>
                    <th width="50">소설 등록 수<button type="button" class="btn btn-sm" value="CntNovelDESC" on:click={fnButton}>▲</button>
                        <button class="btn btn-sm" value="CntNovelASC"on:click={fnButton}>▼</button></th>
                    <th width="50">소설 완결 수<button type="button" class="btn btn-sm" value="FinishNovelDESC" on:click={fnButton}>▲</button>
                        <button class="btn btn-sm" value="FinishNovelASC"on:click={fnButton}>▼</button></th>
                    <th width="50">닉네임</th>
                    <th width="50">최종 접속일<button type="button" class="btn btn-sm" value="LastDayDESC" on:click={fnButton}>▲</button>
                        <button class="btn btn-sm" value="LastDayASC"on:click={fnButton}>▼</button></th>
                    <th width="50">가입일<button type="button" class="btn btn-sm" value="CreatedDESC" on:click={fnButton}>▲</button>
                        <button class="btn btn-sm" value="CreatedASC"on:click={fnButton}>▼</button></th>
                    <th width="50">탈퇴일<button type="button" class="btn btn-sm" value="DeletedDESC" on:click={fnButton}>▲</button>
                        <button class="btn btn-sm" value="DeletedASC"on:click={fnButton}>▼</button></th>
                </tr>
            </thead>
            <tbody class="table-border-bottom-0">
                {#each quData as o, index}
                <td><input class="form-check-input" type="hidden" value={o.allocated_db}/></td>
                    <tr style="text-align:center">
                        <td><input class="form-check-input" type="hidden" /></td>
                        <td>{o.seq_member_detail}</td> 
                        <!-- <td><a href="/novel/faq/{o.SeqFaq}">{o.Title}</a></td> -->
                        <td>{o.deleted_yn==1 ? "탈퇴":"정상"}</td> 
                        <td>{o.blocked_yn==1 ? "등록" : "미등록"}</td> 
                        <td>{o.cnt_subscribe}</td>
                        <td>{o.cnt_total}</td>
                        <td>{o.cnt_finsh}</td>
                        <td><a href="/novel/memberInformation/{o.seq_member}/{o.allocated_db}">{o.nick_name}</a></td>
                        <td>{o.updated_at ? Dates.defaultConvert(o.updated_at) : "-"}</td>
                        <td>{o.created_at ? Dates.defaultConvert(o.created_at) : "-"}</td>
                        <td>{o.deleted_yn==1? Dates.defaultConvert(o.deleted_at) : "-"}</td>
                    </tr>
                    {/each}
            </tbody>
        </table>
    
        <Paging {fnSearch} {pageSize} {totalCount} />

        
        </div>
    </div>
   