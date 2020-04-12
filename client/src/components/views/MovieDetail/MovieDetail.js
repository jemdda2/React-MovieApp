import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
import MainImage from '../LandingPage/Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
 
function MovieDetail(props) {

    let movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {

        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailInfo(endpointForMovieInfo)

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
                // setLoadingForMovie(false)

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        console.log(result)
                        setCasts(result.cast)
                    })

                // setLoadingForCasts(false)
            })
            .catch(error => console.error('Error:', error)
            )
    }

    return (
        <div>
            { /* Header */ }

            <MainImage 
                image={`${IMAGE_URL}w1280${Movie.backdrop_path}`} 
                title={Movie.original_title}
                text={Movie.overview}
            />

            { /* Body */ }
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                </div>

                {/* Movie Info */}

                <MovieInfo
                    movie={Movie}
                />

                <br />
                {/* Actors Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}> Toggle Actor View </button>
                </div>

                {ActorToggle &&
                    <Row gutter={[ 16, 16 ]}>
                        {Casts && Casts.map((cast, index) => (
                                <React.Fragment key={index}>
                                    <GridCards
                                        image={cast.profile_path ?
                                            `${IMAGE_URL}w500${cast.profile_path}` : null}
                                        characterName={cast.name}
                                    />
                                </React.Fragment>
                            ))}
                    </Row>
                }


            </div>
        </div>
    )
}

export default MovieDetail
