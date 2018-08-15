// @flow
import type { CMSFile } from "./CMSFile";

export type Song = {
    ID: string,
    LastEdited: string,
    Created: string,
    Title: string,
    Length: string,
    Artist: string,
    Album: string,
    Disc: number,
    Track: number,
    StreamFile?: CMSFile,
    TXTLyric: string,
    LRCLyric: string,
    StreamFileURL?: string
};
