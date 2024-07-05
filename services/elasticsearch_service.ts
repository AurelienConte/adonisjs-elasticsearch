import app from "@adonisjs/core/services/app";
import {ElasticSearchConnectionList} from "../types";
import {Client} from "@elastic/elasticsearch";

let elasticsearch: Client = null;
let manager: ElasticSearchManager = null;

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