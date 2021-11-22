import "../App.css";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Search, Grid, Label } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  useHistory
} from "react-router-dom";
var source;
const initialState = {
  loading: false,
  results: [],
  value: ""
};
function exampleReducer(state, action) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };
    case "UPDATE_SELECTION":
      return { ...state, value: action.selection };
    default:
      throw new Error();
  }
}

function SearchRepo() {
  const [setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;

  const timeoutRef = React.useRef();

  // Note: the empty deps array [] means
  // this useEffect will run once
  const history = useHistory();
  const onSubmit = content => {
    let path = `repository?value=${content}`;
    history.push(path);
  };
  useEffect(() => {
    fetch("https://api.github.com/users")
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setUsers(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  // Search result
  for (var i = 0; i < users.length; i++) {
    if (users[i] !== undefined) {
      source = _.times(30, i => ({
        title: users[i].login,
        description: users[i].html_url,
        image: users[i].avatar_url
      }));
    }
  }

  // Result render according to search
  const resultRenderer = ({ title }) => (
    <Label onClick={() => onSubmit(title)} content={title} />
  );

  //Handle Search Value
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: "START_SEARCH", query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }
      const re = new RegExp(_.escapeRegExp(data.value), "i");
      const isMatch = result => re.test(result.title);
      dispatch({
        type: "FINISH_SEARCH",
        results: _.filter(source, isMatch)
      });
    }, 300);
  }, []);
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  return (
    <Grid>
      <Grid.Column>
        <h1 className="repo">Repositories Search</h1>
        <Search
          loading={loading}
          onResultSelect={(e, data) =>
            dispatch({ type: "UPDATE_SELECTION", selection: data.result.title })
          }
          onSearchChange={handleSearchChange}
          resultRenderer={resultRenderer}
          results={results}
          value={value}
        />
      </Grid.Column>
    </Grid>
  );
}

export default SearchRepo;
