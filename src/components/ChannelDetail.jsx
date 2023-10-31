import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import {Videos, ChannelCard } from '../components';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {

  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part="snippet&id=${id}`)
    .then((data) => setChannelDetail(data?.items[0]) )

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data) => setVideos(data?.items) )
  }, [id]);

  return (
   <Box minHeight="95vh">
    <Box>
      <div style={{
        background: 'linear-gradient(270deg, rgba(24,181,210,1) 0%, rgba(0,82,255,1) 9%, rgba(80,37,136,1) 100%)',
        zIndex: 10,
        height: '300px'
      }}>
        <ChannelCard channelDetail={channelDetail} />
        </div> 
    </Box>
    <Box p={2} display="flex">
      <Box sx={{ mr: { sm: '100px' } }}/>
        <Videos videos={videos} />
      </Box>
   </Box>
  )
}

export default ChannelDetail