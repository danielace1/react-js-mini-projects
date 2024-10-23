import { useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoChat = () => {
  const [roomID, setRoomID] = useState("");
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");

  function getUrlParams(url = window.location.href) {
    const urlStr = url.split("?")[1];
    return new URLSearchParams(urlStr);
  }

  useEffect(() => {
    const params = getUrlParams();
    const roomIDFromParams =
      params.get("roomID") || "room_" + Math.floor(Math.random() * 1000);

    const generatedUserID = Math.floor(Math.random() * 10000).toString();
    const generatedUserName = `userName_${generatedUserID}`;

    setRoomID(roomIDFromParams);
    setUserID(generatedUserID);
    setUserName(generatedUserName);

    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_ID;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomIDFromParams,
      generatedUserID,
      generatedUserName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom(
      {
        container: document.querySelector("#zego-container"),
        sharedLinks: [
          {
            url: `${window.location.origin}${window.location.pathname}?roomID=${roomIDFromParams}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCallGroupCall,
        },

        turnOnCameraWhenJoining: false,
        deviceSettings: true,
        userListEnabled: true,
        notification: {
          userOnlineOfflineTips: true,
          unreadMessageTips: true,
        },
      },
      (error) => {
        if (error) {
          console.error("Failed to join room:", error);
        } else {
          console.log("Successfully joined the room");
        }
      }
    );
  }, []);

  return <div id="zego-container"></div>;
};

export default VideoChat;
