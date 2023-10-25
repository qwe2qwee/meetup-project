import MeetupD from "@/components/meetups/MeetupD";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupDD.title}</title>
        <meta
          name='description'
          content={props.meetupDD.description}
        />
      </Head>

      <MeetupD
        image={props.meetupDD.image}
        title={props.meetupDD.title}
        address={props.meetupDD.address}
        description={props.meetupDD.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://meetup12:5P5DaMVGcRoPwVMb@cluster0.i2yoyez.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollecction = db.collection("meetups");

  const meetups = await meetupsCollecction.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://meetup12:5P5DaMVGcRoPwVMb@cluster0.i2yoyez.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollecction = db.collection("meetups");

  const selectedMeetup = await meetupsCollecction.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupDD: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
