import { HEADER_PRIMARY_ITEMS } from '../../shared/consts/header';
import Footer from '../Footer';
import Header from '../Header';
import SearchPanel from '../SearchPanel';
import Props from './SearchLayout.props';

const SearchLayout: React.FC<Props> = ({ children, className = '', headerItems = HEADER_PRIMARY_ITEMS, ...props }) => {
	return (
		<>
			<Header items={headerItems} className='py-4 px-40' />
			<SearchPanel />
			<main className={className + ' bg-[#FAFBFC]'} {...props}>
				{children}
			</main>
			<Footer className='pt-24 pb-9 px-40 bg-[#FAFBFC]' />
		</>
	);
};

export default SearchLayout;
