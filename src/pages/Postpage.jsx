import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router'
import Header from '../Header';
import { formatISO9075 } from 'date-fns';
import Loaderpage from './Loaderpage';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { UserContext } from '../Usercontext';
import { Link } from 'react-router-dom';

function Postpage() {
    const { id } = useParams();
    const [postinfo, setPostinfo] = useState(null);
    const { userinfo } = useContext(UserContext)
    useEffect(() => {
        fetch(`https://lalithblogweb.onrender.com/post/${id}`).then(
            response => {
                response.json().then(postInfo => {
                    setPostinfo(postInfo);
                })
            }
        )
    }, [])
    console.log(postinfo, "post info ");
    if (!postinfo) {

        return (
            <>
                <Loaderpage />
            </>
        )

    }

    else {
        return (
            <>

                <Header />


                <div className='post_page'>

                    <div className='image'>
                        <img src={`https://lalithblogweb.onrender.com/${postinfo.cover}`} alt='cover image' />

                    </div>
                    <h1>{postinfo.title}</h1>
                    {userinfo.id === postinfo.author._id &&
                        (

                            <span className='edit'>
                                <Link style={{ textDecoration: "none", color: "white" }} to={`/edit/${postinfo._id}`}>
                                    <span className='edit-icon'>
                                        <EditTwoToneIcon />Edit post  </span>

                                </Link>
                            </span>

                        )}




                    <center>
                        <time>{formatISO9075(new Date(postinfo.createdAt))}</time>
                        <span style={{marginLeft:"6px",textTransform:"uppercase",color:"red"}}>by {postinfo.author.username}</span>
                    </center>
                    <span>{postinfo.summary}</span>


                    <div className='content' dangerouslySetInnerHTML={{ __html: postinfo.content }} />

                </div>





            </>


        )
    }
}
export default Postpage;
