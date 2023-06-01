
### HackDay Backend - GoLinks

 
[LiveLink](https://gh-user-stats.herokuapp.com/github/user/hassankaz1) 

 
[Frontend Repo](https://github.com/hassankaz1/GH-UserStats-FrontEnd) 

**Description**: Given a GitHub username as input, the API endpoint returns the aggregated statistics across all of the user’s repositories. Also, allow for filtering down to just non-forked repositories.  


## 🛠 Tech Stack
Javascript, Node.js

## API 
[Github Search API](https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-repositories) 

## Features

- View aggregated stats across all the user’s repositories
    -  Total count of repositories 
    - Total stargazers for all repositories 
    - Total fork count for all repositories 
    - Average size of a repository in the appropriate KB, MB or GB 
    - A list of languages with their counts, sorted by the most used to least used

## Demo

### Endpoints 

/github/user/{username} -> return JSON aggregated data of an user


/github/org/{organization} -> return JSON aggregated data of an user


<p align="center">
  <img src="" alt="animated" />
</p>