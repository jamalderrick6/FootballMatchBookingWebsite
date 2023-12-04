import React from 'react';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

function Post({ post }) {
    const cleanTags = post ? JSON.parse(post.tags) : []
    return (
        <Card style={{ width: '18rem', marginBottom: '1rem' }}>
            <Card.Img variant="top" src={post.image} />
            <Card.Body>
                <Card.Title>{post.name}</Card.Title>
                <Card.Text>
                    {cleanTags.map((tag, index) => (
                        <a href={tag.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="secondary" size="sm" key={index} style={{ margin: '2px' }}>
                                {tag.name}
                            </Button>
                        </a>
                    ))}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>
                    <a href={post.url} target="_blank" rel="noopener noreferrer">Read more</a>
                </ListGroupItem>
            </ListGroup>
        </Card>
    );
}

export default Post;