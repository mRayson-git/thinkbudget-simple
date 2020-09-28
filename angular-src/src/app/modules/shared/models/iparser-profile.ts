export interface IParserProfile {
    username: string,
    accountName: string,
    hasHeader: boolean,
    numCols: number,
    amountCol: number,
    payeeCol: number,
    descCol: number,
    dateCol: number
}

export class ParserProfile implements IParserProfile{
    username: string;
    accountName: string;
    hasHeader: boolean;
    numCols: number;
    amountCol: number;
    payeeCol: number;
    descCol: number;
    dateCol: number;
}