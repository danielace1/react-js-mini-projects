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
    let zp;

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

    zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: document.querySelector("#zego-container"),
      sharedLinks: [
        {
          url: `${window.location.origin}${window.location.pathname}?roomID=${roomIDFromParams}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      turnOnCameraWhenJoining: false,
    });

    return () => {
      if (zp) {
        try {
          zp.destroy();
        } catch (err) {
          console.warn("Zego destroy warning:", err);
        }
      }
    };
  }, []);

  return <div id="zego-container"></div>;
};

export default VideoChat;
