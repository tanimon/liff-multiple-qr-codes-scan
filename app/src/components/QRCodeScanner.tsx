import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';

const videoWidth: number = 500;
const videoHeight: number = 500;
const videoFrameRate: number = 5;

const constraints: MediaStreamConstraints = {
  audio: false,
  video: {
    width: videoWidth,
    height: videoHeight,
    frameRate: {
      max: videoFrameRate,
    },
    facingMode: {
      exact: 'environment',
    },
  },
};

const QRCodeScanner: React.VFC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrCodeData, setQrCodeData] = useState<string[]>([]);

  const decodeQRCode = () => {
    const context = canvasRef?.current?.getContext('2d');
    const video = videoRef?.current;

    if (!context || !video) {
      return;
    }

    context.drawImage(video, 0, 0, videoWidth, videoHeight);
    const imageData = context.getImageData(0, 0, videoWidth, videoHeight);
    const code = jsQR(imageData.data, videoWidth, videoHeight);

    if (!code || qrCodeData.includes(code.data)) {
      return;
    }

    setQrCodeData([...qrCodeData, code.data]);
  };

  useEffect(() => {
    const openCamera = async () => {
      const video = videoRef.current;
      if (video) {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
      }
    };
    openCamera();

    const intervalId = window.setInterval(() => {
      decodeQRCode();
    }, 1_000 / videoFrameRate);
    intervalRef.current = intervalId;
  });

  const handleStop = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>QR Code Scanner</p>
      <div style={{ display: 'grid' }}>
        <div>
          <video
            autoPlay
            playsInline={true}
            ref={videoRef}
            style={{ width: '100%' }}
          >
            <canvas width={videoWidth} height={videoHeight} ref={canvasRef} />
          </video>
        </div>
        <div>
          <p>{qrCodeData.join('\n')}</p>
        </div>
        <div>
          <button onClick={handleStop}>Stop Scan</button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScanner;
