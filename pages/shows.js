import Layout from '@c/Layout'
import { Grid, Card } from '@c/Grid'
import { List } from '@c/List'
import { Title } from '@c/Title'
import { getAllShows } from '@l/graphcms'
import { Button } from '@c/Button'
import {useState} from 'react'
//import { StylishButton } from '../components/Button'

export default function Shows({ shows }) {

  const [toggleViewMode, setToggleViewMode] = useState(false);

  function toggleView() {

    setToggleViewMode(!toggleViewMode)
    console.log("we toggled sumn")
    console.log(shows)
  }

  



  return toggleViewMode ? (
    <Layout title="next-graphcms-shows / Shows">

      <Title>Shows</Title>
      <Button onClick={toggleView} text="List" />
      
      <Grid>

        {shows.map(show => (
          <Card href={`/show/${show.slug}`} header={show.title} key={show.id}>
            <p>{show.artists.map(({ fullName }) => fullName).join(', ')}</p>
          </Card>
        ))}
      </Grid>
    </Layout>
  ) : (
    <Layout title="next-graphcms-shows / Shows">

      <Title>Shows</Title>
       
          <Button onClick={toggleView} text="Grid" />
         

      <List>

        {shows.map(show => (
          <Card href={`/show/${show.slug}`} header={show.title} key={show.id}>
            <p>{show.artists.map(({ fullName }) => fullName).join(', ')}</p>
              <small>{show.scheduledStartTime} </small>
              <h5>Price: ${show.ticketPrice} per ticket</h5>
              
          </Card>
        ))}
      </List>
    </Layout>

  )
}

export async function getServerSideProps() {
  const shows = (await getAllShows()) || []
  return {
    props: { shows },
  }
}
