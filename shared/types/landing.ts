interface IFeatureItem {
	Icon: React.FC<any>;
	label: string;
	description: string;
}

interface IHelpItem {
	label: string;
	description: string;
}

export type {
	IFeatureItem,
	IHelpItem,
};
