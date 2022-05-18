import type { RequestHandler } from 'node_modules/@sveltejs/kit/types/internal';

import 'dotenv/config';

const [APP_ID, APP_KEY] = [process.env.APP_ID, process.env.APP_KEY];

export const get: RequestHandler = async (event) => {
	const query = event.url.searchParams.get('q');

	if (!query) {
		return {
			statusCode: 204,
			body: []
		};
	}

	const url = `https://api.edamam.com/search?&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

	let response = await fetch(url)
		.then((res) => res.json())
		.then((data) => {
			// filter data to send only what is needed
			// @ts-ignore
			let recipes = data.hits.map((hit) => hit.recipe);
			recipes = recipes.map(
				(recipe: {
					label: string;
					image: string;
					calories: number;
					ingredients: { text: string }[];
					url: string;
				}) => {
					return {
						label: recipe.label,
						image: recipe.image,
						calories: recipe.calories,
						ingredients: recipe.ingredients.map((ingredient) => ingredient.text),
						url: recipe.url
					};
				}
			);

			return {
				statusCode: 200,
				body: JSON.stringify(recipes)
			};
		})
		.catch((err) => {
			return {
				statusCode: 500,
				body: {
					message: err.message
				}
			};
		});
	return response;
};
