<script>
	import { Route } from "tinro";

	import NovelMainAll from "./pages/novel/MainAll.svelte";

	import NovelSlangs from "./pages/novel/Slangs.svelte";
	import NovelGenres from "./pages/novel/Genres.svelte";
	import Novelkeywords from "./pages/novel/Keywords.svelte";
	import NovelkeywordDetail from "./pages/novel/KeywordDetail.svelte";
	import NovelCoverBackground from "./pages/novel/CoverBackground.svelte";
	import NovelCoverBackgroundDetail from "./pages/novel/CoverBackgroundDetail.svelte";
	import NovelCoverImage from "./pages/novel/CoverImage.svelte";
	import NovelCoverImageDetail from "./pages/novel/CoverImageDetail.svelte";
</script>

<Route path="/" redirect="/novel/main/all"><NovelMainAll /></Route>

<Route path="/novel/main/all"><NovelMainAll /></Route>

<Route path="/novel/slangs"><NovelSlangs /></Route>
<Route path="/novel/genres"><NovelGenres /></Route>
<Route path="/novel/keywords"><Novelkeywords /></Route>
<Route path="/novel/keywords/:_id"><NovelkeywordDetail /></Route>
<Route path="/novel/cover/background"><NovelCoverBackground /></Route>
<Route path="/novel/cover/background/:_id"><NovelCoverBackgroundDetail /></Route>
<Route path="/novel/cover/image"><NovelCoverImage /></Route>
<Route path="/novel/cover/image/:_id"><NovelCoverImageDetail /></Route>
