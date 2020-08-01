import Layout from '../components/homelayout.js'
import { useRouter } from 'next/router'
import Masonry from 'react-masonry-css'
import DetailsCard from '../components/cards/detailscard.js';
import VideoJSONLD from '../json-ld/video';
import Head from 'next/head'
import styles from './home.module.css'
import fs from 'fs'
import path from 'path'
import Breadcrumb from '../components/breadcrumbs.js';

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};

export function getAllPages() {
  return [
    {
      params: {
        id: 'videos',
      }
    },
    {
      params: {
        id: 'first_year',
      }
    },
    {
      params: {
        id: 'second_year',
      }
    },
    {
      params: {
        id: 'third_year',
      }
    },
    {
      params: {
        id: 'fourth_year',
      }
    }
  ]
}

export async function getStaticPaths() {
  const paths = getAllPages()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}) {
    let page = params.id || params.name;
    const resourceDirectory = path.join(process.cwd(), 'public', page)
    const filenames = fs.readdirSync(resourceDirectory)
    let resData = filenames.filter((filename) => {
      return filename.match(/.(mp4|mov|webm|jpg|jpeg|png|gif)$/i)
    }).map((filename) => {
      return {
        [filename.match(/.(mp4|mov|webm)$/i)? 'videos': 'images']: [`/${page}/${filename}`],
        type: filename.match(/.(mp4|mov|webm)$/i)? 'video': 'image',
        filename,
        path: `/${page}`,
        time: fs.statSync(resourceDirectory + '/' + filename).mtime.getTime()
      }
    }).sort(function (a, b) {
      return b.time - a.time; 
    })

   return {
       props: {
           objects: resData,
           page
       }
   }
  }

  let list = [{
    text: 'Home',
    path: '/'
  }, {
    text: 'Videos',
    path: '/videos'
  }, {
    text: 'First Year',
    path: '/first_year'
  }, {
    text: 'Second Year',
    path: '/second_year'
  }, {
    text: 'Third Year',
    path: '/third_year'
  }, {
    text: 'Fourth Year',
    path: '/fourth_year'
  }]


function ListPage({objects, page}) {
  const router = useRouter()
  const { objectId } = router.query;
  let seoData = objectId? objectId.split('.')[0].replace(/_/g, ' '): '';
  let canonical = `https://www.aahansharma.com/${page}`;
  return <Layout>
      <Head>
        <title>{`Aahan Sharma ${page} ${seoData} | Scottish High, Gurgaon | G D Goenka La Petite`}</title>
        <meta name="description" content={`My name is Aahan Sharma check my ${page} ${seoData}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`Aahan Sharma ${page} ${seoData} | Scottish High, Gurgaon | G D Goenka La Petite`} />
        <meta property="og:description" content={`My name is Aahan Sharma check my ${page} ${seoData}`} />
        <meta property="og:image" content={`/third_year/DSC_2967.jpeg`} />
        <meta property="og:url" content="https://www.aahansharma.com/" />
        <meta property="og:site_name" content="Aahan Sharma" /> 
        <meta name="twitter:title" content={`Aahan Sharma ${page} ${seoData} | Scottish High, Gurgaon | G D Goenka La Petite`} />
        <meta name="twitter:description" content={`My name is Aahan Sharma check my ${page} ${seoData}`} />
        <meta name="twitter:image" content={`/third_year/DSC_2967.jpeg`} />
        <link rel="canonical" href={canonical} />
        {page=='videos' && <VideoJSONLD objects={objects}/>}
      </Head>
      <div>
        {
          objectId? objects.filter((data, i) => {
            return data.filename == objectId
        }).map((data, i) => {
          return <DetailsCard key={i} data={data} priority objectId={data.filename}/>
        }): null
        }
      </div>
      <div className={styles.gridContainer}>
      <Breadcrumb list={list}/>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles['my-masonry-grid']}
        columnClassName={styles['my-masonry-grid_column']}
      >
          {
              objects.map((data, i) => {
                  return <DetailsCard key={i} data={data} objectId={data.filename}/>
              })
          }
          </Masonry>
    </div>
    </Layout>
}

export default ListPage