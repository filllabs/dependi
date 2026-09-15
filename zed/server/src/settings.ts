import { randomUUID } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { Settings } from "../../../vscode/src/config";
import { setWorkspaceConfig } from "./shims/vscode";

const DEVICE_DIR = path.join(homedir(), ".dependi");
const DEVICE_FILE = path.join(DEVICE_DIR, "device-id");

export function loadDeviceId(): string {
  try {
    const existing = readFileSync(DEVICE_FILE, "utf8").trim();
    if (existing) {
      return existing;
    }
  } catch {
    // first run
  }
  const id = randomUUID();
  try {
    mkdirSync(DEVICE_DIR, { recursive: true });
    writeFileSync(DEVICE_FILE, id, "utf8");
  } catch {
    // still use the in-memory id
  }
  return id;
}

export function applyLspSettings(settings: Record<string, unknown> | undefined): void {
  const raw = settings ?? {};
  const scoped =
    raw.dependi && typeof raw.dependi === "object" && !Array.isArray(raw.dependi)
      ? (raw.dependi as Record<string, unknown>)
      : raw;
  setWorkspaceConfig(scoped);
  Settings.version = "1.20.0";
  if (!Settings.api.deviceID) {
    Settings.api.deviceID = loadDeviceId();
  }
  Settings.load();
}
