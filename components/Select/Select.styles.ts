import { StylesConfig } from 'react-select';
import { SelectVariants } from './Select.props';

const SELECT_PRIMARY_STYLES: StylesConfig = {
	control: (provided, state) => ({
		...provided,
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
	indicatorsContainer: () => ({
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
	option: (provided, state) => ({
		...provided,
		cursor: 'pointer',
		boxShadow: '0px 1px 0px #ECEDF0',
		backgroundColor: state.isFocused ? 'rgba(87, 95, 204, 0.1)' : 'transparent',
		color: 'black',
	}),
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
	menu: (provided) => ({
		...provided,
		borderRadius: '12px',
	}),
	menuList: (provided) => ({
		...provided,
		borderRadius: '12px',
	}),
	option: (provided, state) => ({
		...provided,
		cursor: 'pointer',
		boxShadow: '0px 1px 0px #ECEDF0',
		backgroundColor: state.isFocused ? 'rgba(87, 95, 204, 0.1)' : 'transparent',
		color: 'black',
	}),
	singleValue: (provided) => ({
		...provided,
		padding: '0 16px',
	}),
};

function getStyles(variant: SelectVariants): StylesConfig {
	switch(variant) {
		case 'primary':
			return SELECT_PRIMARY_STYLES;
		case 'with_gap':
			return SELECT_WITH_GAP_STYLES;
	}
}

export {
	getStyles,
};
