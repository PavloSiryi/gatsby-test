import React, { useRef, useState, useEffect } from "react";
import { getCursorFromDocumentIndex } from 'gatsby-source-prismic-graphql';
import { Link, graphql } from "gatsby";

const Index = (listsData) => {
  const limit = 4;
  const {
    data: {
      prismic
    }
  } = listsData;
  const didMountRef = useRef(false);
  const [page, setPage] = React.useState(-1);
  const [data, setData] = React.useState(prismic);
  const onPreviousClick = () => setPage(page - limit);
  const onNextClick = () => setPage(page + limit);

  console.log(prismic)

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    prismic
      .load({ variables: { after: getCursorFromDocumentIndex(page) } })
      .then(res => setData(res.data));
  }, [page]);

  return (
    <div>
      <h1>All lists</h1>
      {prismic.allLists.edges.map(({ node }) => (
        <div>
          <Link to={`list/${node._meta.uid}`}>{node.header[0].text}</Link>
        </div>
      ))}
      <button disabled={page <= 0} onClick={onPreviousClick}>
        prev page
      </button>
      <button disabled={!data.allLists.pageInfo.hasNextPage} onClick={onNextClick}>
        next page
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
