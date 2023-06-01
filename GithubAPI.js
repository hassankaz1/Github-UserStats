const axios = require("axios");

const BASE_URL = "https://api.github.com/search"

/**
 * API Class
 * 
 * Static class tying together methods used to get/send to to the backend.
 *
 */
class GithubAPI {

    static async makeRequest(endpoint, params) {

        console.log(endpoint)
        console.log(params)

        console.log("Getting Github Data")
        const { data } = await axios.get(BASE_URL + endpoint, {
            headers: {
                Authorization: `Bearer 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`,
            },

            params
        })


        return data

    }

    /** Convert Repos into aggregated data  */
    static getStats(data, forked) {

        console.log(`is ${forked}`)

        let repos = data.items

        if (!forked) {
            repos = repos.filter(repo => !repo.fork)
        }

        // console.log(repos[0].owner)

        const stats = {
            repoCount: !forked ? repos.length : data.total_count,
            stargazers: this.getStargazers(repos),
            forkCount: this.getForkCount(repos),
            avgSize: this.getAvgSize(repos),
            languages: this.getSortedLanguages(repos),
            userLink: repos[0].owner.html_url,
            avatar: repos[0].owner.avatar_url,
            repoLink: repos[0].owner.repos_url
        }

        console.log(stats)

        return stats
    }

    static getStargazers(repos) {
        return repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
    }

    static getForkCount(repos) {
        return repos.reduce((acc, repo) => acc + repo.forks_count, 0)
    }

    static getAvgSize(repos) {

        const totalSize = repos.reduce((acc, repo) => acc + repo.size, 0);
        const averageSize = totalSize / repos.length;

        // Github Documentation says the sizes are in bytes so this helper function will format to approprate unit
        return this.formatTotalSize(averageSize);

    }

    static formatTotalSize(totalSize) {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = totalSize;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(2)} ${units[unitIndex]}`;
    }

    static getSortedLanguages(repos) {
        const languages = {};

        for (const repo of repos) {
            const lang = repo.language;

            if (lang) {
                if (languages.hasOwnProperty(lang)) {
                    languages[lang]++;
                } else {
                    languages[lang] = 1;
                }
            }
        }
        //   sort languages
        const sortedLanguages = Object.entries(languages).sort((a, b) => b[1] - a[1]);

        return sortedLanguages;
    };

    /** Get all repositories under organization*/

    static async getOrgRepos(org, options, forked) {
        console.log(`sending Github request for repo's under ${org}`)

        let query = `q=org:${org}`


        let res = await this.makeRequest(`/repositories?${query}`, options);
        let orgStats = this.getStats(res, forked)
        return orgStats
    }

    static async getUserRepos(user, options, forked) {
        console.log(`sending Github request for repo's under ${user}`)

        let query = `q=user:${user}`



        let res = await this.makeRequest(`/repositories?${query}`, options);
        let userStats = this.getStats(res, forked)
        return userStats
    }

    /** Get all repositories under user*/

    // static async signup(data) {
    //     console.log("sending register request")
    //     let res = await this.request(`auth/register`, data, "post");
    //     return res.data.token;
    // }


}


module.exports = GithubAPI;