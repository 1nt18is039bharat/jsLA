import React,{useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import GridCards from '../../commons/GridCards'
import { Typography,Card,  Col, Row  } from 'antd';
import { Dropdown } from 'react-bootstrap'

const { Title } = Typography;



function GenrePage(props) {
    const genreId = props.match.params.genreId
    console.log(typeof(genreId))
    var genres = {
        28 : "Action",
        12 : "Adventure",
        80 : "Crime",
        10749 : "Romance",
        27 : "Horror"

    }
    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0)
    const [Loading, setLoading] = useState(false)
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)
    }, [])
    

    const fetchMovies = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                setMovies([...Movies, ...result.results])
                setCurrentPage(result.page)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }

    const handleClick = () => {
        let endpoint = '';
        setLoading(true)
        console.log('CurrentPage', CurrentPage)
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);

    }
    return (
            <div style={{ width: '85%', margin: '1rem auto' ,backgroundColor:"#282828"}}>

                <Title level={3}  style = {{color: "white", display:"inline"}}> {`${genres[Number(genreId)]} Movies`} </Title>
                <div style={{borderColor:"white", backgroundColor:"black", display:"inline", float:"right", marginTop:"5px"}}>
                <Dropdown style={{backgroundColor:"#0C0032", color:"white"}}>
                <Dropdown.Toggle style={{backgroundColor:"#0C0032", color:"white"}} variant="success" id="dropdown-basic">
                    Select genres
                </Dropdown.Toggle>

                <Dropdown.Menu style={{zIndex:"5"}}>
                <Dropdown.Item href="/genre/28" style={{background:"#0C0032", color:"white", display:"block", border:"2px solid black"}}>Action</Dropdown.Item>
                    <Dropdown.Item href="/genre/12"  style={{background:"#0C0032", color:"white", display:"block", border:"2px solid black"}}>Adventure</Dropdown.Item>
                    <Dropdown.Item href="/genre/27"  style={{background:"#0C0032", color:"white", display:"block", border:"2px solid black"}}>Horror</Dropdown.Item>
                    <Dropdown.Item href="/genre/10749"  style={{background:"#0C0032", color:"white", display:"block", border:"2px solid black"}}>Romance</Dropdown.Item>
                    <Dropdown.Item href="/genre/80"  style={{background:"#0C0032", color:"white", display:"block", border:"2px solid black"}}>Crime</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                </div>
                <hr/>
                <Row gutter={[16, 16]} style = {{marginTop:"50px"}}>
                
                {Movies && Movies.filter(movie => movie.genre_ids.includes(Number(genreId))).map((movie, index) => (
                        <React.Fragment key={index}>
                            {movie.genre_ids && console.log(movie.genre_ids)}
                            <GridCards
                                image={movie.poster_path ?
                                    `${IMAGE_URL}w500${movie.poster_path}`
                                    : null}
                                movieId={movie.id}
                                movieName={movie.genres}
                            />
                        </React.Fragment>
                    ))}
                </Row>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button style={{backgroundColor:"#0C0032", color:"white"}} onClick={handleClick}>Load More</button>
                </div>
            </div>
        
    )
}

export default GenrePage
