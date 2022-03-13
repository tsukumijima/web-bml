import { AribKeyCode, keyCodeToAribKey, processKeyDown, processKeyUp } from "./document";
import { RemoteControllerMessage } from "./remote_controller";

const videoElement = document.querySelector("video") as HTMLVideoElement;

let currentRemoteControllerMessage: string | null = null;

export function setRemoteControllerMessage(msg: string | null) {
    const remote = remoteControllerFrame.contentDocument?.getElementById("active");
    if (remote != null) {
        remote.textContent = msg;
    }
    currentRemoteControllerMessage = msg;
}

function createRemoteController(): HTMLIFrameElement {
    const controller = document.createElement("iframe");
    controller.src = "/remote_controller.html";
    controller.style.width = "280px";
    controller.style.height = "540px";
    controller.style.left = "1000px";
    controller.style.position = "absolute";
    controller.style.zIndex = "1000";
    return controller;
}

window.addEventListener("message", (ev) => {
    const remoteController = ev.data?.remoteController as (RemoteControllerMessage | undefined);
    if (remoteController != null) {
        if (remoteController.type === "unmute") {
            if (videoElement != null) {
                videoElement.muted = false;
            }
        } else if (remoteController.type === "mute") {
            if (videoElement != null) {
                videoElement.muted = true;
            }
        } else if (remoteController.type === "pause") {
            if (videoElement != null) {
                videoElement.pause();
            }
        } else if (remoteController.type === "play") {
            if (videoElement != null) {
                videoElement.play();
            }
        } else if (remoteController.type === "button") {
            processKeyDown(remoteController.keyCode as AribKeyCode);
            processKeyUp(remoteController.keyCode as AribKeyCode);
        } else if (remoteController.type === "keydown") {
            const k = keyCodeToAribKey(remoteController.key);
            if (k != -1) {
                processKeyDown(k);
            }
        } else if (remoteController.type === "keyup") {
            const k = keyCodeToAribKey(remoteController.key);
            if (k != -1) {
                processKeyUp(k);
            }
        } else if (remoteController.type === "load") {
            setRemoteControllerMessage(currentRemoteControllerMessage);
        }
    }
});

const remoteControllerFrame = createRemoteController();
document.documentElement.append(remoteControllerFrame);
