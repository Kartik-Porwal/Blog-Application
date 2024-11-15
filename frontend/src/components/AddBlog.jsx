import { Box, Typography, TextField, InputLabel, Button } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddBlog() {
  const labelStyles = { mb: 1, mt: 2, fontWeight: 'bold', fontSize: '20px' };
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFile(e.target.files[0]);
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const sendRequest = async () => {
    const formData = new FormData();
    formData.append('title', inputs.title);
    formData.append('description', inputs.description);
    formData.append('image', file);
    formData.append('user', localStorage.getItem('userId'));

    try {
      const res = await axios.post('http://localhost:5000/api/blog/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then((data) => {
      console.log(data);
      navigate('/myBlogs/');
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderColor="linear-gradient(90deg, rgba(6,5,57,1) 0%, rgba(0,129,255,1) 49%, rgba(6,35,41,1) 99%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          px={8}
          py={3}
          display={'flex'}
          flexDirection="column"
          width="40%"
          margin={'auto'}
          marginTop={2}
        >
          <Typography
            fontWeight="bold"
            padding={1}
            color="grey"
            variant="h3"
            textAlign="center"
          >
            Post Your Blog
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField
            margin="normal"
            variant="outlined"
            required
            name="title"
            value={inputs.title}
            onChange={handleChange}
          />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField
            margin="normal"
            variant="outlined"
            name="description"
            required
            value={inputs.description}
            onChange={handleChange}
            multiline
            fullWidth
            minRows={4}
          />
          <InputLabel sx={labelStyles}>Upload Image</InputLabel>
          <TextField
            onChange={handleChange}
            variant="outlined"
            required
            color="primary"
            type="file"
            fullWidth
            sx={{ mt: 3 }}
          />
          <Button
            type="submit"
            sx={{
              mt: 5,
              mr: 'auto',
              ml: 'auto',
              mb: 4,
              p: 1,
              borderRadius: 4,
              background: '#0079f3',
              width: '250px',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
            variant="contained"
          >
            Post
          </Button>
        </Box>
      </form>
    </div>
  );
}
