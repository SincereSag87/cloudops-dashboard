export interface Server {
    id: number;
    hostname: string;
    location: string;
    ipAddress: string;
    status: "Online" | "Offline" | "Maintenance";
    cpu: number;
    memory: number;
  }