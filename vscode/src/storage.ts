import { randomUUID } from "crypto";
import { gt } from "semver";
import { ExtensionContext } from "vscode";
import { Configs } from "./config";

const keys = {
  // dont sync
  deviceID: Configs.DEVICE_ID,
  // sync
  shownVersion: Configs.SHOWN_VERSION,
};
export class ExtensionStorage {
  context: ExtensionContext;

  constructor(context: ExtensionContext) {
    this.context = context;
    this.context.globalState.setKeysForSync([keys.shownVersion]);

  }
  initDeviceID() {
    let deviceID = this.getDeviceID();
    if (!deviceID || deviceID.length !== 36) {
      const rID = randomUUID();
      return this.setDeviceID(rID).then(() => rID);
    }
    return Promise.resolve(deviceID);

  }
  setDeviceID(deviceID: string) {
    console.debug('setDeviceID', deviceID);
    return this.context.globalState.update(keys.deviceID, deviceID);
  }
  getDeviceID() {
    console.debug('getDeviceID', this.context.globalState.get<string>(keys.deviceID));
    return this.context.globalState.get<string>(keys.deviceID);
  }
  setShownVersion(version: string) {
    console.debug('setShownVersion', version);
    return this.context.globalState.update(keys.shownVersion, version);
  }
  getShownVersion() {
    console.debug('getShownVersion', this.context.globalState.get<string>(keys.shownVersion));
    return this.context.globalState.get<string>(keys.shownVersion);
  }
  shouldShowWelcomePage(version: string) {

    return gt(version, this.getShownVersion() ?? '0.0.0');
  }
  isFirstInstall() {
    return !this.getShownVersion();
  }
}
