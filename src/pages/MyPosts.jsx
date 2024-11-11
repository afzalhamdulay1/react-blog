import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
import { Query } from 'appwrite';

function MyPosts() {
    const [userPosts, setUserPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);
    
    // useEffect(() => {
    //     appwriteService.getPosts([]).then((posts) => {
    //         if (posts) {
    //             // Filter posts to only include those created by the logged-in user
    //             const userSpecificPosts = posts.documents.filter(
    //                 (post) => post.userId === userData.$id
    //             );
    //             setUserPosts(userSpecificPosts);
    //         }
    //         console.log(userPosts);
            
    //     });
    // }, [userData]);


    // OR
    useEffect(() => {
        if (userData && userData.$id) {
            // Fetch only posts created by the logged-in user
            appwriteService.getPosts([
                Query.equal("userId", userData.$id)
            ]).then((posts) => {
                if (posts) {
                    setUserPosts(posts.documents);
                }
            }).catch((error) => {
                console.error("Error fetching posts:", error);
            });
        }
    }, [userData]);

    
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {userPosts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default MyPosts