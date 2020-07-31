import Layout from '../components/homelayout.js'
import DetailsCard from '../components/cards/detailscard.js';
import Head from 'next/head'
import Masonry from 'react-masonry-css'
import styles from './home.module.css'

const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

let cardDetails = [
  {
    images: ["/fourth_year/Aahan_cutest_photo.jpeg"],
    buttonTitle: 'My Videos',
    path: '/videos',
  },
  {
      images: ["/first_year/aahan_hand.jpg"],
      buttonTitle: 'First Year',
      path: '/first_year',
  },
  {
      images: ["/second_year/DSC_0191.jpeg"],
      buttonTitle: 'Second Year',
      path: '/second_year'
  },
  {
      images: ["/third_year/DSC_2864.jpeg"],
      buttonTitle: 'Third Year',
      path: '/third_year'
  },
  {
      images: ["/fourth_year/Aahan_Sharma_Ideal_Photo.jpeg"],
      buttonTitle: 'Fourth Year',
      path: '/fourth_year'
  }
]

function HomePage() {
  return <Layout>
      <Head>
        <title>Aahan Sharma check my photos, videos, rhymes | Scottish High, Gurgaon | G D Goenka La Petite</title>
        <meta name="description" content="My name is Aahan Sharma check my photos, videos, rhymes I learned at school. I love to play cricket and football. I was born on first August 2016 and enjoying the journey to life. I study in nursery D at Scottish High International School, Also I did my pre nersury at G.D Goenka La Petite"></meta>
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
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles['my-masonry-grid']}
        columnClassName={styles['my-masonry-grid_column']}
      >
          {
              cardDetails.map((data, i) => {
                  return <DetailsCard key={i} data={data} objectId={data.objectId}/>
              })
          }
          </Masonry>
    </div>
    </Layout>
}

export default HomePage