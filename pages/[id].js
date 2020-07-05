import Layout from '../components/homelayout.js'
import { useRouter } from 'next/router'
import Masonry from 'react-masonry-css'
import DetailsCard from '../components/cards/detailscard.js';
import Breadcrumb from '../components/breadcrumbs';
import Head from 'next/head'
import styles from './home.module.css'
import fs from 'fs'
import path from 'path'

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};

let breadcrumbs = [{
  text: 'Home',
  path: '/'
}, {
  text: 'Pre Nursery',
  path: '/prenursery'
}, {
  text: 'Nursery',
  path: '/nursery'
}, {
  text: 'Photos',
  path: '/photos'
}, {
  text: 'Videos',
  path: '/videos'
}]

function getBreadCrumbs(id) {
  return breadcrumbs.filter(breadcrumb => breadcrumb.path.indexOf(id) == -1)
}

export function getAllPages() {
  return [
    {
      params: {
        id: 'photos',
      }
    },
    {
      params: {
        id: 'videos',
      }
    },
    {
      params: {
        id: 'prenursery',
      }
    },
    {
      params: {
        id: 'nursery',
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
    const photosDirectory = path.join(process.cwd(), 'public', page)
    const filenames = fs.readdirSync(photosDirectory)
    let resData = filenames.filter((filename) => {
      return filename.match(/.(mp4|mov|webm|jpg|jpeg|png|gif)$/i)
    }).map((filename) => {
      return {
        [filename.match(/.(mp4|mov|webm)$/i)? 'videos': 'images']: [`/${page}/${filename}`],
        type: filename.match(/.(mp4|mov|webm)$/i)? 'video': 'image',
        filename,
        path: `/${page}`,
        time: fs.statSync(photosDirectory + '/' + filename).mtime.getTime()
      }
    }).sort(function (a, b) {
      return b.time - a.time; 
    })

   return {
       props: {
           photos: resData,
           breadcrumb: getBreadCrumbs(page),
           page
       }
   }
  }


function Photos({photos, breadcrumb, page}) {
  const router = useRouter()
  const { objectId } = router.query;
  let seoData = objectId? objectId.split('.')[0].replace(/_/g, ' '): '';
  return <Layout>
      <Head>
        <title>{`Aahan Sharma ${page} ${seoData} | Scottish High, Gurgaon | G D Goenka La Petite`}</title>
        <meta name="description" content={`My name is Aahan Sharma check my ${page} ${seoData}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`Aahan Sharma ${page} ${seoData} | Scottish High, Gurgaon | G D Goenka La Petite`} />
        <meta property="og:description" content={`My name is Aahan Sharma check my ${page} ${seoData}`} />
        <meta property="og:image" content={`/${page}/${objectId}`} />
        <meta property="og:url" content="https://www.aahansharma.com/" />
        <meta property="og:site_name" content="Aahan Sharma" /> 
        <meta name="twitter:title" content={`Aahan Sharma ${page} ${seoData} | Scottish High, Gurgaon | G D Goenka La Petite`} />
        <meta name="twitter:description" content={`My name is Aahan Sharma check my ${page} ${seoData}`} />
        <meta name="twitter:image" content={`/${page}/${objectId}`} />
        <link rel="canonical" href="https://www.aahansharma.com/" />
      </Head>
      <div className={styles.breadcrumb}>
        <Breadcrumb list={breadcrumb}/>
      </div>
      <div>
        {
          objectId? photos.filter((data, i) => {
            return data.filename == objectId
        }).map((data, i) => {
          return <DetailsCard key={i} data={data} priority/>
        }): null
        }
      </div>
      <div className={styles.gridContainer}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles['my-masonry-grid']}
        columnClassName={styles['my-masonry-grid_column']}
      >
          {
              photos.map((data, i) => {
                  return <DetailsCard key={i} data={data} objectId={data.filename}/>
              })
          }
          </Masonry>
    </div>
    </Layout>
}

export default Photos