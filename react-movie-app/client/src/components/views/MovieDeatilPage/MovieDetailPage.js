import React, {useEffect, useState} from 'react'
import {API_URL, API_KEY, IMAGE_URL} from "../../Config"
import { List, Avatar, Row, Col, Button } from 'antd';
import axios from 'axios';
import GridCards from '../../commons/GridCards';
import MainImage from '../../views/LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes';
import '../../../index.css'

function MovieDetailPage(props) {
    const movieId = props.match.params.movieId
    console.log(props.match.params)
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)
    const [ActorToggle, setActorToggle] = useState(false)
    const [CommentLists, setCommentLists] = useState([])

    const movieVariable = {
        movieId: movieId
    }
    useEffect(() => {

        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailInfo(endpointForMovieInfo)

        axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log('response.data.comments', response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })
        

    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    const fetchDetailInfo = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setMovie(result)
                setLoadingForMovie(false)

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        console.log(result)
                        setCasts(result.cast)
                    })

                setLoadingForCasts(false)
            })
            .catch(error => console.error('Error:', error)
            )
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    return (
        <div>
        {/* Header */}
        {!LoadingForMovie ?
            <MainImage
                image={`${IMAGE_URL}w500${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />
            :
            <div>loading...</div>
        }


        {/* Body */}
        <div style={{ width: '85%', margin: '1rem auto' }}>

        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                   <h1 style={{color:"white"}}>Movie Info</h1>
                </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>
            


            {/* Movie Info */}
            {!LoadingForMovie ?
                <MovieInfo movie={Movie} />
                :
                <div>loading...</div>
            }

            <br />
            {/* Actors Grid*/}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button  style={{background:"#0C0032", color:"white"}} onClick={toggleActorView}>Cast </Button>
                </div>
            

            {ActorToggle &&
                <Row gutter={[16, 16]}>
                    {
                        !LoadingForCasts ? Casts.map((cast, index) => (
                            cast.profile_path &&
                            <GridCards actor image={cast.profile_path} characterName={cast.characterName} />
                        )) :
                            <div>loading...</div>
                    }
                </Row>
            }
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} />
                </div>

                {/* Comments */}
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />

        </div>

    </div>
    )
}

export default MovieDetailPage
