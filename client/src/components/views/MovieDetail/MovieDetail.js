import React from 'react'

function MovieDetail(props) {

    let movieId = props.match.params.movieId;

    useEffect(() => {

        console.log(props.match);

        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default MovieDetail
