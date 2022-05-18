<script lang="ts">
	export let name: string, calories: number, ingredients: string[], url: string, image: string;

	function open_url() {
		window.open(url, '_blank');
	}
</script>

<div class="cursor-pointer divide-y-2 divide-dashed divide-slate-500" on:click={() => open_url()}>
	<div class="text-center m-3 divide-y-8 divide-transparent">
		<h3 class="text-3xl font-semibold">
			{name}
		</h3>
		<p class="text-xl font-semibold">{Math.round(calories)} calories</p>
	</div>
	<div class="lg:flex m-auto w-fit p-3">
		<ol class="m-3 list-decimal">
			{#each ingredients as ingredient}
				<li>{ingredient}</li>
			{/each}
		</ol>
		<img src={image} alt={name} class="lg:m-3 rounded-2xl shadow m-auto w-fit" />
	</div>
</div>
