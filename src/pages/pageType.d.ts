export interface Page {
  pageContent?: undefined | string;
}

export interface ResultSheet {
  sheetId: string;
  sheetName: string;
  showSheet: boolean;
}

export interface GreenbeltResultsConfig {
  configurationObject: {
    resultSheets: ResultSheet[];
  };
}