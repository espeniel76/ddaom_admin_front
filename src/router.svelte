<script>
	import { Route } from "tinro";
	// import Router, {location, link} from 'svelte-spa-router';
	// import { Route } from "tinro";

	import NovelMainAll from "./pages/novel/MainAll.svelte";
	import NovelMainAllDetail from "./pages/novel/MainAllDetail.svelte";
	import NovelMainDeleted from "./pages/novel/MainDeleted.svelte";
	import NovelMainDeletedDetail from "./pages/novel/MainDeletedDetail.svelte";

	import NovelSlangs from "./pages/novel/Slangs.svelte";
	import NovelGenres from "./pages/novel/Genres.svelte";
	import Novelkeywords from "./pages/novel/Keywords.svelte";
	import NovelkeywordDetail from "./pages/novel/KeywordDetail.svelte";
	import NovelCoverBackground from "./pages/novel/CoverBackground.svelte";
	import NovelCoverBackgroundDetail from "./pages/novel/CoverBackgroundDetail.svelte";
	import NovelCoverImage from "./pages/novel/CoverImage.svelte";
	import NovelCoverImageDetail from "./pages/novel/CoverImageDetail.svelte";

	import Notice from "./pages/novel/Notice.svelte"
	import NoticeDetail from "./pages/novel/NoticeDetail.svelte"

	import Faq from "./pages/novel/Faq.svelte"
	import FaqDetail from "./pages/novel/FaqDetail.svelte"

	import Inquiry from "./pages/novel/Inquiries.svelte";
	import InquiryDetail from "./pages/novel/InquiriesDetail.svelte";

	// import MemberInformation from "./pages/novel/MemberInformation.svelte"
</script>


<Route path="/" redirect="/novel/main/all"><NovelMainAll /></Route>

<Route path="/novel/main/all"><NovelMainAll /></Route>
<Route path="/novel/main/all/:_id"><NovelMainAllDetail /></Route>
<Route path="/novel/main/deleted"><NovelMainDeleted /></Route>
<Route path="/novel/main/deleted/:_id/:_id2"><NovelMainDeletedDetail /></Route>

<Route path="/novel/slangs"><NovelSlangs /></Route>
<Route path="/novel/genres"><NovelGenres /></Route>
<Route path="/novel/keywords"><Novelkeywords /></Route>
<Route path="/novel/keywords/:_id"><NovelkeywordDetail /></Route>
<Route path="/novel/cover/background"><NovelCoverBackground /></Route>
<Route path="/novel/cover/background/:_id"><NovelCoverBackgroundDetail /></Route>
<Route path="/novel/cover/image"><NovelCoverImage /></Route>
<Route path="/novel/cover/image/:_id"><NovelCoverImageDetail /></Route>

<Route path="/novel/notice"><Notice/></Route>
<Route path="/novel/notice/:_id"><NoticeDetail/></Route>

<Route path="/novel/faq"><Faq/></Route>
<Route path="/novel/faq/:_id"><FaqDetail/></Route>

<Route path="/novel/inquiry"><Inquiry/></Route>
<Route path="/novel/inquiry/:_id"><InquiryDetail/></Route>

<!-- <Route path="/novel/MemberInformation"><MemberInformation/></Route> -->