import React, {useState, useEffect} from 'react';
import postService from '../services/postService.js';
import Container from '../components/Container/Container.jsx';
import PostCard from '../components/Postcard.jsx';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postService.getPosts()
            .then((posts) => {
                console.log(posts);
                setPosts(posts);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No Posts Uploaded Yet. Check Later.
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )        
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;



