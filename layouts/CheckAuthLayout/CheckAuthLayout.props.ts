interface ICheckAuthConfig {
	checkLoggined?: boolean;
	onAccessDenited?: () => void;
}

export type {
	ICheckAuthConfig,
};
