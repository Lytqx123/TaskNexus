# TaskNexus Agent Backend

Python backend that runs TaskNexus agents.

### Local execution framework

The CrewAI package is included in `vendor/crewai` and installed as a local
Poetry dependency. Its `socket_client` and `session_id` interfaces connect
the execution framework to TaskNexus. The local package provides streaming
messages, human feedback, tool status updates, generation cancellation and
task callbacks. Keep the vendor directory with this backend when building
its Docker image or installing dependencies.

### env vars:

Mandatory:
- `LOCAL` - `True` or `False`, whether the app is running locally, sets some default db url
- `MAX_THREADS` - 50
- `OAI_CONFIG_LIST` - path of open ai config list file
- `BASE_PATH` - base path of the app, only really used when in docker otherwise just "."
- `SOCKET_URL` - url of the frontend webapp (to connect with socketio) e.g. `http://tasknexus_webapp:3000/`
- `DB_URL` - MongoDB connection URI e.g. `mongodb://docker_mongo:27017/tasknexus`
- `MONGO_DB_NAME` - MongoDB database name, defaults to `tasknexus`
- `QDRANT_HOST` - hostname of qdrant
- `OPENAI_API_KEY` - open ai api key
- `MAX_RETRIES` - number of retries when connecting to webapp socketio
- `AGENT_BACKEND_SOCKET_TOKEN` - token to identify agent backend in socket session
- `GCS_BUCKET_NAME_PRIVATE` - name of the private GCS bucket e.g. `tasknexus-bucket-dev`
- `GCS_BUCKET_NAME` - name of the public GCS bucket e.g. `tasknexus-public-dev`
- `UPLOADS_BASE_PATH` - base path for uploads e.g. `/tmp`
- `GOOGLE_APPLICATION_CREDENTIALS` - path to Google application credentials file e.g. `keyfile.json`
- `PROJECT_ID` - Google Cloud project ID e.g. `tasknexus-dev`
- `STORAGE_PROVIDER` - storage provider e.g. `google`
- `UPLOADS_BASE_PATH` - base path for local uploads e.g. `/tmp`
