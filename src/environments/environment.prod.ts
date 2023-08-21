const apiDomains = {
  local: 'http://localhost:3333',
  staging: 'https://staging-whoryou.cyclic.cloud'
}

export const environment = {
  production: false,
  apiBasePath: apiDomains.staging
};