import { StylesConfig } from 'react-select';
import { MAIN_SHADOW } from '../../shared/consts/shadows';
import { ISelectOption, SelectVariants } from './Select.props';

const SELECT_PRIMARY_STYLES: StylesConfig = {
	control: (provided, state) => ({
		...provided,
		height: '48px',
		background: '#F3F3F5',
		cursor: 'pointer',
		borderRadius: state.menuIsOpen ? '12px 12px 0 0' : '12px',
		border: state.menuIsOpen ? '1px solid #739EF1' : 'none',
		borderColor: 'transparent',
		boxShadow: 'none',
	}),
	valueContainer: (provided) => ({
		...provided,
		padding: '0 8px',
	}),
	input: (provided) => ({
		...provided,
		fontSize: '14px',
		padding: '13.5px 16px',
		margin: '0',
	}),
	placeholder: (provided) => ({
		...provided,
		padding: '0 16px',
		fontSize: '14px',
		color: '#74767A',
	}),
	indicatorSeparator: () => ({
		display: 'none',
	}),
	loadingIndicator: () => ({
		display: 'none',
	}),
	menu: (provided) => ({
		...provided,
		borderRadius: '0 0 12px 12px',
		border: '1px solid #739EF1',
		borderTop: 'none',
		margin: '0',
	}),
	menuList: (provided) => ({
		...provided,
		borderRadius: '12px',
	}),
	option: (provided, state) => {
		const currentOption = state.options.find((i) => (i as ISelectOption).label === state.label);

		return {
			...provided,
			cursor: 'pointer',
			boxShadow: state.options.indexOf(currentOption) !== state.options.length - 1 ? '0px 1px 0px #ECEDF0' : '',
			backgroundColor: state.isFocused ? 'rgba(87, 95, 204, 0.1)' : 'transparent',
			color: 'black',
		};
	},
	singleValue: (provided) => ({
		...provided,
		padding: '0 16px',
	}),
};

const SELECT_WITH_GAP_STYLES: StylesConfig = {
	control: (provided) => ({
		...provided,
		cursor: 'pointer',
		borderRadius: '12px',
		border: 'none',
		borderColor: 'transparent',
		boxShadow: 'none',
	}),
	valueContainer: (provided) => ({
		...provided,
		padding: '0 8px',
		borderRadius: '12px',
	}),
	input: (provided) => ({
		...provided,
		fontSize: '14px',
		padding: '13.5px 16px',
		margin: '0',
	}),
	placeholder: (provided) => ({
		...provided,
		padding: '0 16px',
		fontSize: '14px',
		color: '#74767A',
	}),
	indicatorsContainer: () => ({
		display: 'none',
	}),
	loadingIndicator: () => ({
		display: 'none',
	}),
	menu: (provided) => ({
		...provided,
		borderRadius: '12px',
	}),
	menuList: (provided) => ({
		...provided,
		borderRadius: '12px',
	}),
	option: (provided, state) => {
		const currentOption = state.options.find((i) => (i as ISelectOption).label === state.label);

		return {
			...provided,
			cursor: 'pointer',
			boxShadow: state.options.indexOf(currentOption) !== state.options.length - 1 ? '0px 1px 0px #ECEDF0' : '',
			backgroundColor: state.isFocused ? 'rgba(87, 95, 204, 0.1)' : 'transparent',
			color: 'black',
		};
	},
	singleValue: (provided) => ({
		...provided,
		padding: '0 16px',
	}),
};

const SELECT_TRANSPARENT_STYLES: StylesConfig = {
	control: (provided) => ({
		...provided,
		cursor: 'pointer',
		borderRadius: '12px',
		border: 'none',
		borderColor: 'transparent',
		boxShadow: 'none',
	}),
	valueContainer: (provided) => ({
		...provided,
		padding: 0,
		borderRadius: '12px',
	}),
	input: (provided) => ({
		...provided,
		fontSize: '12px',
		padding: '13.5px 16px',
		margin: '0',
	}),
	placeholder: (provided) => ({
		...provided,
		padding: '0 16px',
		fontSize: '12px',
		color: '#575FCC',
	}),
	dropdownIndicator: (provided) => ({
		...provided,
		svg: {
			fill: '#575FCC',
		},
	}),
	indicatorSeparator: () => ({
		display: 'none',
	}),
	loadingIndicator: () => ({
		display: 'none',
	}),
	menu: (provided) => ({
		...provided,
		borderRadius: '12px',
		border: 'none',
		boxShadow: MAIN_SHADOW,
	}),
	menuList: (provided) => ({
		...provided,
		borderRadius: '12px',
		fontSize: '12px',
	}),
	option: (provided, state) => {
		const currentOption = state.options.find((i) => (i as ISelectOption).label === state.label);

		return {
			...provided,
			cursor: 'pointer',
			boxShadow: state.options.indexOf(currentOption) !== state.options.length - 1 ? '0px 1px 0px #ECEDF0' : '',
			backgroundColor: state.isFocused ? 'rgba(87, 95, 204, 0.1)' : 'transparent',
			color: 'black',
		};
	},
	singleValue: (provided) => ({
		...provided,
		padding: '0 16px',
		fontSize: '12px',
		color: '#575FCC',
	}),
};

function getStyles(variant: SelectVariants, isDanger: boolean): StylesConfig {
	switch(variant) {
		case 'primary':
			return {
				...SELECT_PRIMARY_STYLES,
				control: (provided, state) => ({
					...SELECT_PRIMARY_STYLES.control(provided, state),
					boxShadow: isDanger ? 'inset 0 0 0 1.5px #ff6d3b' : '',
				}),
			};
		case 'with_gap':
			return SELECT_WITH_GAP_STYLES;
		case 'transparent':
			return SELECT_TRANSPARENT_STYLES;
	}
}

export {
	getStyles,
};
