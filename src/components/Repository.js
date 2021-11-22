import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  useParams
} from "react-router-dom";
import _ from "lodash";
import { Chart } from "react-charts";
import { bottom } from "@popperjs/core";
function Repository() {
  const queries = new URLSearchParams(window.location.search);
  const valueKey = queries.get("value");
  const [setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [repoDetais, setUsers] = useState([]);
  var source;

  // API call
  useEffect(() => {
    fetch(`https://api.github.com/users/` + valueKey + `/repos`)
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

  //Chart
  const series = React.useMemo(
    () => ({
      type: "bar"
    }),
    []
  );
  const axes = React.useMemo(
    () => [
      { primary: true, position: "left", type: "time" },
      { position: "bottom", type: "linear", stacked: true }
    ],
    []
  );
  var myDataArray = [
    {
      label: "Series 1",
      datums: []
    },
    {
      label: "Series 2",
      datums: []
    },
    {
      label: "Series 3",
      datums: []
    }
  ];

  // This whole for loop and array manipulation can be made dynamic
  for (var i = 0; i <= repoDetais.length; i++) {
    if (repoDetais[i] !== undefined) {
      const temp = {
        x: new Date(repoDetais[i].pushed_at),
        y: repoDetais[i].watchers
      };
      const temp1 = {
        x: new Date(repoDetais[i].pushed_at),
        y: repoDetais[i].stargazers_count
      };
      const temp2 = {
        x: new Date(repoDetais[i].pushed_at),
        y: repoDetais[i].size
      };
      myDataArray[0].datums.push(temp);
      myDataArray[1].datums.push(temp1);
      myDataArray[2].datums.push(temp2);
    }
  }
  return [
    <div>
      <p className="repoDetail-heading">
        <b>{valueKey} </b>Chart And Repository Details
      </p>
      <div className="App">
        <div style={{ width: "500px", height: "500px", margin: "0 0 40px 0" }}>
          <Chart data={myDataArray} series={series} axes={axes} tooltip />
        </div>
      </div>

      {repoDetais.map(function(repoDetailsData, i) {
        return (
          <div className="card">
            <img
              src={repoDetailsData.owner.avatar_url}
              alt="John"
              className="repoDetail-images"
            />
            <div className="detailsDiv">
              <div className="nameDiv">
                <a target="_blank" href={repoDetailsData.owner.html_url}>
                  {repoDetailsData.name}
                </a>
              </div>
              <div className="title">Watchers : {repoDetailsData.watchers}</div>
              <div className="title">
                Visibility : {repoDetailsData.visibility}
              </div>
              <div className="title">
                Open Issues : {repoDetailsData.open_issues}
              </div>
              <div className="title">
                Fork Count : {repoDetailsData.forks_count}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ];
}
export default Repository;
