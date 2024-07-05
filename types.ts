import {ClientOptions} from "@elastic/elasticsearch";

export type * from '@elastic/elasticsearch';

export interface ElasticSearchConfig {
	connection: keyof ElasticSearchConnectionList;
	connections: ElasticSearchConnectionList;
}

export type ElasticSearchConnectionList = Record<string, ClientOptions>;