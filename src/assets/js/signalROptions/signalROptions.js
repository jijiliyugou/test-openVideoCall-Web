import AgoraRTM from "agora-rtc-sdk-ng";
import { Message } from "element-ui";
class RMT {
  constructor({ groupNumber, token, uid }) {
    this.addId = "5de91f02f12c41c2b276c9accb4679c7";
    this.uid = uid || null;
    this.groupNumber = groupNumber;
    this.token = token || null;
    this.AgoraRTM = AgoraRTM;
    this.client = null; // 视频通话实例对象
    this.localAudioTrack = null; // 用来放置本地音频轨道对象
    this.localVideoTrack = null; // 用来放置本地视频频轨道对象
  }
  // 创建音视频实例
  async startBasicCall() {
    // 创建本地客户端
    this.client = this.AgoraRTM.createClient({
      mode: "rtc",
      codec: "vp8"
    });
    // 加入频道
    const uid = await this.client.join(
      this.addId,
      this.groupNumber,
      this.token,
      this.uid
    );
    console.log("我当前的ID为：", uid);
    // 创建并发布本地音视频轨道
    // 通过麦克风采集的音频创建本地音频轨道对象。
    try {
      this.localAudioTrack = await this.AgoraRTM.createMicrophoneAudioTrack();
    } catch (error) {
      let errMsg;
      switch (error.code) {
        case "NOT_SUPPORTED":
          errMsg = "当前浏览器上不支持麦克风的音频采集";
          break;
        case "MEDIA_OPTION_INVALID":
          errMsg = "设备不支持指定的分辨率或帧率";
          break;
        case "DEVICE_NOT_FOUND":
          errMsg = "找不到设备";
          break;
        case "PERMISSION_DENIED":
          errMsg = "用户拒绝授予访问摄像头/麦克风的权限";
          break;
        case "CONSTRAINT_NOT_SATISFIED":
          errMsg = "浏览器不支持指定的采集选项";
          break;
        case "SHARE_AUDIO_NOT_ALLOWED":
          errMsg = "屏幕共享分享音频时用户没有勾选分享音频";
          break;
      }
      Message.closeAll();
      Message.error(errMsg);
      // 暂时关闭摄像头采集
      await this.client.setEnabled(false);
    }
    // 通过摄像头采集的视频创建本地视频轨道对象。
    try {
      this.localVideoTrack = await this.AgoraRTM.createCameraVideoTrack();
    } catch (error) {
      let errMsg;
      switch (error.code) {
        case "NOT_SUPPORTED":
          errMsg = "当前浏览器上不支持摄像头的视频采集";
          break;
        case "MEDIA_OPTION_INVALID":
          errMsg = "设备不支持指定的分辨率或帧率";
          break;
        case "DEVICE_NOT_FOUND":
          errMsg = "找不到设备";
          break;
        case "PERMISSION_DENIED":
          errMsg = "用户拒绝授予访问摄像头/麦克风的权限";
          break;
        case "CONSTRAINT_NOT_SATISFIED":
          errMsg = "浏览器不支持指定的采集选项";
          break;
        case "SHARE_AUDIO_NOT_ALLOWED":
          errMsg = "屏幕共享分享音频时用户没有勾选分享音频";
          break;
      }
      Message.closeAll();
      Message.error(errMsg);
      // 暂时关闭摄像头采集
      await this.client.setEnabled(false);
    }
    console.log(this.client.localAudioTrack, this.client.localVideoTrack);
    // 将这些音视频轨道对象发布到频道中。
    await this.client.publish([
      this.client.localAudioTrack,
      this.client.localVideoTrack
    ]);
  }

  /**
   * 将客户端事件的回调添加到控制流
   * @param {*} client
   * @param {*} streamList
   */
  subscribeStreamEvents() {
    this.client.on("stream-added", function(evt) {
      let stream = evt.stream;
      let id = stream.getId();
      console.log(stream, id, evt);
    });

    // 当同伴离开时
    this.client.on("peer-leave", function(evt) {
      let id = evt.uid;
      console.log(id, evt);
    });

    // 订阅流时
    this.client.on("stream-subscribed", function(evt) {
      let stream = evt.stream;
      console.log(stream, evt);
    });

    // 删除流时
    this.client.on("stream-removed", function(evt) {
      let stream = evt.stream;
      let id = stream.getId();
      console.log(id, evt);
    });

    // 开始订阅远端用户。
    this.client.on("user-published", async (user, mediaType) => {
      await this.client.subscribe(user, mediaType);
      console.log("subscribe success");
      // 表示本次订阅的是视频。
      if (mediaType === "video") {
        // 订阅完成后，从 `user` 中获取远端视频轨道对象。
        const remoteVideoTrack = user.videoTrack;
        // 动态插入一个 DIV 节点作为播放远端视频轨道的容器。
        const playerContainer = document.createElement("div");
        // 给这个 DIV 节点指定一个 ID，这里指定的是远端用户的 UID。
        playerContainer.id = user.uid.toString();
        playerContainer.style.width = "640px";
        playerContainer.style.height = "480px";
        playerContainer.style.position = "fixed";
        playerContainer.style.left = "50%";
        playerContainer.style.top = "50%";
        playerContainer.style.transform = "translate(-50%, -50%)";
        console.log(playerContainer);
        document.getElementById("homeBox").append(playerContainer);
        // document.body.append(playerContainer);
        // 订阅完成，播放远端音视频。
        // 传入 DIV 节点，让 SDK 在这个节点下创建相应的播放器播放远端视频。
        remoteVideoTrack.play(playerContainer);
        // 也可以只传入该 DIV 节点的 ID。
        // remoteVideoTrack.play(playerContainer.id);
      }
      // 表示本次订阅的是音频。
      if (mediaType === "audio") {
        // 订阅完成后，从 `user` 中获取远端音频轨道对象。
        const remoteAudioTrack = user.audioTrack;
        // 播放音频因为不会有画面，不需要提供 DOM 元素的信息。
        remoteAudioTrack.play();
      }
    });
    this.client.on("user-unpublished", (user, mediaType) => {
      if (mediaType === "video") {
        // 获取刚刚动态创建的 DIV 节点。
        const playerContainer = document.getElementById(user.uid.toString());
        // 销毁这个节点。
        playerContainer.remove();
      }
    });
  }

  // 离开频道
  async leaveCall() {
    // 销毁本地音视频轨道。
    this.localAudioTrack.close();
    this.localVideoTrack.close();
    // 遍历远端用户。
    this.client.remoteUsers.forEach(user => {
      // 销毁动态创建的 DIV 节点。
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer.remove();
    });
    // 离开频道。
    await this.client.leave();
  }
}
export default RMT;
