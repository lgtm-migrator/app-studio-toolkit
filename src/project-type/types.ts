export type ProjectTypeTag = string;
export type AbsolutePath = string;

export type TagToAbsPaths = Map<ProjectTypeTag, AbsolutePathFlags>;
export type AbsolutePathFlags = Map<AbsolutePath, boolean>;
export type ProjectApiDS = any;
export type ProjectAPI = any;
export type WorkspaceAPI = any;