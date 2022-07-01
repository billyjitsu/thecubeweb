import Head from 'next/head'
import Nav from "../components/Nav";
import Intro from '../components/Intro';
import Claim from '../components/Claim';
import BreakOpen from '../components/BreakOpen';
import Merge from '../components/Merge';
import Footer from '../components/Footer';

/* Contracts currently using: 
 NFT Token contract:  0x64Db34Bb6EcD573fEFF9644532C0e41DBb90765B
 BeezCube Contract: 0xA9912c34ab43994eF5af54f79A2E11233dfFB8F1
 Sponsor wallet:  0x2af539121297E2044440708BAd18A5FE5bd79A32
 */

export default function Home() {
  return (
    <div>
      <Head>
        <title>NFBeez The Cube</title>
        <meta name="The Cube" content="The 2nd Iteration of the NFBeez" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav/>
      <Intro />
      <Claim />
      <BreakOpen />
      <Merge />
      <Footer />
    </div>
  )
}
