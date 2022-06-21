import Props from './PageSlider.props';

import CaretLeftSmallIcon from '../../assets/arrows/caret_left_small.svg';

const PageSlider: React.FC<Props> = ({ className = '', currentPage, maxPages, onMove, ...props }) => {
	if(maxPages) {
		return (
			<div className={className + ' rounded-lg grid-flow-col border-[1px] border-button-outline w-fit'} {...props}>
				<button
					className='p-2 text-sm border-r-[1px] border-button-outline'
					onClick={() => onMove(currentPage > 1 ? currentPage - 1 : 0)}
				>
					<CaretLeftSmallIcon className='inline-block fill-icon-secondary mr-[9px]' />
					Предыдущая
				</button>
				{[currentPage - 1, currentPage, currentPage + 1].filter((i) => i > 0 && i <= maxPages)
					.map((i, num) => (
						<button
							key={num}
							onClick={() => onMove(i)}
							className={'p-2 text-sm h-full w-9 '
								+ (i === currentPage ? 'bg-lightBlue text-white' : '')}
						>
							{i}
						</button>
					))}
				<button
					className='p-2 text-sm border-l-[1px] border-button-outline'
					onClick={() => onMove(currentPage + 1 <= maxPages ? currentPage + 1 : maxPages)}
				>
					Следующая
					<CaretLeftSmallIcon className='inline-block fill-icon-secondary rotate-180 ml-[9px]' />
				</button>
			</div>
		);
	}
	else
		return null;
};

export default PageSlider;
