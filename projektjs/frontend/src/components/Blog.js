import {Avatar, Box,Card, CardContent,CardHeader, CardMedia, IconButton, Typography} from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Blog = ({title,description,imageURL,userName, isUser,id}) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async() => {
    const res = await axios.delete(`http://localhost:5000/api/blog/${id}`).catch((err) =>console.log(err));
    const data = await res.data;
    return data;
  }
  const handleDelete = () => {
    deleteRequest()
      .then((data) => navigate("/"))
      .then(()=> navigate("/blogs"));
  }
  return (
    <div>    <Card sx={{ width: "40%", margin: 'auto', mt: 2, padding: 2, boxShadow: "5px 5px 10px #ccc", ":hover:":{
        boxShadow: "10px 10px 20px #ccc",
    },
     }}>
      {isUser && (
        <Box display='flex'>
          <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}><EditIcon/></IconButton>
          <IconButton onClick={handleDelete} ><DeleteForeverIcon/></IconButton>
        </Box>
      )}
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
          {userName}
        </Avatar>
      }
      
      title={title}
    />
    <CardMedia
      component="img"
      height="194"
      image={imageURL}
      alt="Paella dish"
    />
    <hr />
    <br />

    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>

  </Card></div>
  )
}

export default Blog;