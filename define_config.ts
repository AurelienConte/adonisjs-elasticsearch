import type { ElasticSearchConnectionList } from './types.js'

class RuntimeException extends Error {}

export function defineConfig<T extends ElasticSearchConnectionList>(
	config: {
		connection: keyof T,
		connections: T
	}
): {
	connection: keyof T,
	connections: T
} {
	if (!config) {
		throw new RuntimeException("Invalid config. It must be an object");
	}

	if (!config.connections) {
		throw new RuntimeException(
			'Missing "connections" property in the elasticsearch config file'
		);
	}

	if (!config.connection) {
		throw new RuntimeException(
			'Missing "connection" property in elasticsearch config. Specify a default connection to use'
		);
	}

	if (!config.connections[config.connection]) {
		throw new RuntimeException(
			`Missing "connections.${String(
				config.connection
			)}". It is referenced by the "default" elasticsearch connection`
		);
	}
	return config;
}