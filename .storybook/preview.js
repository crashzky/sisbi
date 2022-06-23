import '../styles/globals.css';
import '../styles/font.css';
import '../styles/radio.css';
import '../styles/checkbox.css';
import '../styles/number.css';
import '../styles/burger-menu.css';
import '../styles/switch.css';

import React from 'react'

import { ReactQueryCacheProvider, QueryCache } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

const queryCache = new QueryCache();

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
}
/**
 * adds a Storybook decorator to get the cache and dev tools showing for each story
 */
export const decorators = [
	(story) => (
		<ReactQueryCacheProvider queryCache={queryCache}>
			{story()}
			<ReactQueryDevtools />
		</ReactQueryCacheProvider>
	),
]