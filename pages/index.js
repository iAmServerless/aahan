import Layout from '../components/homelayout.js'
import DetailsCard from '../components/cards/detailscard.js';
import Head from 'next/head'
import styles from './home.module.css'

let cardDetails = [
  {
      images: ["/images/aahan1.jpeg"],
      buttonTitle: 'My Photos',
      path: '/photos'
  },
  {
      videos: ["/videos/DSC_3214.MOV"],
      type: 'video',
      buttonTitle: 'My Videos',
      path: '/videos',
      objectId: 'DSC_3214.MOV'
  },
  {
      images: ["/images/aahan3.jpeg"],
      buttonTitle: 'Pre Nursery',
      path: '/prenursery'
  },
  {
      images: ["/images/aahan4.jpeg"],
      buttonTitle: 'Nursery',
      path: '/nursery'
  }
]

function HomePage() {
  return <Layout>
      <Head>
        <title>Home Page</title>
      </Head>
      <div className={styles.breadcrumb}>
      </div>
      <div className={styles.gridContainer}>
          {
              cardDetails.map((data, i) => {
                  return <DetailsCard key={i} data={data} objectId={data.objectId}/>
              })
          }
    </div>
    </Layout>
}

export default HomePage