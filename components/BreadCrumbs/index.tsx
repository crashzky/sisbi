import Link from 'next/link';
import Props from './BreadCrumbs.props';

import ArrowIcon from '../../assets/arrows/caret_left.svg';

const BreadCrumbs: React.FC<Props> = ({ className = '', items, ...props }) => {
	return (
		<div className={className + ' grid items-center grid-flow-col w-fit'}>
			{items.map((i, num) => (
				<>
					<Link href={i.href} key={num}>
						<a className={'text-sm ' + (num + 1 !== items.length ? 'text-text' : '')}>
							{i.label}
						</a>
					</Link>
					{num + 1 !== items.length && (
						<ArrowIcon className='fill-icon-secondary rotate-180 scale-50' />
					)}
				</>
			))}
		</div>
	);
};

export default BreadCrumbs;
