import { LateFee } from "./LateFee";

// model/Payment.ts
export class Payment {
  public PaymentID: number;
  public LateFeeId: number | null;
  public PaymentDate: Date | null;
  public Amount: number | null;
  public StatePayments: number | null;
  public LateFee: LateFee | null;
  public OrderCode: string;
  }