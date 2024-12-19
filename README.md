# AdonisJS Elasticsearch

<div align="center">
  <img src="https://imgur.com/NWRtoJ0.png" width="50%" alt="AdonisJS Elasticsearch" />
  <h3>ElasticSearch for AdonisJS v6</h3>
  <p>A third-party wrapper for `@elastic/elasticsearch` in AdonisJS v6.</p>
  <a href="https://www.npmjs.com/package/@aurelien-conte/adonisjs-elasticsearch">
    <img src="https://img.shields.io/npm/v/@aurelien-conte/adonisjs-elasticsearch.svg?style=for-the-badge&logo=npm" />
  </a>
  <img src="https://img.shields.io/npm/l/@aurelien-conte/adonisjs-elasticsearch?color=blueviolet&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript" />
</div>

> [!CAUTION]
> This package is not compatible with AdonisJS v5.

<del>Copied a lot from</del> Inspired a lot by [adonis-clickhouse](https://github.com/shiny/adonis-clickhouse). 

## Installation

```bash
node ace add @aurelien-conte/adonisjs-elasticsearch
```

## Configuration

You can change it in `config/elasticsearch.ts`, it's all same with `new Client` Configuration.

## Environment Variables
| Variable             | Description         | Default Value  |
|----------------------|---------------------|----------------|
| `ELASTICSEARCH_NODE` | Url to the database | `http://elasticsearch:9200` |

## How to import

As it is a container service, you can init it by
```typescript
await app.container.make('elasticsearch')
```
or
```typescript
import elasticsearch from '@aurelien-conte/adonisjs-elasticsearch/services/main'
```

The way same as `@adonisjs/redis`.

## Multi Database Instances
You can config the multi databases and use `manager` to connect it.

```typescript
import { manager } from '@aurelien-conte/adonisjs-elasticsearch/services/main'

// Change main to the name you defined.
const client = manager.connect('main')
await client.search({
    /* QueryParams */
})
```

## Documentation

See [Offical ElasticSearch JS Library](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)

## Credits

- [adonis-clickhouse](https://github.com/shiny/adonis-clickhouse) ( The code is heavily inspired by this package, like copied )
