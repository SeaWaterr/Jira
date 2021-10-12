import React, { useEffect } from "react";
import { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject,useDebounce,useMount } from "../../utils";
import * as qs from "qs"

const apiurl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param,2000)
  const [list, setList] = useState([]);
  useMount(() => {
    fetch(`${apiurl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  useEffect(() => {
    fetch(
      `${apiurl}/projects?${qs.stringify(cleanObject(debounceParam) )}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParam]);
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
