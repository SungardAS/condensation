/**
 * Condensation specific helpers for common tasks
 * @namespace TemplateHelpers
 */

/**
 * Particle Helpers load particles from their respective paths within the project.
 *
 * ```
 * - particles
 * |-- conditions
 * |-- helpers
 * |-- mappings
 * |-- metadata
 * |-- outputs
 * |-- parameters
 * |-- partials
 * |-- resources
 * |-- sets
 * ```
 *
 * All helpers follow the same pattern
 *
 * `{{<CONDENSATION-HELPER> [module:<MODULE>] '<PATH_TO_PARTICLE>' [OPTIONS...]}}`
 *
 * When loading a particle from a module that starts with `particles-` the short form
 * can also be used, where <M> is the name of the module without `particles-`
 *
 * `{{<CONDENSATION-HELPER> [m:<M>] '<PATH_TO_PARTICLE>' [OPTIONS...]}}`
 *
 * @namespace ParticleHelpers
 *
 */
