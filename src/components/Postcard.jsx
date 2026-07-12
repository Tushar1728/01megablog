import React from 'react';
import storageService from '../services/storageService.js';
import {Link} from 'react-router-dom';

function PostCard({title, img_url, slug}) {

const imageUrl = storageService.getFileUrl(img_url);

console.log(imageUrl);

    return (
        <Link to={`/post/${slug}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full flex justify-center mb-4'>
                    <img
                        src={storageService.getFileUrl(img_url)}
                        alt={title}
                        className="
                            w-full
                            h-56
                            object-cover
                            rounded-lg
                        "
                        loading="lazy"
                    />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard;