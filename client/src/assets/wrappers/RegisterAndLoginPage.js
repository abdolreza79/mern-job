import styled from 'styled-components'

const Wrapper = styled.section`
  max-height: 100vh;
  display: flexbox;
  align-items: center;
  justify-content: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 0.5rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  h4 {
    text-align: center;
    margin-bottom: 0.5rem;
    font-size: medium;
    font-weight: 500;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
    margin-top: 1rem;
    font-weight: 500;
  }
`
export default Wrapper
