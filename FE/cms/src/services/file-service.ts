const domainBE = process?.env?.DOMAIN_BACK_END ?? "http://localhost:3000";

export const JoinFileCDN = (fileName:string) => {

    const resultName = `${domainBE}/static/images/${fileName}`;
    return resultName;
}