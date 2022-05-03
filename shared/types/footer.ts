interface IFooterItem {
	title: string;
	items: IFooterSubItem[];
};

interface IFooterSubItem {
	title: string;
	href?: string;
	onClick?: () => void;
}

export type {
	IFooterItem,
};
