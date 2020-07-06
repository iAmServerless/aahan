import Link from 'next/link'
import style from './detailscard.module.css'
import { useEffect, useRef, memo } from 'react';

function DetailsCard({ data, priority, objectId }) {
   let ref = useRef(null);
   let seoData = objectId? objectId.split('.')[0].replace(/_/g, ' '): '';

    useEffect(() => {
        ref.current && ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
    })

    let component = <div className={priority? '': style.cardStyle}>
      {data.type == 'video'? 
      (<><video ref={priority && ref} className={priority? style.largeVideoStyle: style.videoStyle} src={`https://www.aahansharma.com${data.videos[0]}`} controls preload='metadata'/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": `${seoData}`,
      "thumbnailUrl": "https://www.aahansharma.com/photos/Aahan_how_cute.jpeg",
      "description": `Aahan Sharma playing ${seoData}`,
      "uploadDate": `${new Date(data.time)}`,
      "contentUrl": `https://www.aahansharma.com${data.videos[0]}`,
      "embedUrl": `https://www.aahansharma.com${data.videos[0]}`,
    }) }}></script></>)
      :<img ref={priority && ref} loading="lazy" className={priority? style.largeObjectStyle: style.imageStyle} src={`https://www.aahansharma.com${data.images[0]}`}  alt={`${seoData}`}/>}
      {data.buttonTitle && <div className={`button ${style.buttonStyle}`}>{data.buttonTitle}</div>}
    </div>;
    if (!data.path) return component;
    return <Link href={{pathname: '/[id]', query: { ...(objectId && {objectId}) }}} as={{pathname: data.path, query: { ...(objectId && {objectId}) }}}>
      <a>{component}</a>
    </Link>
  }


  export default  memo(DetailsCard)