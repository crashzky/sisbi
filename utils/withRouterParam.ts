import { NextRouter } from 'next/router';

function withRouterParam(router: NextRouter,
	paramName: string, type: 'string' | 'number' | 'array' = 'string')
: object | Record<string, string | number> {	
	if(router.query && router.query[paramName]) {
		switch(type) {
			case 'string':
				return { [paramName]: router.query[paramName].toString() };
			case 'number':
				return { [paramName]: +router.query[paramName] };
			case 'array':
				return { [paramName]: router.query[paramName].toString().split(',') };
		}
	}
	else
		return {};
}

export default withRouterParam;
