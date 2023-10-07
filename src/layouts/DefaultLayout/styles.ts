import styled from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 74rem;
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;

  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 500px) {
    margin: 5rem 1rem;
  }

  @media screen and (min-width: 800px) {
    margin: 5rem 4rem;
  }
`
