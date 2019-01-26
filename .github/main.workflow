workflow "New workflow" {
  on = "push"
  resolves = ["release"]
}

action "deploy" {
  uses = "actions/zeit-now@master"
  args = "--local-config=./app/now.json deploy ./app > $HOME/$GITHUB_ACTION.txt -e GIT_RELEASE=$GITHUB_SHA"
  secrets = ["ZEIT_TOKEN"]
}

action "alias" {
  needs = ["deploy"]
  uses = "actions/zeit-now@master"
  args = "alias --local-config=./app/now.json `cat /github/home/deploy.txt` $GITHUB_SHA"
  secrets = [
    "ZEIT_TOKEN",
  ]
}

action "master-branch-filter" {
  needs = "alias"
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "release" {
  needs = "master-branch-filter"
  uses = "actions/zeit-now@master"
  secrets = ["ZEIT_TOKEN"]
  args = "alias --local-config=./app/now.json"
}
