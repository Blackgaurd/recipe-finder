<script lang="ts">
	import Recipe from './Recipe.svelte';
	import Search from './Search.svelte';

	async function query_api(param: string) {
		param = param.toLowerCase();

		let resp = await fetch(
			'/query?' +
				new URLSearchParams({
					q: param
				})
		);

		let data = await resp.json();
		return data;
	}
	let query_string: string = 'chicken';
	$: promise = query_api(query_string);
</script>

<div class="flex bg-amber-100">
	<div class="xl:w-1/2 m-auto">
		<h1 class="font-semibold text-4xl text-center m-6">Recipe Finder</h1>

		<Search bind:query_string />

		{#await promise}
			<p class="h-screen">Loading...</p>
		{:then recipes}
			{#if !recipes.length}
				<p class="h-screen">No recipes found</p>
			{:else}
				{#each recipes as recipe}
					<div class="m-3 p-3 bg-teal-100 rounded-2xl shadow-md">
						<Recipe
							name={recipe.label}
							calories={recipe.calories}
							ingredients={recipe.ingredients}
							url={recipe.url}
							image={recipe.image}
						/>
					</div>
				{/each}
			{/if}
		{:catch err}
			<p>An internal error occued at {err}</p>
		{/await}
	</div>
</div>
