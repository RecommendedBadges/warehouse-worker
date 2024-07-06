const callout = require('./callout.js');
const { BASE_BRANCH, PACKAGES_LABEL } = require('../config');

async function commentOnPullRequest(pullRequestNumber, commentBody) {
    await callout.post('github', `/issues/${pullRequestNumber}/comments`, {body: commentBody});
}

async function getIssueComments(issueNumber) {
    let issueComments = await callout.get({
        site: 'github',
        endpoint: `/issues/${issueNumber}/comments`
    });
    return issueComments;
}

async function getOpenPullRequestDetails(parameters) {
    let pullRequests = await callout.get({
        site: 'github',
        endpoint: '/pulls'
    });

    for(let pullRequest of pullRequests) {
        if(
            (pullRequest.base.ref === BASE_BRANCH) 
            && ((parameters.pullRequestNumber && (pullRequest.number == parameters.pullRequestNumber)) || !parameters.pullRequestNumber)
        ) {
            return pullRequest;
        }
    }
}

async function deletePackageLabelFromIssue(issueNumber) {
    await callout.doDelete('github', `/issues/${issueNumber}/labels/${PACKAGES_LABEL}`);
}

async function mergeOpenPullRequest(pullRequestNumber) {
    await callout.put('github', `/pulls/${pullRequestNumber}/merge`);
}

module.exports = {
    commentOnPullRequest,
    deletePackageLabelFromIssue,
    getIssueComments,
    getOpenPullRequestDetails,
    mergeOpenPullRequest
}