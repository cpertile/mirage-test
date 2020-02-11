import { Server, Model } from 'miragejs'

export function startMirage({ environment = 'development' } = {}) {
  const server = new Server({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create('User', { 'id': 1, 'first_name': 'Mirage Stormy', 'last_name': 'Dimic', 'email': 'sdimic0@friendfeed.com' })
      server.create('User', { 'id': 2, 'first_name': 'Mirage Jewell', 'last_name': 'Zanettini', 'email': 'jzanettini1@netscape.com' })
      server.create('User', { 'id': 3, 'first_name': 'Mirage Ameline', 'last_name': 'Saberton', 'email': 'asaberton2@amazonaws.com' })
      server.create('User', { 'id': 4, 'first_name': 'Mirage Tore', 'last_name': 'Atling', 'email': 'tatling3@census.gov' })
      server.create('User', { 'id': 5, 'first_name': 'Mirage Forester', 'last_name': 'Wheatcroft', 'email': 'fwheatcroft4@indiatimes.com' })
    },

    routes() {
      this.namespace = ''

      this.get('https://my.api.mockaroo.com/mockaroo.json', (schema, request) => {
        console.log('param key=' + request.queryParams.key)

        return schema.users.all()
      })
    },
  })

  return server
}