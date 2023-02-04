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
  pagination: IPagination;
}

export interface IDeploymentResponse {
  deployments: IDeployment[];
  pagination: IPagination;
}

export interface IDeployment {
  uid: string;
  name: string;
  state?:
    | "BUILDING"
    | "ERROR"
    | "INITIALIZING"
    | "QUEUED"
    | "READY"
    | "CANCELED";
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
    githubCommitMessage: string;
  };
  createdAt: number;
  buildingAt: number;
  ready: number;
}

export interface IPagination {
  count: number;
  next: number;
  prev: number;
}
