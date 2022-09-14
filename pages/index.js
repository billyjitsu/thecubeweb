import Head from 'next/head'
import Nav from "../components/Nav";
import Intro from '../components/Intro';
import Claim from '../components/Claim';
import BreakOpen from '../components/BreakOpen';
import Merge from '../components/Merge';
import Footer from '../components/Footer';


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
     {/*  <Claim />
      <BreakOpen />
      <Merge />
      */}
      <Footer />
    </div>
  )
}
