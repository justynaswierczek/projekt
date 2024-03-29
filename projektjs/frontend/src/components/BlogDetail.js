import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, InputLabel,TextField, Button } from '@mui/material';
const labelStyles = {mb:1,mt:2,fontSize: '24px', fontWeight:'bold'}

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({
    title:"",
    description:"",
    imageURL:"",
});
const handleChange = (e) => {
  setInputs((prevState)=>({
    ...prevState,
    [e.target.name] : e.target.value
}));
};
  const fetchDetails = async()=> {
    const res = await axios
    .get(`http://localhost:5000/api/blog/${id}`)
    .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(() => { 
    fetchDetails().then((data)=>{
      setBlog(data.blog)
      setInputs({title:data.blog.title, 
                description: data.blog.description,
                });
    });
  },[id]);
  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`, {
      title: inputs.title,
      description: inputs.description
    }).catch((err) =>  console.log(err));

    const data = await res.data;
    return data;
  }
  console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault()
  console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() =>navigate("/myBlogs/"));
  };

  return <div>  
     {inputs &&
      <form onSubmit={handleSubmit}>
  <Box 
    border={3}
    borderColor="linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(161,98,238,1) 43%, rgba(163,107,240,1) 50%, rgba(178,171,255,1) 100%, rgba(136,104,255,1) 100%)"
    borderRadius={10}
    boxShadow="10px 10px 20px #ccc"
    padding={3}
    margin={'auto'} 
    marginTop={3}
    display='flex' 
    flexDirection={'column'} 
    width={"80%"}>

    <Typography fontWeight={'bold'} padding={3} color='grey' variant="h2" textAlign={'center'}>Post your blog</Typography>
    <InputLabel sx={labelStyles}>Title</InputLabel>
    <TextField name="title" onChange={handleChange} value={inputs.title} margin='auto' variant="outlined"/>
    <InputLabel sx={labelStyles}>Description</InputLabel>
    <TextField name="description" onChange={handleChange} value={inputs.description} margin='auto' variant="outlined" />
    <InputLabel sx={labelStyles}>ImageURL</InputLabel>
    <Button sx={{mt:2, borderRadius:4}} variant="contained" color="warning" type="submit">Submit</Button>
  </Box>
</form>
}</div>;
};

export default BlogDetail;