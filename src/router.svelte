<script>
	import { Route } from "tinro";
	import NovelSlangs from "./pages/novel/Slangs.svelte";
	import NovelGenres from "./pages/novel/Genres.svelte";
	import Novelkeywords from "./pages/novel/Keywords.svelte";
</script>

<Route path="/" redirect="/novel/keywords"><Novelkeywords /></Route>
<Route path="/novel/slangs"><NovelSlangs /></Route>
<Route path="/novel/genres"><NovelGenres /></Route>
<Route path="/novel/keywords"><Novelkeywords /></Route>
