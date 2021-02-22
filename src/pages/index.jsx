import React, { useRef, useState, useEffect } from "react";
import { getCursorFromDocumentIndex } from 'gatsby-source-prismic-graphql';
import { Link, graphql } from "gatsby";

const Index = (props) => {
  const limit = 4;
  const {
    data: {
      prismic,
    }
  } = props;
  const didMountRef = useRef(false);
  const [isLoading, setSiLoading] = React.useState(false);
  const [page, setPage] = React.useState(-1);
  const [data, setData] = React.useState(prismic);

  const onPaginationControlClick = (isNext) => () => {
    setSiLoading(true);
    const nextPage = isNext ? page + limit : page - limit;
    setPage(nextPage);
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    props.prismic
      .load({ variables: { after: getCursorFromDocumentIndex(page) } })
      .then(res => {
        setSiLoading(false);
        setData(res.data)
      });
  }, [page]);

  return (
    <div>
      <h1>All lists</h1>
      {isLoading ?
        <div>loading...</div> :
        data.allLists.edges.map(({ node }) => (
          <div>
            <Link to={`list/${node._meta.uid}`}>{node.header[0].text}</Link>
          </div>
      ))}
      <button disabled={page <= 0} onClick={onPaginationControlClick(false)}>
        Prev page
      </button>
      <button disabled={!data.allLists.pageInfo.hasNextPage} onClick={onPaginationControlClick(true)}>
        Next page
      </button>
    </div>
  );
};

export const query = graphql`
  query AllLists($first: Int = 4, $last: Int, $after: String, $before: String) {
    prismic {
      allLists(first: $first, last: $last, after: $after, before: $before) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            header
            _meta {
              id
              uid
            }
          }
        }
      }
    }
  }

`;

export default Index;
