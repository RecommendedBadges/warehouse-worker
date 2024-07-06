const callout = require('./callout.js');
const { BASE_BRANCH, PACKAGES_LABEL } = require('../config');

function commentOnPullRequest(pullRequestNumber, commentBody) {
    callout.post('github', `/issues/${pullRequestNumber}/comments`, {body: commentBody});
}

function getIssueComments(issueNumber) {
    let issueComments = callout.get({
        site: 'github',
        endpoint: `/issues/${issueNumber}/comments`
    });
    return issueComments;
}

function getOpenPullRequestDetails(parameters) {
    let pullRequests = callout.get({
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

function deletePackageLabelFromIssue(issueNumber) {
    callout.doDelete('github', `/issues/${issueNumber}/labels/${PACKAGES_LABEL}`);
}

function mergeOpenPullRequest(pullRequestNumber) {
    callout.put('github', `/pulls/${pullRequestNumber}/merge`);
}

module.exports = {
    commentOnPullRequest,
    deletePackageLabelFromIssue,
    getIssueComments,
    getOpenPullRequestDetails,
    mergeOpenPullRequest
}