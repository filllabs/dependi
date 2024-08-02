import { Settings } from "../../config";
import { Logger } from "../../extension";
import { request } from "../indexes/dependi";

export interface TelemetryInfoRequest {
  FileName: string;
  DeviceID?: string;
}

export async function sendTelemetry(req: TelemetryInfoRequest) {
  req.DeviceID = Settings.api.deviceID;
  req.FileName = req.FileName.toLowerCase();
  const response = await request<string>(`v1/public/telemetries`, {
    method: "POST",
    headers: {
      "X-Device-ID": Settings.api.deviceID,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });
  if (response.error) {
    Logger.appendLine(`Error sending telemetry: ${response.error}`);
  }
  return response;
}