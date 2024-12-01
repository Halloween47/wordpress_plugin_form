import React from 'react'
import { useSousCat } from './SousCatContext.jsx';

function VideoCustomParam() {
    const { selectedSousCatId } = useSousCat();
  return (
    <div>{selectedSousCatId}</div>
  )
}

export default VideoCustomParam