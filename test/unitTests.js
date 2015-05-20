/**
 * This is a temp solution. The project is not setup to look for tests recursively. If it did, it would also
 * include the fixtures (projectA/*.js) which are not valid test files. The correct solution is probably to move the
 * fixtures.
 */
require('./template-helpers/assetS3Url');
require('./template-helpers/templateS3Url');