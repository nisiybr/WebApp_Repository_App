import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #7159c1;
    font-size: 16px;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    flex-shrink: 0;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      flex-shrink: 0;
      border: 2px solid #eee;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      flex-grow: 1;
      flex-shrink: 1;
      margin-left: 10px;

      strong {
        font-size: 16px;
        display: flex;
        flex-direction: column;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        div.labels {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          margin: 0;

          span {
            background: #eee;
            color: #333;
            border-radius: 2px;
            font-size: 12px;
            font-weight: 600;
            height: 20px;
            line-height: 15px;
            padding: 3px 1px;

            & + span {
              margin-left: 15px;
            }
          }
        }
      }
      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Filter = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #eee;

  div.filtros {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    span {
      color: #7159c1;
      font-weight: bold;
      font-size: 16px;
    }

    select {
      flex-grow: 1;
      margin-left: 30px;
      font-size: 16px;
      padding: 5px 10px;
    }
  }
`;

export const PageButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  padding: 0 100px;

  button {
    background: #9159c1;
    border: 0;
    padding: 15px 15px;
    border-radius: 4px;
    color: #fff;

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;
