import React, { useState } from 'react';
import styled from 'styled-components';
import Roboto from 'roboto-fontface';
import _ from 'lodash';
import { getTVShowNames } from './api';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [shows, setShows] = useState([]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault();
    getTVShowNames(searchTerm).then(res => {
      // Store each show meeting the search criterion.
      setShows(res);

      // Sort the shows in ascending order by name.
      // Print to the console the sorted TV show names.
      const sorted = _.sortBy(res, 'show.name');
      console.log(sorted);
    });
  };

  // display to screen
  // skip any without medium image
  return (
    <Container>
      <Title>TV Show Search</Title>
      <form onSubmit={event => handleSearch(event)}>
        <Input
          type='text'
          placeholder='Search for TV shows'
          value={searchTerm}
          onChange={event => handleSearchChange(event)}
        />
        <Button onClick={event => handleSearch(event)}>Search</Button>
      </form>
      <ShowList>
        {shows.map(s => {
          const mediumImage = _.get(s, 'show.image.medium', '');
          return (
            mediumImage && (
              <div key={s.show.id}>
                <Card>
                  <img src={mediumImage} alt={s.show.name} />
                  <ShowName>{s.show.name}</ShowName>
                </Card>
                <HR />
              </div>
            )
          );
        })}
      </ShowList>
    </Container>
  );
}

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto';
  justify-content: center;
`;

const Input = styled.input`
  font-size: 18px;
  margin: 0 6px;
  padding: 12px;
`;

const Button = styled.button`
  font-size: 18px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 25px auto;
`;

const ShowList = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Card = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 350px;
  justify-content: center;
  margin: 12px auto;
  padding: 24px;
`;

const ShowName = styled.div`
  align-self: center;
  font-size: 18px;
  padding: 12px;
`;

const HR = styled.hr`
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
  border: 0;
  height: 1px;
`;

export default App;
