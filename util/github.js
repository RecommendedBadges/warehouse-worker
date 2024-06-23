const callout = require('./callout.js');

async function commentOnPullRequest(pullRequestNumber, commentBody) {
    console.log(commentBody);
    callout.post('github', `/issues/${pullRequestNumber}/comments`, commentBody);
}

async function getIssueComments(issueNumber) {
    let issueComments = await callout.get({
        site: 'github',
        endpoint: `/issues/${issueNumber}/comments`
    });
    return issueComments;
}

async function mergeOpenPullRequest(pullRequestNumber) {
    await callout.put('github', `/pulls/${pullRequestNumber}/merge`, {});
}

module.exports = {
    commentOnPullRequest,
    getIssueComments,
    mergeOpenPullRequest
}