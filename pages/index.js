import Head from 'next/head';
import CelebrityFinder from '../components/CelebrityFinder';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Celebrity Finder</title>
        <meta name="description" content="Find out which celebrity was born on your birthday" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center min-h-screen py-2">
        <CelebrityFinder />
      </main>
    </div>
  );
}
