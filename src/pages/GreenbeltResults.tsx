import * as React from 'react';
import PageContent from '../components/PageContent';
import client from '../lib/ContentfulClient';
import { Redirect } from 'react-router';
import { GreenbeltResultsConfig, ResultSheet } from './pageType';
import { Entry } from 'contentful';
import { Table, Media, Collapse } from 'reactstrap';

const TableTop = require('tabletop');

interface TableData {
  columnNames ?: string[];
  column_names ?: string[];
  elements ?: {
    'First Name'?: string;
    'Last Name'?: string;
    'Points'?: string;
    'Position'?: string;
    'Team'?: string;
  }[];
}
interface SeriesData {
  [key: string]: TableData;
}
interface Series {
  displayed ?: boolean;
  collapsed ?: boolean;
  data ?: SeriesData;
}
interface Props {}
interface State {
  notFound: boolean;
  series: {
    [key: string]: Series;
  };
}

interface TableProps {
  data: TableData;
  keyPrefix: string;
}

const ResultTable: React.SFC<TableProps> = ({ data, keyPrefix }) => {
  if (!data) {
    return null;
  }
  return (
    <Table size="sm" responsive={true}>
      <thead>
        <tr>
          {
            data.columnNames &&
            data.columnNames
              .filter( col => col !== 'Leave Column Empty')
              .map( (col, index) => (<th key={`${keyPrefix}${index}`}>{col}</th>))
          }
        </tr>
      </thead>
      <tbody>
        {
          data.elements && data.elements.map( (row, index) => {
            return (
              <tr key={`${keyPrefix}${index}`}>
                {
                  data.columnNames &&
                  data.columnNames
                    .filter(col => col !== 'Leave Column Empty')
                    .map( (col, colIndex) => (
                      <td key={`${keyPrefix}${colIndex}`}>{row[col]}</td>
                    ))
                }
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
};

class SimplePage extends React.Component<Props, State> {
  state: State = {
    notFound: false,
    series: {
      'A Series': {
        displayed: false,
        collapsed: true,
      },
      'B Series': {
        displayed: false,
        collapsed: true,
      },
      'C Series': {
        displayed: false,
        collapsed: true,
      },
      'RDRS Series': {
        displayed: false,
        collapsed: true,
      },
    }
  };

  displayResults = async (sheet: ResultSheet) => {
    console.log(sheet.sheetName);
    if (!sheet.showSheet) {
      this.setState({
        series: {
          ...this.state.series,
          [sheet.sheetName]: { displayed: false, data: {} }
        }
      });
      return;
    }

    const callback = (data: any, t: any) => {// tslint:disable-line
      console.log(data);
      this.setState({
        series: {
          ...this.state.series,
          [sheet.sheetName]: {
            displayed: true,
            data
          }
        }
      });
    };

    TableTop.init({
      key: `https://docs.google.com/spreadsheets/d/${sheet.sheetId}/edit?usp=sharing`,
      callback,
      simpleSheet: false
    });
  }

  getContent = async () => {
    const config: Entry<GreenbeltResultsConfig> = await client.getEntry('635irUCsMgwWiyYYiS6OUU') as Entry<GreenbeltResultsConfig>;
    console.log(config);
    config
      .fields
      .configurationObject
      .resultSheets
      .map(sheet => this.displayResults( sheet ));
  }

  componentDidMount() {
    this.getContent();
  }

  render() {
    if (this.state.notFound) {
      return (
        <Redirect to="/404" />
      );
    }

    return (
      <PageContent>
        <ul>
          {
            Object.keys(this.state.series)
              .filter( seriesName => this.state.series[seriesName].displayed)
              .map( seriesName => ( <li key={seriesName}>{seriesName}</li> ))
          }
        </ul>
        {
          Object.keys(this.state.series).map( seriesName => {
            const series = this.state.series[seriesName];
            if (!series || !series.displayed) {
              return null;
            }
            return (
              <Media key={seriesName} className="mt-3">
                <Media body={true}>
                  <Media heading={true}>
                    {seriesName}
                  </Media>
                  {
                    (seriesName === 'A Series' || seriesName === 'B Series') &&
                    series.data &&
                    <Media>
                      <Media body={true}>
                        <Media heading={true}>
                          Standings
                          </Media>
                        <Collapse isOpen={!series.collapsed} >
                          <ResultTable keyPrefix={`${seriesName}Standings`} data={series.data.Standings} />
                        </Collapse>
                      </Media>
                    </Media>

                  }

                  {
                    Object.keys(series.data as SeriesData)
                      .filter(key => key !== 'Standings')
                      .sort((prev, next) => Date.parse(prev) - Date.parse(next))
                      .map( date => {
                        return (
                          series.data &&
                          <Media key={`${seriesName}${date}`}>
                            <Media body={true}>
                              <Media heading={true}>
                                {date}
                              </Media>
                              <ResultTable data={series.data[date]} key={date} keyPrefix={`${seriesName}`} />
                            </Media>
                          </Media>
                        );
                      })
                  }
                </Media>
              </Media>
            );
          })
        }
      </PageContent >
    );
  }
}

export default SimplePage;