import axios from "axios";
import type { Server } from "../types/Server";

export async function getServers(): Promise<Server[]> {
  const response = await axios.get<Server[] | string>(
    "/data/servers.json",
  );

  const data =
    typeof response.data === "string"
      ? JSON.parse(response.data)
      : response.data;

  if (!Array.isArray(data)) {
    throw new Error("Server response must be an array.");
  }

  return data;
}