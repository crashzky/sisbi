import Props from './Paragraph.props';
import { getParagraphStyles } from './Paragraph.styles';

const Paragraph: React.FC<Props> = ({ className = '', variant, tag, children, ...props }) => {
	const tagParams = {
		className: className + ' ' + getParagraphStyles(variant),
		...props,
	};

	switch(tag) {
		case 'h1':
			return (
				<h1 {...tagParams}>
					{children}
				</h1>
			);
		case 'h2':
			return (
				<h2 {...tagParams}>
					{children}
				</h2>
			);
		case 'h3':
			return (
				<h3 {...tagParams}>
					{children}
				</h3>
			);
		case 'h4':
			return (
				<h4 {...tagParams}>
					{children}
				</h4>
			);
		case 'h5':
			return (
				<h5 {...tagParams}>
					{children}
				</h5>
			);
		case 'h6':
			return (
				<h6 {...tagParams}>
					{children}
				</h6>
			);
		case 'p':
			return (
				<p {...tagParams}>
					{children}
				</p>
			);
		case 'span':
			return (
				<span {...tagParams}>
					{children}
				</span>
			);
	}
};

export default Paragraph;
