<script lang="ts">
	export let query_string: string;

	let search_input: HTMLInputElement;
	let search_button: HTMLButtonElement;

	function update_value() {
		query_string = search_input.value || '';
	}

	function input_keydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			update_value();
		}
	}
</script>

<div class="w-fit m-auto">
	<input
		type="text"
		bind:this={search_input}
		on:keydown={input_keydown}
		placeholder="What are you craving..."
		class="rounded-l-md -mr-1 h-12 p-3 w-72"
		value="chicken"
	/>
	<button
		bind:this={search_button}
		on:click={update_value}
		class="rounded-r-md bg-slate-600 text-slate-200 h-12 p-3 shadow-lg hover:bg-slate-500 duration-200"
		>Search</button
	>
</div>
