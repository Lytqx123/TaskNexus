# TaskNexus Webapp

The TaskNexus user interface, Express API, email templates, and data sync workers.

### env vars:

Mandatory:
- `NODE_ENV` - nodejs environment name
- `DB_URL` - mongodb connection uri e.g. `mongodb://docker_mongo:27017/tasknexus`
- `REDIS_HOST` - redis sever hostname
- `REDIS_PORT` - redis server port
- `REDIS_PASS` - redis server password
- `JWT_SECRET` - secret used to sign JWTs
- `COOKIE_SECRET` - secret used to sign cookies
- `URL_APP` - url of the frontend webapp, e.g. `http://localhost:3000`
- `AGENT_BACKEND_SOCKET_TOKEN` - token to identify agent backend in socket session
- `AIRBYTE_WEB_URL` - http://localhost:8000
- `AIRBYTE_API_URL` - http://localhost:8006
- `AIRBYTE_ADMIN_WORKSPACE_ID` - Default/admin airbyte workspace ID
- `AIRBYTE_ADMIN_DESTINATION_ID` - Destination ID for existing destination to sync to
- `AIRBYTE_USERNAME` - Airbyte username (default: airbyte)
- `AIRBYTE_PASSWORD` - Airbyte username (default: password)
- `RABBITMQ_HOST` - rabbitmq configs
- `RABBITMQ_PORT` - rabbitmq configs
- `RABBITMQ_STREAM` - rabbitmq configs
- `RABBITMQ_EXCHANGE` - rabbitmq configs
- `RABBITMQ_ROUTING_KEY` - rabbitmq configs
- `RABBITMQ_USERNAME` - rabbitmq configs
- `RABBITMQ_PASSWORD` - rabbitmq configs
- `VECTOR_APP_URL` - url of vector db proxy e.g. http://localhost:9001
- `EXPRESS_HOST` - 0.0.0.0
- `EXPRESS_PORT` - 3000

Optional:
- `DEBUG` - for debugging, uses [debug format](https://www.npmjs.com/package/debug). there is tasknexus:socket, tasknexus:http, tasknexus:middleware, tasknexus:context, tasknexus:db, or tasknexus:* for all.
- `PROJECT_ID` - GCP project id
- `GOOGLE_APPLICATION_CREDENTIALS` - if PROJECT_ID is set, the path to GCP service account
- `FROM_EMAIL_ADDRESS` - the email address to send emails from with SES, reads 2 secrets from GCP secret manager: `AMAZON_ACCESS_ID` and `AMAZON_SECRET_ACCESS_KEY`.
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `STRIPE_ACCOUNT_SECRET` - Stripe account secret
- `NEXT_PUBLIC_POSTHOG_KEY` - Posthog public key
- `NEXT_PUBLIC_POSTHOG_HOST` - Posthog endpoint url
- `NEXT_PUBLIC_NO_PAYMENT_REQUIRED` - Set to any value to disable payment requirements for local testing
- `NEXT_PUBLIC_ENABLE_GOOGLE_OAUTH` - Flag to enable Google oauth button on frontend
- `OAUTH_GOOGLE_CLIENT_ID` - Google oauth client id
- `OAUTH_GOOGLE_CLIENT_SECRET` - Google oauth client secret
- `NEXT_PUBLIC_ENABLE_GITHUB_OAUTH` - Flag to enable Github oauth button on frontend
- `OAUTH_GITHUB_CLIENT_ID` - Github oauth client id
- `OAUTH_GITHUB_CLIENT_SECRET` - Github oauth client secret
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `STRIPE_ACCOUNT_SECRET` - Stripe account secret
- `STRIPE_FREE_PLAN_PRICE_ID`
- `STRIPE_PRO_PLAN_PRICE_ID`
- `STRIPE_TEAMS_PLAN_PRICE_ID`
- `NEXT_PUBLIC_GCS_BUCKET_NAME`  - bucket name
- `GCS_BUCKET_LOCATION`  - gcp location e.g. australia-southeast1

### Branding and external links

Set `URL_APP` to your deployment URL for email links and the TaskNexus email logo. Optional `NEXT_PUBLIC_TASKNEXUS_*_URL` settings in `.env.example` configure your own website, docs, support, legal, community, social, and contact destinations; leave them empty to hide those links. These public variables are embedded during the Next.js build, so rebuild the webapp after changing them.

`NEXT_PUBLIC_PINECONE_INTEGRATION_ID` is optional and must belong to your Pinecone integration. Leave it empty to hide the connect widget. `NEXT_PUBLIC_TASKNEXUS_RESTRICT_EMBEDDINGS_TO_1536=false` leaves the supported embedding sizes available; set it to `true` only if your deployment requires that restriction.

The default RabbitMQ exchange is `tasknexus`. Configure `RABBITMQ_EXCHANGE` consistently for the webapp, Airbyte destination, and sync workers when using an existing deployment. Queue and socket protocol names retain their existing meaning.

Use `package.json` and `package-lock.json` for `npm ci`.
