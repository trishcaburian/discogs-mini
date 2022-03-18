import type { NextPage } from 'next'
import Head from 'next/head'
import Dashboard from "../components/Dashboard";
import homeStyles  from "../styles/Home.module.css";

const Home: NextPage = () => {

    return (
        <div className={homeStyles.main}>
            <Head>
                <title>Discogs Mini™</title>
            </Head>

            <h1 className={homeStyles.title}>
              Discogs Mini™
            </h1>
            <Dashboard />
      </div>
    );
}

export default Home;

//maybe move this to its own file?
async function discogsApi(album_title: string) {
    let discogsKey = process.env.NEXT_PUBLIC_DISCOGS_KEY;
    let discogsSecret = process.env.NEXT_PUBLIC_DISCOGS_SECRET;
    let formatted_title = album_title.toLowerCase().split(" ").join("_");

    const res = await fetch("https://api.discogs.com/database/search?release_title="+formatted_title, {
      method: 'get',
      headers: new Headers({
        'Authorization': "Discogs key=" + discogsKey + ", secret=" + discogsSecret
      })
    });

  const response = await res.json();

  return response;
}
