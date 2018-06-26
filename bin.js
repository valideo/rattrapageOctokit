const octokit = require('@octokit/rest');
const octokit_client = octokit();
const commander = require('commander');

const createCSV = require('./createCSV');

commander
  .version('0.1.0')
  .option('-t, --token [token]','GitHub token')
  .option('-l, --languages [languages]','Languages to seach')
  .parse(process.argv)

  octokit_client.authenticate({type:'token',token: commander.token})

function getBestRepo(languageParam){
  return octokit_client.search.repos({q: 'language:'+languageParam, sort: 'stars',order: 'desc'});
}

function getPullReq(owner, repo){
  var params = 'owner:'+owner+ ',' + 'repo:'+repo;
  console.log(params);
  return octokit_client.repos.getContent({q: params});
}

users = [];
getBestRepo(commander.languages)
.then(function(repos){
    var repo = repos.data.items[0];
    console.log(repo.name);
    getPullReq(repo.owner.id, repo.name)
    .then(function(userReq){
      users=[];
      reposStargazers.data.forEach(function(userCsv){
          login = userCsv.user.login,
          name = userCsv.name
          users.push({name: name, login: login});
    });
    })
    /*(function(){
      console.log(repos.data.items[0]);
      let owner = i.owner.login;
      let name = i.name;
      users.push({name: name, owner: owner})
    });
  return users;
})
.then(function(users){
  createCSV(users);*/
});