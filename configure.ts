import type Configure from '@adonisjs/core/commands/configure'
import pkg from './package.json' with { type: "json" }
import { stubsRoot } from './stubs/index.js'

const packageName = pkg.name

/**
 * Configures the package
 */
export async function configure(command: Configure) {
	const codemods = await command.createCodemods()
	await codemods.makeUsingStub(stubsRoot, 'config/elasticsearch.stub', {})

	/**
	 * Add environment variables
	 */
	await codemods.defineEnvVariables({
		ELASTICSEARCH_NODE: 'https://localhost:9200',
	})

	/**
	 * Validate environment variables
	 */
	await codemods.defineEnvValidations({
		variables: {
			ELASTICSEARCH_NODE: `Env.schema.string.optional({ format: 'url', tld: false })`,
		},
	})

	/**
	 * Register provider
	 * @TODO: Fix the linting error here
	 */
	await codemods.updateRcFile((rcFile: any) => {
		rcFile.addProvider(`${packageName}/providers/elasticsearch_provider`)
	})
}