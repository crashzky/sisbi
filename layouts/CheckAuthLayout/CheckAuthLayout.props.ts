interface ICheckAuthConfig {
	checkLoggined?: boolean;
	onAccessDenited?: () => void;
	returnRendered?: boolean;
	checkUserType?: string | null;
}

export type {
	ICheckAuthConfig,
};
