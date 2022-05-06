import Props from './Textarea.props';

const Textarea: React.FC<Props> = ({ className = '', ...props }) => {
	return (
		<textarea className={className + ' bg-gray-40 p-4 rounded-xl outline-none placeholder:text-text-secondary'} {...props}>
			
		</textarea>
	);
};

export default Textarea;
