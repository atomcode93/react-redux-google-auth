// @flow weak

import React              from 'react';
import WorkProgressPanel  from './workProgressPanel/WorkProgressPanel';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCol
}                         from '../../components';



const headers =  ['#', 'Offerta', 'KAM', 'Scadenza', 'Importo €', 'Consumo kWh', 'Stato', 'Progress'];
const content = [
  ['1', 'Fonderia  AAA', 'Augusto Provetta', '10/04/2018 11:00',  '20.000', '50', <span className="label label-danger">in progress</span>, <span className="badge badge-info">50%</span>],
  ['2', 'Panificio BBB', 'Augusto Provetta', '09/04/2018 15:00', '19.000', '40', <span className="label label-success">completed</span>, <span className="badge badge-success">100%</span>],
  ['3', 'Lavanderia CCC', 'Augusto Provetta', '08/04/2018 18:00', '22.000', '40',<span className="label label-warning">in progress</span>, <span className="badge badge-warning">75%</span>],
  ['4', 'Autoriparazioni', 'Gianni Responsabile', '09/04/2018 12:00','20.000', '40', <span className="label label-info">in progress</span>, <span className="badge badge-info">65%</span>],
  ['5', 'Estetica', 'Augusto Provetta', '07/04/2018 13:00', '21.000', '40',<span className="label label-warning">in progress</span>, <span className="badge badge-danger">95%</span>],
  ['6', 'Palestra', 'Augusto Provetta', '06/04/2018 14:00','30.000', '40',<span className="label label-info">in progress</span>, <span className="badge badge-success">95%</span>],
  ['7', 'Residence', 'Augusto Provetta', '05/04/2018 18:00', '10.000', '40',<span className="label label-info">in progress</span>, <span className="badge badge-success">95%</span>]
];

const WorkProgress = () => (
  <WorkProgressPanel>
    <Table>
      <TableHeader>
        {
          headers.map(
            (header, headerIdx) => {
              return (
                <TableCol key={headerIdx}>
                  {header}
                </TableCol>
              );
            }
          )
        }
      </TableHeader>
      <TableBody>
        {
          content.map(
            (contentRow, contentRowIdx) => {
              return (
                <TableRow key={contentRowIdx}>
                  {
                    contentRow.map(
                      (contentColumn, contentColumnIdx) => {
                        return (
                          <TableCol key={contentColumnIdx}>
                            {contentColumn}
                          </TableCol>
                        );
                      }
                    )
                  }
                </TableRow>
              );
            }
          )
        }
      </TableBody>
    </Table>
  </WorkProgressPanel>
);

export default WorkProgress;
