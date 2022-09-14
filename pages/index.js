import Head from 'next/head'
import Nav from "../components/Nav";
import Intro from '../components/Intro';
import Claim from '../components/Claim';
import BreakOpen from '../components/BreakOpen';
import Merge from '../components/Merge';
import Footer from '../components/Footer';


/* Contracts currently using: 
 NFT Token contract:  0xA4b5088A64e86968FD0A8a517257E2C0023D7796
 BeezCube Contract: 0xF817e4E9F4dAf4F4D0dEF5635e6FbE1D23CB084a
 Sponsor wallet:  0x7A2dD193886d37799bCaCAdC0Bc9682FB1fac4Ae
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
