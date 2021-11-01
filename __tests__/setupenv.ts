import { loadEnvConfig } from "@next/env";

const loadEnv = async (): Promise<void> => {
  loadEnvConfig(process.env.PWD || process.cwd());
};

export default loadEnv;
