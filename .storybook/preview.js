import '../styles/globals.css';
import '../styles/font.css';
import '../styles/radio.css';
import '../styles/checkbox.css';
import '../styles/number.css';
import '../styles/burger-menu.css';
import '../styles/switch.css';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
}