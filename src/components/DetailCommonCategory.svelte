<script>
	
export let categorylist


	function category(o) {
		switch (o) {
			case "1":
				o = "분류1"
				break;
			case "2":
				o = "분류2"
				break;
			case "3":
				o = "분류3"
				break;
			case "4":
				o = "분류4"
				break;
			case "5":
				o = "분류5"
				break;
		}
		return o;
	}

</script>

<td>{category(categorylist)}</td>
