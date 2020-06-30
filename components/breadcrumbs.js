import Link from 'next/link'

export default function Breadcrumb({list}) {
    if(!list) return null;
    return <>
        <style jsx>{`
            .listStyle {
                text-align: left;
                font-size: 1rem;
                padding: 0;
            }
            .itemStyle {
                display: inline-block;
            }
        `}</style>
        <ul className='listStyle'>
        {list.map((item, index) => {
            return (index != list.length - 1)? <li key={index} className='itemStyle'><Link href={item.path}><a>{item.text}</a></Link> /&nbsp;</li>:<li key={index} className='itemStyle'><Link href={item.path}><a>{item.text}</a></Link></li>
        })}
    </ul></>
}