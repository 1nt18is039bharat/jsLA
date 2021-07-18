import React from 'react'
import { Descriptions, Badge } from 'antd';
import {Table} from 'react-bootstrap';
import '../../../../index.css'

function MovieInfo(props) {

    const { movie } = props;
    
    return (
        <Descriptions  bordered column={1}>
        <Descriptions.Item class="labeldec" label="Title">{movie.original_title}</Descriptions.Item>
        <Descriptions.Item class="labeldec"label="Release Date">{movie.release_date}</Descriptions.Item>
        <Descriptions.Item class="labeldec"label="Runtime">{movie.runtime}</Descriptions.Item>
        <Descriptions.Item class="labeldec"label="IMDb rating" span={2}>
        {movie.vote_average}
        </Descriptions.Item>
        <Descriptions.Item label="Number of Votes">{movie.vote_count}</Descriptions.Item>
        <Descriptions.Item label="Status">{movie.status}</Descriptions.Item>
      </Descriptions>

    )
}

export default MovieInfo