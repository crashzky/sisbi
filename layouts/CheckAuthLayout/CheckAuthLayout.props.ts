interface ICheckAuthConfig {
	checkLoggined?: boolean;
	onAccessDenited?: () => void;
	returnRendered?: boolean;
}

export type {
	ICheckAuthConfig,
};
