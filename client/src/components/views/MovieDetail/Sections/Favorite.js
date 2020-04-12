import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert('favorite数の取得を失敗しました。')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
        .then(response => {
            if(response.data.success) {
                setFavorited(response.data.favorite);
            } else {
                alert('情報取得を失敗しました。')
            }
        })
    }, [])

    const onClickFavorite = () => {

        if(Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);
                    } else {
                        alert('Favorite Listから削除を失敗しました。')
                    }
                })
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if(response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited);
                    } else {
                        alert('Favorite Listから追加を失敗しました。')
                    }
                })
        }
    }

    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? " Not Favorite" : "Add to Favorite "} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
