import React, { useState, useEffect } from 'react'
import Container from '../components/container/Container.jsx'
import postService from '../services/postService.js'
import PostCard from '../components/PostCard.jsx'

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        postService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts)
            }
        })
    }, [])

    return (
        <div className='py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts;