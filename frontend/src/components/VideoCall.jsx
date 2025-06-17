import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function VideoCall() {
  const { mentorId } = useParams();

  useEffect(() => {
    const domain = 'meet.jit.si';
    const options = {
      roomName: `Mentorship_${mentorId}_${Date.now()}`,
      width: '100%',
      height: 500,
      parentNode: document.querySelector('#jitsi-container')
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);
    return () => api.dispose();
  }, [mentorId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Video Call</h2>
      <div id="jitsi-container" className="w-full h-96"></div>
    </div>
  );
}

export default VideoCall;