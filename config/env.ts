import devEnv from "./env.dev";
// import prodEnv from "./env.prod";

type EnvType = {
  BASE_URL: string;
  CLIENT_ID: string;
};

let env: EnvType;
if (__DEV__) {
  env = devEnv;
} else {
  env = prodEnv;
}

export default env;
