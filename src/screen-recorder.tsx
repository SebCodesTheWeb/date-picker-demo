import React, { useState, useRef } from 'react';

export const ScreenRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<BlobPart[]>([]);

  // Utility function to combine audio and screen streams
  const combineAudioAndScreenStreams = (screenStream: MediaStream, audioStream: MediaStream) => {
    const tracks = [
      ...screenStream.getVideoTracks(), // get video track from the screen stream
      ...audioStream.getAudioTracks(), // get audio track from the audio (microphone) stream
    ];

    return new MediaStream(tracks); // combine them into one stream
  };

  const startRecording = async () => {
    try {
      const screenStreamPromise = navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' } as MediaTrackConstraints,
      });
      const audioStreamPromise = navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const [screenStream, audioStream] = await Promise.all([
        screenStreamPromise,
        audioStreamPromise,
      ]);

      const combinedStream = combineAudioAndScreenStreams(screenStream, audioStream);
      
      mediaRecorder.current = new MediaRecorder(combinedStream, { mimeType: 'video/webm; codecs=vp8,opus' });

      mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = handleStop;
      mediaRecorder.current.start();
      setRecording(true);
      
    } catch (err) {
      console.error('Error: ' + String(err));
    }
  };

  const handleStop = () => {
    const blob = new Blob(recordedChunks.current, { type: 'video/webm; codecs=vp8,opus' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recording.webm'; // Here the file will download as .webm
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    recordedChunks.current = [];
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  return (
    <div>
      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop and Download Recording</button>
      )}
    </div>
  );
};