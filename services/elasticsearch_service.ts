import app from "@adonisjs/core/services/app";
import {ElasticSearchConnectionList} from "../types.js";
import {Client} from "@elastic/elasticsearch";

let elasticsearch: Client;
let manager: ElasticSearchManager;

class ElasticSearchManager {
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