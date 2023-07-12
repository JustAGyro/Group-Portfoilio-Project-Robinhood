import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {getGeneralNews} from "../../store/news"
import "./News.css"

export default function NewsStory(props) {
    const history = useHistory();
    const {story} = props
    // console.log("story", story)
    return (
        <div className="news-story" onClick={() => window.location.href = story.url}>
            <div className="news-title">
                {story?.title}
            </div>
            <div className="news-image">
                <img src={story?.image} className="news-image"/>
            </div>
            <div className="news-text">
                {story?.text}
            </div>
            <div className="story-published">
                {story?.publishedDate}
            </div>
        </div>

    )
}
export const NewsBox = () => {
    const dispatch = useDispatch();
    let news = useSelector(state => state.news)
    useEffect(() => {
        dispatch(getGeneralNews())
    }, [])
    useEffect(() => {
        // console.log(news)
    }, [news])
    let generalNews = news.general
    let newsList = Object.values(generalNews);
    let display = newsList.map(ele => {
        return (
            <NewsStory story={ele}/>
        )
    })
    // console.log("display", display)
    return (
        <div className="news-box">
            {newsList.map((article, index) => (
            <a className="sd-link" href={article.url}>
              <div className="news-card" key={index}>
                <div className="article-text">
                  <h4>
                    {article.site} - {article.publishedDate}
                  </h4>
                  <h2>{article.title}</h2>
                  <p>{article.text}</p>
                </div>
                <div className="article-img">
                  <img
                    className="article-img-thumbnail"
                    src={article.image}
                  ></img>
                </div>
              </div>
            </a>
          ))}
        </div>
    )
}
