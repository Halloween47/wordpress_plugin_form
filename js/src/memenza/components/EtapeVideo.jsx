import React from 'react'
import DownloadButton from './DownloadButton.jsx';
import MemenzaChoixVideo from './MemenzaChoixVideo.jsx';

const StyleEtapeVideo = `
.etape-video {
  background-color: black;
  width: 100%;
  height: 200px;
}
.etape-video-intro {
  background-color: yellow;
  width: 100%;
  height: auto;
  display: flex;
  }
.etape-video-intro-img {
  background-color: blue;
  width: 40%;
  }
.etape-video-intro-txt {
  background-color: violet;
  width: 60%;
  }
.etape-video-template {
  background-color: yellow;
  width: 100%;
  height: 200px;
}
  .etape-video-upload-video {
  background-color: yellow;
  width: 100%;
  height: 200px;
  }
  .etape-video-personnalisation-video {
  background-color: orange;
  width: 100%;
  height: 200px;
  }
  .etape-video-boutons {
  background-color: green;
  width: 100%;
  height: 200px;
  }
`;


function EtapeVideo() {
  return (
    <div className="etape-video">
      <div className="etape-video-intro">
        <div>Intro</div>
        <div className="etape-video-intro-img">test IMG</div>
        <div className="etape-video-intro-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam autem voluptate quia neque, tempore placeat veritatis omnis, incidunt ab, corrupti maxime perspiciatis sint eius debitis dolores dignissimos officiis ut dolorem.</div>
      </div>
      <div className="etape-video-template">
        <div className="etape-video-template-liste-choix">
          <MemenzaChoixVideo />
        </div>
      </div>
      <div className="etape-video-upload-video">
        <DownloadButton />
      </div>
      <div className="etape-video-personnalisation-video"></div>
      <div className="etape-video-boutons"></div>
      <style>{StyleEtapeVideo}</style>
    </div>
  )
}

export default EtapeVideo