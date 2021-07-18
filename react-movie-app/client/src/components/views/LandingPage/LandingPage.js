
import React,{useEffect, useState} from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import GridCards from '../../commons/GridCards'
import { Typography,Card,  Col, Row  } from 'antd';
import { Dropdown } from 'react-bootstrap'


const { Title } = Typography;



function LandingPage() {

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
        <div style={{ width: '100%', marginBottom: '0px',  backgroundColor: "#282828"}}>

            {Movies[0] &&

                    <MainImage
                    image={`${IMAGE_URL}w1280${Movies[0].backdrop_path}`}
                    title = {Movies[0].original_title}
                    text={Movies[0].overview}
                    /> 
            }
            

            <div style={{ width: '85%', margin: '1rem auto' }}>

                <Title level={3}  style = {{color: "white", display:"inline"}}> Popular movies </Title>
                <div style={{borderColor:"white", backgroundColor:"#282828", display:"inline", float:"right"}}>
                <Dropdown>
                <Dropdown.Toggle style={{background:"#0C0032", color:"white"}}  variant="success" id="dropdown-basic">
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
                
                {Movies && Movies.map((movie, index) => (
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
                <div style={{ display: 'flex', justifyContent: 'center' , marginBottom:"0px", paddingBottom:"20px", backgroundColor:"#282828"}}>
                    <button style={{backgroundColor:"#0C0032", color:"white"}} onClick={handleClick} >Load More</button>
                </div>
            </div>

        </div>
        
    )
}

export default LandingPage
