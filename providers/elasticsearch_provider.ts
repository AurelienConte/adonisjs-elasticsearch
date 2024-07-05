import {ApplicationService} from "@adonisjs/core/build/src/types";
import {ElasticSearchConfig} from "../types";
import { Client } from '@elastic/elasticsearch';

declare module '@adonisjs/core/types' {
	interface ContainerBindings {
		elasticsearch: Client;
	}
}

export default class ElasticsearchProvider {
	constructor(protected app: ApplicationService) {}

	register() {
		this.app.container.singleton('elasticsearch', async () => {
			const config = this.app.config.get<ElasticSearchConfig>('elasticsearch')
			if (config.connections[config.connection]) {
				return new Client(config.connection[config.connection]);
			} else {
				throw new Error('ElasticSearch Config Malformed')
			}
		});
	}

	async shutdown() {
		const elasticsearch = await this.app.container.make('elasticsearch');
		await elasticsearch.close();
	}
}