import Layout from '../components/homelayout.js'
import DetailsCard from '../components/cards/detailscard.js';
import Head from 'next/head'
import styles from './home.module.css'

let cardDetails = [
  {
      images: ["/photos/Aahan_best_pose.png"],
      buttonTitle: 'My Photos',
      path: '/photos',
      objectId: 'Aahan_best_pose.png'
  },
  {
      images: ["/photos/Aahan_cutest_photo.jpeg"],
      buttonTitle: 'My Videos',
      path: '/videos',
      objectId: 'Titli_Rani_Titli_Rani.webm'
  },
  {
      images: ["/photos/Aahan_looking_cute_with_his_little_scientist_cap.jpeg"],
      buttonTitle: 'Pre Nursery',
      path: '/prenursery'
  },
  {
      images: ["/photos/Aahan_the_real_and_best_smile.jpeg"],
      buttonTitle: 'Nursery',
      path: '/nursery'
  }
]

function HomePage() {
  return <Layout>
      <Head>
        <title>Aahan Sharma check my photos, videos, rhymes | Scottish High, Gurgaon | G D Goenka La Petite</title>
        <meta name="description" content="My name is Aahan Sharma check my photos, videos, rhymes I learn at school etc. I love to play cricket and football."></meta>
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Aahan Sharma check my photos, videos, rhymes | Scottish High, Gurgaon | G D Goenka La Petite" />
        <meta property="og:description" content="My name is Aahan Sharma check my photos, videos, rhymes I learn at school etc. I love to play cricket and football." />
        <meta property="og:image" content="/photos/DSC_3260.png" />
        <meta property="og:url" content="https://www.aahansharma.com/" />
        <meta property="og:site_name" content="Aahan Sharma" /> 
        <meta name="twitter:title" content="Aahan Sharma Personal Website" />
        <meta name="twitter:description" content="My name is Aahan Sharma check my photos, videos, rhymes I learn at school etc. I love to play cricket and football." />
        <meta name="twitter:image" content="/photos/DSC_3260.png" />
        <link rel="canonical" href="https://www.aahansharma.com/" />
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