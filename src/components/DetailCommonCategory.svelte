<script>
  import {
    faq,
    categoryFaq,
    paging,
    mainAll,
    checkedList,
    check,
  } from '../stores';

  export let categorylist;

  // async function fnSearch() {
  // 	// await faq.fetchFaq(oSearch, $paging.pageSize, $paging.nowPage);
  // 	await categoryFaq.fetchCategoryFaq() ;

  // }

  // $: console.log($categoryFaq.Data.List.length);

  function category(o) {
    switch (o) {
      case o:
        o = $categoryFaq.Data.List[o];
        break;
      case '2':
        o = '분류2';
        break;
      case '3':
        o = '분류3';
        break;
      case '4':
        o = '분류4';
        break;
      case '5':
        o = '분류5';
        break;
    }
    return o;
  }

  function test() {}
</script>

<td>{category(categorylist)}</td>
