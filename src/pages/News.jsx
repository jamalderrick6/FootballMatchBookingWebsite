import { useEffect, useState } from "react";
import Post from "../components/Post";
import API from '../api/api.js';
import { CircularProgress } from "@mui/material";
import { Container, Row, Col } from 'react-bootstrap';

const News = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async() => {
            const { data: res } = await API.get('/posts');
            setPosts(res)
            setLoading(false)
        }

        fetchPosts()
    }, [])

    if(loading){
        return <CircularProgress/>
    }


	return (
        <Container className="mt-3 pb-4">
        <Row>
          {posts.map(post => (
            <Col sm={12} md={6} lg={4} xl={3} key={post.id}>
              <Post post={post} />
            </Col>
          ))}
        </Row>
      </Container>
	);
};

export default News;