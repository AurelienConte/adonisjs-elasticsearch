import type Configure from '@adonisjs/core/commands/configure'
import pkg from './package.json'
import { stubsRoot } from './stubs'

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
		// @TODO: add envs
	})

	/**
	 * Validate environment variables
	 */
	// await codemods.defineEnvValidations({
	// 	variables: {
	// 		// @TODO: add envs validations
	// 	},
	// })

	/**
	 * Register provider
	 * @TODO: Fix the linting error here
	 */
	await codemods.updateRcFile((rcFile) => {
		rcFile.addProvider(`${packageName}/providers/elasticsearch_provider`)
	})
}