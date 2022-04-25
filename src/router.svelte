<script>
	import { Route } from "tinro";
	import NovelSlangs from "./pages/novel/Slangs.svelte";
</script>

<Route path="/" redirect="/novel/slangs"><NovelSlangs /></Route>
<Route path="/novel/slangs"><NovelSlangs /></Route>
