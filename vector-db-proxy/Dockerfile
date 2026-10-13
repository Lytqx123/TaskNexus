FROM rust:1.88.0 as builder
ARG RELEASE
WORKDIR /usr/local/src/tasknexus-vector-proxy
RUN mkdir -p src
COPY src/dummy.rs src
COPY Cargo.toml .
COPY Cargo.lock .
RUN sed -i 's#src/main.rs#src/dummy.rs#' Cargo.toml

RUN apt-get update -y && apt-get install -y iputils-ping htop

RUN if [ "$RELEASE" = "true" ] ; then echo "Running Release..." \
	&& cargo build --release \
	&& mkdir -p /usr/local/src/tasknexus-vector-proxy/target/debug \
	&& touch /usr/local/src/tasknexus-vector-proxy/target/debug/tasknexus-vector-proxy ; else echo "Running Debug.." \
	&& cargo build  \
	&& mkdir -p /usr/local/src/tasknexus-vector-proxy/target/release \
	&& touch /usr/local/src/tasknexus-vector-proxy/target/release/tasknexus-vector-proxy ; fi

RUN sed -i 's#src/dummy.rs#src/main.rs#' Cargo.toml

#TODO: only copy whats necessary
COPY . . 

RUN if [ "$RELEASE" = "true" ] ; then echo "Running Release..." \
	&& cargo build --release \
	&& mkdir -p /usr/local/src/tasknexus-vector-proxy/target/debug \
	&& touch /usr/local/src/tasknexus-vector-proxy/target/debug/tasknexus-vector-proxy ; else echo "Running Debug.." \
	&& cargo build  \
	&& mkdir -p /usr/local/src/tasknexus-vector-proxy/target/release \
	&& touch /usr/local/src/tasknexus-vector-proxy/target/release/tasknexus-vector-proxy ; fi

RUN mkdir /onnxruntime \
	&& cd /onnxruntime \
	&& wget https://github.com/microsoft/onnxruntime/releases/download/v1.17.1/onnxruntime-linux-x64-1.17.1.tgz \
	&& tar -xvf onnxruntime-linux-x64-1.17.1.tgz \
	&& cd onnxruntime-linux-x64-1.17.1 \
	&& cp lib/libonnxruntime.so.1.17.1 /lib \
	&& cp lib/libonnxruntime.so.1.17.1 /usr/lib

# Final Stage (using rust image to be safe so we have important libs like libssl, etc)
FROM rust:1.88.0
ARG SHORT_COMMIT_HASH=""
LABEL org.opencontainers.image.title="TaskNexus Vector Proxy" \
    org.opencontainers.image.description="Vector database proxy for TaskNexus RAG applications." \
    org.opencontainers.image.vendor="TaskNexus" \
    org.opencontainers.image.version="0.2.0" \
    org.opencontainers.image.revision="${SHORT_COMMIT_HASH}"

WORKDIR /app
# Set arguments
ARG RELEASE
ARG UNSTRUCTURED_API_KEY
ARG UNSTRUCTURED_API_URL
ARG VECTOR_DATABASE_API_KEY
ARG VECTOR_DATABASE
ARG VECTOR_DATABASE_URL
ARG LOGGING_LEVEL
# Set ENV variables
ENV IS_RELEASE=$RELEASE
ENV UNSTRUCTURED_API_URL=$UNSTRUCTURED_API_URL
ENV UNSTRUCTURED_API_KEY=$UNSTRUCTURED_API_KEY
ENV VECTOR_DATABASE_API_KEY=$VECTOR_DATABASE_API_KEY
ENV VECTOR_DATABASE=$VECTOR_DATABASE
ENV VECTOR_DATABASE_URL=$VECTOR_DATABASE_URL
ENV LOGGING_LEVEL=$LOGGING_LEVEL

# Copy from builder step
COPY --from=builder /usr/local/src/tasknexus-vector-proxy/target/release/tasknexus-vector-proxy /app/tasknexus-vector-proxy-release
COPY --from=builder /usr/local/src/tasknexus-vector-proxy/target/debug/tasknexus-vector-proxy /app/tasknexus-vector-proxy-debug
# Only copy runtime dependencies if necessary
COPY --from=builder /lib/libonnxruntime.so.1.17.1 /lib/
COPY --from=builder /usr/lib/libonnxruntime.so.1.17.1 /usr/lib/
EXPOSE 9001
CMD sh -c 'if [ "$IS_RELEASE" = "true" ]; then ./tasknexus-vector-proxy-release; else ./tasknexus-vector-proxy-debug; fi'
