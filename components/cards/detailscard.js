import Link from 'next/link'
import style from './detailscard.module.css'

export default function DetailsCard({ data, priority, objectId }) {

    let component = <div className={!priority && style.cardStyle}>
      {data.type == 'video'? 
      <video className={priority? style.largeObjectStyle: style.videoStyle} src={data.videos[0]} controls preload='metadata'/>
      :<img loading="lazy" className={priority? style.largeObjectStyle: style.imageStyle} src={data.images[0]} />}
      {data.buttonTitle && <div className={`button ${style.buttonStyle}`}>{data.buttonTitle}</div>}
    </div>;
    if (!data.path) return component;
    return <Link href={{pathname: '/[id]', query: { ...(objectId && {objectId}) }}} as={{pathname: data.path, query: { ...(objectId && {objectId}) }}}>
      <a>{component}</a>
    </Link>
  }