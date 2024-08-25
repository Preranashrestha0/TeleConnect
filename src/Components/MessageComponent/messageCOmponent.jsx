import React from 'react'
import Card2 from '../MessageComponent/ListView';

const MessageComponent = () => {
  const beautyContent =[
    {
        imgUrl: "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
        title: "AI BASED IMAGE",
        description: "hello",
    },
    {
        imgUrl: "https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg",
        title: "Eiffel Tower",
        description: "hiiii",
    },
    {
        imgUrl: "https://www.scusd.edu/sites/main/files/main-images/camera_lense_0.jpeg",
        title: "Edited Image",
        description: "go home",
    },
   
]

  return (
    <Card2 productData={beautyContent} />
  )
}

export default MessageComponent
