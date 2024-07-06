import {ElasticSearchConnectionList} from "../types.js";
import {Client} from "@elastic/elasticsearch";
import app from "@adonisjs/core/services/app";

let elasticsearch: Client;
let manager: ElasticSearchManager;

export class ElasticSearchManager {
	connect<ConnectionName extends keyof ElasticSearchConnectionList>(connectionName: ConnectionName) {
		const elasticsearch = app.config.get<{connections: ElasticSearchConnectionList}>('elasticsearch');
		return new Client(elasticsearch.connections[connectionName]);
	}
}

await app.booted(async () => {
	elasticsearch = await app.container.make('elasticsearch');
	manager = new ElasticSearchManager();
});

export {elasticsearch as default, manager};