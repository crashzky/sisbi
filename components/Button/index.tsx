import Props from './Button.props';
import { getColorStyles, getSizeStyles } from './Button.styles';

const Button: React.FC<Props> = ({ className = '', variant = 'primary', size = 'L', children, ...props }) => {
	return (
		<button
			className={className
				+ ' '
				+ getColorStyles(variant)
				+ ' '
				+ getSizeStyles(size)
			}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
