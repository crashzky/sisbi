import Props from './Paragraph.props';
import { getParagraphStyles } from './Paragraph.styles';

const Paragraph: React.FC<Props> = ({ className = '', variant, children, ...props }) => {
	return (
		<p className={className + ' ' + getParagraphStyles(variant)} {...props}>
			{children}
		</p>
	);
};

export default Paragraph;
