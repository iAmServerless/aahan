import Layout from '../components/homelayout.js'
import { useRouter } from 'next/router'
import DetailsCard from '../components/cards/detailscard.js';
import Breadcrumb from '../components/breadcrumbs';
import Head from 'next/head'
import styles from './home.module.css'
import fs from 'fs'
import path from 'path'

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
      return a.time - b.time; 
    })

   return {
       props: {
           photos: resData,
           breadcrumb: getBreadCrumbs(page)
       }
   }
  }


function Photos({photos, breadcrumb}) {
  const router = useRouter()
  const { objectId } = router.query;
  return <Layout>
      <Head>
        <title>Aahan Sharma | 4yrs old studying at scottish high school, gurgaon</title>
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
          {
              photos.map((data, i) => {
                  return <DetailsCard key={i} data={data} objectId={data.filename}/>
              })
          }
    </div>
    </Layout>
}

export default Photos