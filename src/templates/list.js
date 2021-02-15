import React from "react";
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
    <div>{currentListItem.header[0].text}</div>
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
            _linkType
          }
        }
      }
    }
  }
`;

export default ListItem;
