import React, { useEffect } from "react"
import styled from "styled-components";

const Container = styled.main`
  padding: 3rem;
`;

export default () => {
  return <Container>
    <h1>Tally Results</h1>
    <ul>
      <li><a href="https://www.dropbox.com/s/fwhdcvii4rprgxj/General%20Election%202020%20-%20Final.xlsx?dl=0">Cork North West</a></li>
      <li>Cork East (link will be posted at end of 1st count)</li>
      </ul>
    </Container>
}
