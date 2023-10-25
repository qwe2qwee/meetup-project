import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { Fragment } from "react";

NewMeetupForm;

const NewMeetupPage = () => {
  const addMeetupHandler = async (eneteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(eneteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };
  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta
          name='description'
          content='Add your own meetups and create amazing networking'
        />
      </Head>

      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;
