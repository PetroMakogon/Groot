// @flow

export type CMSFile = {
    id: number,
    created?: string,
    lastEdited?: string,
    owner?: string,
    parentId?: number,
    title?: string,
    exists?: Boolean,
    type?: string,
    category?: string,
    name?: string,
    filename?: string,
    extension?: string,
    size?: number,
    url?: string,
    thumbnail?: string,
    smallThumbnail?: string,
    width?: number,
    height?: number,
    canView?: Boolean,
    canEdit?: Boolean,
    canDelete?: Boolean,
    draft?: Boolean,
    published?: Boolean,
    inUseCount?: number
};
