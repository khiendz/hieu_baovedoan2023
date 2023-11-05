export class BackupData {
    constructor(
      public BackupId: number,
      public BackupTimestamp: string | null,
      public BackupFile: string | null
    ) {}
  }