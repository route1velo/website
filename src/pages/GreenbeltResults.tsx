import * as React from 'react';
import PageContent from '../components/PageContent';
import client from '../lib/ContentfulClient';
import { Redirect } from 'react-router';
import { GreenbeltResultsConfig, ResultSheet } from './pageType';
import { Entry } from 'contentful';
import { Table, Media, Collapse } from 'reactstrap';
import { FaChevronRight, FaChevronDown } from 'react-icons/lib/fa';
import styled from 'styled-components';
import Loading from '../components/Loading';

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
  openTables: Set<string>;
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

const SeriesWrapper = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  padding: 5px 5px 5px 15px;
  margin-bottom: 15px;
  & h4 svg {
    margin-right: 5px;
  }
`;

const TableWrapper = styled.div`
  border-top: 1px solid grey;
  padding: 10px 5px;
  margin-bottom: 15px;

  &:first-child {
    border: none;
  }

  & .media-heading {
    font-size: 1.25rem;
  }

`;

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
    },
    openTables: new Set(),
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

  handleHeaderClick = (series: string) => {
    const newState = Object.assign({}, this.state);
    // collapse everything else
    Object.keys(newState.series).forEach( key => {
      if (key !== series) {
        newState.series[key].collapsed = false;
      }
    });
    newState.series[series].collapsed = !newState.series[series].collapsed;
    this.setState(newState);
  }

  handleTableCollapseClick = (tableName: string) => {
    const openTables = Object.assign(new Set(), this.state.openTables);
    if (this.state.openTables.has(tableName)) {
      openTables.delete(tableName);
    } else {
      openTables.add(tableName);
    }
    this.setState({ openTables });
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
        {
          Object.keys(this.state.series).map( seriesName => {
            const series = this.state.series[seriesName];
            if (!series || !series.displayed) {
              return <Loading />;
            }
            return (
              <SeriesWrapper key={seriesName}>
                <Media key={seriesName} className="mt-2">
                  <Media body={true}>
                    <Media heading={true} onClick={() => this.handleHeaderClick(seriesName)}>
                      {series.collapsed ? <FaChevronDown /> : <FaChevronRight />}
                      {seriesName}
                    </Media>
                    <Collapse isOpen={series.collapsed}>
                      {
                        (seriesName === 'A Series' || seriesName === 'B Series') &&
                        series.data &&
                        <TableWrapper>
                          <Media className="mt-2">
                            <Media body={true}>
                              <Media heading={true} onClick={() => this.handleTableCollapseClick(seriesName + 'standings')}>
                                {this.state.openTables.has(seriesName + 'standings') ? <FaChevronDown /> : <FaChevronRight />}
                                Standings
                              </Media>
                              <Collapse isOpen={this.state.openTables.has(seriesName + 'standings')}>
                                <ResultTable keyPrefix={`${seriesName}Standings`} data={series.data.Standings} />
                              </Collapse>
                            </Media>
                          </Media>
                        </TableWrapper>
                      }

                      {
                        Object.keys(series.data as SeriesData)
                          .filter(key => key !== 'Standings')
                          .sort((prev, next) => Date.parse(next) - Date.parse(prev))
                          .map( date => {
                            return (
                              series.data &&
                              <TableWrapper>
                                <Media className="mt-2">
                                  <Media body={true}>
                                    <Media heading={true} onClick={() => this.handleTableCollapseClick(seriesName + date)}>
                                      {this.state.openTables.has(seriesName + date) ? <FaChevronDown /> : <FaChevronRight />}
                                      {date}
                                    </Media>
                                    <Collapse isOpen={this.state.openTables.has(seriesName + date)}>
                                      <ResultTable data={series.data[date]} key={date} keyPrefix={`${seriesName}`} />
                                    </Collapse>
                                  </Media>
                                </Media>
                              </TableWrapper>
                            );
                          })
                      }
                    </Collapse>
                  </Media>
                </Media>
              </SeriesWrapper>
            );
          })
        }
      </PageContent >
    );
  }
}

export default SimplePage;