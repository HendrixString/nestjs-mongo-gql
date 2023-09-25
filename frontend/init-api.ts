import { initClient } from "./lib/api/client";

initClient(
  {
    endpoint: process.env.NEXT_PUBLIC_API_SERVER
  }
)