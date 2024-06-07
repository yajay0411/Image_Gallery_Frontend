const backend_endpoint = import.meta.env.VITE_BACKEND_ENDPOINT;
const project_name = import.meta.env.VITE_PROJECT_NAME;
const host_port = import.meta.env.VITE_HOST_PORT;
const env = import.meta.env.VITE_NODE_ENV;

const _config = {
  //global project
  env,
  host_port,
  project_name,
  backend_endpoint,
};
const configuration = Object.freeze(_config);

export default configuration;
