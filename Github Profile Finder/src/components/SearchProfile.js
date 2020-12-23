import React, { useState } from "react";
import DisplayTable from "./DisplayTable";

const SearchProfile = () => {
  const [data, setData] = useState({
    profileJson: []
  });
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState({
    repoJson: []
  });

  const onChangeHandler = e => {
    setUsername(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    const profile = await fetch(`https://api.github.com/users/${username}`);
    const profileJson = await profile.json();
    //console.log(profileJson);

    const repositories = await fetch(profileJson.repos_url);
    const repoJson = await repositories.json();
    console.log(repoJson);

    if (profileJson) {
      setData(prevState => {
        return { ...prevState, profileJson: profileJson }
      })
      setRepositories(prevState => {
        return { ...prevState, repoJson: repoJson }
      })
    }
  };
  return (
    <section>
      <input
        type="text"
        placeholder="search username here..."
        className="searchbox"
        onChange={onChangeHandler}
      /><br />
      <button type="submit" onClick={submitHandler} className="button" >Search</button>
      {(typeof data.profileJson != "undefined" ) ? <DisplayTable data={data.profileJson} repositories={repositories.repoJson} /> : false }
    </section>
  );
};
export default SearchProfile;