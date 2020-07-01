import Link from 'next/link'
import style from './detailscard.module.css'

export default function DetailsCard({ data }) {

    let component = <div className={style.cardStyle}>
      {data.type == 'video'? 
      <video className={style.videoStyle} src={data.videos[0]} controls preload='metadata'/>
      :<img loading="lazy" className={style.imageStyle} src={data.images[0]} />}
      {data.buttonTitle && <div className={`button ${style.buttonStyle}`}>{data.buttonTitle}</div>}
    </div>;
    if (!data.path) return component;
    return <Link href='/[id]' as={data.path}>
      <a>{component}</a>
    </Link>
  }