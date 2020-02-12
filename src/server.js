import { Server, Model, Factory } from 'miragejs'

/*
  We start by creating the function Server with our configs.
  For this app we're using the 'development' environment, but for
  testing purposes we can use the 'test' environment (which has some benefits for testing)
*/

export function startMirage({ environment = 'development' } = {}) {
  const server = new Server({
    environment,

    /* We can define models with properties as well as relationships */
    models: {
      user: Model,
    },

    /* Factories are ways to dynamically create records, specially in tests */
    factories: {
      user: Factory.extend({
        first_name(i) {
          return `Name ${i + 1}`;
        },
        last_name(i) {
          return `LastName ${i + 1}`
        },
        email(i) {
          return `Email${i + 1}@email.com`
        }
      })
    },

    /* Here we seed the database */
    seeds(server) {
      server.create('User', { 'id': 1, 'first_name': 'Mirage Stormy', 'last_name': 'Dimic', 'email': 'sdimic0@friendfeed.com' })
      server.create('User', { 'id': 2, 'first_name': 'Mirage Jewell', 'last_name': 'Zanettini', 'email': 'jzanettini1@netscape.com' })
      server.create('User', { 'id': 3, 'first_name': 'Mirage Ameline', 'last_name': 'Saberton', 'email': 'asaberton2@amazonaws.com' })
      server.create('User', { 'id': 4, 'first_name': 'Mirage Tore', 'last_name': 'Atling', 'email': 'tatling3@census.gov' })
      server.create('User', { 'id': 5, 'first_name': 'Mirage Forester', 'last_name': 'Wheatcroft', 'email': 'fwheatcroft4@indiatimes.com' })
    },

    routes() {
      /* The namespace can be used in the case where our api begins with '/api' for example */
      this.namespace = ''

      this.get('https://my.api.mockaroo.com/mockaroo.json', (schema, request) => {
        /* It's possible to obtain query parameters easily */
        console.log('param key=' + request.queryParams.key)

        /* We have at our disposal common DB functions like 'all()' and 'find()' */
        return schema.users.all()
      })

      /* There's no way to POST to the real online API so we do it locally */
      this.post('/users', (schema, request) => {
        let user = JSON.parse(request.requestBody)
        return schema.users.create(user)
      })

      this.delete('/users/:id', (schema, request) => {
        let userId = request.params.id;
        console.log(userId)

        return schema.users.find(userId).destroy();
      }) 
    },
  })

  return server
}