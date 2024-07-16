import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-ful justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl w-full aspect-[16/9] object-cover object-center' />

            </div>
            <h2
            className='text-3xl font-bold text-indigo-950'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard