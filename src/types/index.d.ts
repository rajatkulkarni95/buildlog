export interface IUser {
  user: {
    id: string;
    email: string;
    name: string;
    username: string;
    avatar: string;
  };
}

export interface IProject {
  projects: {
    id: string;
    name: string;
  }[];
  pagination: {
    count: number;
    next: number;
    prev: number;
  };
}

export interface IDeployment {
  deployments: {
    uid: string;
    name: string;
    creator: {
      uid: string;
      email: string;
      username: string;
    };
    inspectorUrl: string;
    meta: {
      githubCommitOrg: string;
      githubCommitRepo: string;
      githubCommitRef: string;
      githubCommitSha: string;
    };
    createdAt: number;
    buildingAt: number;
    ready: number;
  }[];
  pagination: {
    count: number;
    next: number;
    prev: number;
  };
}
