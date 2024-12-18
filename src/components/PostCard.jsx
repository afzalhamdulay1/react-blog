import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4 postcard flex flex-col h-full'>
            <div className='w-full justify-center mb-4 flex-1 flex items-center'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl h-full object-cover' />

            </div>
            <h2
            className='text-xl font-bold text-center'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard