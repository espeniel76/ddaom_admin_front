<script>
	import { Route } from "tinro";

	import Home from "./pages/Home.svelte";

	import NovelSlangs from "./pages/novel/Slangs.svelte";
	console.log("Router");
</script>

<Route path="/" redirect="/home"><Home /></Route>
<Route path="/"><Home /></Route>
<Route path="/novel/slangs"><NovelSlangs /></Route>
