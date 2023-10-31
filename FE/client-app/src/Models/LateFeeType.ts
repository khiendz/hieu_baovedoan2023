export class LateFeeType {
    LateFeeTypeId: number;
    Name: string;
    Description: string;
    FeeAmount: number;
    DateCount: number;
  
    constructor(
      LateFeeTypeId: number,
      Name: string,
      Description: string,
      FeeAmount: number,
      DateCount: number
    ) {
      this.LateFeeTypeId = LateFeeTypeId;
      this.Name = Name;
      this.Description = Description;
      this.FeeAmount = FeeAmount;
      this.DateCount = DateCount;
    }
  }
  