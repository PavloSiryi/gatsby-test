import React from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby";

const ListItem = (listsData) => {
  const {
    data: {
      prismic: {
        allLists: {
          edges,
        }
      }
    }
  } = listsData;
  const currentListItem = edges[0].node;

  return (
    <>
      {currentListItem.header[0].text}
      <div><Link to="/">Back</Link></div>
    </>
  );
};

export const query = graphql`
  query ListQuery(
    $uid: String
  ) {
    prismic {
      allLists(uid: $uid) {
        edges {
          node {
            header
            content
          }
        }
      }
    }
  }
`;

export default ListItem;
