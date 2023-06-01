"use strict"

const express = require("express");
const { BadRequestError } = require("../expressError");
const GithubAPI = require("../GithubAPI");
const router = express.Router();


/** GET /org => { org }

 Returns { repositories under user}

 **/

router.get("/user/:user", async function (req, res, next) {
    try {
        console.log("getting user")

        const user = req.params.user;
        let forked;
        if (req.query.forked) {
            forked = req.query.forked === "false" ? false : true;
        } else {
            forked = true
        }

        const options = {
            per_page: 100
        }

        const repos = await GithubAPI.getUserRepos(user, options, forked)
        console.log(repos)

        return res.json(repos);

    } catch (err) {
        return next(err);
    }
});

router.get("/org/:org", async function (req, res, next) {
    try {
        console.log("getting org")
        const org = req.params.org;
        let forked;
        if (req.query.forked) {
            forked = req.query.forked === "false" ? false : true;
        } else {
            forked = true
        }


        const options = {
            per_page: 100
        }

        const repos = await GithubAPI.getOrgRepos(org, options, forked)
        console.log(repos)

        return res.json(repos);

    } catch (err) {
        return next(err);
    }
});

module.exports = router;