import Head from "next/head";

import { MongoClient } from "mongodb";


import MeetupList from "@/components/meetups/MeetupList";
import { Fragment } from "react";
const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meetup in city</title>
        <meta
          name='description'
          content='Browse a huge list of highly active cities meetup'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export function getServerSideProps (context){
//   const res = context.res;
//   const req = context.req;

//   return {
//     props: {
//       meetups:DUMMY_MEETUPS,
//     }
//   }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://meetup12:5P5DaMVGcRoPwVMb@cluster0.i2yoyez.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollecction = db.collection("meetups");

  const meetups = await meetupsCollecction.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
