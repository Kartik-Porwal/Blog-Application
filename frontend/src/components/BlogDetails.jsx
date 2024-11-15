import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField, InputLabel, Button } from '@mui/material';

export default function BlogDetails() {
  const [blog, setBlog] = useState();
  const [file, setFile] = useState('');
  const id = useParams().id;
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });

  const labelStyles = { mb: 1, mt: 2, fontWeight: 'bold', fontSize: '24px' };

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blog/${id}`);
      const data = res.data;
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
      console.log(data.blog);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFile(e.target.files[0]);
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: [value],
      }));
    }
  };

  const sendRequest = async () => {
    const formData = new FormData();
    formData.append('title', inputs.title);
    formData.append('description', inputs.description);
    if (file) {
      formData.append('image', file);
    }
    formData.append('user', localStorage.getItem('userId'));

    try {
      const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(sendRequest().then((data) => {
      console.log(data);
      navigate('/myBlogs/');
    }),1000);
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(6,5,57,1) 0%, rgba(0,129,255,1) 49%, rgba(6,35,41,1) 99%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            display={'flex'}
            flexDirection="column"
            width="80%"
            margin={'auto'}
            marginTop={10}
          >
            <Typography
              fontWeight="bold"
              padding={3}
              color="grey"
              variant="h2"
              textAlign="center"
            >
              Edit Your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              margin="normal"
              variant="outlined"
              name="title"
              required
              value={inputs.title}
              onChange={handleChange}
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              margin="normal"
              variant="outlined"
              name="description"
              required
              multiline
              minRows={4}
              value={inputs.description}
              onChange={handleChange}
            />
            <InputLabel sx={labelStyles}>Upload New Image</InputLabel>
            <TextField
              onChange={handleChange}
              variant="outlined"
              color="primary"
              type="file"
              fullWidth
              sx={{ mt: 3 }}
            />
            <Button
              type="submit"
              sx={{
                mt: 7,
                mr: 'auto',
                ml: 'auto',
                mb: 5,
                p: 2,
                borderRadius: 4,
                background: '#0079f3',
                width: '300px',
                fontSize: '17px',
                fontWeight: 'bold',
              }}
              variant="contained"
            >
              Update
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
}
