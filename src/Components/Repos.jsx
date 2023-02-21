import React from "react";
import useFetch from "../Hooks/useFetch";

const Repos = ({ username }) => {
  const { data: repos } = useFetch(`/profile/github/${username}`);
  console.log(repos);
  return (
    repos && (
      <section className="my-3">
        <h2 className="text-info">Github Repos</h2>
        <ul className="list-unstyled m-0">
          {repos.map((repo) => (
            <li key={repo.id}>
              <div className="p-3 d-flex border justify-content-between">
                <a href={repo.svn_url} target="_blank">
                  {repo.name}
                </a>
                <div className="d-flex flex-column gap-3">
                  <span className="btn btn-info w-100 px-1">
                    Stars: {repo.stargazers_count}
                  </span>
                  <span className="btn btn-dark w-100 px-1">
                    Watchers: {repo.watchers_count}
                  </span>
                  <span className="btn btn-light w-100 px-1">
                    Forks: {repo.forks_count}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    )
  );
};

export default Repos;
